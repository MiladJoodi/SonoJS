import { ColorPicker } from "@sonojs/ui/components/color-picker"

const brand = [
  "#0F172A",
  "#1E293B",
  "#334155",
  "#2563EB",
  "#396EF0",
  "#60A5FA",
  "#F8FAFC",
  "#EF4444",
]

export function ColorPickerCustomSwatches() {
  return (
    <ColorPicker
      defaultValue="#2563EB"
      showSwatches
      swatches={brand}
      disabledSwatches={["#EF4444"]}
      swatchColumns={4}
      showCopy
    />
  )
}
