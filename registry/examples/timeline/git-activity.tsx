import {
  GitBranchIcon,
  GitCommitIcon,
  GitMergeIcon,
  GitPullRequestIcon,
} from "lucide-react"

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

const events = [
  {
    id: 1,
    date: "15m ago",
    title: "Opened branch",
    meta: "feat/billing-webhooks from main",
    description: "Isolated webhook retries and signature verification work.",
    icon: GitBranchIcon,
  },
  {
    id: 2,
    date: "11m ago",
    title: "Pushed commits",
    meta: "3 commits · +182 / −41",
    description: "Added idempotent handlers and replay protection tests.",
    icon: GitCommitIcon,
  },
  {
    id: 3,
    date: "6m ago",
    title: "Opened pull request",
    meta: "PR #918 · ready for review",
    description: "Requested review from payments and platform teams.",
    icon: GitPullRequestIcon,
  },
  {
    id: 4,
    date: "Just now",
    title: "Merged to main",
    meta: "squash · deploy queued",
    description: "CI green. Staging promote starts automatically.",
    icon: GitMergeIcon,
  },
]

export function TimelineGitActivity() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight">
            Repository activity
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            sonojs/payments
          </p>
        </div>
        <Badge variant="outline">main</Badge>
      </div>

      <Timeline defaultValue={4} className="ps-10">
        {events.map((item) => {
          const Icon = item.icon
          return (
            <TimelineItem key={item.id} step={item.id}>
              <TimelineHeader>
                <TimelineSeparator className="top-6 bottom-0" />
                <TimelineTitle className="mt-0.5 text-sm font-semibold text-foreground">
                  {item.title}
                </TimelineTitle>
                <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-muted text-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground">
                  <Icon className="size-3.5" />
                </TimelineIndicator>
              </TimelineHeader>
              <TimelineContent className="space-y-1">
                <p className="font-mono text-[11px] text-muted-foreground">
                  {item.meta}
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {item.description}
                </p>
                <TimelineDate className="mt-1 mb-0 font-mono text-[11px]">
                  {item.date}
                </TimelineDate>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </div>
  )
}
