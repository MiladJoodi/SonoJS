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

export const metadata = componentDocsMetadata("payment-input", "Payment Input")

const exampleDefs = [
  {
    name: "payment-input-gallery",
    title: "Gallery",
    description:
      "Card number, expiry, and CVC together. Brand updates from BIN prefixes; Luhn gates completeness.",
    requires: ["input-group", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "payment-input-card",
    title: "Card number",
    description:
      "Groups digits while typing. `onValueChange` receives raw digits only.",
    requires: ["input-group"],
  },
  {
    name: "payment-input-brands",
    title: "Brand detection",
    description:
      "Visa, Mastercard, Amex and more from the leading digits — shown in the end addon.",
    requires: ["input-group"],
  },
  {
    name: "payment-input-masked",
    title: "Masked",
    description:
      "`masked` hides all but the last four digits when the field is blurred.",
    requires: ["input-group"],
  },
  {
    name: "payment-input-expiry-cvc",
    title: "Expiry + CVC",
    description:
      "`CardExpiryInput` formats `MM/YY`. `CardCvcInput` length follows Amex (4) vs others (3).",
    requires: ["input-group"],
  },
  {
    name: "payment-input-iban",
    title: "IBAN",
    description:
      "Uppercase groups of four with ISO 13616 mod-97 validation. Country code in the start addon.",
    requires: ["input-group"],
  },
  {
    name: "payment-input-form",
    title: "Form",
    description: "Pair with `Field` labels for checkout and payout rows.",
    requires: ["input-group", "field"],
  },
  {
    name: "payment-input-controlled",
    title: "Controlled",
    description: "Drive raw card digits and compact IBAN from outside state.",
    requires: ["input-group", "button"],
  },
  {
    name: "payment-input-disabled",
    title: "Disabled",
    description: "Disable the whole control with `disabled`.",
    requires: ["input-group"],
  },
]

const usageSource = `import {
  CardCvcInput,
  CardExpiryInput,
  CardNumberInput,
  IbanInput,
} from "@/components/payment-input"

export function Example() {
  return (
    <div className="space-y-3">
      <CardNumberInput defaultValue="4242424242424242" />
      <div className="grid grid-cols-2 gap-3">
        <CardExpiryInput defaultValue="1228" />
        <CardCvcInput defaultValue="123" />
      </div>
      <IbanInput defaultValue="DE89370400440532013000" />
    </div>
  )
}`

export default async function PaymentInputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Payment Input"
        pathname="/docs/components/payment-input"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Card number, expiry, CVC, and IBAN fields built on{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              InputGroup
            </code>
            . Formatting is display-only —{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              onValueChange
            </code>{" "}
            always gets compact raw values (digits or alphanumeric IBAN). Includes
            Luhn, brand detection, and IBAN mod-97.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="payment-input" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="payment-input.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">CardNumberInput</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "string",
              defaultValue: "-",
              description: "Controlled raw digits.",
            },
            {
              name: "defaultValue",
              type: "string",
              defaultValue: '""',
              description: "Initial digits when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(digits: string) => void",
              defaultValue: "-",
              description: "Fires with digits only (no spaces).",
            },
            {
              name: "onBrandChange",
              type: "(brand: CardBrand) => void",
              defaultValue: "-",
              description: "Called when BIN detection changes the brand.",
            },
            {
              name: "masked",
              type: "boolean",
              defaultValue: "false",
              description: "Mask all but last 4 while blurred.",
            },
            {
              name: "showBrand",
              type: "boolean",
              defaultValue: "true",
              description: "Show brand label in the end addon.",
            },
            {
              name: "invalid",
              type: "boolean",
              defaultValue: "auto",
              description: "Override; default uses failed Luhn when length ≥ 12.",
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">CardExpiryInput / CardCvcInput</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "string",
              defaultValue: "-",
              description: "Expiry: MMYY digits. CVC: digits only.",
            },
            {
              name: "onValueChange",
              type: "(digits: string) => void",
              defaultValue: "-",
              description: "Raw digits callback.",
            },
            {
              name: "brand",
              type: "CardBrand",
              defaultValue: '"unknown"',
              description: "CVC only — Amex uses 4 digits.",
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">IbanInput</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "string",
              defaultValue: "-",
              description: "Controlled compact IBAN (no spaces).",
            },
            {
              name: "onValueChange",
              type: "(iban: string) => void",
              defaultValue: "-",
              description: "Uppercase alphanumeric without spaces.",
            },
            {
              name: "showCountry",
              type: "boolean",
              defaultValue: "true",
              description: "Show the first two letters as a start addon.",
            },
            {
              name: "invalid",
              type: "boolean",
              defaultValue: "auto",
              description: "Override; default uses failed mod-97 when length ≥ 15.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/input-group",
            title: "Input Group",
            description: "addon chrome used for brand and country",
          },
          {
            href: "/docs/components/currency-input",
            title: "Currency Input",
            description: "money amounts with Intl formatting",
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
