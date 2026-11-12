import { Label } from "@sonojs/ui/components/label"
import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerSwatches() {
  return (
    <div className="w-full max-w-[280px] space-y-2">
      <Label>Brand color</Label>
      <ColorPicker defaultValue="#2563EB" showSwatches showCopy />
    </div>
  )
}
