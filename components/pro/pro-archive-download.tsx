"use client"

import * as React from "react"
import { ArrowDownToLineIcon } from "lucide-react"

import { ProIcon } from "@/components/icons/pro-icon"
import { cn } from "@/lib/utils"
import { Spinner } from "@sonojs/ui/components/spinner"

export type ProArchiveDownloadProps = {
  slug: string
  filename: string
  title?: string
  className?: string
}

/**
 * Pro archive drop — code-block chrome (same family as locked glass),
 * presented as a sealed package the member can take.
 */
export function ProArchiveDownload({
  slug,
  filename,
  title,
  className,
}: ProArchiveDownloadProps) {
  const href = `/api/pro/components/${encodeURIComponent(slug)}/archive`
  const label = title ?? filename.replace(/\.zip$/i, "")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("sono-code-block overflow-hidden", className)}>
      <div className="flex min-w-0 items-center border-b border-[color:var(--code-border)] px-4 py-2">
        <div className="min-w-0 truncate font-mono text-[14px] text-[color:var(--code-header-fg)]">
          {filename}
        </div>
      </div>

      <div className="relative px-4 py-8 sm:px-6 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute start-1/2 top-[2.75rem] h-[4.5rem] w-[min(14rem,70%)] -translate-x-1/2 rtl:translate-x-1/2"
        >
          <div className="absolute inset-x-3 top-0 h-full rounded-[10px] border border-[color:var(--code-border)] bg-[color:var(--code-header-bg)] opacity-40" />
          <div className="absolute inset-x-1.5 top-1.5 h-full rounded-[10px] border border-[color:var(--code-border)] bg-[color:var(--code-header-bg)] opacity-70" />
        </div>

        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center text-center">
          <div className="flex w-full flex-col items-center rounded-[12px] border border-[color:var(--code-border)] bg-[color:var(--code-header-bg)] px-5 py-5">
            <ProIcon className="size-5 text-primary" aria-hidden />
            <p className="mt-2 text-lg font-semibold tracking-tight text-[color:var(--code-fg)]">
              {label}
            </p>

            <div aria-hidden className="my-5 flex w-full items-center gap-2">
              <span className="h-px flex-1 border-t border-dashed border-[color:var(--code-border)]" />
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={loading}
              aria-busy={loading}
              className={cn(
                "inline-flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-[12px]",
                "bg-primary text-sm font-medium text-primary-foreground",
                "transition-colors hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--code-bg)]",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80"
              )}
            >
              {loading ? (
                <Spinner className="size-4 text-primary-foreground" />
              ) : (
                <ArrowDownToLineIcon className="size-4" aria-hidden />
              )}
              {loading ? "Downloading…" : "Download zip"}
            </button>

            {error ? (
              <p
                role="alert"
                className="mt-3 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
