import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AnalyticsDashboard01 from "@/registry/blocks/dashboards-analytics/analytics-dashboard/analytics-dashboard-01/analytics-dashboard"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/dashboards-analytics/analytics-dashboard",
  "Analytics Dashboard",
  "Ready-to-use Analytics Dashboard UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AnalyticsDashboard from "@/components/blocks/dashboards-analytics/${name}/analytics-dashboard"

export default function Page() {
  return <AnalyticsDashboard />
}`

export default function BlockAnalyticsDashboardDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Analytics Dashboard"
        pathname="/blocks/dashboards-analytics/analytics-dashboard"
        description="KPI cards with sparklines, revenue bars, traffic sources, top pages, and quick stats."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="analytics-dashboard-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("analytics-dashboard-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AnalyticsDashboard01 />
        </BlockExample>
      </div>
    </article>
  )
}
