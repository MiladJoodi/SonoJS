import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Features01 from "@/registry/blocks/marketing/features/features-01/features"
import Features02 from "@/registry/blocks/marketing/features/features-02/features"
import Features03 from "@/registry/blocks/marketing/features/features-03/features"
import Features04 from "@/registry/blocks/marketing/features/features-04/features"
import Features05 from "@/registry/blocks/marketing/features/features-05/features"
import Features06 from "@/registry/blocks/marketing/features/features-06/features"
import Features07 from "@/registry/blocks/marketing/features/features-07/features"
import Features08 from "@/registry/blocks/marketing/features/features-08/features"
import Features09 from "@/registry/blocks/marketing/features/features-09/features"
import Features10 from "@/registry/blocks/marketing/features/features-10/features"
import Features11 from "@/registry/blocks/marketing/features/features-11/features"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/features", "Features", "Ready-to-use Features UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Features from "@/components/blocks/marketing/${name}/features"

export default function Page() {
  return <Features />
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

export default function BlockFeaturesDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Features"
        pathname="/blocks/marketing/features"
        description="Feature grids for marketing pages — icon cards with title, description, and learn-more links."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="features-01"
          usage={[{ title: "app/page.tsx", code: usage("features-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-4 py-12 md:px-8"
        >
          <Features01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-02"
          usage={[{ title: "app/page.tsx", code: usage("features-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Features02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-03"
          usage={[{ title: "app/page.tsx", code: usage("features-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Features03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-04"
          usage={[{ title: "app/page.tsx", code: usage("features-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Features04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-05"
          usage={[{ title: "app/page.tsx", code: usage("features-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Features05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-06"
          usage={[{ title: "app/page.tsx", code: usage("features-06") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-4 py-12 md:px-8"
        >
          <Features06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-07"
          usage={[{ title: "app/page.tsx", code: usage("features-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Features07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-08"
          usage={[{ title: "app/page.tsx", code: usage("features-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Features08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-09"
          usage={[{ title: "app/page.tsx", code: usage("features-09") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-4 py-12 md:px-8"
        >
          <Features09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-10"
          usage={[{ title: "app/page.tsx", code: usage("features-10") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-4 py-12 md:px-8"
        >
          <Features10 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="features-11"
          usage={[{ title: "app/page.tsx", code: usage("features-11") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-4 py-12 md:px-8"
        >
          <Features11 />
        </BlockExample>
      </div>
    </article>
  )
}
