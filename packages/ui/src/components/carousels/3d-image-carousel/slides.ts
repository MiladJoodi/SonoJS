import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"
import img04 from "./images/04.jpg"
import img05 from "./images/05.jpg"

export type ThreeDImageCarouselSlide = {
  id: number
  src: string
  href: string
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo slides - bundled via static imports next to this file (install + site). */
export const DEFAULT_3D_IMAGE_CAROUSEL_SLIDES: ThreeDImageCarouselSlide[] = [
  { id: 1, src: assetSrc(img01), href: "#" },
  { id: 2, src: assetSrc(img02), href: "#" },
  { id: 3, src: assetSrc(img03), href: "#" },
  { id: 4, src: assetSrc(img04), href: "#" },
  { id: 5, src: assetSrc(img05), href: "#" },
]
