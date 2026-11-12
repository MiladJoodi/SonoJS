import countriesData from "../data/countries.json"

export type FlagCountry = {
  code: string
  name: string
  dial: string
}

export const FLAG_COUNTRIES = countriesData as FlagCountry[]

export function findCountry(
  code: string | null | undefined,
  list: FlagCountry[] = FLAG_COUNTRIES
): FlagCountry | null {
  if (!code) return null
  const needle = code.trim().toUpperCase()
  return list.find((c) => c.code.toUpperCase() === needle) ?? null
}
