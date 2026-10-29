import {
  ImageGeneration,
  imageGenerationDemoSrc,
} from "@sonojs/ui/components/image-generation"

export function ImageGenerationComplete() {
  return (
    <div className="flex justify-center py-6">
      <ImageGeneration
        status="complete"
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
