import { Label } from "@sonojs/ui/components/label"
import { PhoneInput } from "@sonojs/ui/components/phone-input"

export function PhoneInputWithLabel() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="phone-input-demo">Phone number</Label>
      <PhoneInput id="phone-input-demo" defaultCountry="US" />
    </div>
  )
}
