import { AccessGate } from "@/components/access/access-gate"
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
  "verified-badge",
  "Verified Badge"
)

const exampleDefs = [
  {
    name: "verified-badge-default",
    title: "Default",
    description: "Sizes and color variants of the verified seal.",
  },
  {
    name: "verified-badge-variants",
    title: "Variants",
    description:
      "X / Twitter tiers — `blue` Premium, `gold` business, `gray` government.",
  },
  {
    name: "verified-badge-profile",
    title: "Profile",
    description: "Name row with avatar and a verified mark beside the display name.",
    requires: ["avatar"],
  },
  {
    name: "verified-badge-comment",
    title: "Comment",
    description: "Compact feed comment — username, tick, and timestamp.",
    requires: ["avatar"],
  },
  {
    name: "verified-badge-seller",
    title: "Seller card",
    description: "Store card with a gold business badge and rating strip.",
    requires: ["avatar", "button", "card"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "verified-badge-trust",
    title: "Trust strip",
    description: "Pair with `Badge` and `Item` for checkout or onboarding trust.",
    requires: ["badge", "item"],
  },
]

const usageSource = `import { VerifiedBadge } from "@/components/ui/verified-badge"

export function Example() {
  return <VerifiedBadge />
}`

export default async function VerifiedBadgeDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Verified Badge"
        pathname="/docs/components/verified-badge"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Verified seal for creators, businesses, and institutions — X /
            Twitter color tiers (`blue`, `gold`, `gray`). Place next to names,
            in comments, or on seller cards.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="verified-badge" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <AccessGate access="member">
          <ComponentSource
            title="verified-badge.tsx"
            lang="tsx"
            code={usageSource}
          />
        </AccessGate>
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"blue" | "gold" | "gray"',
              defaultValue: '"blue"',
              description:
                "X / Twitter tiers — Premium blue (`#1D9BF0`), business gold (`#E2B719`), government gray (`#829AAB`).",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Preset size (`size-3.5` / `size-4` / `size-5`).",
            },
            {
              name: "title",
              type: "string",
              defaultValue: '"Verified"',
              description: "Accessible name exposed via `aria-label` and `<title>`.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes (overrides size/color via Tailwind).",
            },
          ]}
        />
      </section>
    </article>
  )
}
