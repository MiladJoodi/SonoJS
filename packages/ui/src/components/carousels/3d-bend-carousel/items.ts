import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"
import img04 from "./images/04.jpg"
import img05 from "./images/05.jpg"
import img06 from "./images/06.jpg"

export type BendCarouselItem = {
  id?: string | number
  image: string
  title?: string
  subtitle?: string
  badge?: string
  tag?: string
  description?: string
  link?: string
  onClick?: () => void
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo items - bundled via static imports next to this file (install + site). */
export const DEFAULT_3D_BEND_CAROUSEL_ITEMS: BendCarouselItem[] = [
  {
    id: 1,
    image: assetSrc(img01),
    title: "Cosmic Solitude",
    subtitle: "Abstract Surrealism",
    tag: "Exhibition",
    badge: "01",
    description: "Deep celestial hues bending across spatial dimensions.",
  },
  {
    id: 2,
    image: assetSrc(img02),
    title: "Monochrome Architecture",
    subtitle: "Brutalist Forms",
    tag: "Design",
    badge: "02",
    description: "Sleek geometric curves and high-contrast light gradients.",
  },
  {
    id: 3,
    image: assetSrc(img03),
    title: "Fluid Dynamics",
    subtitle: "Generative Art",
    tag: "3D Motion",
    badge: "03",
    description: "Iridescent liquid waveforms suspended in kinetic stasis.",
  },
  {
    id: 4,
    image: assetSrc(img04),
    title: "Neon Horizon",
    subtitle: "Cybernetic Chroma",
    tag: "Visuals",
    badge: "04",
    description: "Luminescent ultraviolet streams cascading through mist.",
  },
  {
    id: 5,
    image: assetSrc(img05),
    title: "Quantum Circuitry",
    subtitle: "Silicon Symphony",
    tag: "Hardware",
    badge: "05",
    description: "Microscopic pathways powering modern artificial intelligence.",
  },
  {
    id: 6,
    image: assetSrc(img06),
    title: "Prismatic Dispersion",
    subtitle: "Refractive Glass",
    tag: "Optical",
    badge: "06",
    description: "Polished crystal facets bending incoming white light beams.",
  },
]
