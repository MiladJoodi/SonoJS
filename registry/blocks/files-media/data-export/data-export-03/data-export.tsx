"use client"

import * as React from "react"
import {
  CalendarClockIcon,
  CheckCircle2Icon,
  MailIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
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
import { Separator } from "@sonojs/ui/components/separator"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

type Frequency = "daily" | "weekly" | "monthly"

export default function DataExport({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [format, setFormat] = React.useState("csv")
  const [frequency, setFrequency] = React.useState<Frequency>("weekly")
  const [email, setEmail] = React.useState("finance@acme.co")
  const [includePii, setIncludePii] = React.useState(false)
  const [enabled, setEnabled] = React.useState(true)
  const [saved, setSaved] = React.useState(false)

  const nextRun =
    frequency === "daily"
      ? "Tomorrow 09:00 UTC"
      : frequency === "weekly"
        ? "Mon, Jul 6 · 09:00 UTC"
        : "Aug 1 · 09:00 UTC"

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="data-export-03-heading"
      >
        <header className="flex items-start gap-3 border-b border-border/70 px-5 py-5 sm:px-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <CalendarClockIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                id="data-export-03-heading"
                className="text-lg font-semibold tracking-tight"
              >
                Scheduled export
              </h1>
              <Badge variant={enabled ? "default" : "secondary"}>
                {enabled ? "Active" : "Paused"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Deliver a recurring report to email — no manual download.
            </p>
          </div>
        </header>

        {saved ? (
          <div className="flex flex-col items-center px-5 py-10 text-center sm:px-6">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2Icon
                className="size-7 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
            </div>
            <h2 className="text-lg font-semibold">Schedule saved</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Next run {nextRun}. File lands in{" "}
              <span className="font-medium text-foreground">{email}</span>.
            </p>
            <Button
              type="button"
              className="mt-6 cursor-pointer"
              onClick={() => setSaved(false)}
            >
              Edit schedule
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-5 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-3 rounded-[12px] border border-border/70 bg-muted/30 px-4 py-3">
                <div className="text-start">
                  <p className="text-sm font-medium">Enable schedule</p>
                  <p className="text-xs text-muted-foreground">
                    Pause anytime without deleting settings.
                  </p>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="cursor-pointer"
                  aria-label="Enable schedule"
                />
              </div>

              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>Frequency</FieldLabel>
                  <RadioGroup
                    value={frequency}
                    onValueChange={(v) => setFrequency(v as Frequency)}
                    className="grid gap-2 sm:grid-cols-3"
                  >
                    {(
                      [
                        ["daily", "Daily"],
                        ["weekly", "Weekly"],
                        ["monthly", "Monthly"],
                      ] as const
                    ).map(([value, label]) => (
                      <Label
                        key={value}
                        htmlFor={`de-03-freq-${value}`}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-[12px] border border-border/70 px-3 py-3 text-sm font-medium",
                          frequency === value
                            ? "border-primary/40 bg-primary/5"
                            : "hover:bg-muted/40"
                        )}
                      >
                        <RadioGroupItem
                          id={`de-03-freq-${value}`}
                          value={value}
                          className="cursor-pointer"
                        />
                        {label}
                      </Label>
                    ))}
                  </RadioGroup>
                  <FieldDescription>Next run: {nextRun}</FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="de-03-format">Format</FieldLabel>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger
                      id="de-03-format"
                      className="h-[46px] w-full cursor-pointer"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="de-03-email">Deliver to</FieldLabel>
                  <div className="relative">
                    <MailIcon
                      className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                    <Input
                      id="de-03-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="ps-9"
                      dir="ltr"
                    />
                  </div>
                </Field>

                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="de-03-pii" className="cursor-pointer">
                    Include PII columns
                  </Label>
                  <Switch
                    id="de-03-pii"
                    checked={includePii}
                    onCheckedChange={setIncludePii}
                    className="cursor-pointer"
                  />
                </div>
              </FieldGroup>
            </div>

            <Separator />

            <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <Button type="button" variant="outline" className="cursor-pointer">
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                disabled={!email.trim()}
                onClick={() => setSaved(true)}
              >
                Save schedule
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
