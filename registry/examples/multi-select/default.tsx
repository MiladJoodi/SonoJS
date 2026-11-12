import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const frameworks: MultiSelectOption[] = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function MultiSelectDefault() {
  return (
    <MultiSelect
      className="w-full max-w-sm"
      options={frameworks}
      defaultValue={["next"]}
      placeholder="Select frameworks…"
    />
  )
}
