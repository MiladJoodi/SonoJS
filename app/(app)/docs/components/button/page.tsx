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

export const metadata = componentDocsMetadata("button", "Button")

const exampleDefs = [
  {
    name: "button-default",
    title: "Default",
    description: "Primary action filled with brand blue.",
  },
  {
    name: "button-outline",
    title: "Outline",
    description: 'Use `variant="outline"` for secondary chrome on a surface.',
  },
  {
    name: "button-secondary",
    title: "Secondary",
    description: 'Use `variant="secondary"` for quieter filled actions.',
  },
  {
    name: "button-ghost",
    title: "Ghost",
    description: 'Use `variant="ghost"` for low-emphasis toolbar actions.',
  },
  {
    name: "button-destructive",
    title: "Destructive",
    description: 'Use `variant="destructive"` for delete and irreversible actions.',
  },
  {
    name: "button-sizes",
    title: "Sizes",
    description: "Control height with `size` - xs, sm, default, lg, and icon sizes.",
  },
]

const buttonSource = `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Button</Button>
}`

export default async function ButtonDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Button"
        pathname="/docs/components/button"
        description={
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>
              Primary actions use brand blue; outline, secondary, and ghost stay
              neutral for secondary chrome. Default height is{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                46px
              </code>{" "}
              with accessible focus rings on every size.
            </p>
            <p>
              Use for CTAs, form submits, and toolbar actions. Pair icon-only
              sizes with a clear{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                aria-label
              </code>
              .
            </p>
          </div>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="button" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="button.tsx" lang="tsx" code={buttonSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"',
              defaultValue: '"default"',
              description: "Visual style of the button.",
            },
            {
              name: "size",
              type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
              defaultValue: '"default"',
              description: "Control height and padding.",
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

      <DocsRelated
        links={[
          {
            href: "/docs/components/button-group",
            title: "Button Group",
            description: "related actions that share one border",
          },
          {
            href: "/docs/components/pro-button",
            title: "Pro Button",
            description: "upgrade and Pro CTAs",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label and validate form controls around buttons",
          },
          {
            href: "/blocks/authentication/login",
            title: "Login blocks",
            description: "full sign-in layouts that use Button",
          },
        ]}
      />
    </article>
  )
}
