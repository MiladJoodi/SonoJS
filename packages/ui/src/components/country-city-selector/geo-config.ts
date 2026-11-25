/** jsDelivr npm data shards (no pinned version in URL). */
export const DEFAULT_GEO_DATA_BASE_URL =
  "https://cdn.jsdelivr.net/npm/@sonojs/geo/data/"

let configuredBase: string | null = null

export function resolveDataBaseUrl(override?: string) {
  const base = (
    override ??
    configuredBase ??
    DEFAULT_GEO_DATA_BASE_URL
  ).replace(/\/?$/, "/")
  configuredBase = base
  return base
}

export function ensureGeoConfigured(dataBaseUrl?: string) {
  return resolveDataBaseUrl(dataBaseUrl)
}

export function getConfiguredGeoBase() {
  return configuredBase ?? DEFAULT_GEO_DATA_BASE_URL
}