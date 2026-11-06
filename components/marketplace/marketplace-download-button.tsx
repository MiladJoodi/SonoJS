"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { DownloadIcon } from "lucide-react"

import {
  AuthDialog,
  type AuthDialogMode,
} from "@/components/auth"
import { FreeIcon } from "@/components/icons/plan/free"
import { ProIcon } from "@/components/icons/plan/pro"
import type { MarketplaceProject } from "@/lib/marketplace-catalog"
import { getUserPlan, normalizeContentAccess } from "@/lib/access"
import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"

/**
 * Blue download CTA. Locked icon matches kit access level:
 * - `member` / free → FreeIcon + auth popup
 * - `pro` → ProIcon + /pricing
 */
export function MarketplaceDownloadButton({
  project,
}: {
  project: MarketplaceProject
}) {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const href = `/api/marketplace/${encodeURIComponent(project.slug)}/download`
  const access = normalizeContentAccess(project.access ?? "member")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [authOpen, setAuthOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<AuthDialogMode>("sign-in")

  const signedIn = Boolean(isLoaded && user)
  const isPro = signedIn && getUserPlan(user?.publicMetadata) === "pro"
  const canDownload =
    access === "public" ||
    (access === "member" && signedIn) ||
    (access === "pro" && isPro)

  const label = (() => {
    if (canDownload) {
      if (access === "pro") return "Download"
      if (project.priceCents === 0) return "Download free"
      return `Buy ${project.priceLabel}`
    }
    if (access === "pro") return "Upgrade to Pro"
    return "Sign in"
  })()

  /** Zip comes from Pro registry via slug (or optional external downloadUrl). */
  const hasArchive = Boolean(project.downloadUrl) || project.enabled

  function handleDenied() {
    if (access === "pro") {
      router.push("/pricing")
      return
    }
    // public never denies; member / free → membership popup
    setAuthMode("sign-in")
    setAuthOpen(true)
    setError(null)
  }

  async function handleDownload() {
    if (loading) return
    setLoading(true)
    setError(null)

    // Open blank tab during the click gesture so popup blockers allow
    // external hosts (Google Drive share page) after the auth check.
    const externalTab = project.downloadUrl
      ? window.open("about:blank", "_blank")
      : null

    try {
      const res = await fetch(href, { credentials: "same-origin" })

      if (res.status === 401 || res.status === 403) {
        externalTab?.close()
        handleDenied()
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

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        onClick={handleDownload}
        disabled={loading}
        aria-busy={loading}
        className="h-[46px] w-full cursor-pointer shadow-none disabled:cursor-not-allowed"
      >
        {loading ? (
          <Spinner className="size-4" />
        ) : canDownload ? (
          <DownloadIcon className="size-4" aria-hidden />
        ) : access === "pro" ? (
          <ProIcon className="size-4 text-primary-foreground" aria-hidden />
        ) : (
          <FreeIcon className="size-4 text-primary-foreground" aria-hidden />
        )}
        {loading ? "Downloading…" : label}
      </Button>
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
