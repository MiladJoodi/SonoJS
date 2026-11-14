"use client"

import { GlobeIcon } from "lucide-react"

import { TemplateHero } from "@/components/templates/hero"

/**
 * Websites catalog hero - same chrome as Templates, distinct copy.
 * Optional art: `public/websites/hero/hero-bg-dark.png` + `hero-bg-light.png`.
 * Falls back to Templates hero stills until those files exist.
 */
export function WebsitesHero({ className }: { className?: string }) {
  return (
    <TemplateHero
      className={className}
      eyebrow="Websites"
      Icon={GlobeIcon}
      title={
        <>
          Full multi-page sites,{" "}
          <span className="text-primary">ready to launch</span>
        </>
      }
      description="Premium HTML and React website packs - café, salon, gym, boutique, and more. Preview live, then download the source."
      darkImageSrc="/templates/hero/hero-bg-v2.png"
      lightImageSrc="/templates/hero/hero-bg-light.png"
    />
  )
}
