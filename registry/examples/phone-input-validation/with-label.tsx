import { Label } from "@sonojs/ui/components/label"
import { PhoneInputValidation } from "@sonojs/ui/components/phone-input-validation"

export function PhoneInputValidationWithLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="phone-validation-demo">Phone</Label>
      <PhoneInputValidation
        id="phone-validation-demo"
        defaultCountry="GB"
        defaultValue="7700123456"
      />
    </div>
  )
}