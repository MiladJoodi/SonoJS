import { Dropzone } from "@sonojs/ui/components/dropzone"

export function DropzoneSingle() {
  return (
    <Dropzone
      className="w-full max-w-md"
      accept="application/pdf,.pdf"
      maxSize={10 * 1024 * 1024}
      maxFiles={1}
      multiple={false}
      label="Drop a PDF here or browse"
      description="PDF only · up to 10 MB"
    />
  )
}
