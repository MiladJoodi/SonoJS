import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("rainbow-button", "Rainbow Button")

const exampleDefs = [
  {
    name: "rainbow-button-default",
    title: "Variants",
    description:
      "`default` stays dark, `white` stays light, `theme` follows the color scheme, and `outline` uses a soft surface.",
  },
  {
    name: "rainbow-button-sizes",
    title: "Sizes",
    description:
      "Same control scale as `Button` — xs, sm, default (`46px`), and lg.",
  },
  {
    name: "rainbow-button-icon",
    title: "With icon",
    description: "Pair with a Lucide icon for a VIP or premium CTA.",
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { RainbowButton } from "@/components/ui/rainbow-button"

export function Example() {
  return <RainbowButton>Get Unlimited Access</RainbowButton>
}`

export default async function RainbowButtonDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Rainbow Button"
        pathname="/docs/components/rainbow-button"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An animated button with a continuous rainbow border and under-glow.
            Heights and radius match{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              Button
            </code>
            . Install also injects the spectrum tokens and keyframes into your
            theme CSS.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="rainbow-button" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="rainbow-button.tsx"
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
              type: '"default" | "white" | "theme" | "outline"',
              defaultValue: '"default"',
              description:
                "Dark fill, white fill, theme-adaptive fill, or outline surface. Label color is locked to the fill for contrast.",
            },
            {
              name: "size",
              type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
              defaultValue: '"default"',
              description:
                "Same scale as Button — default `46px`, sm `40px`, lg `52px`, plus icon sizes.",
            },
            {
              name: "asChild",
              type: "boolean",
              defaultValue: "false",
              description: "Merge props onto the child element via Slot.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables pointer events and dims the control.",
            },
          ]}
        />
      </section>
    </article>
  )
}
