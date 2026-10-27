import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Jumbotron01 from "@/registry/blocks/marketing/jumbotron/jumbotron-01/jumbotron"
import Jumbotron02 from "@/registry/blocks/marketing/jumbotron/jumbotron-02/jumbotron"
import Jumbotron03 from "@/registry/blocks/marketing/jumbotron/jumbotron-03/jumbotron"
import Jumbotron04 from "@/registry/blocks/marketing/jumbotron/jumbotron-04/jumbotron"
import Jumbotron05 from "@/registry/blocks/marketing/jumbotron/jumbotron-05/jumbotron"
import Jumbotron06 from "@/registry/blocks/marketing/jumbotron/jumbotron-06/jumbotron"
import Jumbotron07 from "@/registry/blocks/marketing/jumbotron/jumbotron-07/jumbotron"
import Jumbotron08 from "@/registry/blocks/marketing/jumbotron/jumbotron-08/jumbotron"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/jumbotron", "Jumbotron", "Ready-to-use Jumbotron UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Jumbotron from "@/components/blocks/marketing/${name}/jumbotron"

export default function Page() {
  return <Jumbotron />
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

export default function BlockJumbotronDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Jumbotron"
        pathname="/blocks/marketing/jumbotron"
        description="Promotional callout panels with a clear headline, short body, and a primary action."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="jumbotron-01"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-01") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-02"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-02") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-03"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-03") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-04"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-04") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron04 className="w-full" />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-05"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-05") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron05 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-06"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-06") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron06 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-07"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-07") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron07 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="jumbotron-08"
          usage={[{ title: "app/page.tsx", code: usage("jumbotron-08") }]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Jumbotron08 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
