"use client"

import * as React from "react"
import { PenLineIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadGallery() {
  const ref = React.useRef<SignaturePadHandle>(null)
  const [empty, setEmpty] = React.useState(true)
  const [preview, setPreview] = React.useState<string | null>(null)

  function capture() {
    const pad = ref.current
    if (!pad || pad.isEmpty()) return
    setPreview(pad.toDataURL("image/png"))
  }

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PenLineIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Sign & export
          </h3>
          <p className="text-xs text-muted-foreground">
            Mouse or finger. Undo, clear, then export PNG.
          </p>
        </div>
        <Badge
          variant={empty ? "secondary" : "default"}
          className="ms-auto shrink-0 font-normal"
        >
          {empty ? "Empty" : "Signed"}
        </Badge>
      </div>
      <SignaturePad
        ref={ref}
        guide="Sign here"
        onEmptyChange={setEmpty}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={empty}
          onClick={() => ref.current?.undo()}
        >
          Undo
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={empty}
          onClick={() => {
            ref.current?.clear()
            setPreview(null)
          }}
        >
          Clear
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={empty}
          onClick={capture}
        >
          Preview PNG
        </Button>
      </div>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Signature preview"
          className="mt-4 h-16 w-full rounded-md border border-border/70 bg-background object-contain"
        />
      ) : null}
    </div>
  )
}
