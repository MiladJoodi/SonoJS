"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type AdminUserRow = {
  id: string
  clerkUserId: string
  email: string | null
  plan: "free" | "pro"
  planSlug: string | null
  planName: string | null
  status: string | null
  currentPeriodEnd: string | null
  stripeSubscriptionId: string | null
}
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

export function PlanAdmin({ adminEmail }: { adminEmail: string }) {
  const [users, setUsers] = React.useState<AdminUserRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)

  const [clerkUserId, setClerkUserId] = React.useState("")
  const [action, setAction] = React.useState<PlanAction>("pro-monthly")
  const [days, setDays] = React.useState("30")
  const [busy, setBusy] = React.useState(false)
  const [msg, setMsg] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const loadUsers = React.useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const res = await fetch("/api/admin/users")
      const data = (await res.json().catch(() => ({}))) as {
        users?: AdminUserRow[]
        error?: string
      }
      if (!res.ok) {
        throw new Error(data.error || "Could not load users")
      }
      setUsers(data.users ?? [])
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Could not load users")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadUsers()
  }, [loadUsers])

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
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update plan")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 lg:px-8">
      <header className="space-y-1 text-start">
        <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-[-0.03em]">
          Admin · Plans
        </h1>
        <p className="text-sm text-muted-foreground">
          Signed in as <span dir="ltr">{adminEmail}</span>. Grant or revoke Pro
          for any Clerk user.
        </p>
      </header>

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle>Change plan</CardTitle>
          <CardDescription>
            Paste a Clerk user id (`user_…`). Pro writes Neon + syncs Clerk.
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

      <Card className="border-border/60 shadow-none">
        <CardHeader className="border-b border-border/50">
          <CardTitle>Users in Neon</CardTitle>
          <CardDescription>
            Click a row to fill the form. Refresh after grants.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="flex min-h-32 items-center justify-center">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          ) : loadError ? (
            <p className="text-sm text-destructive">{loadError}</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 text-start text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="px-2 py-2 font-medium">Email</th>
                    <th className="px-2 py-2 font-medium">Clerk id</th>
                    <th className="px-2 py-2 font-medium">Plan</th>
                    <th className="px-2 py-2 font-medium">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className={cn(
                        "cursor-pointer border-b border-border/40 hover:bg-muted/40"
                      )}
                      onClick={() => {
                        setClerkUserId(u.clerkUserId)
                        if (u.planSlug === "pro-yearly") {
                          setAction("pro-yearly")
                          setDays("365")
                        } else if (u.plan === "pro") {
                          setAction("pro-monthly")
                          setDays("30")
                        } else {
                          setAction("free")
                        }
                      }}
                    >
                      <td className="px-2 py-2.5" dir="ltr">
                        {u.email || "—"}
                      </td>
                      <td
                        className="max-w-56 truncate px-2 py-2.5 font-mono text-xs"
                        dir="ltr"
                        title={u.clerkUserId}
                      >
                        {u.clerkUserId}
                      </td>
                      <td className="px-2 py-2.5">
                        {u.plan === "pro"
                          ? u.planName || u.planSlug || "Pro"
                          : "Free"}
                      </td>
                      <td className="px-2 py-2.5 text-muted-foreground" dir="ltr">
                        {u.currentPeriodEnd
                          ? new Date(u.currentPeriodEnd).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
