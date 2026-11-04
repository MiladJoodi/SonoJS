import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"
import img04 from "./images/04.jpg"
import img05 from "./images/05.jpg"
import img06 from "./images/06.jpg"
import img07 from "./images/07.jpg"
import img08 from "./images/08.jpg"
import img09 from "./images/09.jpg"
import img10 from "./images/10.jpg"

export type StylishCarouselItem = {
  src: string
  title?: string
  alt?: string
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo items - bundled via static imports next to this file (install + site). */
export const DEFAULT_STYLISH_CAROUSEL_ITEMS: StylishCarouselItem[] = [
  { src: assetSrc(img01), title: "Cable Car Station" },
  { src: assetSrc(img02), title: "Light House" },
  { src: assetSrc(img03), title: "Cherry Blossoms" },
  { src: assetSrc(img04), title: "Bottled Drinks" },
  { src: assetSrc(img05), title: "Tree-Lined Road" },
  { src: assetSrc(img06), title: "Train Window" },
  { src: assetSrc(img07), title: "Sunlight Streams" },
  { src: assetSrc(img08), title: "Seagulls" },
  { src: assetSrc(img09), title: "Pink Flowers" },
  { src: assetSrc(img10), title: "Paddleboarding" },
]
