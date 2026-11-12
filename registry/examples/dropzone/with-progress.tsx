"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Dropzone,
  type DropzoneFile,
} from "@sonojs/ui/components/dropzone"

export function DropzoneWithProgress() {
  const [files, setFiles] = React.useState<DropzoneFile[]>([])
  const [busy, setBusy] = React.useState(false)
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current)
    }
  }, [])

  function startUpload() {
    const pending = files.filter((f) => f.status !== "done")
    if (pending.length === 0 || busy) return
    setBusy(true)
    setFiles((prev) =>
      prev.map((f) =>
        f.status === "done"
          ? f
          : { ...f, status: "uploading", progress: 0 }
      )
    )

    if (timerRef.current != null) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setFiles((prev) => {
        let active = false
        const next = prev.map((f) => {
          if (f.status !== "uploading") return f
          const progress = Math.min(100, (f.progress ?? 0) + 14 + Math.random() * 18)
          if (progress >= 100) {
            return { ...f, progress: 100, status: "done" as const }
          }
          active = true
          return { ...f, progress: Math.round(progress) }
        })
        if (!active) {
          if (timerRef.current != null) window.clearInterval(timerRef.current)
          timerRef.current = null
          setBusy(false)
        }
        return next
      })
    }, 220)
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <Dropzone
        accept="image/*,application/pdf"
        maxSize={5 * 1024 * 1024}
        maxFiles={4}
        multiple
        value={files}
        onValueChange={setFiles}
        label="Queue files, then upload"
        description="Progress starts when you hit Upload"
      />
      <Button
        type="button"
        className="w-full"
        disabled={busy || files.length === 0}
        onClick={startUpload}
      >
        {busy ? "Uploading…" : "Upload"}
      </Button>
    </div>
  )
}
