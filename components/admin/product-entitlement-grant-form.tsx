"use client"

import * as React from "react"

import { templateProjects } from "@/lib/templates-catalog"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@sonojs/ui/components/combobox"
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

type GrantableProduct = {
  slug: string
  title: string
  priceLabel: string
  /** Searchable label shown in the combobox. */
  label: string
}

const GRANTABLE: GrantableProduct[] = templateProjects
  .filter((p) => p.enabled && (p.priceCents > 0 || p.category === "website"))
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    priceLabel: p.priceLabel,
    label: `${p.title} · ${p.slug} · ${p.priceLabel}`,
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

const LABEL_BY_SLUG = new Map(GRANTABLE.map((p) => [p.slug, p.label]))

type Action = "grant" | "revoke"

export function ProductEntitlementGrantForm({
  initialClerkUserId = "",
  onSuccess,
}: {
  initialClerkUserId?: string
  onSuccess?: () => void
}) {
  const [clerkUserId, setClerkUserId] = React.useState(initialClerkUserId)
  const [productSlug, setProductSlug] = React.useState("")
  const [productLabel, setProductLabel] = React.useState<string | null>(null)
  const [action, setAction] = React.useState<Action>("grant")
  const [busy, setBusy] = React.useState(false)
  const [msg, setMsg] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (initialClerkUserId) setClerkUserId(initialClerkUserId)
  }, [initialClerkUserId])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!productSlug.trim()) {
      setError("Select a product first")
      return
    }
    setBusy(true)
    setMsg(null)
    setError(null)
    try {
      const res = await fetch("/api/admin/product-entitlements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: clerkUserId.trim(),
          productSlug,
          action,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        revoked?: boolean
      }
      if (!res.ok) {
        throw new Error(data.error || "Could not update entitlement")
      }
      const label =
        GRANTABLE.find((p) => p.slug === productSlug)?.title ?? productSlug
      if (action === "revoke") {
        setMsg(
          data.revoked
            ? `Revoked ${label} from ${clerkUserId.trim()}`
            : `No active entitlement for ${label}`
        )
      } else {
        setMsg(`Granted ${label} to ${clerkUserId.trim()}`)
      }
      onSuccess?.()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update entitlement"
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="border-b border-border/50">
        <CardTitle>Product access</CardTitle>
        <CardDescription>
          Search by title or slug, then grant or revoke. Works for large catalogs
          — type to filter instead of scrolling a long list.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          onSubmit={(e) => void submit(e)}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="product-entitlement-clerk">Clerk user id</Label>
            <Input
              id="product-entitlement-clerk"
              value={clerkUserId}
              onChange={(e) => setClerkUserId(e.target.value)}
              placeholder="user_…"
              dir="ltr"
              className="font-mono text-sm shadow-none"
              required
            />
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="product-entitlement-search">Product</Label>
            <Combobox
              items={GRANTABLE.map((p) => p.label)}
              value={productLabel}
              onValueChange={(next) => {
                const label = typeof next === "string" ? next : null
                setProductLabel(label)
                if (!label) {
                  setProductSlug("")
                  return
                }
                const match = GRANTABLE.find((p) => p.label === label)
                setProductSlug(match?.slug ?? "")
              }}
            >
              <ComboboxInput
                id="product-entitlement-search"
                placeholder="Search title or slug…"
                className="w-full shadow-none"
                showClear
              />
              <ComboboxContent className="max-h-72">
                <ComboboxEmpty>No products match.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item} className="cursor-pointer">
                      <span className="min-w-0 truncate" dir="ltr">
                        {item}
                      </span>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            {productSlug ? (
              <p className="font-mono text-xs text-muted-foreground" dir="ltr">
                Selected: {LABEL_BY_SLUG.get(productSlug) ?? productSlug}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                {GRANTABLE.length} products available — type to narrow the list.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Action</Label>
            <Select
              value={action}
              onValueChange={(v) => setAction(v as Action)}
            >
              <SelectTrigger className="w-full cursor-pointer shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grant" className="cursor-pointer">
                  Grant
                </SelectItem>
                <SelectItem value="revoke" className="cursor-pointer">
                  Revoke
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <Button
              type="submit"
              disabled={busy || !productSlug}
              className="cursor-pointer shadow-none disabled:cursor-not-allowed"
            >
              {busy ? <Spinner className="size-4" /> : null}
              {action === "grant" ? "Grant access" : "Revoke access"}
            </Button>
            {msg ? (
              <p className="text-sm text-muted-foreground">{msg}</p>
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
