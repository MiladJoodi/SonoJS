"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadExport() {
  const ref = React.useRef<SignaturePadHandle>(null)
  const [empty, setEmpty] = React.useState(true)
  const [meta, setMeta] = React.useState<string | null>(null)

  async function downloadPng() {
    const pad = ref.current
    if (!pad || pad.isEmpty()) return
    const blob = await pad.toBlob("image/png")
    if (!blob) return
    setMeta(`${Math.round(blob.size / 1024)} KB PNG`)
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "signature.png"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <SignaturePad ref={ref} guide="Sign here" onEmptyChange={setEmpty} />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          disabled={empty}
          onClick={() => void downloadPng()}
        >
          Download PNG
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={empty}
          onClick={() => {
            const dataUrl = ref.current?.toDataURL("image/png") ?? ""
            void navigator.clipboard?.writeText(dataUrl)
            setMeta("Copied data URL")
          }}
        >
          Copy data URL
        </Button>
        {meta ? (
          <span className="text-xs text-muted-foreground">{meta}</span>
        ) : null}
      </div>
    </div>
  )
}
