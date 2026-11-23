import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
  DocsRelated,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "address-autocomplete",
  "Address Autocomplete"
)

const exampleDefs = [
  {
    name: "address-autocomplete-gallery",
    title: "Gallery",
    description:
      "Search, select, and clear. Pass any async `onSearch` - demos use the bundled mock.",
    requires: ["command", "input-group", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-default",
    title: "Basic",
    description: "Minimal field with debounced suggestions after `minChars`.",
    requires: ["command", "input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-form",
    title: "Form fill",
    description:
      "Type `new`, `london`, or `paris`, then pick a suggestion to fill street, city, region, postal, and country.",
    requires: ["command", "input-group", "field", "input"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-controlled",
    title: "Controlled",
    description: "Drive `value` / `onValueChange` and clear from outside.",
    requires: ["command", "input-group", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-loading",
    title: "Loading",
    description: "Slow `onSearch` shows the spinner and `loadingMessage`.",
    requires: ["command", "input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-empty",
    title: "Empty",
    description: "When `onSearch` returns `[]`, show `emptyMessage`.",
    requires: ["command", "input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-min-chars",
    title: "Min characters",
    description: "`minChars={3}` waits longer before calling `onSearch`.",
    requires: ["command", "input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-invalid",
    title: "Invalid",
    description: "Pass `invalid` with `Field` / `FieldError` for required addresses.",
    requires: ["command", "input-group", "field"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "address-autocomplete-disabled",
    title: "Disabled",
    description: "Lock a stored address with `disabled`.",
    requires: ["command", "input-group"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { AddressAutocomplete } from "@/components/address-autocomplete"

export function Example() {
  return (
    <AddressAutocomplete
      placeholder="Try “new” or “london”…"
      onValueChange={(address) => {
        console.log(address)
      }}
    />
  )
}`

export default async function AddressAutocompleteDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Address Autocomplete"
        pathname="/docs/components/address-autocomplete"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Type to search addresses. Works out of the box with a bundled offline
            mock - override{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              onSearch
            </code>{" "}
            with Mapbox Search (or any geocoder) in production.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
        />
      </section>

      <DocsInstallation name="address-autocomplete" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="address-autocomplete.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "onSearch",
              type: "(query: string) => Promise<AddressSuggestion[]>",
              defaultValue: "searchMockAddresses",
              description:
                "Async lookup. Defaults to the bundled mock; replace with your geocoder in production. Stale responses are ignored.",
            },
            {
              name: "value",
              type: "AddressValue | null",
              defaultValue: "-",
              description: "Controlled selected address.",
            },
            {
              name: "defaultValue",
              type: "AddressValue | null",
              defaultValue: "null",
              description: "Initial address when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: AddressValue | null) => void",
              defaultValue: "-",
              description: "Fires on select or clear.",
            },
            {
              name: "debounceMs",
              type: "number",
              defaultValue: "300",
              description: "Delay before calling `onSearch`.",
            },
            {
              name: "minChars",
              type: "number",
              defaultValue: "2",
              description: "Minimum query length before searching.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Search address…"',
              description: "Input placeholder when empty.",
            },
            {
              name: "emptyMessage",
              type: "string",
              defaultValue: '"No addresses found."',
              description: "Shown when `onSearch` returns an empty list.",
            },
            {
              name: "loadingMessage",
              type: "string",
              defaultValue: '"Searching…"',
              description: "Shown while `onSearch` is pending.",
            },
            {
              name: "errorMessage",
              type: "string",
              defaultValue: '"Could not load addresses."',
              description: "Shown when `onSearch` throws.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the field.",
            },
            {
              name: "invalid",
              type: "boolean",
              defaultValue: "false",
              description: "Destructive border via `aria-invalid`.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the `InputGroup` root.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/command",
            title: "Command",
            description: "suggestion list keyboard chrome",
          },
          {
            href: "/docs/components/input-group",
            title: "Input Group",
            description: "pin icon and clear addon",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label and describe the control",
          },
        ]}
      />
    </article>
  )
}
