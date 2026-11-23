"use client"

import * as React from "react"
import { CheckIcon, DownloadIcon } from "lucide-react"

import { AccessLocked } from "@/components/access/access-locked"
import type { BlockInstallUsage } from "@/components/blocks/block-install-drawer"
import { CodePanel } from "@/components/docs/code-panel"
import { InstallNeedsHint } from "@/components/docs/install-needs-hint"
import { LoadingRing } from "@/components/sono-loader"
import { useContentAccess } from "@/hooks/use-content-access"
import { highlightBlockInstall } from "@/lib/highlight-install-action"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"

type HighlightedPopup = {
  usage: { title: string; code: string; html: string }[]
}

const highlightCache = new Map<string, HighlightedPopup>()
const highlightInflight = new Map<string, Promise<HighlightedPopup>>()

/** Slugs that do not need npm packages beyond the zip. */
const POPUP_NO_NPM = new Set(["fork-ribbon"])

function highlightKey(name: string, usage: BlockInstallUsage[]) {
  return `${name}\0${usage.map((item) => `${item.title}\0${item.code}`).join("\0")}`
}

/** `blackout-01` → `blackout` (Pro zip slug). */
export function popupDownloadSlug(exampleName: string) {
  return exampleName.replace(/-\d+$/, "")
}

/** Also-needs npm for a popup archive (not from public `/r`). */
function popupAlsoNeedsNpm(slug: string) {
  if (POPUP_NO_NPM.has(slug)) return []
  return ["lucide-react", "motion"]
}

async function loadHighlighted(
  name: string,
  usage: BlockInstallUsage[]
): Promise<HighlightedPopup> {
  const key = highlightKey(name, usage)
  const cached = highlightCache.get(key)
  if (cached) return cached

  const pending = highlightInflight.get(key)
  if (pending) return pending

  const task = highlightBlockInstall({
    name,
    files: [],
    usage,
  })
    .then((next) => {
      const value: HighlightedPopup = { usage: next.usage }
      highlightCache.set(key, value)
      return value
    })
    .finally(() => {
      highlightInflight.delete(key)
    })

  highlightInflight.set(key, task)
  return task
}

/** Warm usage highlight so the Code tab does not flash empty. */
export function prefetchPopupCode(
  name: string,
  usage: BlockInstallUsage[] = []
) {
  void loadHighlighted(name, usage).catch(() => {})
}

/**
 * Same chrome as backgrounds `BackgroundHtmlDownload` - Pro zip via archive API.
 */
function PopupZipDownloadButton({
  slug,
  filename,
  className,
}: {
  slug: string
  filename: string
  className?: string
}) {
  const href = `/api/pro/components/${encodeURIComponent(slug)}/archive`
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!done) return
    const id = window.setTimeout(() => setDone(false), 2000)
    return () => window.clearTimeout(id)
  }, [done])

  async function handleDownload() {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(href, { credentials: "same-origin" })
      if (!res.ok) {
        throw new Error(
          res.status === 401 || res.status === 403
            ? "Pro access required to download."
            : `Download failed (${res.status}).`
        )
      }
      const blob = await res.blob()
      const disposition = res.headers.get("Content-Disposition")
      const match = disposition?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i)
      const downloadName = match
        ? decodeURIComponent(match[1].replace(/"/g, ""))
        : filename

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = downloadName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed.")
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
        className={cn(
          "h-[46px] w-full cursor-pointer gap-2 sm:w-auto",
          className
        )}
      >
        {loading ? (
          <Spinner className="size-4" />
        ) : done ? (
          <CheckIcon className="size-4" aria-hidden />
        ) : (
          <DownloadIcon className="size-4" aria-hidden />
        )}
        {loading ? "Downloading…" : done ? "Downloaded" : "Download zip"}
      </Button>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Popup Code tab: Usage + Pro zip button + Also needs.
 * No CLI `add` / Manual - archives replace public registry install.
 */
export function PopupCodeBody({
  name,
  usage,
}: {
  name: string
  usage: BlockInstallUsage[]
}) {
  const key = highlightKey(name, usage)
  const slug = popupDownloadSlug(name)
  const filename = `${slug}.zip`
  const gate = useContentAccess("pro")
  const npm = popupAlsoNeedsNpm(slug)
  const hasNeeds = npm.length > 0

  const [highlighted, setHighlighted] = React.useState<HighlightedPopup | null>(
    () => highlightCache.get(key) ?? null
  )
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    setError(null)

    const cachedHighlight = highlightCache.get(key)
    if (cachedHighlight) setHighlighted(cachedHighlight)
    else setHighlighted(null)

    void loadHighlighted(name, usage)
      .then((nextHighlight) => {
        if (cancelled) return
        setHighlighted(nextHighlight)
      })
      .catch(() => {
        if (!cancelled) {
          setError("Install details are not available for this popup.")
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- usage via key
  }, [key, name])

  if (!gate.ready) {
    return (
      <div
        className="flex min-h-[28rem] w-full items-center justify-center"
        role="status"
        aria-label="Loading install details"
      >
        <LoadingRing size={40} showLabel label="Loading…" />
      </div>
    )
  }

  if (!gate.allowed) {
    return (
      <AccessLocked
        access={gate.access}
        className="rounded-none border-0"
      />
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[28rem] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!highlighted) {
    return (
      <div
        className="flex min-h-[28rem] w-full items-center justify-center"
        role="status"
        aria-label="Loading install details"
      >
        <LoadingRing size={40} showLabel label="Loading…" />
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 max-w-full space-y-6 p-4">
      {highlighted.usage.length > 0 ? (
        <section className="min-w-0 space-y-3">
          <h3 className="text-sm font-medium text-foreground">Usage</h3>
          {highlighted.usage.map((item) => (
            <CodePanel
              key={item.title}
              title={item.title}
              code={item.code}
              html={item.html}
              className="min-w-0 max-w-full rounded-(--radius-code) border border-(--code-border)"
              copyTooltip={false}
            />
          ))}
        </section>
      ) : null}

      <section className="min-w-0 space-y-3">
        <h3 className="text-sm font-medium text-foreground">Download</h3>
        <PopupZipDownloadButton slug={slug} filename={filename} />
        {hasNeeds ? (
          <div className="overflow-hidden rounded-xl border border-border/80">
            <InstallNeedsHint
              registry={[]}
              npm={npm}
              copyTooltip={false}
              className="border-t-0"
            />
          </div>
        ) : null}
      </section>
    </div>
  )
}
