"use client"

import * as React from "react"
import { Button } from "@sonojs/ui/components/button"
import {
  ImageCropper,
  getCroppedImgUrl,
  type Area,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperFile() {
  const [src, setSrc] = React.useState<string | null>(null)
  const [pixels, setPixels] = React.useState<Area | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    return () => {
      if (src?.startsWith("blob:")) URL.revokeObjectURL(src)
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [src, preview])

  function onPick(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return
    if (src?.startsWith("blob:")) URL.revokeObjectURL(src)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setPixels(null)
    setSrc(URL.createObjectURL(file))
  }

  async function applyCrop() {
    if (!src || !pixels) return
    const url = await getCroppedImgUrl(src, pixels)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(url)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => onPick(e.target.files?.[0])}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => inputRef.current?.click()}
      >
        Choose image
      </Button>
      {src ? (
        <>
          <ImageCropper
            src={src}
            aspect={1}
            onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
          />
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              disabled={!pixels}
              onClick={() => void applyCrop()}
            >
              Apply crop
            </Button>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Cropped preview"
                className="size-12 rounded-[12px] border border-border/70 object-cover"
              />
            ) : null}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Pick a local image to crop in the browser.
        </p>
      )}
    </div>
  )
}
