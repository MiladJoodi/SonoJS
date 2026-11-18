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

export const metadata = componentDocsMetadata("currency-input", "Currency Input")

const exampleDefs = [
  {
    name: "currency-input-gallery",
    title: "Gallery",
    description:
      "Price card with a live numeric readout. `value` / `onValueChange` stay numbers.",
    requires: ["input-group", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "currency-input-default",
    title: "Basic",
    description:
      'USD with live thousand grouping while typing (`1,250,000`).',
    requires: ["input-group"],
  },
  {
    name: "currency-input-popular",
    title: "Popular currencies",
    description:
      "Switch `currency` + `locale` — USD, EUR, GBP, IRR, SAR, AED, TRY, JPY, INR, CNY.",
    requires: ["input-group", "select"],
  },
  {
    name: "currency-input-eur",
    title: "Euro",
    description:
      '`currency="EUR"` and `locale="de-DE"` — comma decimals from Intl.',
    requires: ["input-group"],
  },
  {
    name: "currency-input-code",
    title: "Currency code",
    description: '`currencyDisplay="code"` shows `GBP` instead of a symbol.',
    requires: ["input-group"],
  },
  {
    name: "currency-input-min-max",
    title: "Min / max",
    description: "Pass `min` and `max` to clamp commits.",
    requires: ["input-group"],
  },
  {
    name: "currency-input-form",
    title: "Form",
    description: "Pair with `Field` and `FieldLabel` for labeled rows.",
    requires: ["input-group", "field"],
  },
  {
    name: "currency-input-controlled",
    title: "Controlled",
    description: "Drive `value` / `onValueChange` and clear from outside.",
    requires: ["input-group", "button"],
  },
  {
    name: "currency-input-disabled",
    title: "Disabled",
    description: "Disable the whole control with `disabled`.",
    requires: ["input-group"],
  },
]

const usageSource = `import { CurrencyInput } from "@/components/currency-input"

export function Example() {
  return (
    <CurrencyInput
      currency="USD"
      locale="en-US"
      defaultValue={49}
      placeholder="0.00"
    />
  )
}`

export default async function CurrencyInputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Currency Input"
        pathname="/docs/components/currency-input"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Type an amount; store a number. Thousand separators update while you
            type. Pass any ISO{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              currency
            </code>{" "}
            +{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              locale
            </code>{" "}
            — Intl supplies the symbol and separators. The amount stays LTR for
            caret stability; the addon follows start/end.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="currency-input" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="currency-input.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "number | null",
              defaultValue: "-",
              description: "Controlled numeric amount.",
            },
            {
              name: "defaultValue",
              type: "number | null",
              defaultValue: "null",
              description: "Initial amount when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: number | null) => void",
              defaultValue: "-",
              description: "Fires with the parsed number (or `null` when empty).",
            },
            {
              name: "currency",
              type: "string",
              defaultValue: '"USD"',
              description: "ISO 4217 code passed to `Intl.NumberFormat`.",
            },
            {
              name: "locale",
              type: "string",
              defaultValue: '"en-US"',
              description: "BCP 47 locale for separators and symbol side.",
            },
            {
              name: "currencyDisplay",
              type: '"symbol" | "narrowSymbol" | "code" | "name"',
              defaultValue: '"symbol"',
              description: "How the addon label is rendered.",
            },
            {
              name: "minimumFractionDigits",
              type: "number",
              defaultValue: "from currency",
              description: "Blur formatting floor for fraction digits.",
            },
            {
              name: "maximumFractionDigits",
              type: "number",
              defaultValue: "from currency",
              description: "Typing and blur fraction digit cap.",
            },
            {
              name: "min",
              type: "number",
              defaultValue: "-",
              description: "Lower clamp on commit.",
            },
            {
              name: "max",
              type: "number",
              defaultValue: "-",
              description: "Upper clamp on commit.",
            },
            {
              name: "showCurrencyAddon",
              type: "boolean",
              defaultValue: "true",
              description: "Show the currency symbol/code addon.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the field.",
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
            href: "/docs/components/input-group",
            title: "Input Group",
            description: "addon chrome used for the currency label",
          },
          {
            href: "/docs/components/input",
            title: "Input",
            description: "plain text field without money formatting",
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
