"use client"

import * as React from "react"

import type { AdminUserRow } from "@/db/queries/admin-billing"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
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

type PlanAction = "pro-monthly" | "pro-yearly" | "free"

export function PlanGrantForm({
  initialClerkUserId = "",
  onSuccess,
}: {
  initialClerkUserId?: string
  onSuccess?: () => void
}) {
  const [clerkUserId, setClerkUserId] = React.useState(initialClerkUserId)
  const [action, setAction] = React.useState<PlanAction>("pro-monthly")
  const [days, setDays] = React.useState("30")
  const [busy, setBusy] = React.useState(false)
  const [msg, setMsg] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (initialClerkUserId) setClerkUserId(initialClerkUserId)
  }, [initialClerkUserId])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setMsg(null)
    setError(null)
    try {
      const body =
        action === "free"
          ? { clerkUserId: clerkUserId.trim(), action: "revoke" }
          : {
              clerkUserId: clerkUserId.trim(),
              action: "grant",
              planSlug: action,
              days: Number(days),
            }

      const res = await fetch("/api/admin/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = (await res.json().catch(() => ({}))) as {
        user?: AdminUserRow
        error?: string
      }
      if (!res.ok) {
        throw new Error(data.error || "Could not update plan")
      }
      setMsg(
        action === "free"
          ? `Set ${clerkUserId.trim()} to Free`
          : `Granted ${action} to ${clerkUserId.trim()}`
      )
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update plan")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="border-b border-border/50">
        <CardTitle>Change plan</CardTitle>
        <CardDescription>
          Paste a Clerk user id (`user_…`). Pro writes Neon + syncs Clerk.
          Revoke updates Neon and Clerk only — a live Stripe subscription can
          restore Pro on the next webhook.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          onSubmit={(e) => void submit(e)}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="admin-clerk-id">Clerk user id</Label>
            <Input
              id="admin-clerk-id"
              dir="ltr"
              value={clerkUserId}
              onChange={(e) => setClerkUserId(e.target.value)}
              placeholder="user_…"
              required
              className="cursor-text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-plan">Plan</Label>
            <Select
              value={action}
              onValueChange={(v) => {
                const next = v as PlanAction
                setAction(next)
                if (next === "pro-yearly") setDays("365")
                if (next === "pro-monthly") setDays("30")
              }}
            >
              <SelectTrigger id="admin-plan" className="cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pro-monthly" className="cursor-pointer">
                  Pro Monthly
                </SelectItem>
                <SelectItem value="pro-yearly" className="cursor-pointer">
                  Pro Yearly
                </SelectItem>
                <SelectItem value="free" className="cursor-pointer">
                  Free (revoke)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-days">Days</Label>
            <Input
              id="admin-days"
              type="number"
              min={1}
              max={3650}
              value={days}
              disabled={action === "free"}
              onChange={(e) => setDays(e.target.value)}
              className="cursor-text"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <Button
              type="submit"
              disabled={busy || !clerkUserId.trim()}
              className="cursor-pointer"
            >
              {busy ? (
                <>
                  <Spinner className="size-4" />
                  Saving…
                </>
              ) : (
                "Save"
              )}
            </Button>
            {msg ? (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {msg}
              </p>
            ) : null}
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
