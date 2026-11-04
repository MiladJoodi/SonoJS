import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"
import img04 from "./images/04.jpg"
import img05 from "./images/05.jpg"

export type CoolSlideGallerySlide = {
  src: string
  alt?: string
  title?: string
  subtitle?: string
  badge?: string
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo slides - bundled via static imports next to this file (install + site). */
export const DEFAULT_COOL_SLIDE_GALLERY_SLIDES: CoolSlideGallerySlide[] = [
  {
    src: assetSrc(img01),
    alt: "Mountain peaks at golden hour",
    title: "Alpine Summit",
    subtitle: "High peaks, 2024",
    badge: "Featured",
  },
  {
    src: assetSrc(img02),
    alt: "Misty forest trail",
    title: "Forest Trail",
    subtitle: "Pacific Northwest",
    badge: "Nature",
  },
  {
    src: assetSrc(img03),
    alt: "Starry night over mountains",
    title: "Midnight Sky",
    subtitle: "Southern ranges",
    badge: "Astro",
  },
  {
    src: assetSrc(img04),
    alt: "Desert dunes at sunset",
    title: "Sand Waves",
    subtitle: "Open desert",
    badge: "Desert",
  },
  {
    src: assetSrc(img05),
    alt: "Tropical ocean shore",
    title: "Ocean Horizon",
    subtitle: "Island coast",
    badge: "Ocean",
  },
]
