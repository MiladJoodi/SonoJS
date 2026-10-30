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

const launches = [
  {
    step: 1,
    date: "Mar 12, 2025",
    title: "Private alpha",
    body: "Invite-only access for design partners. Core auth, projects, and billing scaffolding landed.",
  },
  {
    step: 2,
    date: "Jun 3, 2025",
    title: "Public beta",
    body: "Opened waitlist to the public. Added usage meters, team invites, and audit export.",
  },
  {
    step: 3,
    date: "Sep 18, 2025",
    title: "General availability",
    body: "Stable SLA, regional failover, and self-serve onboarding for every plan.",
  },
]

export function TimelineDefault() {
  return (
    <Timeline defaultValue={2} className="w-full max-w-lg">
      {launches.map((item) => (
        <TimelineItem key={item.step} step={item.step}>
          <TimelineHeader>
            <TimelineDate className="font-mono text-[11px] tracking-wide uppercase">
              {item.date}
            </TimelineDate>
            <TimelineTitle className="text-base font-semibold tracking-tight text-foreground">
              {item.title}
            </TimelineTitle>
          </TimelineHeader>
          <TimelineIndicator className="border-border group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary" />
          <TimelineSeparator />
          <TimelineContent className="max-w-prose leading-relaxed">
            {item.body}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
