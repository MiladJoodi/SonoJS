"use client"

import * as React from "react"
import { CheckIcon, ClockIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    id: "intro",
    title: "Intro call",
    duration: 15,
    blurb: "Quick meet-and-greet to scope needs.",
  },
  {
    id: "design",
    title: "Design review",
    duration: 30,
    blurb: "Walk through screens and feedback.",
  },
  {
    id: "workshop",
    title: "Workshop",
    duration: 60,
    blurb: "Deep-dive session with your team.",
  },
] as const

const DAYS = [
  { id: "d0", label: "Tue", date: "Jun 16" },
  { id: "d1", label: "Wed", date: "Jun 17" },
  { id: "d2", label: "Thu", date: "Jun 18" },
  { id: "d3", label: "Fri", date: "Jun 19" },
] as const

const SLOTS = ["09:00", "09:30", "10:00", "11:00", "14:00", "15:30", "16:00"] as const

/** Public booking — service → day → slot → confirm. */
export default function Calendar04() {
  const [serviceId, setServiceId] = React.useState<string>(SERVICES[1].id)
  const [dayId, setDayId] = React.useState<string>(DAYS[1].id)
  const [slot, setSlot] = React.useState<string | null>("10:00")
  const [confirmed, setConfirmed] = React.useState(false)

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0]
  const day = DAYS.find((d) => d.id === dayId) ?? DAYS[0]

  if (confirmed) {
    return (
      <div className="w-full bg-canvas text-foreground">
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-10 text-center sm:px-6">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <CheckIcon className="size-6" aria-hidden />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Booked</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {service.title} · {day.label} {day.date} ·{" "}
            <span dir="ltr">{slot}</span> ({service.duration} min)
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5 cursor-pointer"
            onClick={() => {
              setConfirmed(false)
              setSlot(null)
            }}
          >
            Book another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-canvas text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-5 text-center sm:text-start">
          <p className="text-sm font-medium text-primary">Booking</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Schedule with Northwind
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a meeting type, day, and time slot.
          </p>
        </header>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="space-y-4 p-4 sm:p-5">
            <section>
              <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase text-start">
                1 · Meeting type
              </h2>
              <div className="grid gap-2 sm:grid-cols-3">
                {SERVICES.map((s) => {
                  const on = s.id === serviceId
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setServiceId(s.id)
                        setConfirmed(false)
                      }}
                      className={cn(
                        "cursor-pointer rounded-[12px] border p-2.5 text-start transition-colors",
                        on
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border/70 hover:border-border"
                      )}
                    >
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="size-3" aria-hidden />
                        <span dir="ltr">{s.duration} min</span>
                      </p>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {s.blurb}
                      </p>
                    </button>
                  )
                })}
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase text-start">
                2 · Day
              </h2>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => {
                  const on = d.id === dayId
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDayId(d.id)}
                      className={cn(
                        "min-w-16 cursor-pointer rounded-[10px] border px-2.5 py-1.5 text-center transition-colors",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 hover:border-border"
                      )}
                    >
                      <p className="text-[10px] font-semibold uppercase opacity-80">
                        {d.label}
                      </p>
                      <p className="text-sm font-semibold" dir="ltr">
                        {d.date}
                      </p>
                    </button>
                  )
                })}
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase text-start">
                3 · Time
              </h2>
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                {SLOTS.map((s) => {
                  const on = slot === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={cn(
                        "cursor-pointer rounded-md border px-2 py-2 text-sm font-medium tabular-nums transition-colors",
                        on
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 hover:border-border"
                      )}
                      dir="ltr"
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-start text-sm">
              <p className="font-medium">{service.title}</p>
              <p className="text-muted-foreground">
                {day.label} {day.date}
                {slot ? (
                  <>
                    {" · "}
                    <span dir="ltr">{slot}</span>
                  </>
                ) : (
                  " · pick a time"
                )}
              </p>
            </div>
            <Button
              type="button"
              className="cursor-pointer"
              disabled={!slot}
              onClick={() => setConfirmed(true)}
            >
              Confirm booking
            </Button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Times shown in your local timezone · <Badge variant="outline">UI demo</Badge>
        </p>
      </div>
    </div>
  )
}
