import { Label } from "@sonojs/ui/components/label"
import { PhoneInput } from "@sonojs/ui/components/phone-input"

export function PhoneInputWithLabelWithoutFlag() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="phone-input-no-flag-demo">Phone number</Label>
      <PhoneInput
        id="phone-input-no-flag-demo"
        defaultCountry="US"
        showFlag={false}
      />
    </div>
  )
}
