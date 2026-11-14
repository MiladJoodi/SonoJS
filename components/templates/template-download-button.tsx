"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { DownloadIcon, ShoppingBagIcon } from "lucide-react"

import {
  AuthDialog,
  type AuthDialogMode,
} from "@/components/auth/auth-dialog"
import { FreeIcon } from "@/components/icons/plan/free"
import { ProIcon } from "@/components/icons/plan/pro"
import { startProductCheckout } from "@/components/templates/start-product-checkout"
import type { TemplateProject } from "@/lib/templates-catalog-meta"
import { getUserPlan, normalizeContentAccess } from "@/lib/access"
import { projectRequiresPurchase } from "@/lib/product-entitlement-access"
import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"

/**
 * Blue download / buy CTA.
 * - Free member/pro kits → download (auth / upgrade as before)
 * - Paid (`priceCents > 0`) → Buy until Neon entitlement exists; Pro alone is not enough
 */
export function TemplateDownloadButton({
  project,
  ownsProduct: ownsProductProp = false,
}: {
  project: TemplateProject
  /** Server-resolved ownership for paid products. */
  ownsProduct?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const href = `/api/templates/${encodeURIComponent(project.slug)}/download`
  const access = normalizeContentAccess(project.access ?? "member")
  const requiresPurchase = projectRequiresPurchase(project)
  const [ownsProduct, setOwnsProduct] = React.useState(ownsProductProp)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [authOpen, setAuthOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<AuthDialogMode>("sign-in")
  const [statusNote, setStatusNote] = React.useState<string | null>(null)

  React.useEffect(() => {
    setOwnsProduct(ownsProductProp)
  }, [ownsProductProp])

  const signedIn = Boolean(isLoaded && user)
  const isPro = signedIn && getUserPlan(user?.publicMetadata) === "pro"

  const canDownload = requiresPurchase
    ? signedIn && ownsProduct
    : access === "public" ||
      (access === "member" && signedIn) ||
      (access === "pro" && isPro)

  const needsPurchase = requiresPurchase && signedIn && !ownsProduct

  const label = (() => {
    if (canDownload) {
      if (requiresPurchase) return "Download"
      if (access === "pro") return "Download"
      if (project.priceCents === 0) return "Download free"
      return "Download"
    }
    if (needsPurchase) {
      return `Buy ${project.priceLabel || "$29"}`
    }
    if (requiresPurchase && !signedIn) return "Sign in to buy"
    if (access === "pro") return "Upgrade to Pro"
    return "Sign in"
  })()

  /** Zip comes from Pro registry via slug (or optional external downloadUrl). */
  const hasArchive = Boolean(project.downloadUrl) || project.enabled

  function handleDenied(code?: string) {
    if (code === "purchase_required" || needsPurchase) {
      void handleBuy()
      return
    }
    if (access === "pro") {
      router.push("/pricing")
      return
    }
    setAuthMode("sign-in")
    setAuthOpen(true)
    setError(null)
  }

  async function handleBuy() {
    if (loading) return
    if (!signedIn) {
      setAuthMode("sign-in")
      setAuthOpen(true)
      return
    }
    setLoading(true)
    setError(null)
    setStatusNote(null)
    try {
      const result = await startProductCheckout(project.slug)
      if (!result.ok) {
        if (result.unauthorized) {
          setAuthMode("sign-in")
          setAuthOpen(true)
          return
        }
        setError(result.error)
        return
      }
      window.location.assign(result.url)
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload() {
    if (loading) return

    if (needsPurchase) {
      await handleBuy()
      return
    }

    if (!canDownload) {
      handleDenied()
      return
    }

    setLoading(true)
    setError(null)

    const externalTab = project.downloadUrl
      ? window.open("about:blank", "_blank")
      : null

    try {
      const res = await fetch(href, { credentials: "same-origin" })

      if (res.status === 401 || res.status === 403) {
        externalTab?.close()
        let code: string | undefined
        try {
          const body = (await res.json()) as { code?: string }
          code = body.code
        } catch {
          /* ignore */
        }
        handleDenied(code)
        return
      }

      if (res.status === 404) {
        externalTab?.close()
        let code: string | undefined
        try {
          const body = (await res.json()) as { code?: string }
          code = body.code
        } catch {
          /* ignore */
        }
        setError(
          code === "coming_soon" || !hasArchive
            ? "Coming soon"
            : "Download not available."
        )
        return
      }

      if (!res.ok) {
        externalTab?.close()
        let message = `Download failed (${res.status}).`
        try {
          const body = (await res.json()) as { error?: string }
          if (body.error) message = body.error
        } catch {
          /* ignore */
        }
        setError(message)
        return
      }

      const contentType = res.headers.get("content-type") ?? ""
      if (contentType.includes("application/json")) {
        const body = (await res.json()) as {
          error?: string
          openUrl?: string
        }
        if (body.openUrl) {
          if (externalTab) {
            externalTab.location.href = body.openUrl
          } else {
            window.open(body.openUrl, "_blank", "noopener,noreferrer")
          }
          return
        }
        externalTab?.close()
        setError(body.error ?? "Download failed.")
        return
      }

      externalTab?.close()

      const blob = await res.blob()
      const disposition = res.headers.get("Content-Disposition")
      const match = disposition?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i)
      const downloadName = match
        ? decodeURIComponent(match[1].replace(/"/g, ""))
        : `${project.slug}.zip`

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = downloadName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      externalTab?.close()
      setError("Download failed.")
    } finally {
      setLoading(false)
    }
  }

  // After Stripe return: poll Neon ownership (never trust redirect alone).
  React.useEffect(() => {
    if (!requiresPurchase || !signedIn || ownsProduct) return
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    if (params.get("checkout") !== "success") return

    let cancelled = false
    let attempts = 0
    setStatusNote("Confirming purchase…")

    async function poll() {
      attempts += 1
      try {
        const res = await fetch("/api/products/checkout-status", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: project.slug }),
        })
        if (!res.ok) return
        const data = (await res.json()) as { status?: string }
        if (cancelled) return
        if (data.status === "owned") {
          setOwnsProduct(true)
          setStatusNote("Purchase confirmed — you can download now.")
          router.replace(pathname, { scroll: false })
          router.refresh()
          return
        }
      } catch {
        /* keep polling */
      }
      if (!cancelled && attempts < 15) {
        window.setTimeout(poll, 1500)
      } else if (!cancelled) {
        setStatusNote(
          "Payment received — access may take a moment. Refresh if Download stays locked."
        )
      }
    }

    void poll()
    return () => {
      cancelled = true
    }
  }, [
    requiresPurchase,
    signedIn,
    ownsProduct,
    project.slug,
    pathname,
    router,
  ])

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        onClick={() => void handleDownload()}
        disabled={loading}
        aria-busy={loading}
        className="h-[46px] w-full cursor-pointer shadow-none disabled:cursor-not-allowed"
      >
        {loading ? (
          <Spinner className="size-4" />
        ) : canDownload ? (
          <DownloadIcon className="size-4" aria-hidden />
        ) : needsPurchase ? (
          <ShoppingBagIcon className="size-4" aria-hidden />
        ) : access === "pro" && !requiresPurchase ? (
          <ProIcon className="size-4 text-primary-foreground" aria-hidden />
        ) : (
          <FreeIcon className="size-4 text-primary-foreground" aria-hidden />
        )}
        {loading
          ? needsPurchase
            ? "Starting checkout…"
            : "Downloading…"
          : label}
      </Button>
      {statusNote ? (
        <p className="text-center text-sm text-[var(--sm-text-secondary)]">
          {statusNote}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-center text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultMode={authMode}
      />
    </div>
  )
}
