import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "country-city-selector",
  "Country & City Selector"
)

const exampleDefs = [
  {
    name: "country-city-selector-full",
    title: "Country + state + city",
    description:
      "Full cascade. States load a light shard; cities wait until a state is chosen.",
    requires: ["input-group", "popover"],
    npmRequires: ["@sonojs/geo", "@sonojs/flags", "lucide-react"],
  },
  {
    name: "country-city-selector-full-no-flags",
    title: "Country + state + city (no flags)",
    description: "Same fields with `showFlags={false}`.",
    requires: ["input-group", "popover"],
    npmRequires: ["@sonojs/geo", "lucide-react"],
  },
  {
    name: "country-city-selector-state",
    title: "Country + state",
    description: "`includeState` without city — light state shard only.",
    requires: ["input-group", "popover"],
    npmRequires: ["@sonojs/geo", "@sonojs/flags", "lucide-react"],
  },
  {
    name: "country-city-selector-state-no-flags",
    title: "Country + state (no flags)",
    description: "Same with `showFlags={false}`.",
    requires: ["input-group", "popover"],
    npmRequires: ["@sonojs/geo", "lucide-react"],
  },
  {
    name: "country-city-selector-country",
    title: "Country",
    description: "Country field only (`includeCity={false}`).",
    requires: ["input-group", "popover"],
    npmRequires: ["@sonojs/geo", "@sonojs/flags", "lucide-react"],
  },
  {
    name: "country-city-selector-country-no-flags",
    title: "Country (no flags)",
    description: "Country only with `showFlags={false}`.",
    requires: ["input-group", "popover"],
    npmRequires: ["@sonojs/geo", "lucide-react"],
  },
]

const usageSource = `import { CountryCitySelect } from "@/components/country-city-selector"

export function Example() {
  return (
    <>
      <CountryCitySelect includeState includeCity showFlags />
      <CountryCitySelect includeState includeCity={false} showFlags />
      <CountryCitySelect includeCity={false} showFlags />
    </>
  )
}`

const countrySearchProps = [
  {
    name: "value",
    type: "string | null",
    description: "Controlled ISO-3166 alpha-2 (CountrySearchSelect only).",
  },
  {
    name: "showFlags",
    type: "boolean",
    default: "true",
    description: "Flags in the country popover list.",
  },
  {
    name: "geoDataBaseUrl",
    type: "string",
    description: "Geo data base URL (jsDelivr default).",
  },
]

const countryCityProps = [
  {
    name: "includeState",
    type: "boolean",
    default: "false",
    description: "Show state/province after country.",
  },
  {
    name: "includeCity",
    type: "boolean",
    default: "true",
    description: "Show city. With `includeState`, city waits for a state.",
  },
  {
    name: "country / defaultCountry",
    type: "string | null",
    description: "ISO-3166 alpha-2.",
  },
  {
    name: "stateId / defaultStateId",
    type: "number | null",
    description: "State id when `includeState` is true.",
  },
  {
    name: "cityId / defaultCityId",
    type: "number | null",
    description: "City id when `includeCity` is true.",
  },
  {
    name: "onCountryChange / onStateChange / onCityChange",
    type: "callbacks",
    description: "Downstream values clear when a parent field changes.",
  },
  {
    name: "showFlags",
    type: "boolean",
    default: "true",
    description: "Country flags in the country popover.",
  },
  {
    name: "geoDataBaseUrl",
    type: "string",
    description: "Shard base for all fields.",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "Disable all controls.",
  },
]

export default async function CountryCitySelectorDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Country & City Selector"
        pathname="/docs/components/country-city-selector"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Popovers with in-panel search (same pattern as Phone Input). Compose
            country, optional state, and optional city. Data loads on demand —
            light state shards first; city shards only when a city field needs
            them.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
        />
      </section>

      <DocsInstallation name="country-city-selector" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="country-city-selector"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-h3">CountrySearchSelect</h2>
          <p className="text-sm text-muted-foreground">
            Exported for custom layouts. Docs examples use{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              CountryCitySelect
            </code>{" "}
            only.
          </p>
          <DocsApiProps rows={countrySearchProps} />
        </div>
        <div className="space-y-3">
          <h2 className="text-h3">CountryCitySelect</h2>
          <DocsApiProps rows={countryCityProps} />
        </div>
      </section>
    </article>
  )
}