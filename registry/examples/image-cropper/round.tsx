"use client"

import * as React from "react"

import {
  DEMO_IMAGE,
  ImageCropper,
  type Area,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperRound() {
  const [, setPixels] = React.useState<Area | null>(null)

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <ImageCropper
        src={DEMO_IMAGE}
        aspect={1}
        cropShape="round"
        onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
      />
      <p className="mt-3 text-xs text-muted-foreground">
        <code className="rounded border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.85em]">
          cropShape=&quot;round&quot;
        </code>
      </p>
    </div>
  )
}
