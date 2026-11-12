import { PasswordInput } from "@sonojs/ui/components/password-input"

export function PasswordInputDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <PasswordInput
        defaultValue="••••••••"
        disabled
        placeholder="Password"
      />
      <PasswordInput
        defaultValue="short"
        aria-invalid
        placeholder="Password"
        showStrength
      />
    </div>
  )
}
