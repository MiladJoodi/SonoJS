"use client"

import * as React from "react"
import { CheckCircle2Icon } from "lucide-react"

import {
  AuthCard,
  AuthFieldError,
} from "@/components/auth/auth-card"
import {
  LinkedinLink,
  XLink,
  YoutubeLink,
} from "@/components/site-header"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Spinner } from "@sonojs/ui/components/spinner"
import { Textarea } from "@sonojs/ui/components/textarea"

const TOPIC_OPTIONS = [
  { value: "billing", label: "Billing & payments" },
  { value: "pro", label: "Pro access" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
] as const

type TopicValue = (typeof TOPIC_OPTIONS)[number]["value"]

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [topic, setTopic] = React.useState<TopicValue | "">("")
  const [message, setMessage] = React.useState("")
  const [honeypot, setHoneypot] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [sent, setSent] = React.useState(false)

  const supportEmail = siteConfig.links.supportEmail

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic: topic || undefined,
          message,
          company: honeypot,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not send. Try again.")
        return
      }
      setSent(true)
      setName("")
      setEmail("")
      setTopic("")
      setMessage("")
    } catch {
      setError("Could not send. Try again.")
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <AuthCard className={cn("gap-4 sm:gap-4", className)}>
        <div className="flex items-start gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2Icon className="size-4.5" aria-hidden />
          </span>
          <div className="min-w-0 space-y-1">
            <h2 className="text-base font-semibold text-foreground">
              Message sent
            </h2>
            <p className="text-sm text-muted-foreground">
              We usually reply within a day.
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-1 h-8 w-fit cursor-pointer px-2.5 shadow-none"
              onClick={() => setSent(false)}
            >
              Send another
            </Button>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard className={cn("gap-4 sm:gap-5", className)}>
      <header className="space-y-1">
        <span className="block h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="text-h3 text-foreground">Contact</h1>
      </header>

      <form className="flex flex-col gap-3" onSubmit={(e) => void onSubmit(e)}>
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div className="grid gap-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
            disabled={busy}
            className="shadow-none"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            autoComplete="email"
            placeholder="name@example.com"
            disabled={busy}
            className="shadow-none"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="contact-topic">Topic</Label>
          <Select
            value={topic || undefined}
            onValueChange={(v) => setTopic(v as TopicValue)}
            disabled={busy}
          >
            <SelectTrigger
              id="contact-topic"
              className="h-[46px] w-full cursor-pointer shadow-none"
            >
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              {TOPIC_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="cursor-pointer"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={4000}
            rows={3}
            placeholder="How can we help?"
            disabled={busy}
            className="min-h-[88px] resize-none shadow-none"
          />
        </div>

        <AuthFieldError message={error} />

        <Button
          type="submit"
          disabled={busy}
          className="w-full cursor-pointer shadow-none disabled:cursor-not-allowed"
        >
          {busy ? <Spinner className="size-4" /> : "Send"}
        </Button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
        {supportEmail ? (
          <a
            href={`mailto:${supportEmail}`}
            className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {supportEmail}
          </a>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1.5">
          <XLink />
          <LinkedinLink />
          <YoutubeLink />
        </div>
      </div>
    </AuthCard>
  )
}
