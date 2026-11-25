import { PhoneInputValidation } from "@sonojs/ui/components/phone-input-validation"

export function PhoneInputValidationDisabled() {
  return (
    <PhoneInputValidation
      className="max-w-sm"
      defaultCountry="FR"
      defaultValue="6 12 34 56 78"
      disabled
    />
  )
}