import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerCustomStyling() {
  return (
    <ColorPicker
      className="max-w-xs border-primary/40 shadow-md"
      defaultValue="#0EA5E9"
      showOpacity
      showCopy
    />
  )
}
