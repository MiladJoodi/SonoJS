import { PasswordInput } from "@sonojs/ui/components/password-input"

export function PasswordInputDefault() {
  return (
    <PasswordInput
      className="w-full max-w-sm"
      placeholder="Password"
      autoComplete="current-password"
    />
  )
}
