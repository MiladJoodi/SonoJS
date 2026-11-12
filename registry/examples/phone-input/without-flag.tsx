import { PhoneInput } from "@sonojs/ui/components/phone-input"

export function PhoneInputWithoutFlag() {
  return (
    <PhoneInput className="max-w-sm" defaultCountry="US" showFlag={false} />
  )
}
