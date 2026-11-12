"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  XIcon,
} from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@sonojs/ui/lib/utils"

export type PasswordRequirement = {
  id: string
  label: string
  test: (value: string) => boolean
}

export type PasswordStrength = "empty" | "weak" | "fair" | "good" | "strong"

export type PasswordInputProps = Omit<
  React.ComponentProps<"input">,
  "type" | "size"
> & {
  showStrength?: boolean
  showRequirements?: boolean
  showCopy?: boolean
  showCapsLockWarning?: boolean
  minLength?: number
  requirements?: PasswordRequirement[]
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

const STRENGTH_LABEL: Record<Exclude<PasswordStrength, "empty">, string> = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
}

const STRENGTH_SEGMENT_CLASS: Record<
  Exclude<PasswordStrength, "empty">,
  string
> = {
  weak: "bg-destructive",
  fair: "bg-amber-500",
  good: "bg-primary",
  strong: "bg-emerald-500",
}

const STRENGTH_LEVEL: Record<Exclude<PasswordStrength, "empty">, number> = {
  weak: 1,
  fair: 2,
  good: 3,
  strong: 4,
}

export function createDefaultPasswordRequirements(
  minLength = 8
): PasswordRequirement[] {
  return [
    {
      id: "length",
      label: `At least ${minLength} characters`,
      test: (value) => value.length >= minLength,
    },
    {
      id: "upper",
      label: "At least one uppercase letter",
      test: (value) => /[A-Z]/.test(value),
    },
    {
      id: "lower",
      label: "At least one lowercase letter",
      test: (value) => /[a-z]/.test(value),
    },
    {
      id: "number",
      label: "At least one number",
      test: (value) => /\d/.test(value),
    },
    {
      id: "special",
      label: "At least one special character",
      test: (value) => /[^A-Za-z0-9]/.test(value),
    },
  ]
}

export const DEFAULT_PASSWORD_REQUIREMENTS =
  createDefaultPasswordRequirements(8)

export function getPasswordStrength(
  value: string,
  minLength = 8
): PasswordStrength {
  if (!value) return "empty"

  let score = 0
  if (value.length >= minLength) score += 1
  if (value.length >= minLength + 4) score += 1
  if (/[A-Z]/.test(value)) score += 1
  if (/[a-z]/.test(value)) score += 1
  if (/\d/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1

  if (score <= 2) return "weak"
  if (score <= 3) return "fair"
  if (score <= 5) return "good"
  return "strong"
}

function PasswordInput({
  className,
  disabled,
  showStrength = false,
  showRequirements = false,
  showCopy = false,
  showCapsLockWarning = true,
  minLength = 8,
  requirements: requirementsProp,
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  value: valueProp,
  defaultValue,
  onChange,
  onKeyDown,
  onKeyUp,
  onBlur,
  onFocus,
  id,
  autoComplete = "current-password",
  ...props
}: PasswordInputProps) {
  const [uncontrolledVisible, setUncontrolledVisible] =
    React.useState(defaultVisible)
  const isVisibleControlled = visibleProp !== undefined
  const visible = isVisibleControlled ? visibleProp : uncontrolledVisible

  const isValueControlled = valueProp !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    () => String(defaultValue ?? "")
  )
  const value = isValueControlled ? String(valueProp ?? "") : uncontrolledValue

  const [copied, setCopied] = React.useState(false)
  const [capsLockOn, setCapsLockOn] = React.useState(false)
  const [focused, setFocused] = React.useState(false)

  const requirements = React.useMemo(
    () => requirementsProp ?? createDefaultPasswordRequirements(minLength),
    [requirementsProp, minLength]
  )

  const strength = getPasswordStrength(value, minLength)
  const strengthLevel =
    strength === "empty" ? 0 : STRENGTH_LEVEL[strength]

  const setVisible = React.useCallback(
    (next: boolean) => {
      if (!isVisibleControlled) setUncontrolledVisible(next)
      onVisibleChange?.(next)
    },
    [isVisibleControlled, onVisibleChange]
  )

  const updateCapsLock = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
      if (!showCapsLockWarning) return
      const native = event.nativeEvent
      if ("getModifierState" in native && typeof native.getModifierState === "function") {
        setCapsLockOn(native.getModifierState("CapsLock"))
      }
    },
    [showCapsLockWarning]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValueControlled) setUncontrolledValue(event.target.value)
    onChange?.(event)
  }

  const handleCopy = async () => {
    if (disabled || !value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard may be denied; keep quiet.
    }
  }

  return (
    <div
      data-slot="password-input"
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <InputGroup data-disabled={disabled ? "true" : undefined}>
        <InputGroupInput
          id={id}
          type={visible ? "text" : "password"}
          disabled={disabled}
          autoComplete={autoComplete}
          value={isValueControlled ? value : undefined}
          defaultValue={
            isValueControlled ? undefined : (defaultValue as string | undefined)
          }
          onChange={handleChange}
          onFocus={(event) => {
            setFocused(true)
            updateCapsLock(event)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            setCapsLockOn(false)
            onBlur?.(event)
          }}
          onKeyDown={(event) => {
            updateCapsLock(event)
            onKeyDown?.(event)
          }}
          onKeyUp={(event) => {
            updateCapsLock(event)
            onKeyUp?.(event)
          }}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          {showCopy ? (
            <InputGroupButton
              size="icon-xs"
              disabled={disabled || !value}
              aria-label={copied ? "Copied" : "Copy password"}
              onClick={() => {
                void handleCopy()
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </InputGroupButton>
          ) : null}
          <InputGroupButton
            size="icon-xs"
            disabled={disabled}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {showCapsLockWarning && focused && capsLockOn ? (
        <p
          data-slot="password-input-caps"
          className="text-xs text-amber-600 dark:text-amber-400"
          role="status"
        >
          Caps Lock is on
        </p>
      ) : null}

      {showStrength ? (
        <div data-slot="password-input-strength" className="space-y-1.5">
          <div className="grid grid-cols-4 gap-1">
            {([1, 2, 3, 4] as const).map((segment) => (
              <div
                key={segment}
                className={cn(
                  "h-1 rounded-full bg-muted transition-colors duration-200",
                  strength !== "empty" &&
                    segment <= strengthLevel &&
                    STRENGTH_SEGMENT_CLASS[strength]
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {strength === "empty"
              ? "Enter a password"
              : `Strength: ${STRENGTH_LABEL[strength]}`}
          </p>
        </div>
      ) : null}

      {showRequirements ? (
        <ul
          data-slot="password-input-requirements"
          className="space-y-1.5"
          aria-label="Password requirements"
        >
          {requirements.map((req) => {
            const met = req.test(value)
            return (
              <li
                key={req.id}
                className={cn(
                  "flex items-center gap-2 text-xs transition-colors",
                  met ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border",
                    met
                      ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950"
                      : "border-border/70"
                  )}
                  aria-hidden
                >
                  {met ? (
                    <CheckIcon className="size-2.5" />
                  ) : (
                    <XIcon className="size-2.5 opacity-40" />
                  )}
                </span>
                <span>{req.label}</span>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export { PasswordInput }
