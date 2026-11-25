import {
  AsYouType,
  getExampleNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  Metadata,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max"
import type { CountryCode } from "libphonenumber-js/max"
import examples from "libphonenumber-js/mobile/examples"

export type PhoneValidationState = "empty" | "incomplete" | "valid" | "invalid"

const sharedMetadata = new Metadata()
const maxNationalDigitsCache = new Map<string, number>()

export function onlyNationalDigits(input: string): string {
  return input.replace(/\D/g, "")
}

/** Max national digits the user can type (includes leading 0 when shown). */
export function getMaxNationalDigitCount(country: CountryCode): number {
  const cached = maxNationalDigitsCache.get(country)
  if (cached !== undefined) return cached

  let max = 15
  sharedMetadata.selectNumberingPlan(country)
  const lengths = sharedMetadata.numberingPlan?.possibleLengths?.()
  if (lengths?.length) {
    max = Math.max(...lengths) + 1
  }
  const example = getExampleNumber(country, examples)
  if (example) {
    max = Math.max(max, onlyNationalDigits(example.formatNational()).length)
  }

  maxNationalDigitsCache.set(country, max)
  return max
}

export function clipNationalDigits(
  digits: string,
  country: CountryCode
): string {
  return digits.slice(0, getMaxNationalDigitCount(country))
}

export function formatNationalDigits(
  digits: string,
  country: CountryCode
): string {
  if (!digits) return ""
  return new AsYouType(country).input(digits)
}

export function getPhoneValidationState(
  nationalFormatted: string,
  country: CountryCode
): PhoneValidationState {
  const digits = onlyNationalDigits(nationalFormatted)
  if (!digits) return "empty"
  if (isValidPhoneNumber(nationalFormatted, country)) return "valid"
  if (isPossiblePhoneNumber(nationalFormatted, country)) return "incomplete"
  return "invalid"
}

export function resolvePhoneValidationDisplay(
  state: PhoneValidationState,
  focused: boolean
): PhoneValidationState {
  if (focused && state === "invalid") return "incomplete"
  return state
}

export function phoneNumberToE164(
  nationalFormatted: string,
  country: CountryCode
): string | undefined {
  if (!isValidPhoneNumber(nationalFormatted, country)) return undefined
  return parsePhoneNumberFromString(nationalFormatted, country)?.number
}

export function countDigitsBefore(value: string, caret: number): number {
  let count = 0
  const end = Math.min(caret, value.length)
  for (let i = 0; i < end; i++) {
    if (/\d/.test(value[i]!)) count++
  }
  return count
}

export function caretFromDigitCount(value: string, digitCount: number): number {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i]!)) {
      seen++
      if (seen === digitCount) return i + 1
    }
  }
  return value.length
}