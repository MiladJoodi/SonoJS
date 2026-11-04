"use client"

import * as React from "react"
import { CameraIcon, CheckIcon, Loader2Icon } from "lucide-react"

import { downloadTransparentPreviewPng } from "@/components/docs/dev-preview-capture"
import { cn } from "@/lib/utils"

/**
 * Dev-only: icon control left of LTR/RTL — downloads a transparent PNG.
 */
export function DevPreviewCaptureButton({
  targetRef,
  fileBase,
}: {
  targetRef: React.RefObject<HTMLElement | null>
  fileBase: string
}) {
  const [busy, setBusy] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const onClick = React.useCallback(async () => {
    const el = targetRef.current
    if (!el || busy) return
    setBusy(true)
    setDone(false)
    try {
      const safe =
        (fileBase || "preview")
          .replace(/[^\w.-]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 80) || "preview"
      await downloadTransparentPreviewPng(el, `${safe}.png`)
      setDone(true)
      window.setTimeout(() => setDone(false), 1600)
    } catch (err) {
      console.error("[dev capture]", err)
    } finally {
      setBusy(false)
    }
  }, [busy, fileBase, targetRef])

  return (
    <button
      type="button"
      aria-label={
        busy
          ? "Capturing preview"
          : done
            ? "Saved PNG"
            : "Download transparent PNG of preview"
      }
      disabled={busy}
      onClick={() => {
        void onClick()
      }}
      className={cn(
        "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-card text-muted-foreground transition-colors",
        "hover:bg-muted/60 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset",
        "disabled:pointer-events-none disabled:opacity-60"
      )}
    >
      {busy ? (
        <Loader2Icon className="size-3.5 animate-spin" aria-hidden />
      ) : done ? (
        <CheckIcon className="size-3.5 text-emerald-600" aria-hidden />
      ) : (
        <CameraIcon className="size-3.5" aria-hidden />
      )}
    </button>
  )
}
