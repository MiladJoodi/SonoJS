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

const sprint = [
  {
    id: 1,
    date: "Day 1–2",
    title: "Shape",
    description: "Scope, risks, and acceptance criteria locked with PM.",
  },
  {
    id: 2,
    date: "Day 3–7",
    title: "Build",
    description: "Implement the happy path and wire analytics events.",
  },
  {
    id: 3,
    date: "Day 8–10",
    title: "Harden",
    description: "Edge cases, a11y pass, and release checklist signed off.",
  },
]

export function TimelineHorizontal() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Sprint 42
          </p>
          <h3 className="text-base font-semibold tracking-tight">
            Checkout recovery
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">2 of 3 phases complete</p>
      </div>

      <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pt-2 pb-1">
        <Timeline
          defaultValue={2}
          orientation="horizontal"
          className="min-w-[28rem] w-full sm:min-w-0"
        >
          {sprint.map((item) => (
            <TimelineItem key={item.id} step={item.id} className="min-w-0">
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineDate className="font-mono text-[11px] tracking-wide uppercase">
                  {item.date}
                </TimelineDate>
                <TimelineTitle className="text-sm font-semibold text-foreground">
                  {item.title}
                </TimelineTitle>
                <TimelineIndicator className="border-border group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary" />
              </TimelineHeader>
              <TimelineContent className="max-w-[14rem] text-xs leading-relaxed sm:text-sm">
                {item.description}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  )
}
