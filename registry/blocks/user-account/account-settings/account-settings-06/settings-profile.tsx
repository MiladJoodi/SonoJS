"use client"

import * as React from "react"
import { LogOutIcon, MailIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

import { SettingsCard, SettingsRow } from "./settings-rows"

const fieldClass =
  "h-8 w-[202px] shrink-0 border-border/70 bg-card text-sm shadow-xs"

export function SettingsProfile({ onSaved }: { onSaved?: () => void } = {}) {
  const [email, setEmail] = React.useState("hi@sonojs.dev")
  const [firstName, setFirstName] = React.useState("Alex")
  const [lastName, setLastName] = React.useState("Rivera")
  const [publicProfile, setPublicProfile] = React.useState(true)
  const committed = React.useRef({ email, firstName, lastName })

  const commit = (key: "email" | "firstName" | "lastName", value: string) => {
    if (committed.current[key] === value) return
    committed.current[key] = value
    onSaved?.()
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsCard>
        <SettingsRow label="Email">
          <div className="relative w-[202px] shrink-0">
            <MailIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              aria-label="Email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => commit("email", email)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLElement).blur()
              }}
              className={cn(fieldClass, "ps-8")}
            />
          </div>
        </SettingsRow>
        <SettingsRow label="First name">
          <Input
            aria-label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => commit("firstName", firstName)}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLElement).blur()
            }}
            className={fieldClass}
          />
        </SettingsRow>
        <SettingsRow label="Last name">
          <Input
            aria-label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => commit("lastName", lastName)}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLElement).blur()
            }}
            className={fieldClass}
          />
        </SettingsRow>
      </SettingsCard>

      <SettingsCard>
        <SettingsRow
          label="SonoJS account"
          description="Manage billing and seat access"
        >
          <Button variant="outline" size="sm" className="h-8 shadow-xs">
            Manage
          </Button>
        </SettingsRow>
        <SettingsRow
          label="Public profile"
          description="When enabled your profile page is visible to anyone"
        >
          <Switch
            checked={publicProfile}
            onCheckedChange={setPublicProfile}
            aria-label="Public profile"
          />
        </SettingsRow>
        <SettingsRow label="Device ID">
          <span
            dir="ltr"
            className="inline-flex h-8 max-w-[202px] items-center truncate rounded-[8px] bg-muted px-2.5 font-mono text-[11px] text-muted-foreground"
          >
            593e2611-b9e3-44e2-1289-ab3f9d21
          </span>
        </SettingsRow>
        <SettingsRow label="Sessions">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 shadow-xs">
            <LogOutIcon className="size-3.5" aria-hidden />
            Log out all
          </Button>
        </SettingsRow>
      </SettingsCard>
    </div>
  )
}
