import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"
import img04 from "./images/04.jpg"
import img05 from "./images/05.jpg"

export type ThreeDSliderItem = {
  title: string
  num: string
  imageUrl: string
  data?: unknown
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo items - bundled via static imports next to this file (install + site). */
export const DEFAULT_3D_SLIDER_ITEMS: ThreeDSliderItem[] = [
  {
    title: "First Item",
    num: "01",
    imageUrl: assetSrc(img01),
    data: { id: 1 },
  },
  {
    title: "Second Item",
    num: "02",
    imageUrl: assetSrc(img02),
    data: { id: 2 },
  },
  {
    title: "Third Item",
    num: "03",
    imageUrl: assetSrc(img03),
    data: { id: 3 },
  },
  {
    title: "Fourth Item",
    num: "04",
    imageUrl: assetSrc(img04),
    data: { id: 4 },
  },
  {
    title: "Fifth Item",
    num: "05",
    imageUrl: assetSrc(img05),
    data: { id: 5 },
  },
]
