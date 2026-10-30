import { CheckIcon, CircleIcon, RocketIcon } from "lucide-react"

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
import { cn } from "@sonojs/ui/lib/utils"

const releases = [
  {
    id: 1,
    version: "1.0.0",
    date: "Jan 2026",
    title: "Foundation",
    status: "released" as const,
  },
  {
    id: 2,
    version: "1.4.2",
    date: "Mar 2026",
    title: "Stability",
    status: "released" as const,
  },
  {
    id: 3,
    version: "2.0.0",
    date: "Jun 2026",
    title: "Platform rewrite",
    status: "current" as const,
  },
  {
    id: 4,
    version: "2.1.0",
    date: "Aug 2026",
    title: "Observability",
    status: "upcoming" as const,
  },
]

export function TimelineReleases() {
  return (
    <div className="w-full max-w-2xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Version track
          </p>
          <h3 className="text-base font-semibold tracking-tight">
            Design system releases
          </h3>
        </div>
        <Badge variant="secondary">LTS · 2.x</Badge>
      </div>

      <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pt-2 pb-1">
        <Timeline
          defaultValue={3}
          orientation="horizontal"
          className="min-w-[36rem] w-full sm:min-w-0"
        >
          {releases.map((release) => (
            <TimelineItem key={release.id} step={release.id} className="min-w-0">
              <TimelineHeader>
                <TimelineSeparator className="!bg-border start-3 w-[calc(100%-2.5rem)]" />
                <TimelineDate className="mt-1 font-mono text-[11px] tracking-wide uppercase">
                  {release.date}
                </TimelineDate>
                <TimelineTitle className="flex flex-wrap items-center gap-2 font-mono text-sm font-semibold text-foreground">
                  v{release.version}
                  {release.status === "current" ? (
                    <Badge variant="default">Current</Badge>
                  ) : null}
                </TimelineTitle>
                <TimelineIndicator
                  className={cn(
                    "flex size-6 items-center justify-center border-none",
                    release.status === "released" && "bg-emerald-500 text-white",
                    release.status === "current" &&
                      "bg-primary text-primary-foreground",
                    release.status === "upcoming" &&
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {release.status === "released" ? (
                    <CheckIcon className="size-3.5" />
                  ) : release.status === "current" ? (
                    <RocketIcon className="size-3.5" />
                  ) : (
                    <CircleIcon className="size-3" />
                  )}
                </TimelineIndicator>
              </TimelineHeader>
              <TimelineContent className="text-xs text-muted-foreground sm:text-sm">
                {release.title}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  )
}
