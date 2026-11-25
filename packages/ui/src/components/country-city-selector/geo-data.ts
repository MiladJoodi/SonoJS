import type { City, Country, State } from "@sonojs/geo"

import {
  ensureGeoConfigured,
  getConfiguredGeoBase,
  resolveDataBaseUrl,
} from "./geo-config"
import { matchesCountryFields, normalizeQuery } from "./geo-search"

const jsonCache = new Map<string, Promise<unknown>>()

let countriesBase: string | null = null
let countriesPromise: Promise<Country[]> | null = null

const statesByIso = new Map<string, Promise<State[]>>()
const citiesByIso = new Map<string, Promise<City[]>>()

export function resetGeoDataModuleCache() {
  countriesBase = null
  countriesPromise = null
  statesByIso.clear()
  citiesByIso.clear()
  jsonCache.clear()
}

function bindBase(dataBaseUrl?: string) {
  const base = dataBaseUrl
    ? resolveDataBaseUrl(dataBaseUrl)
    : ensureGeoConfigured()
  if (countriesBase && countriesBase !== base) {
    resetGeoDataModuleCache()
    countriesBase = base
  } else if (!countriesBase) {
    countriesBase = base
  }
  return base
}

async function loadJson<T>(base: string, relative: string): Promise<T> {
  const url = `${base}${relative.replace(/^\//, "")}`
  let pending = jsonCache.get(url) as Promise<T> | undefined
  if (!pending) {
    pending = (async () => {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`)
      }
      return (await res.json()) as T
    })()
    jsonCache.set(url, pending)
  }
  return pending
}

function stateShardPath(iso2: string) {
  return `states/${iso2.trim().toLowerCase()}.json`
}

function cityShardPath(iso2: string) {
  return `cities/${iso2.trim().toLowerCase()}.json`
}

export function reconfigureGeo(dataBaseUrl: string) {
  resetGeoDataModuleCache()
  return resolveDataBaseUrl(dataBaseUrl)
}

export async function fetchCountries(dataBaseUrl?: string) {
  const base = bindBase(dataBaseUrl)
  if (!countriesPromise) {
    countriesPromise = loadJson<Country[]>(base, "countries.json")
  }
  return countriesPromise
}

export async function fetchCountryByIso2(iso2: string, dataBaseUrl?: string) {
  bindBase(dataBaseUrl)
  const countries = await fetchCountries()
  const code = iso2.trim().toUpperCase()
  return countries.find((c) => c.iso2.toUpperCase() === code)
}

export function filterCountries(
  countries: Country[],
  query: string
): Country[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return countries
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(needle) ||
      c.iso2.toLowerCase().includes(needle) ||
      (c.native?.toLowerCase().includes(needle) ?? false)
  )
}

export async function fetchStatesByCountry(
  countryIso2: string,
  dataBaseUrl?: string
): Promise<State[]> {
  const iso = countryIso2?.trim().toUpperCase()
  if (!iso) return []
  const base = bindBase(dataBaseUrl)
  let pending = statesByIso.get(iso)
  if (!pending) {
    pending = loadJson<State[]>(base, stateShardPath(iso)).catch(() => [])
    statesByIso.set(iso, pending)
  }
  return pending
}

/** Warm the light state shard after country selection. */
export function prefetchStatesByCountry(
  countryIso2: string | null | undefined,
  dataBaseUrl?: string
) {
  const iso = countryIso2?.trim().toUpperCase()
  if (!iso) return
  void fetchStatesByCountry(iso, dataBaseUrl).catch(() => {})
}

export async function fetchStateById(
  stateId: number,
  countryIso2: string,
  dataBaseUrl?: string
): Promise<State | undefined> {
  if (!Number.isFinite(stateId) || stateId <= 0) return undefined
  const states = await fetchStatesByCountry(countryIso2, dataBaseUrl)
  return states.find((s) => s.id === stateId)
}

export function filterStates(states: State[], query: string): State[] {
  const q = normalizeQuery(query)
  if (!q) return states
  return states.filter((s) =>
    matchesCountryFields([s.name, s.native, s.iso2, s.iso3166_2], q)
  )
}

export async function fetchSearchStates(
  query: string,
  countryIso2: string,
  dataBaseUrl?: string,
  limit = 50
) {
  const states = await fetchStatesByCountry(countryIso2, dataBaseUrl)
  const sorted = [...states].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  )
  const filtered = filterStates(sorted, query)
  return filtered.slice(0, limit)
}

export async function fetchCitiesByCountry(
  countryIso2: string,
  dataBaseUrl?: string
): Promise<City[]> {
  const iso = countryIso2?.trim().toUpperCase()
  if (!iso) return []
  const base = bindBase(dataBaseUrl)
  let pending = citiesByIso.get(iso)
  if (!pending) {
    pending = loadJson<City[]>(base, cityShardPath(iso))
    citiesByIso.set(iso, pending)
  }
  return pending
}

/** Warm the city shard (prefer after state select when using includeState). */
export function prefetchCitiesByCountry(
  countryIso2: string | null | undefined,
  dataBaseUrl?: string
) {
  const iso = countryIso2?.trim().toUpperCase()
  if (!iso) return
  void fetchCitiesByCountry(iso, dataBaseUrl).catch(() => {})
}

export async function fetchCitiesByState(
  countryIso2: string,
  stateId: number,
  dataBaseUrl?: string
): Promise<City[]> {
  if (!Number.isFinite(stateId) || stateId <= 0) return []
  const cities = await fetchCitiesByCountry(countryIso2, dataBaseUrl)
  return cities.filter((c) => c.state_id === stateId)
}

export async function fetchCityByIdInCountry(
  cityId: number,
  countryIso2: string,
  dataBaseUrl?: string
): Promise<City | undefined> {
  if (!Number.isFinite(cityId) || cityId <= 0) return undefined
  const cities = await fetchCitiesByCountry(countryIso2, dataBaseUrl)
  return cities.find((c) => c.id === cityId)
}

export async function fetchSearchCities(
  query: string,
  countryIso2: string,
  dataBaseUrl?: string,
  limit = 25,
  stateId?: number | null
) {
  const q = normalizeQuery(query)
  const iso = countryIso2?.trim().toUpperCase()
  if (!iso) return []

  const cities =
    stateId != null && Number.isFinite(stateId) && stateId > 0
      ? await fetchCitiesByState(iso, stateId, dataBaseUrl)
      : await fetchCitiesByCountry(iso, dataBaseUrl)

  if (!q) {
    const sorted = [...cities].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    )
    return sorted.slice(0, limit)
  }

  const matched: City[] = []
  for (const city of cities) {
    if (matchesCountryFields([city.name], q)) {
      matched.push(city)
      if (matched.length >= limit) break
    }
  }
  return matched
}

export function activeGeoDataBaseUrl() {
  return getConfiguredGeoBase()
}