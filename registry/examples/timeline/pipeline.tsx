"use client"

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { Spinner } from "@sonojs/ui/components/spinner"
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@sonojs/ui/components/timeline"
import { cn } from "@sonojs/ui/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const steps = [
  {
    id: 1,
    title: "Checkout",
    duration: "12s",
    status: "completed" as const,
    description: "Fetched `main` at a1b2c3d. Worktree ready.",
    user: { name: "Alex Johnson", avatar: avatar1 },
  },
  {
    id: 2,
    title: "Install & cache",
    duration: "1m 45s",
    status: "completed" as const,
    description: "Restored npm cache. 1,284 packages resolved.",
    user: { name: "Sarah Chen", avatar: avatar2 },
  },
  {
    id: 3,
    title: "Test suite",
    duration: "Running",
    status: "active" as const,
    description: "142 suites · unit + integration · shard 2/4.",
    user: { name: "Michael Rodriguez", avatar: avatar3 },
  },
  {
    id: 4,
    title: "Production build",
    duration: "Queued",
    status: "pending" as const,
    description: "Bundle, minify, and upload artifacts when tests pass.",
    user: { name: "Emma Wilson", avatar: avatar4 },
  },
]

function StatusIcon({ status }: { status: (typeof steps)[number]["status"] }) {
  if (status === "completed") return <CheckIcon className="size-3.5" />
  if (status === "active") return <Spinner className="size-3.5" />
  return <CircleIcon className="size-3.5" />
}

export function TimelinePipeline() {
  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight">Pipeline #4821</p>
          <p className="font-mono text-[11px] text-muted-foreground">
            main · a1b2c3d · CI
          </p>
        </div>
        <Badge variant="default">In progress</Badge>
      </div>

      <Timeline defaultValue={3} className="ps-10">
        {steps.map((step) => (
          <TimelineItem key={step.id} step={step.id} className="pb-8 last:pb-0">
            <TimelineHeader>
              <TimelineSeparator className="top-6 bottom-0" />
              <div className="flex flex-wrap items-center gap-2">
                <TimelineTitle className="text-sm font-semibold text-foreground">
                  {step.title}
                </TimelineTitle>
                <Badge
                  variant={
                    step.status === "completed"
                      ? "secondary"
                      : step.status === "active"
                        ? "default"
                        : "outline"
                  }
                >
                  {step.duration}
                </Badge>
              </div>
              <TimelineIndicator
                className={cn(
                  "flex size-6 items-center justify-center border-none bg-muted text-muted-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground",
                  step.status === "active" && "ring-2 ring-primary/25"
                )}
              >
                <StatusIcon status={step.status} />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="mt-2">
              <div className="overflow-hidden rounded-md border border-border/70">
                <Collapsible
                  defaultOpen={step.status === "active"}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger className="flex w-full cursor-pointer">
                    <div className="flex grow items-center justify-between gap-2 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                          <AvatarImage
                            src={assetSrc(step.user.avatar)}
                            alt={step.user.name}
                          />
                          <AvatarFallback>
                            {step.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground">
                          {step.user.name}
                        </span>
                      </div>
                      <ChevronRightIcon className="icon-dir size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:group-data-[state=open]/collapsible:-rotate-90" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t border-border/70 px-3 py-2">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
