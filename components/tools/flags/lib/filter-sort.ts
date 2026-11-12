import type { FlagCountry } from "./countries"

export function filterAndSortCountries(
  countries: FlagCountry[],
  query: string
): FlagCountry[] {
  const needle = query.trim().toLowerCase()
  const list = !needle
    ? countries.slice()
    : countries.filter(
        (c) =>
          c.name.toLowerCase().includes(needle) ||
          c.code.toLowerCase().includes(needle) ||
          c.dial.toLowerCase().includes(needle)
      )

  list.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  )

  return list
}
