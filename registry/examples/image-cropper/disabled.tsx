import {
  DEMO_IMAGE,
  ImageCropper,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperDisabled() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <ImageCropper src={DEMO_IMAGE} aspect={1} disabled />
    </div>
  )
}
