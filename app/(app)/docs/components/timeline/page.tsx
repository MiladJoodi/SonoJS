import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("timeline", "Timeline")

const verticalDefs = [
  {
    name: "timeline-default",
    title: "Launch log",
    description:
      "A calm vertical changelog. Completed steps fill the indicator via `defaultValue`.",
  },
  {
    name: "timeline-roadmap",
    title: "Product roadmap",
    description:
      "Quarter labels on the start rail with status badges for shipped vs planned work.",
    requires: ["badge"],
  },
  {
    name: "timeline-with-icons",
    title: "Shipment tracking",
    description:
      "Card-framed courier timeline with check / truck indicators per stop.",
    npmRequires: ["lucide-react"],
  },
  {
    name: "timeline-git-activity",
    title: "Repository activity",
    description:
      "Engineering feed with Lucide git icons, mono meta, and a repo chrome header.",
    requires: ["badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "timeline-milestones",
    title: "Company milestones",
    description:
      "Zigzag year markers along a centered rail — odd/even start and end columns.",
  },
  {
    name: "timeline-color-dots",
    title: "Ops journal",
    description:
      "Dense colored dots and category chips. `defaultValue={0}` keeps every row open.",
  },
  {
    name: "timeline-activity",
    title: "Team feed",
    description:
      "Avatar indicators and relative times for a product team activity stream.",
    requires: ["avatar"],
  },
  {
    name: "timeline-deployments",
    title: "Deploy console",
    description:
      "Success and failed deploys with mono commit / branch / env metadata.",
    requires: ["badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "timeline-pipeline",
    title: "CI pipeline",
    description:
      "Live run with spinner on the active step and collapsible assignee cards.",
    requires: ["avatar", "badge", "collapsible", "spinner"],
    npmRequires: ["lucide-react"],
  },
]

const horizontalDefs = [
  {
    name: "timeline-horizontal",
    title: "Sprint phases",
    description:
      "`orientation=\"horizontal\"` for a short delivery plan across the sprint.",
  },
  {
    name: "timeline-horizontal-dates",
    title: "Program track",
    description:
      "Dates above the rail (`top-8` indicators) inside a soft product card.",
  },
  {
    name: "timeline-releases",
    title: "Version track",
    description:
      "Semver milestones with released / current / upcoming indicator states.",
    requires: ["badge"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

export function Example() {
  return (
    <Timeline defaultValue={2} className="w-full max-w-lg">
      <TimelineItem step={1}>
        <TimelineHeader>
          <TimelineDate>Mar 12, 2025</TimelineDate>
          <TimelineTitle>Private alpha</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Invite-only access for design partners.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineHeader>
          <TimelineDate>Jun 3, 2025</TimelineDate>
          <TimelineTitle>Public beta</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Waitlist opened with usage meters and team invites.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem step={3}>
        <TimelineHeader>
          <TimelineDate>Sep 18, 2025</TimelineDate>
          <TimelineTitle>General availability</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Stable SLA and self-serve onboarding for every plan.
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}`

export default async function TimelineDocsPage() {
  const [verticalExamples, horizontalExamples] = await Promise.all([
    withVariantCode(verticalDefs),
    withVariantCode(horizontalDefs),
  ])

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Timeline"
        pathname="/docs/components/timeline"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Ordered events with a progress step. Drive completion with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              defaultValue
            </code>{" "}
            or controlled{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              value
            </code>
            . Vertical or horizontal, LTR and RTL.
          </p>
        }
      />

      <section className="space-y-4">
        <h2 className="text-h3">Vertical</h2>
        <ComponentVariantPreview
          examples={verticalExamples}
          previewSurface="card"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Horizontal</h2>
        <ComponentVariantPreview
          examples={horizontalExamples}
          previewSurface="card"
          allowOverflow
        />
      </section>

      <DocsInstallation name="timeline" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="timeline.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "defaultValue",
              type: "number",
              defaultValue: "1",
              description:
                "Initial active step. Items with `step` ≤ this value are completed.",
            },
            {
              name: "value",
              type: "number",
              defaultValue: "—",
              description: "Controlled active step.",
            },
            {
              name: "onValueChange",
              type: "(value: number) => void",
              defaultValue: "—",
              description: "Called when the active step changes.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              defaultValue: '"vertical"',
              description: "Layout axis for items, separators, and indicators.",
            },
            {
              name: "step",
              type: "number",
              defaultValue: "—",
              description:
                "`TimelineItem` only. Ordinal index compared to the active step.",
            },
            {
              name: "asChild",
              type: "boolean",
              defaultValue: "false",
              description:
                "`TimelineDate` / `TimelineIndicator` — merge props onto the child.",
            },
          ]}
        />
      </section>
    </article>
  )
}
