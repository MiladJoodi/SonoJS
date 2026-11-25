import {
  getExampleNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js/max"
import type { CountryCode } from "libphonenumber-js/max"
import examples from "libphonenumber-js/mobile/examples"

import { phoneCountries } from "./phone-countries"

export type CountryValidationRow = {
  code: string
  name: string
  dial: string
  sample: string
}

/** Why a string fails when state is invalid (for hints / docs). */
export function describePhoneValidationIssue(
  nationalFormatted: string,
  country: CountryCode
): string {
  if (isValidPhoneNumber(nationalFormatted, country)) {
    return "OK"
  }
  if (!isPossiblePhoneNumber(nationalFormatted, country)) {
    const lengthIssue = validatePhoneNumberLength(nationalFormatted, country)
    if (lengthIssue === "TOO_SHORT") return "Too short"
    if (lengthIssue === "INVALID_LENGTH") return "Wrong length"
    return "Wrong prefix or format"
  }
  return "Not valid"
}

function buildCountryValidationRows(): CountryValidationRow[] {
  return phoneCountries.map((country) => {
    const code = country.code.toUpperCase() as CountryCode
    const example = getExampleNumber(code, examples)

    if (!example) {
      return {
        code: country.code,
        name: country.name,
        dial: country.dial,
        sample: "—",
      }
    }

    return {
      code: country.code,
      name: country.name,
      dial: country.dial,
      sample: example.formatNational(),
    }
  })
}

/** One row per picker country — documented valid national sample. */
export const countryValidationRows = buildCountryValidationRows()