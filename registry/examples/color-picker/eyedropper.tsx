import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerEyedropper() {
  return (
    <ColorPicker
      defaultValue="#14B8A6"
      showEyeDropper
      showCopy
      showFormatSelect
    />
  )
}
