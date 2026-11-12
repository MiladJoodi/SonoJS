import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("phone-input", "Phone Input")

const exampleDefs = [
  {
    name: "phone-input-default",
    title: "Basic",
    description:
      "Country dial picker with CDN SVG flags plus a national number field.",
    requires: ["input-group", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "phone-input-without-flag",
    title: "Without flag",
    description: "Pass `showFlag={false}` to show dial codes only.",
    requires: ["input-group", "popover"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "phone-input-with-label",
    title: "With Label",
    description: "Pair with `Label` and set `defaultCountry` (ISO2).",
    requires: ["input-group", "popover", "label"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "phone-input-with-label-without-flag",
    title: "With Label · without flag",
    description: "Labelled field with dial codes only (`showFlag={false}`).",
    requires: ["input-group", "popover", "label"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "phone-input-disabled",
    title: "Disabled",
    description: "Pass `disabled` to lock the country trigger and input.",
    requires: ["input-group", "popover"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { PhoneInput } from "@/components/phone-input"

export function Example() {
  return <PhoneInput defaultCountry="US" placeholder="Phone number" />
}`

export default async function PhoneInputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Phone Input"
        pathname="/docs/components/phone-input"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Lightweight phone field with a searchable country dial code list and
            square SVG flags from the SonoJS flags CDN (emoji fallback if the
            image fails). Ships a local{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              countries.json
            </code>{" "}
            - no phone validation library. Control height matches SonoJS{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              h-[46px]
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="phone-input" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="phone-input.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "defaultCountry",
              type: "string",
              defaultValue: '"US"',
              description: "Initial ISO2 country code when uncontrolled.",
            },
            {
              name: "country",
              type: "string",
              defaultValue: "-",
              description: "Controlled ISO2 country code.",
            },
            {
              name: "onCountryChange",
              type: "(country: PhoneCountry) => void",
              defaultValue: "-",
              description: "Fires when the selected country changes.",
            },
            {
              name: "value",
              type: "string",
              defaultValue: "-",
              description: "Controlled national number (without dial code).",
            },
            {
              name: "defaultValue",
              type: "string",
              defaultValue: '""',
              description: "Initial national number when uncontrolled.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              defaultValue: "-",
              description: "Fires when the national number changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the country picker and input.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Phone number"',
              description: "Input placeholder.",
            },
            {
              name: "flagCdnBase",
              type: "string",
              defaultValue: "SonoJS flags jsDelivr",
              description:
                "CDN base for flag SVGs (no trailing slash). Default: `https://sonojs.github.io/SonoJS-flags`.",
            },
            {
              name: "showFlag",
              type: "boolean",
              defaultValue: "true",
              description:
                "When `false`, hides flag images and shows dial codes only.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merge Tailwind classes on the input group root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
