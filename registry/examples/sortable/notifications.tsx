"use client"

import { useState } from "react"
import {
  BellIcon,
  GripVerticalIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
  WebhookIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@sonojs/ui/lib/utils"

interface NotificationChannel {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: "email" | "push" | "sms" | "slack" | "webhook"
}

const defaultChannels: NotificationChannel[] = [
  {
    id: "1",
    name: "Email",
    description: "Transactional + digests",
    enabled: true,
    icon: "email",
  },
  {
    id: "2",
    name: "Push",
    description: "Browser & mobile",
    enabled: true,
    icon: "push",
  },
  {
    id: "3",
    name: "SMS",
    description: "Critical alerts only",
    enabled: false,
    icon: "sms",
  },
  {
    id: "4",
    name: "Slack",
    description: "#ops-alerts channel",
    enabled: true,
    icon: "slack",
  },
  {
    id: "5",
    name: "Webhook",
    description: "Custom HTTPS endpoint",
    enabled: false,
    icon: "webhook",
  },
]

const iconMap = {
  email: MailIcon,
  push: BellIcon,
  sms: SmartphoneIcon,
  slack: MessageSquareIcon,
  webhook: WebhookIcon,
} as const

export function SortableNotifications() {
  const [channels, setChannels] =
    useState<NotificationChannel[]>(defaultChannels)

  const enabledCount = channels.filter((c) => c.enabled).length

  const toggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, enabled: !ch.enabled } : ch))
    )
  }

  return (
    <div className="mx-auto w-full max-w-md px-1 py-2 sm:p-4">
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card">
        <div className="flex items-start justify-between gap-2 border-b border-border/60 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
          <div className="min-w-0 text-start">
            <p className="text-sm font-semibold tracking-tight">
              Delivery priority
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Top channels are attempted first
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 tabular-nums">
            {enabledCount}/{channels.length}
          </Badge>
        </div>

        <Sortable
          value={channels}
          onValueChange={setChannels}
          getItemValue={(item) => item.id}
          strategy="vertical"
          className="space-y-0 p-1.5 sm:p-2"
        >
          {channels.map((channel, index) => {
            const Icon = iconMap[channel.icon]
            return (
              <SortableItem key={channel.id} value={channel.id}>
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-[10px] px-1 py-2 transition-colors sm:gap-2.5 sm:px-2 sm:py-2.5",
                    channel.enabled
                      ? "hover:bg-accent/50"
                      : "opacity-60 hover:opacity-80"
                  )}
                >
                  <SortableItemHandle className="cursor-grab! flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground">
                    <GripVerticalIcon className="size-4" />
                  </SortableItemHandle>

                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-semibold tabular-nums",
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </span>

                  <div
                    className={cn(
                      "hidden size-8 shrink-0 items-center justify-center rounded-lg sm:flex",
                      channel.enabled
                        ? "bg-primary/12 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="size-3.5" />
                  </div>

                  <div className="min-w-0 flex-1 text-start">
                    <p className="truncate text-sm font-medium leading-tight">
                      {channel.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {channel.description}
                    </p>
                  </div>

                  <Switch
                    checked={channel.enabled}
                    onCheckedChange={() => toggleChannel(channel.id)}
                    aria-label={`Toggle ${channel.name}`}
                    className="shrink-0"
                  />
                </div>
              </SortableItem>
            )
          })}
        </Sortable>
      </div>
    </div>
  )
}
