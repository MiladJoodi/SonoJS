"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Switch } from "@sonojs/ui/components/switch"

import { PlanArtFlame } from "./plan-art-flame"
import {
  SettingsCard,
  SettingsRow,
  SettingsSectionLabel,
} from "./settings-rows"

export function SettingsGeneral({ planArtSrc }: { planArtSrc?: string }) {
  const [toggles, setToggles] = React.useState({
    critical: true,
    system: false,
    sound: false,
    dispatch: false,
  })

  const setToggle =
    (key: keyof typeof toggles) => (checked: boolean) =>
      setToggles((t) => ({ ...t, [key]: checked }))

  return (
    <div className="flex flex-col gap-6">
      <SettingsCard className="relative min-h-[148px] overflow-hidden border-border/60 bg-card">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-[52%] max-w-[240px]"
        >
          <PlanArtFlame src={planArtSrc} className="size-full" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(closest-side at 58% 50%,
                color-mix(in srgb, var(--card) 0%, transparent) 8%,
                color-mix(in srgb, var(--card) 35%, transparent) 42%,
                color-mix(in srgb, var(--card) 88%, transparent) 78%,
                var(--card) 100%)`,
            }}
          />
        </div>

        <div className="relative z-10 flex h-full min-h-[148px] flex-col justify-between gap-4 p-4 pe-[44%] sm:p-5 sm:pe-52">
          <div className="space-y-2.5 text-start">
            <Badge
              variant="secondary"
              className="border-transparent bg-muted font-medium text-muted-foreground"
            >
              Current plan
            </Badge>
            <div>
              <p className="text-[17px] font-semibold tracking-tight text-foreground">
                Ultra{" "}
                <span className="font-normal text-muted-foreground">
                  $149/mo
                </span>
              </p>
              <p className="mt-1 max-w-[18rem] text-sm leading-snug text-muted-foreground">
                You are on 7× more usage than Regular.
              </p>
            </div>
          </div>
          <Button size="sm" className="w-fit gap-1.5 shadow-xs">
            Upgrade to Max
            <ArrowUpRightIcon className="size-3.5 opacity-80" aria-hidden />
          </Button>
        </div>
      </SettingsCard>

      <SettingsCard>
        <SettingsRow
          label="Usage limits"
          description="Caps for agent runs and seats this billing cycle"
        >
          <Button variant="outline" size="sm" className="h-8 shadow-xs">
            Manage limits
          </Button>
        </SettingsRow>
      </SettingsCard>

      <div>
        <SettingsSectionLabel>Pull requests</SettingsSectionLabel>
        <SettingsCard>
          <SettingsRow
            label="Review provider"
            description="Select GitHub or other providers for reviews"
          >
            <Select defaultValue="github">
              <SelectTrigger
                size="sm"
                className="h-8 min-w-[128px] bg-card shadow-xs"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="gitlab">GitLab</SelectItem>
                <SelectItem value="bitbucket">Bitbucket</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
          <SettingsRow
            label="PR destination"
            description="Open pull request links inside your app"
          >
            <Select defaultValue="inside">
              <SelectTrigger
                size="sm"
                className="h-8 min-w-[140px] bg-card shadow-xs"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inside">Inside app</SelectItem>
                <SelectItem value="browser">In the browser</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
        </SettingsCard>
      </div>

      <div>
        <SettingsSectionLabel>Notifications</SettingsSectionLabel>
        <SettingsCard>
          <SettingsRow
            label="Critical requests"
            description="Get notified when the mode needs a critical decision"
          >
            <Switch
              checked={toggles.critical}
              onCheckedChange={setToggle("critical")}
              aria-label="Critical requests"
            />
          </SettingsRow>
          <SettingsRow
            label="System notifications"
            description="Show a notice when an agent completes a task"
          >
            <Switch
              checked={toggles.system}
              onCheckedChange={setToggle("system")}
              aria-label="System notifications"
            />
          </SettingsRow>
          <SettingsRow
            label="Completion sound"
            description="Play a sound when a task finishes"
          >
            <Switch
              checked={toggles.sound}
              onCheckedChange={setToggle("sound")}
              aria-label="Completion sound"
            />
          </SettingsRow>
          <SettingsRow
            label="Dispatch alerts"
            description="Push to your phone when the agent messages you"
          >
            <Switch
              checked={toggles.dispatch}
              onCheckedChange={setToggle("dispatch")}
              aria-label="Dispatch alerts"
            />
          </SettingsRow>
        </SettingsCard>
      </div>
    </div>
  )
}
