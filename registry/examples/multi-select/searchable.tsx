import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const countries: MultiSelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "ae", label: "United Arab Emirates" },
]

export function MultiSelectSearchable() {
  return (
    <MultiSelect
      className="w-full max-w-sm"
      options={countries}
      searchable
      placeholder="Select countries…"
      searchPlaceholder="Search countries…"
    />
  )
}
