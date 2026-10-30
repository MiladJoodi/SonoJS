import { CheckIcon, XIcon } from "lucide-react"

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

const deployments = [
  {
    id: 1,
    title: "Production",
    date: "2 minutes ago",
    commit: "a1b2c3d",
    branch: "main",
    status: "success" as const,
    duration: "42s",
    env: "prod-eu",
  },
  {
    id: 2,
    title: "Staging",
    date: "15 minutes ago",
    commit: "e4f5g6h",
    branch: "staging",
    status: "success" as const,
    duration: "38s",
    env: "stg-us",
  },
  {
    id: 3,
    title: "Preview",
    date: "1 hour ago",
    commit: "i7j8k9l",
    branch: "feat/auth",
    status: "failed" as const,
    duration: "1m 12s",
    env: "pr-918",
  },
  {
    id: 4,
    title: "Production",
    date: "3 hours ago",
    commit: "m0n1o2p",
    branch: "main",
    status: "success" as const,
    duration: "45s",
    env: "prod-eu",
  },
]

export function TimelineDeployments() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight">Deployments</p>
          <p className="font-mono text-[11px] text-muted-foreground">
            edge · last 24h
          </p>
        </div>
        <Badge variant="outline">4 runs</Badge>
      </div>

      <Timeline defaultValue={4} className="ps-10">
        {deployments.map((deploy) => (
          <TimelineItem key={deploy.id} step={deploy.id}>
            <TimelineHeader>
              <TimelineSeparator className="!bg-border top-6 bottom-0" />
              <div className="flex flex-wrap items-center gap-2">
                <TimelineTitle className="text-sm font-semibold text-foreground">
                  {deploy.title}
                </TimelineTitle>
                <Badge
                  variant={
                    deploy.status === "success" ? "secondary" : "destructive"
                  }
                >
                  {deploy.status}
                </Badge>
              </div>
              <TimelineIndicator
                className={cn(
                  "flex size-6 items-center justify-center border-none",
                  deploy.status === "success"
                    ? "bg-emerald-500 text-white"
                    : "bg-destructive text-white"
                )}
              >
                {deploy.status === "success" ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  <XIcon className="size-3.5" />
                )}
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground">
                <span>{deploy.commit}</span>
                <span aria-hidden>·</span>
                <span>{deploy.branch}</span>
                <span aria-hidden>·</span>
                <span>{deploy.env}</span>
                <span aria-hidden>·</span>
                <span>{deploy.duration}</span>
              </div>
              <TimelineDate className="mt-0 mb-0 text-[11px]">
                {deploy.date}
              </TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
