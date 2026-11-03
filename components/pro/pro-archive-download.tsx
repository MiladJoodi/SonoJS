"use client"

import * as React from "react"
import { ArrowDownToLineIcon, CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ProArchiveDownloadProps = {
  slug: string
  filename: string
  /** Unused visually — kept for call-site compatibility. */
  title?: string
  className?: string
}

/**
 * Pro zip download — same chrome as CodePanel / AccessLocked (header + quiet body).
 */
export function ProArchiveDownload({
  slug,
  filename,
  className,
}: ProArchiveDownloadProps) {
  const href = `/api/pro/components/${encodeURIComponent(slug)}/archive`
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!done) return
    const id = window.setTimeout(() => setDone(false), 1500)
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

  const tip = loading ? "Downloading…" : done ? "Downloaded" : "Download zip"

  return (
    <div className={cn("sono-code-block overflow-hidden", className)}>
      <div className="flex min-w-0 items-center gap-1 border-b border-[color:var(--code-border)] px-4 py-2">
        <div className="min-w-0 flex-1 truncate font-mono text-[14px] font-normal text-[color:var(--code-header-fg)]">
          {filename}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={handleDownload}
              disabled={loading}
              aria-label={tip}
              aria-busy={loading}
              className="shrink-0 cursor-pointer text-[color:var(--code-header-fg)] hover:bg-white/10 hover:text-[color:var(--code-fg)] disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <Spinner className="size-3.5" />
              ) : done ? (
                <CheckIcon className="size-3.5" aria-hidden />
              ) : (
                <ArrowDownToLineIcon className="size-3.5" aria-hidden />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{tip}</TooltipContent>
        </Tooltip>
      </div>

      <div className="px-4 py-3 font-mono text-[14px] leading-[1.65] text-[color:var(--code-header-fg)]">
        {error ? (
          <p role="alert" className="text-destructive">
            {error}
          </p>
        ) : (
          <p>Pro zip — extract into your project.</p>
        )}
      </div>
    </div>
  )
}
