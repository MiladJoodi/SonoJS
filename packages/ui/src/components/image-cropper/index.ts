import demo from "./demo.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo photo shipped beside the component (`./demo.jpg`). */
export const DEMO_IMAGE = assetSrc(demo)

export {
  ImageCropper,
  type ImageCropperProps,
  type Area,
  type Point,
} from "./image-cropper"
export {
  getCroppedImg,
  getCroppedImgUrl,
  type CropImageOptions,
} from "./lib"
