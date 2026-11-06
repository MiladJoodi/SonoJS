import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram"

export const runtime = "nodejs"

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5
const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_MESSAGE = 4000

type RateBucket = { count: number; resetAt: number }
const rateBuckets = new Map<string, RateBucket>()

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return req.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false
  bucket.count += 1
  return true
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const TOPIC_LABELS: Record<string, string> = {
  billing: "Billing & payments",
  pro: "Pro access",
  partnership: "Partnership",
  other: "Something else",
}

function normalizeTopic(value: unknown): string | null {
  if (typeof value !== "string") return null
  const key = value.trim()
  if (!key || !(key in TOPIC_LABELS)) return null
  return TOPIC_LABELS[key]!
}

async function sendViaResend(input: {
  name: string
  email: string
  topic: string | null
  message: string
  ip: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM?.trim()
  const to = process.env.CONTACT_TO?.trim()

  if (!apiKey || !from || !to) {
    return { ok: false, error: "Contact email is not configured." }
  }

  const resend = new Resend(apiKey)
  const subject = input.topic
    ? `SonoJS contact — ${input.topic} — ${input.name}`
    : `SonoJS contact — ${input.name}`
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.email,
    subject,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      ...(input.topic ? [`Topic: ${input.topic}`] : []),
      `IP: ${input.ip}`,
      "",
      input.message,
    ].join("\n"),
  })

  if (error) {
    console.error("[contact] resend", error)
    return { ok: false, error: "Could not send message. Try again later." }
  }

  return { ok: true }
}

export async function POST(req: NextRequest) {
  const telegramReady = isTelegramConfigured()
  const emailReady = Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.RESEND_FROM?.trim() &&
      process.env.CONTACT_TO?.trim()
  )

  if (!telegramReady && !emailReady) {
    return NextResponse.json(
      { ok: false, error: "Contact is not configured." },
      { status: 503 }
    )
  }

  const ip = clientIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Try again later." },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    )
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    )
  }

  const data = body as Record<string, unknown>

  // Honeypot - bots fill hidden fields; humans leave empty
  if (typeof data.company === "string" && data.company.trim()) {
    return NextResponse.json({ ok: true })
  }

  const name = typeof data.name === "string" ? data.name.trim() : ""
  const email = typeof data.email === "string" ? data.email.trim() : ""
  const topic = normalizeTopic(data.topic)
  const message = typeof data.message === "string" ? data.message.trim() : ""

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid name." },
      { status: 400 }
    )
  }
  if (!email || email.length > MAX_EMAIL || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    )
  }
  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { ok: false, error: "Please enter a message." },
      { status: 400 }
    )
  }

  if (telegramReady) {
    const text = [
      "SonoJS contact",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      ...(topic ? [`Topic: ${topic}`] : []),
      `IP: ${ip}`,
      "",
      message,
    ].join("\n")

    const result = await sendTelegramMessage(text)
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not send message. Try again later." },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true })
  }

  const emailResult = await sendViaResend({ name, email, topic, message, ip })
  if (!emailResult.ok) {
    return NextResponse.json(
      { ok: false, error: emailResult.error },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
