import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@sonojs/ui/components/timeline"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"
import avatar5 from "./images/avatar-5.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const feed = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar: avatar1,
    action: "published",
    target: "Pricing page · v3",
    date: "5 minutes ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: avatar2,
    action: "requested review on",
    target: "PR #284 · Dark mode tokens",
    date: "20 minutes ago",
  },
  {
    id: 3,
    user: "David Kim",
    avatar: avatar3,
    action: "commented on",
    target: "Issue #142 · Table density",
    date: "1 hour ago",
  },
  {
    id: 4,
    user: "Emma Wilson",
    avatar: avatar4,
    action: "promoted",
    target: "staging to production",
    date: "2 hours ago",
  },
  {
    id: 5,
    user: "Michael Rodriguez",
    avatar: avatar5,
    action: "merged",
    target: "feat/notifications",
    date: "3 hours ago",
  },
]

export function TimelineActivity() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <p className="text-sm font-semibold tracking-tight">Team feed</p>
        <p className="text-xs text-muted-foreground">
          Latest moves across product and platform
        </p>
      </div>

      <Timeline defaultValue={5} className="ps-12">
        {feed.map((activity) => (
          <TimelineItem key={activity.id} step={activity.id}>
            <TimelineHeader>
              <TimelineSeparator className="!bg-border top-8 bottom-0" />
              <TimelineIndicator className="size-8 overflow-hidden rounded-full border-2 border-canvas">
                <Avatar className="size-8">
                  <AvatarImage
                    src={assetSrc(activity.avatar)}
                    alt={activity.user}
                  />
                  <AvatarFallback className="text-[10px]">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="space-y-1">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-foreground">
                  {activity.user}
                </span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium text-foreground">
                  {activity.target}
                </span>
              </p>
              <TimelineDate className="mt-0 mb-0 text-[11px]">
                {activity.date}
              </TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
