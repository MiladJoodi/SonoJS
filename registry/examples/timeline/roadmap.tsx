import { Badge } from "@sonojs/ui/components/badge"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@sonojs/ui/components/timeline"

const quarters = [
  {
    id: 1,
    date: "Q1 · 2026",
    title: "Workspace intelligence",
    status: "Shipped",
    description:
      "Context-aware suggestions, inline diffs, and retrieval across the open project graph.",
  },
  {
    id: 2,
    date: "Q2 · 2026",
    title: "Realtime collaboration",
    status: "In flight",
    description:
      "Presence, shared cursors, and conflict-free edits for multiplayer design sessions.",
  },
  {
    id: 3,
    date: "Q3 · 2026",
    title: "Theme studio",
    status: "Next",
    description:
      "Visual tokens, automated CSS variables, and export packs for brand systems.",
  },
  {
    id: 4,
    date: "Q4 · 2026",
    title: "Enterprise controls",
    status: "Planned",
    description:
      "SSO, SCIM, region pinning, and fine-grained roles for regulated teams.",
  },
]

export function TimelineRoadmap() {
  return (
    <Timeline defaultValue={2} className="w-full max-w-xl sm:ps-40">
      {quarters.map((item) => (
        <TimelineItem key={item.id} step={item.id}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate className="mb-1 font-mono text-[11px] tracking-wider uppercase sm:absolute sm:-start-40 sm:mb-0 sm:w-28 sm:pe-4 sm:text-end">
              {item.date}
            </TimelineDate>
            <div className="flex flex-wrap items-center gap-2 sm:-mt-0.5">
              <TimelineTitle className="min-w-0 text-base font-semibold tracking-tight text-foreground">
                {item.title}
              </TimelineTitle>
              <Badge
                variant={
                  item.status === "Shipped"
                    ? "secondary"
                    : item.status === "In flight"
                      ? "default"
                      : "outline"
                }
              >
                {item.status}
              </Badge>
            </div>
            <TimelineIndicator className="border-border group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary" />
          </TimelineHeader>
          <TimelineContent className="mt-1 max-w-prose leading-relaxed">
            {item.description}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
