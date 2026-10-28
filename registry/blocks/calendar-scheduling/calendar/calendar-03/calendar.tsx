"use client"

import * as React from "react"
import { format, isSameDay } from "date-fns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  VideoIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Calendar } from "@sonojs/ui/components/calendar"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type Category = "design" | "engineering" | "marketing" | "admin"

type DayEvent = {
  id: string
  title: string
  start: string
  end: string
  category: Category
  location?: string
  meeting?: boolean
}

const STYLE: Record<Category, { bar: string; badge: string; label: string }> = {
  design: {
    bar: "bg-primary",
    badge: "bg-primary/10 text-primary border-transparent",
    label: "Design",
  },
  engineering: {
    bar: "bg-sky-500",
    badge: "bg-sky-500/15 text-sky-800 border-transparent dark:text-sky-300",
    label: "Engineering",
  },
  marketing: {
    bar: "bg-amber-500",
    badge:
      "bg-amber-500/15 text-amber-900 border-transparent dark:text-amber-300",
    label: "Marketing",
  },
  admin: {
    bar: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground border-transparent",
    label: "Admin",
  },
}

function atNoon(offset: number) {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() + offset)
  return d
}

const EVENTS_BY_OFFSET: Record<number, DayEvent[]> = {
  0: [
    {
      id: "1",
      title: "Design Sync",
      start: "10:00",
      end: "10:45",
      category: "design",
      meeting: true,
      location: "Figma · Room A",
    },
    {
      id: "2",
      title: "Weekly Standup",
      start: "11:30",
      end: "12:00",
      category: "engineering",
      meeting: true,
    },
    {
      id: "3",
      title: "Deep work block",
      start: "14:00",
      end: "16:00",
      category: "design",
    },
  ],
  1: [
    {
      id: "4",
      title: "Sprint Planning",
      start: "13:00",
      end: "14:30",
      category: "engineering",
      meeting: true,
    },
  ],
  3: [
    {
      id: "5",
      title: "Launch Review",
      start: "14:00",
      end: "15:30",
      category: "marketing",
      location: "HQ · Conference 2",
    },
  ],
}

function dayOffset(from: Date, to: Date) {
  const a = new Date(from)
  a.setHours(12, 0, 0, 0)
  const b = new Date(to)
  b.setHours(12, 0, 0, 0)
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

function formatRange(start: string, end: string) {
  const label = (t: string) => {
    const [h, m] = t.split(":").map(Number)
    const d = new Date()
    d.setHours(h ?? 0, m ?? 0)
    return format(d, "h:mm a")
  }
  return `${label(start)} – ${label(end)}`
}

/** Day focus — compact mini-month + timed agenda. */
export default function Calendar03() {
  const [selected, setSelected] = React.useState(() => atNoon(0))
  const [month, setMonth] = React.useState(() => new Date())
  const offset = dayOffset(atNoon(0), selected)
  const events = EVENTS_BY_OFFSET[offset] ?? []

  const shiftDay = (delta: number) => {
    const next = new Date(selected)
    next.setDate(next.getDate() + delta)
    setSelected(next)
    setMonth(next)
  }

  return (
    <div className="w-full bg-canvas text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-start">
            <p className="text-sm font-medium text-primary">Day</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {format(selected, "EEEE, MMMM d")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {events.length === 0
                ? "No events"
                : `${events.length} scheduled`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              aria-label="Previous day"
              onClick={() => shiftDay(-1)}
            >
              <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => {
                const t = atNoon(0)
                setSelected(t)
                setMonth(t)
              }}
            >
              Today
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              aria-label="Next day"
              onClick={() => shiftDay(1)}
            >
              <ChevronRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
            <Badge variant="secondary">Day</Badge>
          </div>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <aside className="shrink-0 self-center rounded-[12px] border border-border/70 bg-card p-2 shadow-soft sm:self-stretch sm:p-3">
            <div className="mb-2 border-b border-border/70 px-1 pb-2 text-start sm:mb-3">
              <h2 className="text-sm font-semibold">Calendar</h2>
              <p className="text-xs text-muted-foreground">
                {format(month, "MMMM yyyy")}
              </p>
            </div>
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={selected}
              onSelect={(d) => d && setSelected(d)}
              className="[--cell-size:--spacing(7)]"
            />
          </aside>

          <section className="min-w-0 flex-1 rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="border-b border-border/70 px-4 py-2.5 text-start">
              <h2 className="text-sm font-semibold">Schedule</h2>
              <p className="text-xs text-muted-foreground" dir="ltr">
                {format(selected, "yyyy-MM-dd")}
              </p>
            </div>
            <div className="p-3">
              {events.length === 0 ? (
                <div className="flex min-h-24 flex-col items-center justify-center rounded-[12px] border border-dashed border-border/70 bg-muted/20 px-4 py-6 text-center">
                  <p className="text-sm font-medium">Free day</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pick another date from the mini calendar.
                  </p>
                </div>
              ) : (
                <ol className="relative space-y-0 border-s border-border/70 ms-2.5 ps-5">
                  {events.map((event) => {
                    const style = STYLE[event.category]
                    return (
                      <li key={event.id} className="relative pb-3 last:pb-0">
                        <span
                          className={cn(
                            "absolute -start-[1.35rem] top-2 size-2.5 rounded-full ring-4 ring-card",
                            style.bar
                          )}
                          aria-hidden
                        />
                        <div className="rounded-lg border border-border/70 bg-muted/20 p-2.5 text-start">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold">
                              {event.title}
                            </h3>
                            <Badge className={cn("text-[10px]", style.badge)}>
                              {style.label}
                            </Badge>
                          </div>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <ClockIcon className="size-3" aria-hidden />
                            <span dir="ltr">
                              {formatRange(event.start, event.end)}
                            </span>
                          </p>
                          {event.location ? (
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                              {event.meeting ? (
                                <VideoIcon className="size-3" aria-hidden />
                              ) : (
                                <MapPinIcon className="size-3" aria-hidden />
                              )}
                              {event.location}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              )}
            </div>
            <Separator />
            <p className="px-4 py-2 text-xs text-muted-foreground text-start">
              {isSameDay(selected, atNoon(0))
                ? "Showing today’s agenda"
                : "Showing selected day"}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
