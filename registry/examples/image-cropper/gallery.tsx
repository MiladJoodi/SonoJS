"use client"

import * as React from "react"
import { CropIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DEMO_IMAGE,
  ImageCropper,
  getCroppedImgUrl,
  type Area,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperGallery() {
  const [pixels, setPixels] = React.useState<Area | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  async function applyCrop() {
    if (!pixels) return
    setBusy(true)
    try {
      const url = await getCroppedImgUrl(DEMO_IMAGE, pixels)
      if (preview) URL.revokeObjectURL(preview)
      setPreview(url)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CropIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Avatar crop
          </h3>
          <p className="text-xs text-muted-foreground">
            Drag to pan, scroll or slider to zoom, then apply.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          1:1
        </Badge>
      </div>
      <ImageCropper
        src={DEMO_IMAGE}
        aspect={1}
        onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
      />
      <div className="mt-4 flex items-center gap-3">
        <Button
          type="button"
          size="sm"
          disabled={!pixels || busy}
          onClick={() => void applyCrop()}
        >
          {busy ? "Cropping…" : "Apply crop"}
        </Button>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Cropped preview"
            className="size-12 rounded-full border border-border/70 object-cover"
          />
        ) : null}
      </div>
    </div>
  )
}
