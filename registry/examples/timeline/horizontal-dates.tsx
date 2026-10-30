"use client"

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

const journey = [
  {
    id: 1,
    date: "Oct 2025",
    title: "Discover",
    description: "Stakeholder interviews and success metrics for the redesign.",
  },
  {
    id: 2,
    date: "Nov 2025",
    title: "Prototype",
    description: "Interactive flows for search, filters, and empty states.",
  },
  {
    id: 3,
    date: "Dec 2025",
    title: "Ship",
    description: "Staged rollout at 10% → 50% → 100% with guardrail metrics.",
  },
]

export function TimelineHorizontalDates() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Product program
        </p>
        <h3 className="text-base font-semibold tracking-tight">
          Catalog search overhaul
        </h3>
      </div>

      <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pt-2 pb-1">
        <Timeline
          defaultValue={2}
          orientation="horizontal"
          className="min-w-[28rem] w-full sm:min-w-0"
        >
          {journey.map((item) => (
            <TimelineItem
              key={item.id}
              step={item.id}
              className="mt-0 min-w-0"
            >
              <TimelineHeader>
                <TimelineSeparator className="top-10" />
                <TimelineDate className="mb-12 font-mono text-[11px] font-semibold tracking-wider text-primary uppercase">
                  {item.date}
                </TimelineDate>
                <TimelineTitle className="text-sm font-semibold text-foreground">
                  {item.title}
                </TimelineTitle>
                <TimelineIndicator className="top-10 border-border group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary" />
              </TimelineHeader>
              <TimelineContent className="max-w-[13rem] text-sm leading-relaxed">
                {item.description}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  )
}
