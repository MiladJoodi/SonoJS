import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import HowItWorks01 from "@/registry/blocks/marketing/how-it-works/how-it-works-01/how-it-works"
import HowItWorks02 from "@/registry/blocks/marketing/how-it-works/how-it-works-02/how-it-works"
import HowItWorks03 from "@/registry/blocks/marketing/how-it-works/how-it-works-03/how-it-works"
import HowItWorks04 from "@/registry/blocks/marketing/how-it-works/how-it-works-04/how-it-works"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/how-it-works",
  "How It Works",
  "Ready-to-use How It Works UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import HowItWorks from "@/components/blocks/marketing/${name}/how-it-works"

export default function Page() {
  return <HowItWorks />
}`

export default function BlockHowItWorksDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="How It Works"
        pathname="/blocks/marketing/how-it-works"
        description="Editorial steps, booking desk, AI agent loop, and modern passkey sign-in."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="how-it-works-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("how-it-works-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <HowItWorks01 />
        </BlockExample>

        <BlockExample
          name="how-it-works-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("how-it-works-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <HowItWorks02 />
        </BlockExample>

        <BlockExample
          name="how-it-works-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("how-it-works-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-zinc-950 p-0"
        >
          <HowItWorks03 />
        </BlockExample>

        <BlockExample
          name="how-it-works-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("how-it-works-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <HowItWorks04 />
        </BlockExample>
      </div>
    </article>
  )
}
