import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@sonojs/ui/components/timeline"
import { cn } from "@sonojs/ui/lib/utils"

const log = [
  {
    date: "Dec 15 · 18:42",
    label: "Incident",
    tone: "bg-red-500",
    content: (
      <>
        Resolved{" "}
        <span className="text-muted-foreground">edge cache stampede</span>
      </>
    ),
  },
  {
    date: "Dec 14 · 09:10",
    label: "Release",
    tone: "bg-emerald-500",
    content: (
      <>
        Shipped{" "}
        <span className="text-muted-foreground">billing webhooks v3</span>
      </>
    ),
  },
  {
    date: "Dec 12 · 16:05",
    label: "Security",
    tone: "bg-violet-500",
    content: (
      <>
        Rotated{" "}
        <span className="text-muted-foreground">production API keys</span>
      </>
    ),
  },
  {
    date: "Dec 10 · 11:28",
    label: "Research",
    tone: "bg-blue-500",
    content: (
      <>
        Closed{" "}
        <span className="text-muted-foreground">checkout usability study</span>
      </>
    ),
  },
  {
    date: "Dec 08 · 08:00",
    label: "Kickoff",
    tone: "bg-amber-500",
    content: (
      <>
        Started{" "}
        <span className="text-muted-foreground">Q1 platform planning</span>
      </>
    ),
  },
]

export function TimelineColorDots() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight">Ops journal</h3>
        <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          Live
        </span>
      </div>

      <Timeline defaultValue={0} className="gap-3">
        {log.map((item) => (
          <TimelineItem
            key={item.date}
            step={1}
            className="not-last:pb-0 has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-border"
          >
            <TimelineHeader className="flex items-start gap-2.5">
              <TimelineSeparator className="bg-border/80" />
              <TimelineIndicator
                className={cn("size-2.5 border-none", item.tone)}
              />
              <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <TimelineDate className="mb-0 font-mono text-[10px] font-semibold tracking-wider uppercase">
                  {item.date}
                </TimelineDate>
                <span className="shrink-0 rounded-full border border-border/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
            </TimelineHeader>
            <TimelineContent className="text-sm font-medium text-foreground">
              {item.content}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
