import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Banner01 from "@/registry/blocks/marketing/banner/banner-01/banner"
import Banner02 from "@/registry/blocks/marketing/banner/banner-02/banner"
import Banner03 from "@/registry/blocks/marketing/banner/banner-03/banner"
import Banner04 from "@/registry/blocks/marketing/banner/banner-04/banner"
import Banner05 from "@/registry/blocks/marketing/banner/banner-05/banner"
import Banner06 from "@/registry/blocks/marketing/banner/banner-06/banner"
import Banner07 from "@/registry/blocks/marketing/banner/banner-07/banner"
import Banner08 from "@/registry/blocks/marketing/banner/banner-08/banner"
import Banner09 from "@/registry/blocks/marketing/banner/banner-09/banner"
import Banner10 from "@/registry/blocks/marketing/banner/banner-10/banner"
import Banner11 from "@/registry/blocks/marketing/banner/banner-11/banner"
import Banner12 from "@/registry/blocks/marketing/banner/banner-12/banner"
import Banner13 from "@/registry/blocks/marketing/banner/banner-13/banner"
import Banner14 from "@/registry/blocks/marketing/banner/banner-14/banner"
import Banner15 from "@/registry/blocks/marketing/banner/banner-15/banner"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/banner",
  "Banner",
  "Ready-to-use Banner UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Banner from "@/components/blocks/marketing/${name}/banner"

export default function Page() {
  return <Banner />
}`

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

const examples = [
  { name: "banner-01", node: <Banner01 />, stage: "bg-canvas" },
  { name: "banner-02", node: <Banner02 />, stage: "bg-canvas" },
  { name: "banner-03", node: <Banner03 />, stage: "bg-canvas" },
  { name: "banner-04", node: <Banner04 />, stage: "bg-canvas" },
  { name: "banner-05", node: <Banner05 />, stage: "bg-canvas px-4" },
  { name: "banner-06", node: <Banner06 />, stage: "bg-canvas px-4" },
  { name: "banner-07", node: <Banner07 />, stage: "bg-canvas" },
  { name: "banner-08", node: <Banner08 />, stage: "bg-canvas" },
  { name: "banner-09", node: <Banner09 />, stage: "bg-canvas" },
  { name: "banner-10", node: <Banner10 />, stage: "bg-canvas" },
  { name: "banner-11", node: <Banner11 />, stage: "bg-canvas" },
  { name: "banner-12", node: <Banner12 />, stage: "bg-canvas" },
  { name: "banner-13", node: <Banner13 />, stage: "bg-canvas" },
  { name: "banner-14", node: <Banner14 />, stage: "bg-canvas" },
  { name: "banner-15", node: <Banner15 />, stage: "bg-canvas" },
] as const

export default function BlockBannerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Banner"
        pathname="/blocks/marketing/banner"
        description="Top-of-site announcement strips for launches, promos, passkeys, and deals — stack above your navbar."
      />

      <div className="flex flex-col gap-8">
        {examples.map((example, index) => (
          <div key={example.name} className="contents">
            {index > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={example.name}
              usage={[{ title: "app/page.tsx", code: usage(example.name) }]}
              previewAlign="center"
              previewSize="compact"
              previewClassName={example.stage}
            >
              {example.node}
            </BlockExample>
          </div>
        ))}
      </div>
    </article>
  )
}
