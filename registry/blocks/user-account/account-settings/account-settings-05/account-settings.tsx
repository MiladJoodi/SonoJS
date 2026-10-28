"use client"

import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Label } from "@sonojs/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { cn } from "@/lib/utils"

const THEMES = [
  {
    value: "system",
    label: "System",
    hint: "Match device",
    Icon: MonitorIcon,
  },
  {
    value: "light",
    label: "Light",
    hint: "Bright surfaces",
    Icon: SunIcon,
  },
  {
    value: "dark",
    label: "Dark",
    hint: "Dim surfaces",
    Icon: MoonIcon,
  },
] as const

const DENSITIES = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
] as const

export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [theme, setTheme] = React.useState("system")
  const [language, setLanguage] = React.useState("en")
  const [density, setDensity] = React.useState("comfortable")

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-8 text-foreground sm:py-10",
        className
      )}
      aria-labelledby="account-settings-05-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 sm:px-6">
        <header className="space-y-1.5 text-start">
          <h1
            id="account-settings-05-heading"
            className="text-h3 font-semibold tracking-tight"
          >
            Appearance
          </h1>
          <p className="text-sm text-muted-foreground">
            Theme, language, and density for this workspace.
          </p>
        </header>

        <form
          className="space-y-6 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="space-y-3 text-start">
            <Label className="text-sm font-medium">Theme</Label>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid gap-2 sm:grid-cols-3"
              aria-label="Color theme"
            >
              {THEMES.map(({ value, label, hint, Icon }) => {
                const on = theme === value
                return (
                  <label
                    key={value}
                    htmlFor={`account-settings-05-theme-${value}`}
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 rounded-[12px] border p-3 text-start transition-colors",
                      on
                        ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                        : "border-border/70 hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "flex size-9 items-center justify-center rounded-md",
                          on
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-foreground"
                        )}
                      >
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <RadioGroupItem
                        id={`account-settings-05-theme-${value}`}
                        value={value}
                        className="cursor-pointer"
                      />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-xs text-muted-foreground">{hint}</span>
                  </label>
                )
              })}
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2 text-start">
              <Label htmlFor="account-settings-05-language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger
                  id="account-settings-05-language"
                  className="w-full cursor-pointer"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="fa">فارسی</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 text-start">
              <Label htmlFor="account-settings-05-density">Density</Label>
              <Select value={density} onValueChange={setDensity}>
                <SelectTrigger
                  id="account-settings-05-density"
                  className="w-full cursor-pointer"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DENSITIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="cursor-pointer">
              Reset
            </Button>
            <Button type="submit" className="cursor-pointer">
              Save preferences
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
