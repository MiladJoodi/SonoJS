import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Stats01 from "@/registry/blocks/marketing/stats/stats-01/stats"
import Stats02 from "@/registry/blocks/marketing/stats/stats-02/stats"
import Stats03 from "@/registry/blocks/marketing/stats/stats-03/stats"
import Stats04 from "@/registry/blocks/marketing/stats/stats-04/stats"
import Stats05 from "@/registry/blocks/marketing/stats/stats-05/stats"
import Stats06 from "@/registry/blocks/marketing/stats/stats-06/stats"
import Stats07 from "@/registry/blocks/marketing/stats/stats-07/stats"
import Stats08 from "@/registry/blocks/marketing/stats/stats-08/stats"
import Stats09 from "@/registry/blocks/marketing/stats/stats-09/stats"
import Stats10 from "@/registry/blocks/marketing/stats/stats-10/stats"
import Stats11 from "@/registry/blocks/marketing/stats/stats-11/stats"
import Stats12 from "@/registry/blocks/marketing/stats/stats-12/stats"
import Stats13 from "@/registry/blocks/marketing/stats/stats-13/stats"
import Stats14 from "@/registry/blocks/marketing/stats/stats-14/stats"
import Stats15 from "@/registry/blocks/marketing/stats/stats-15/stats"
import Stats16 from "@/registry/blocks/marketing/stats/stats-16/stats"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/stats", "Stats", "Ready-to-use Stats UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Stats from "@/components/blocks/marketing/${name}/stats"

export default function Page() {
  return <Stats />
}`

export default function BlockStatsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Stats"
        pathname="/blocks/marketing/stats"
        description="Metric and social-proof bands for marketing pages — counts, KPIs, and outcome highlights."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="stats-01"
          usage={[{ title: "app/page.tsx", code: usage("stats-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats01 />
        </BlockExample>

        <BlockExample
          name="stats-02"
          usage={[{ title: "app/page.tsx", code: usage("stats-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats02 />
        </BlockExample>

        <BlockExample
          name="stats-03"
          usage={[{ title: "app/page.tsx", code: usage("stats-03") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats03 />
        </BlockExample>

        <BlockExample
          name="stats-04"
          usage={[{ title: "app/page.tsx", code: usage("stats-04") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats04 />
        </BlockExample>

        <BlockExample
          name="stats-05"
          usage={[{ title: "app/page.tsx", code: usage("stats-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats05 />
        </BlockExample>

        <BlockExample
          name="stats-06"
          usage={[{ title: "app/page.tsx", code: usage("stats-06") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats06 />
        </BlockExample>

        <BlockExample
          name="stats-07"
          usage={[{ title: "app/page.tsx", code: usage("stats-07") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats07 />
        </BlockExample>

        <BlockExample
          name="stats-08"
          usage={[{ title: "app/page.tsx", code: usage("stats-08") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats08 />
        </BlockExample>

        <BlockExample
          name="stats-09"
          usage={[{ title: "app/page.tsx", code: usage("stats-09") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats09 />
        </BlockExample>

        <BlockExample
          name="stats-10"
          usage={[{ title: "app/page.tsx", code: usage("stats-10") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats10 />
        </BlockExample>

        <BlockExample
          name="stats-11"
          usage={[{ title: "app/page.tsx", code: usage("stats-11") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats11 />
        </BlockExample>

        <BlockExample
          name="stats-12"
          usage={[{ title: "app/page.tsx", code: usage("stats-12") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats12 />
        </BlockExample>

        <BlockExample
          name="stats-13"
          usage={[{ title: "app/page.tsx", code: usage("stats-13") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats13 />
        </BlockExample>

        <BlockExample
          name="stats-14"
          usage={[{ title: "app/page.tsx", code: usage("stats-14") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats14 />
        </BlockExample>

        <BlockExample
          name="stats-15"
          usage={[{ title: "app/page.tsx", code: usage("stats-15") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats15 />
        </BlockExample>

        <BlockExample
          name="stats-16"
          usage={[{ title: "app/page.tsx", code: usage("stats-16") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Stats16 />
        </BlockExample>
      </div>
    </article>
  )
}
