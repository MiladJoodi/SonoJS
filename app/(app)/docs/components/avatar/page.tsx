import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("avatar", "Avatar")

const exampleDefs = [
  {
    name: "avatar-default",
    title: "Default",
    description: "Image, fallback, status badge, and overlapping groups.",
  },
  {
    name: "avatar-basic",
    title: "Basic",
    description: "Image with a text fallback when the source fails.",
  },
  {
    name: "avatar-sizes",
    title: "Sizes",
    description: 'Use `size` — `sm`, default, or `lg`.',
  },
  {
    name: "avatar-badge",
    title: "Badge",
    description: "Add `AvatarBadge` for status or a small icon.",
  },
  {
    name: "avatar-group",
    title: "Group",
    description: "Overlap avatars with `AvatarGroup` and an overflow count.",
  },
]

const usageSource = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="/images/docs/01.webp" alt="User 1" />
      <AvatarFallback>U1</AvatarFallback>
    </Avatar>
  )
}`

export default async function AvatarDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Avatar"
        pathname="/docs/components/avatar"
        description={
          <p className="leading-relaxed text-muted-foreground">
          An image element with a fallback for representing the user — with
          optional badge, sizes, and overlapping groups.
        </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="avatar" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="avatar.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "size",
              type: '"default" | "sm" | "lg"',
              defaultValue: '"default"',
              description:
                "Avatar size. Default 32px (size-8), sm 24px, lg 40px.",
            },
          ]}
        />
      </section>
    </article>
  )
}
