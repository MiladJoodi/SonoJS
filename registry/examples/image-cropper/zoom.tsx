"use client"

import * as React from "react"

import {
  DEMO_IMAGE,
  ImageCropper,
  type Area,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperZoom() {
  const [zoom, setZoom] = React.useState(1.4)
  const [, setPixels] = React.useState<Area | null>(null)

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <ImageCropper
        src={DEMO_IMAGE}
        aspect={1}
        zoom={zoom}
        onZoomChange={setZoom}
        minZoom={1}
        maxZoom={4}
        onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Controlled zoom: {zoom.toFixed(2)}×
      </p>
    </div>
  )
}
