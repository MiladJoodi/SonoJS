import type { AddressSuggestion } from "./address-autocomplete"

/** Demo dataset — replace `onSearch` with your geocoder in production. */
export const MOCK_ADDRESSES: AddressSuggestion[] = [
  {
    id: "us-1",
    label: "350 Fifth Avenue",
    secondary: "New York, NY 10118, United States",
    address: {
      line1: "350 Fifth Avenue",
      city: "New York",
      region: "NY",
      postalCode: "10118",
      country: "United States",
      countryCode: "US",
      lat: 40.7484,
      lng: -73.9857,
    },
  },
  {
    id: "us-2",
    label: "1 Infinite Loop",
    secondary: "Cupertino, CA 95014, United States",
    address: {
      line1: "1 Infinite Loop",
      city: "Cupertino",
      region: "CA",
      postalCode: "95014",
      country: "United States",
      countryCode: "US",
      lat: 37.3318,
      lng: -122.0312,
    },
  },
  {
    id: "us-3",
    label: "1600 Amphitheatre Parkway",
    secondary: "Mountain View, CA 94043, United States",
    address: {
      line1: "1600 Amphitheatre Parkway",
      city: "Mountain View",
      region: "CA",
      postalCode: "94043",
      country: "United States",
      countryCode: "US",
      lat: 37.422,
      lng: -122.0841,
    },
  },
  {
    id: "us-4",
    label: "233 S Wacker Drive",
    secondary: "Chicago, IL 60606, United States",
    address: {
      line1: "233 S Wacker Drive",
      city: "Chicago",
      region: "IL",
      postalCode: "60606",
      country: "United States",
      countryCode: "US",
      lat: 41.8789,
      lng: -87.6359,
    },
  },
  {
    id: "us-5",
    label: "221B Baker Street",
    secondary: "London NW1 6XE, United Kingdom",
    address: {
      line1: "221B Baker Street",
      city: "London",
      region: "England",
      postalCode: "NW1 6XE",
      country: "United Kingdom",
      countryCode: "GB",
      lat: 51.5238,
      lng: -0.1586,
    },
  },
  {
    id: "fr-1",
    label: "10 Avenue des Champs-Élysées",
    secondary: "75008 Paris, France",
    address: {
      line1: "10 Avenue des Champs-Élysées",
      city: "Paris",
      region: "Île-de-France",
      postalCode: "75008",
      country: "France",
      countryCode: "FR",
      lat: 48.8698,
      lng: 2.3078,
    },
  },
  {
    id: "de-1",
    label: "Pariser Platz 1",
    secondary: "10117 Berlin, Germany",
    address: {
      line1: "Pariser Platz 1",
      city: "Berlin",
      region: "Berlin",
      postalCode: "10117",
      country: "Germany",
      countryCode: "DE",
      lat: 52.5163,
      lng: 13.3777,
    },
  },
  {
    id: "jp-1",
    label: "1-1 Marunouchi",
    secondary: "Chiyoda, Tokyo 100-0005, Japan",
    address: {
      line1: "1-1 Marunouchi",
      city: "Tokyo",
      region: "Tokyo",
      postalCode: "100-0005",
      country: "Japan",
      countryCode: "JP",
      lat: 35.6812,
      lng: 139.7671,
    },
  },
  {
    id: "ae-1",
    label: "Sheikh Zayed Road",
    secondary: "Dubai, United Arab Emirates",
    address: {
      line1: "Sheikh Zayed Road",
      city: "Dubai",
      country: "United Arab Emirates",
      countryCode: "AE",
      lat: 25.2048,
      lng: 55.2708,
    },
  },
  {
    id: "ca-1",
    label: "100 Queen Street West",
    secondary: "Toronto, ON M5H 2N2, Canada",
    address: {
      line1: "100 Queen Street West",
      city: "Toronto",
      region: "ON",
      postalCode: "M5H 2N2",
      country: "Canada",
      countryCode: "CA",
      lat: 43.6532,
      lng: -79.3832,
    },
  },
]

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
}

function matchesQuery(item: AddressSuggestion, query: string) {
  const q = normalize(query.trim())
  if (!q) return false
  const hay = normalize(
    [
      item.label,
      item.secondary,
      item.address.line1,
      item.address.line2,
      item.address.city,
      item.address.region,
      item.address.postalCode,
      item.address.country,
      item.address.countryCode,
    ]
      .filter(Boolean)
      .join(" ")
  )
  if (hay.includes(q)) return true
  const parts = q.split(/\s+/).filter(Boolean)
  return parts.length > 0 && parts.every((part) => hay.includes(part))
}

export type SearchMockAddressesOptions = {
  /** Artificial latency in ms. Default `280`. */
  delayMs?: number
  /** Force empty results (for empty-state demos). */
  empty?: boolean
}

/**
 * Offline mock search for docs / demos.
 * Wire Mapbox Search (or similar) into `onSearch` in production.
 */
export async function searchMockAddresses(
  query: string,
  options: SearchMockAddressesOptions = {}
): Promise<AddressSuggestion[]> {
  const { delayMs = 280, empty = false } = options
  await new Promise((resolve) => setTimeout(resolve, delayMs))
  if (empty) return []
  return MOCK_ADDRESSES.filter((item) => matchesQuery(item, query)).slice(0, 8)
}
