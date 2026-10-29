"use client"

import * as React from "react"

import {
  ImageGeneration,
  imageGenerationDemoSrc,
  type ImageGenerationStatus,
} from "@sonojs/ui/components/image-generation"

const SEQUENCE: ImageGenerationStatus[] = [
  "generating",
  "refining",
  "complete",
]

export function ImageGenerationGenerating() {
  const [status, setStatus] =
    React.useState<ImageGenerationStatus>("generating")

  React.useEffect(() => {
    let index = 0
    let timeout = 0

    const advance = () => {
      index += 1
      if (index >= SEQUENCE.length) return
      setStatus(SEQUENCE[index]!)
      if (SEQUENCE[index] === "complete") return
      timeout = window.setTimeout(advance, 1600)
    }

    timeout = window.setTimeout(advance, 1800)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div className="flex justify-center py-6">
      <ImageGeneration
        status={status}
        size="compact"
        prompt="Portrait study, ink stipple"
        resolution="1024 × 1024"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageGenerationDemoSrc}
          alt="Generated portrait"
          width={208}
          height={208}
        />
      </ImageGeneration>
    </div>
  )
}
