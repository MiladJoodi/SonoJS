import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const labels: MultiSelectOption[] = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "docs", label: "Docs" },
  { value: "design", label: "Design" },
  { value: "perf", label: "Performance" },
  { value: "a11y", label: "A11y" },
]

export function MultiSelectMaxCount() {
  return (
    <MultiSelect
      className="w-full max-w-sm"
      options={labels}
      defaultValue={["bug", "feature", "docs", "design"]}
      maxCount={2}
      placeholder="Select labels…"
    />
  )
}
