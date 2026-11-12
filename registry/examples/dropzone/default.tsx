import { Dropzone } from "@sonojs/ui/components/dropzone"

export function DropzoneDefault() {
  return (
    <Dropzone
      className="w-full max-w-md"
      accept="image/png,image/jpeg,image/webp,application/pdf"
      maxSize={5 * 1024 * 1024}
      maxFiles={5}
      multiple
    />
  )
}
