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

export const metadata = componentDocsMetadata("password-input", "Password Input")

const exampleDefs = [
  {
    name: "password-input-gallery",
    title: "Gallery",
    description:
      "Complete create-password card with strength, checklist, and copy.",
    requires: ["input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "password-input-default",
    title: "Basic",
    description: "Password field with show / hide only.",
    requires: ["input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "password-input-strength",
    title: "Strength",
    description:
      "Pass `showStrength` for a four-level Weak → Strong meter.",
    requires: ["input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "password-input-requirements",
    title: "Requirements",
    description:
      "Live checklist via `showRequirements`. Override rules with `requirements`.",
    requires: ["input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "password-input-complete",
    title: "Complete",
    description:
      "Strength, requirements, copy, and Caps Lock warning together.",
    requires: ["input-group"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "password-input-confirm",
    title: "Confirm password",
    description:
      "Pair two fields with Field for match / mismatch feedback.",
    requires: ["input-group", "field"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "password-input-disabled",
    title: "Disabled / invalid",
    description: "`disabled` and `aria-invalid` states on the control.",
    requires: ["input-group"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { PasswordInput } from "@/components/password-input"

export function Example() {
  return (
    <PasswordInput
      placeholder="Password"
      showStrength
      showRequirements
      autoComplete="new-password"
    />
  )
}`

export default async function PasswordInputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Password Input"
        pathname="/docs/components/password-input"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Password field for login, sign-up, and reset flows. Show / hide,
            optional strength meter, requirements checklist, copy, and Caps Lock
            warning — built on{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              InputGroup
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="password-input" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="password-input.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value / defaultValue / onChange",
              type: "string / ChangeEvent",
              defaultValue: "-",
              description:
                "Native input value API — works with React Hook Form.",
            },
            {
              name: "showStrength",
              type: "boolean",
              defaultValue: "false",
              description: "Show the four-level strength meter.",
            },
            {
              name: "showRequirements",
              type: "boolean",
              defaultValue: "false",
              description: "Show the live requirements checklist.",
            },
            {
              name: "showCopy",
              type: "boolean",
              defaultValue: "false",
              description: "Show a copy-to-clipboard button.",
            },
            {
              name: "showCapsLockWarning",
              type: "boolean",
              defaultValue: "true",
              description: "Warn when Caps Lock is on while focused.",
            },
            {
              name: "minLength",
              type: "number",
              defaultValue: "8",
              description:
                "Minimum length for default requirements and strength.",
            },
            {
              name: "requirements",
              type: "PasswordRequirement[]",
              defaultValue: "defaults",
              description:
                "Custom `{ id, label, test }` rules for the checklist.",
            },
            {
              name: "visible / defaultVisible / onVisibleChange",
              type: "boolean",
              defaultValue: "false",
              description: "Control show / hide password visibility.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the input and addon buttons.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merge Tailwind classes on the root wrapper.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/input",
            title: "Input",
            description: "plain text fields",
          },
          {
            href: "/docs/components/input-group",
            title: "Input Group",
            description: "addons and icon buttons",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label and describe the control",
          },
          {
            href: "/docs/components/input-otp",
            title: "Input OTP",
            description: "one-time codes",
          },
        ]}
      />
    </article>
  )
}
