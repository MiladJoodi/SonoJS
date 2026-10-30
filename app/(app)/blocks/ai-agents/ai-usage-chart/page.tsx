import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import { AiUsageChart } from "@/registry/blocks/ai-agents/ai-usage-chart/ai-usage-chart"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/ai-usage-chart",
  "AI Usage Chart",
  "Ready-to-use AI Usage Chart UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usageOverview = `import { AiUsageChart } from "@/components/blocks/ai-usage-chart"

export default function Page() {
  return (
    <AiUsageChart
      timeRange="7d"
      activeMetric="tokens"
      chartType="area"
      budgetLimit={100}
      currentSpend={37.2}
    />
  )
}`

const usageCost = `import { AiUsageChart } from "@/components/blocks/ai-usage-chart"

export default function Page() {
  return (
    <AiUsageChart
      title="API Cost Overview"
      badgeText="Billing"
      timeRange="30d"
      activeMetric="cost"
      chartType="bar"
      lineColor="#10b981"
      budgetLimit={150}
      currentSpend={112.4}
    />
  )
}`

const usageMinimal = `import { AiUsageChart } from "@/components/blocks/ai-usage-chart"

export default function Page() {
  return (
    <AiUsageChart
      variant="minimal"
      chartType="line"
      showBudgetAlert={false}
      showModelBreakdown={false}
      timeRange="24h"
      activeMetric="latency"
      lineColor="#f59e0b"
    />
  )
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

export default function BlockAiUsageChartDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="AI Usage Chart"
        pathname="/blocks/ai-agents/ai-usage-chart"
        description="Token consumption, model costs, request throughput, and latency — with SVG charts, metric cards, and model breakdown."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="ai-usage-chart"
          usage={[
            {
              title: "app/page.tsx",
              code: usageOverview,
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white px-10 py-12 overflow-visible dark:bg-background"
        >
          <div className="mx-auto w-full max-w-4xl">
            <AiUsageChart
              timeRange="7d"
              activeMetric="tokens"
              chartType="area"
              budgetLimit={100}
              currentSpend={37.2}
            />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="ai-usage-chart"
          usage={[
            {
              title: "app/page.tsx",
              code: usageCost,
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white px-10 py-12 overflow-visible dark:bg-background"
        >
          <div className="mx-auto w-full max-w-4xl">
            <AiUsageChart
              title="API Cost Overview"
              badgeText="Billing"
              timeRange="30d"
              activeMetric="cost"
              chartType="bar"
              lineColor="#10b981"
              budgetLimit={150}
              currentSpend={112.4}
            />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="ai-usage-chart"
          usage={[
            {
              title: "app/page.tsx",
              code: usageMinimal,
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white px-10 py-12 overflow-visible dark:bg-background"
        >
          <div className="mx-auto w-full max-w-4xl">
            <AiUsageChart
              variant="minimal"
              chartType="line"
              showBudgetAlert={false}
              showModelBreakdown={false}
              timeRange="24h"
              activeMetric="latency"
              lineColor="#f59e0b"
            />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
