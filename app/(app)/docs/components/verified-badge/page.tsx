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
    description: "`blue` for creators, `gold` for business, `gray` for muted.",
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
            Instagram-style verified seal for creators, businesses, and trust
            UI — place next to names, in comments, or on seller cards.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="verified-badge" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="verified-badge.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"blue" | "gold" | "gray"',
              defaultValue: '"blue"',
              description: "Seal color — creator blue, business gold, or muted gray.",
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
