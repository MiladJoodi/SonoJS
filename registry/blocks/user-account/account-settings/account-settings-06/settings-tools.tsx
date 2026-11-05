"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

import {
  SettingsCard,
  SettingsRow,
  SettingsSectionLabel,
} from "./settings-rows"

type ServerStatus = "connected" | "error"

interface McpServer {
  id: string
  name: string
  initial: string
  tileClass: string
  status: ServerStatus
  summary?: string
}

const SERVERS: McpServer[] = [
  {
    id: "figma",
    name: "Figma",
    initial: "F",
    tileClass:
      "bg-pink-200 text-pink-700 dark:bg-pink-900/50 dark:text-pink-200",
    status: "connected",
    summary: "26 tools enabled",
  },
  {
    id: "vercel",
    name: "Vercel",
    initial: "V",
    tileClass: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    status: "connected",
    summary: "30 tools enabled",
  },
  {
    id: "astro",
    name: "Astro",
    initial: "A",
    tileClass: "bg-muted text-muted-foreground",
    status: "error",
  },
]

const SCOPES = ["Home", "Product", "Cloud"] as const

export function SettingsTools() {
  const [scope, setScope] = React.useState<(typeof SCOPES)[number]>("Home")
  const [waitForAuth, setWaitForAuth] = React.useState(true)

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Project scope"
        className="flex w-fit flex-wrap gap-1 rounded-full border border-border/70 bg-muted/40 p-1"
      >
        {SCOPES.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={scope === item}
            onClick={() => setScope(item)}
            className={cn(
              "h-7 cursor-pointer rounded-full px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              scope === item
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div>
        <SettingsSectionLabel>Authentication</SettingsSectionLabel>
        <SettingsCard>
          <SettingsRow
            label="Wait for MCP authentication"
            description="When off, skip auth prompts after 30 seconds"
          >
            <Switch
              checked={waitForAuth}
              onCheckedChange={setWaitForAuth}
              aria-label="Wait for MCP authentication"
            />
          </SettingsRow>
        </SettingsCard>
      </div>

      <div>
        <SettingsSectionLabel>{scope} MCP servers</SettingsSectionLabel>
        <SettingsCard>
          {SERVERS.map((server) => (
            <SettingsRow
              key={server.id}
              label={server.name}
              description={
                server.status === "connected"
                  ? server.summary
                  : "Connection error — show output"
              }
            >
              <div className="flex items-center gap-2">
                {server.status === "error" ? (
                  <Badge
                    variant="destructive"
                    className="border-transparent font-medium"
                  >
                    Error
                  </Badge>
                ) : null}
                <span
                  className={cn(
                    "relative flex size-8 items-center justify-center rounded-[10px] text-xs font-semibold shadow-xs",
                    server.tileClass
                  )}
                >
                  {server.initial}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 -start-0.5 size-2.5 rounded-full ring-2 ring-[color-mix(in_srgb,var(--muted)_35%,transparent)]",
                      server.status === "connected"
                        ? "bg-emerald-500"
                        : "bg-red-600"
                    )}
                  />
                </span>
              </div>
            </SettingsRow>
          ))}
          <SettingsRow label="New MCP server" description="Add a custom server">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 shadow-xs">
              <PlusIcon className="size-3.5" aria-hidden />
              Add
            </Button>
          </SettingsRow>
        </SettingsCard>
      </div>
    </div>
  )
}
