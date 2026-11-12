import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerPresets() {
  return (
    <ColorPicker defaultValue="#F97316" showSwatches showCopy swatchColumns={6} />
  )
}
