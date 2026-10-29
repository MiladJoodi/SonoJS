"use client"

import * as React from "react"

import {
  ImageGeneration,
  imageGenerationDemoSrc,
} from "@sonojs/ui/components/image-generation"

export function ImageGenerationError() {
  const [status, setStatus] = React.useState<"error" | "generating">("error")

  return (
    <div className="flex justify-center py-6">
      <ImageGeneration
        status={status}
        size="compact"
        prompt="Portrait study, ink stipple"
        resolution="1024 × 1024"
        onRetry={() => {
          setStatus("generating")
          window.setTimeout(() => setStatus("error"), 1600)
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageGenerationDemoSrc}
          alt=""
          width={208}
          height={208}
        />
      </ImageGeneration>
    </div>
  )
}
