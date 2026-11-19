"use client"

import * as React from "react"

import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadDisabled() {
  const ref = React.useRef<SignaturePadHandle>(null)

  React.useEffect(() => {
    // Seed a readonly signature for the demo after the pad mounts.
    const id = window.setTimeout(() => {
      const canvas = document.createElement("canvas")
      canvas.width = 320
      canvas.height = 120
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.strokeStyle = "#0a0a0a"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(40, 70)
      ctx.bezierCurveTo(80, 20, 140, 110, 200, 50)
      ctx.bezierCurveTo(230, 30, 260, 80, 280, 55)
      ctx.stroke()
      void ref.current?.fromDataURL(canvas.toDataURL("image/png"))
    }, 50)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <SignaturePad ref={ref} guide="Locked signature" disabled />
      <p className="mt-3 text-xs text-muted-foreground">
        <code className="rounded border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.85em]">
          disabled
        </code>{" "}
        for stored signatures.
      </p>
    </div>
  )
}
