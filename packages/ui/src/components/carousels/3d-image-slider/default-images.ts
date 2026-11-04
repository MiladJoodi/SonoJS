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

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo images - bundled via static imports next to this file (install + site). */
export const DEFAULT_3D_IMAGE_SLIDER_IMAGES: string[] = [
  assetSrc(img01),
  assetSrc(img02),
  assetSrc(img03),
  assetSrc(img04),
  assetSrc(img05),
  assetSrc(img06),
  assetSrc(img07),
  assetSrc(img08),
  assetSrc(img09),
  assetSrc(img10),
]
