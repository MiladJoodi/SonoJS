import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import KpiCards01 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-01/kpi-cards"
import KpiCards02 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-02/kpi-cards"
import KpiCards03 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-03/kpi-cards"
import KpiCards04 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-04/kpi-cards"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/dashboards-analytics/kpi-cards",
  "KPI Cards",
  "Ready-to-use KPI Cards UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import KpiCards from "@/components/blocks/dashboards-analytics/${name}/kpi-cards"

export default function Page() {
  return <KpiCards />
}`

const previewClassName = "bg-canvas p-0"

export default function BlockKpiCardsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="KPI Cards"
        pathname="/blocks/dashboards-analytics/kpi-cards"
        description="Sparklines, regional goals, budget gauges, or product trend area charts."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="kpi-cards-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("kpi-cards-01"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <KpiCards01 />
        </BlockExample>

        <BlockExample
          name="kpi-cards-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("kpi-cards-02"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <KpiCards02 />
        </BlockExample>

        <BlockExample
          name="kpi-cards-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("kpi-cards-03"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <KpiCards03 />
        </BlockExample>

        <BlockExample
          name="kpi-cards-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("kpi-cards-04"),
            },
          ]}
          previewAlign="start"
          previewClassName={previewClassName}
        >
          <KpiCards04 />
        </BlockExample>
      </div>
    </article>
  )
}
