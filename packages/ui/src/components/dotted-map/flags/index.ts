import kr from "./kr.webp"
import us from "./us.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Resolved URLs for the demo flag assets shipped with `dotted-map`. */
export const flagKr = assetSrc(kr)
export const flagUs = assetSrc(us)
