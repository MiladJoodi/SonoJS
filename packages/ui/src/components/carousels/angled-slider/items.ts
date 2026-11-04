import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"
import img04 from "./images/04.jpg"
import img05 from "./images/05.jpg"
import img06 from "./images/06.jpg"

export type AngledSliderItem = {
  id: string | number
  url: string
  alt?: string
  title?: string
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo items - bundled via static imports next to this file (install + site). */
export const DEFAULT_ANGLED_SLIDER_ITEMS: AngledSliderItem[] = [
  {
    id: 1,
    url: assetSrc(img01),
    title: "Mountain View",
    alt: "Mountain View",
  },
  {
    id: 2,
    url: assetSrc(img02),
    title: "Ocean Breeze",
    alt: "Ocean Breeze",
  },
  {
    id: 3,
    url: assetSrc(img03),
    title: "Forest Mist",
    alt: "Forest Mist",
  },
  {
    id: 4,
    url: assetSrc(img04),
    title: "Canyon Echo",
    alt: "Canyon Echo",
  },
  {
    id: 5,
    url: assetSrc(img05),
    title: "Prairie Light",
    alt: "Prairie Light",
  },
  {
    id: 6,
    url: assetSrc(img06),
    title: "Night Ridge",
    alt: "Night Ridge",
  },
]
