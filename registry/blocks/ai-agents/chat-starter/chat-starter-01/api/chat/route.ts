import { createOpenAI } from "@ai-sdk/openai"
import {
  convertToModelMessages,
  smoothStream,
  streamText,
  type UIMessage,
} from "ai"

export const maxDuration = 30

/**
 * Chat runtime for the SonoJS chat starter.
 *
 * GET  — probe whether a key is configured (and which model).
 * POST — stream a UI-message reply using AI_API_KEY (OpenAI-compatible).
 *
 * Set AI_API_KEY in the environment. Optionally set CHAT_MODEL
 * (default `gpt-4o-mini`). Keys stay server-side — never use NEXT_PUBLIC_.
 */

function resolveKey() {
  return (
    process.env.OPENAI_API_KEY?.trim() ||
    process.env.AI_API_KEY?.trim() ||
    ""
  )
}

function resolveModel() {
  return process.env.CHAT_MODEL?.trim() || "gpt-4o-mini"
}

export async function GET() {
  const key = resolveKey()
  if (!key) {
    return Response.json({
      configured: false,
      provider: null,
      providerLabel: null,
      model: null,
    })
  }

  return Response.json({
    configured: true,
    provider: "openai",
    providerLabel: "OpenAI",
    model: resolveModel(),
  })
}

export async function POST(request: Request) {
  const key = resolveKey()
  if (!key) {
    return Response.json(
      { error: "AI_API_KEY is not configured." },
      { status: 503 }
    )
  }

  let body: { messages?: UIMessage[]; demo?: boolean }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (body.demo) {
    return Response.json(
      { error: "Demo requests should use the client DemoTransport." },
      { status: 400 }
    )
  }

  const messages = body.messages ?? []
  const openai = createOpenAI({ apiKey: key })
  const model = openai(resolveModel())

  const result = streamText({
    model,
    system:
      "You are a helpful assistant embedded in a SonoJS chat starter. Keep answers clear and concise.",
    messages: await convertToModelMessages(messages),
    experimental_transform: smoothStream({ chunking: "word" }),
  })

  return result.toUIMessageStreamResponse()
}
