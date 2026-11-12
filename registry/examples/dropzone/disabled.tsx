import { Dropzone } from "@sonojs/ui/components/dropzone"

export function DropzoneDisabled() {
  return (
    <Dropzone
      className="w-full max-w-md"
      disabled
      label="Uploads are disabled"
      description="This dropzone is locked"
    />
  )
}
