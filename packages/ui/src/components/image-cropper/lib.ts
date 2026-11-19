import type { Area } from "react-easy-crop"

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.crossOrigin = "anonymous"
    image.src = url
  })
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export type CropImageOptions = {
  rotation?: number
  flip?: { horizontal?: boolean; vertical?: boolean }
  mimeType?: string
  quality?: number
}

/**
 * Crop `src` using pixel area from `react-easy-crop` and return a Blob.
 */
export async function getCroppedImg(
  src: string,
  pixelCrop: Area,
  options: CropImageOptions = {}
): Promise<Blob | null> {
  const image = await createImage(src)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const rotation = options.rotation ?? 0
  const flip = {
    horizontal: options.flip?.horizontal ?? false,
    vertical: options.flip?.vertical ?? false,
  }
  const rotRad = getRadianAngle(rotation)
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement("canvas")
  const croppedCtx = croppedCanvas.getContext("2d")
  if (!croppedCtx) return null

  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  const mimeType = options.mimeType ?? "image/png"
  const quality = options.quality

  return new Promise((resolve) => {
    croppedCanvas.toBlob((blob) => resolve(blob), mimeType, quality)
  })
}

/** Convenience: object URL for preview. Caller should revoke when done. */
export async function getCroppedImgUrl(
  src: string,
  pixelCrop: Area,
  options?: CropImageOptions
): Promise<string | null> {
  const blob = await getCroppedImg(src, pixelCrop, options)
  if (!blob) return null
  return URL.createObjectURL(blob)
}

export type { Area }
