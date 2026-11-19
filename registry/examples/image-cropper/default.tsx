"use client"

import * as React from "react"

import {
  DEMO_IMAGE,
  ImageCropper,
  type Area,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperDefault() {
  const [, setPixels] = React.useState<Area | null>(null)

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <ImageCropper
        src={DEMO_IMAGE}
        aspect={1}
        onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
      />
    </div>
  )
}
