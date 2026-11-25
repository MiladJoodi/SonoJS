import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { PhoneValidationCountryGuide } from "@sonojs/ui/components/phone-input-validation"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "phone-input-validation",
  "Phone Input with Validation"
)

const exampleDefs = [
  {
    name: "phone-input-validation-default",
    title: "Live status",
    description:
      "`onValidationChange` drives the hint below — try an invalid US number and blur to see the error border.",
    requires: ["input-group", "popover"],
    npmRequires: ["lucide-react", "libphonenumber-js"],
  },
  {
    name: "phone-input-validation-form-submit",
    title: "Block submit",
    description:
      "Gate submit on `state === \"valid\"` and pair `Field` + `FieldError` when the user tries anyway.",
    requires: ["button", "field", "input-group", "popover"],
    npmRequires: ["lucide-react", "libphonenumber-js"],
  },
  {
    name: "phone-input-validation-controlled",
    title: "Controlled",
    description:
      "Control `value`, `country`, and read `onValidationChange` for empty, incomplete, valid, or invalid.",
    requires: ["button", "input-group", "popover"],
    npmRequires: ["lucide-react", "libphonenumber-js"],
  },
  {
    name: "phone-input-validation-with-label",
    title: "With Label",
    description:
      "Pair with `Label`; switching country keeps the digits and re-formats for the new region.",
    requires: ["input-group", "label", "popover"],
    npmRequires: ["lucide-react", "libphonenumber-js"],
  },
  {
    name: "phone-input-validation-disabled",
    title: "Disabled",
    description: "Pass `disabled` to lock the country trigger and national field.",
    requires: ["input-group", "popover"],
    npmRequires: ["lucide-react", "libphonenumber-js"],
  },
]

const usageSource = `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  PhoneInputValidation,
  type PhoneValidationState,
} from "@/components/phone-input-validation"

export function Example() {
  const [state, setState] = React.useState<PhoneValidationState>("empty")
  const [attempted, setAttempted] = React.useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setAttempted(true)
        if (state !== "valid") return
        // send API…
      }}
    >
      <Field data-invalid={attempted && state !== "valid" ? true : undefined}>
        <FieldLabel htmlFor="phone">Phone</FieldLabel>
        <PhoneInputValidation
          id="phone"
          defaultCountry="US"
          onValidationChange={setState}
        />
        {attempted && state === "invalid" ? (
          <FieldError>Enter a valid phone number.</FieldError>
        ) : null}
      </Field>
      <Button type="submit" className="mt-3">
        Continue
      </Button>
    </form>
  )
}`

export default async function PhoneInputValidationDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Phone Input with Validation"
        pathname="/docs/components/phone-input-validation"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Same country picker and flags as{" "}
            <a
              href="/docs/components/phone-input"
              className="cursor-pointer text-foreground underline underline-offset-4"
            >
              Phone Input
            </a>
            , plus national formatting, per-country validation, and{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              onValidationChange
            </code>{" "}
            for form gating. Digits are kept when the country changes.{" "}
            <PhoneValidationCountryGuide />
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="phone-input-validation" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="phone-input-validation.tsx"
          lang="tsx"
          code={usageSource}
        />
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
              description:
                "Controlled national number (formatted or digits; sanitized internally).",
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
              description: "Fires with the formatted national number.",
            },
            {
              name: "onValueChange",
              type: "(payload) => void",
              defaultValue: "-",
              description:
                "Formatted national, raw digits, validation state, and optional E.164 when valid.",
            },
            {
              name: "onValidationChange",
              type: '(state: "empty" | "incomplete" | "valid" | "invalid") => void',
              defaultValue: "-",
              description: "Fires whenever the validation state changes.",
            },
            {
              name: "invalid",
              type: "boolean",
              defaultValue: "-",
              description: "Force invalid styling regardless of derived state.",
            },
            {
              name: "showFlag",
              type: "boolean",
              defaultValue: "true",
              description:
                "When `false`, hides flag images and shows dial codes only.",
            },
            {
              name: "flagCdnBase",
              type: "string",
              defaultValue: "SonoJS flags CDN",
              description: "CDN base for flag SVGs (no trailing slash).",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the country picker and input.",
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