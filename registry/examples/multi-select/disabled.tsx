import {
  MultiSelect,
  type MultiSelectOption,
} from "@sonojs/ui/components/multi-select"

const options: MultiSelectOption[] = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS", disabled: true },
  { value: "push", label: "Push" },
  { value: "webhook", label: "Webhook" },
]

export function MultiSelectDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <MultiSelect
        options={options}
        defaultValue={["email"]}
        placeholder="Channels…"
      />
      <MultiSelect
        options={options}
        defaultValue={["email", "push"]}
        disabled
        placeholder="Channels…"
      />
    </div>
  )
}
