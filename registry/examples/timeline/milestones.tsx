import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@sonojs/ui/components/timeline"
import { cn } from "@sonojs/ui/lib/utils"

const story = [
  { id: 1, date: "2019", title: "Founded in a shared studio" },
  { id: 2, date: "2021", title: "First enterprise design system" },
  { id: 3, date: "2023", title: "Opened the public registry" },
  { id: 4, date: "2025", title: "Series A · global teams" },
  { id: 5, date: "2026", title: "AI-assisted component authoring" },
]

export function TimelineMilestones() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-1 text-center">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Company arc
        </p>
        <h3 className="text-lg font-semibold tracking-tight">Milestones</h3>
      </div>

      <Timeline defaultValue={4} className="w-full">
        {story.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className={cn(
              "w-full",
              "sm:w-[calc(50%-1.5rem)] sm:odd:ms-auto sm:even:ms-0 sm:even:me-10 sm:even:text-end",
              "sm:even:**:data-[slot=timeline-indicator]:-end-6 sm:even:**:data-[slot=timeline-indicator]:start-auto",
              "sm:even:**:data-[slot=timeline-indicator]:translate-x-1/2 sm:even:**:data-[slot=timeline-indicator]:rtl:-translate-x-1/2",
              "sm:even:**:data-[slot=timeline-separator]:-end-6 sm:even:**:data-[slot=timeline-separator]:start-auto",
              "sm:even:**:data-[slot=timeline-separator]:translate-x-1/2 sm:even:**:data-[slot=timeline-separator]:rtl:-translate-x-1/2"
            )}
          >
            <TimelineHeader>
              <TimelineSeparator className="bg-border" />
              <TimelineDate className="mb-0.5 font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                {item.date}
              </TimelineDate>
              <TimelineTitle className="text-sm font-medium leading-snug text-foreground">
                {item.title}
              </TimelineTitle>
              <TimelineIndicator className="size-3 border-2 border-primary group-data-completed/timeline-item:bg-primary" />
            </TimelineHeader>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
