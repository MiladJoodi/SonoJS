import adamMp3 from "./media/adam.mp3"
import aliceMp3 from "./media/alice.mp3"
import billMp3 from "./media/bill.mp3"
import jessicaMp3 from "./media/jessica.mp3"
import liamMp3 from "./media/liam.mp3"
import lilyMp3 from "./media/lily.mp3"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo previews shipped beside the component (`./media/*.mp3`). */
export const voiceSelectorDemoPreviews = {
  adam: assetSrc(adamMp3),
  alice: assetSrc(aliceMp3),
  bill: assetSrc(billMp3),
  jessica: assetSrc(jessicaMp3),
  liam: assetSrc(liamMp3),
  lily: assetSrc(lilyMp3),
} as const
