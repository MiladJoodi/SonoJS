import { PhoneInput } from "@sonojs/ui/components/phone-input"

export function PhoneInputDisabled() {
  return (
    <PhoneInput
      className="max-w-sm"
      defaultCountry="GB"
      defaultValue="7700 900123"
      disabled
    />
  )
}
