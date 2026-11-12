import { ColorPicker } from "@sonojs/ui/components/color-picker"

export function ColorPickerDisabled() {
  return (
    <div className="flex flex-wrap gap-4">
      <ColorPicker defaultValue="#64748B" disabled showSwatches showCopy />
      <ColorPicker defaultValue="#3B82F6" readOnly showCopy />
    </div>
  )
}
