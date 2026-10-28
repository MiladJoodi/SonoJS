"use client"

import * as React from "react"
import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type Category = "design" | "engineering" | "marketing" | "admin"

type WeekEvent = {
  id: string
  title: string
  dayOffset: number
  startHour: number
  durationHours: number
  category: Category
  allDay?: boolean
}

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9)
const HOUR_PX = 40
const HOUR_START = 9

const CATEGORY: Record<Category, string> = {
  design: "bg-primary/15 text-primary border-primary/25",
  engineering: "bg-sky-500/15 text-sky-800 border-sky-500/25 dark:text-sky-300",
  marketing:
    "bg-amber-500/15 text-amber-900 border-amber-500/25 dark:text-amber-300",
  admin: "bg-muted text-muted-foreground border-border/70",
}

function eventsForWeek(): WeekEvent[] {
  return [
    {
      id: "a",
      title: "Design Sync",
      dayOffset: 0,
      startHour: 10,
      durationHours: 1,
      category: "design",
    },
    {
      id: "b",
      title: "Standup",
      dayOffset: 0,
      startHour: 11.5,
      durationHours: 0.5,
      category: "engineering",
    },
    {
      id: "c",
      title: "Sprint Planning",
      dayOffset: 1,
      startHour: 13,
      durationHours: 1.5,
      category: "engineering",
    },
    {
      id: "d",
      title: "Launch Review",
      dayOffset: 3,
      startHour: 14,
      durationHours: 1.5,
      category: "marketing",
    },
    {
      id: "e",
      title: "Offsite prep",
      dayOffset: 2,
      startHour: 9,
      durationHours: 1,
      category: "admin",
      allDay: true,
    },
    {
      id: "f",
      title: "1:1 Alex",
      dayOffset: 4,
      startHour: 15,
      durationHours: 0.5,
      category: "design",
    },
  ]
}

function hourLabel(h: number) {
  const d = new Date()
  d.setHours(Math.floor(h), (h % 1) * 60, 0, 0)
  return format(d, "h a")
}

/** Week timeline — hours × days with event bars. */
export default function Calendar02() {
  const [anchor, setAnchor] = React.useState(() => new Date())
  const weekStart = startOfWeek(anchor, { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const today = new Date()
  const events = eventsForWeek()
  const allDay = events.filter((e) => e.allDay)
  const timed = events.filter((e) => !e.allDay)

  return (
    <div className="w-full bg-canvas text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-start">
            <p className="text-sm font-medium text-primary">Week</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {format(weekStart, "MMM d")} –{" "}
              {format(addDays(weekStart, 6), "MMM d, yyyy")}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              aria-label="Previous week"
              onClick={() => setAnchor(addDays(anchor, -7))}
            >
              <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setAnchor(new Date())}
            >
              Today
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              aria-label="Next week"
              onClick={() => setAnchor(addDays(anchor, 7))}
            >
              <ChevronRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
            <Badge variant="secondary">Week</Badge>
            <Button type="button" size="sm" className="cursor-pointer gap-1.5">
              <PlusIcon className="size-3.5" aria-hidden />
              New
            </Button>
          </div>
        </header>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] border-b border-border/70">
            <div className="border-e border-border/70" />
            {days.map((day) => {
              const isToday = isSameDay(day, today)
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "border-e border-border/70 px-1 py-2 text-center last:border-e-0",
                    isToday && "bg-primary/5"
                  )}
                >
                  <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {format(day, "EEE")}
                  </p>
                  <p
                    className={cn(
                      "mx-auto mt-0.5 flex size-7 items-center justify-center rounded-full text-xs font-semibold",
                      isToday && "bg-primary text-primary-foreground"
                    )}
                    dir="ltr"
                  >
                    {format(day, "d")}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] border-b border-border/70 bg-muted/20">
            <div className="flex items-center justify-end border-e border-border/70 pe-2 text-[10px] text-muted-foreground">
              All day
            </div>
            {days.map((day, di) => (
              <div
                key={day.toISOString()}
                className="min-h-8 border-e border-border/70 p-0.5 last:border-e-0"
              >
                {allDay
                  .filter((e) => e.dayOffset === di)
                  .map((e) => (
                    <div
                      key={e.id}
                      className={cn(
                        "truncate rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
                        CATEGORY[e.category]
                      )}
                    >
                      {e.title}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div className="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))]">
              <div className="border-e border-border/70">
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="flex h-10 items-start justify-end border-b border-border/40 pe-2 pt-0.5 text-[10px] text-muted-foreground"
                    dir="ltr"
                  >
                    {hourLabel(h)}
                  </div>
                ))}
              </div>
              {days.map((day, di) => (
                <div
                  key={day.toISOString()}
                  className="relative border-e border-border/70 last:border-e-0"
                >
                  {HOURS.map((h) => (
                    <div
                      key={h}
                      className="h-10 border-b border-border/40"
                    />
                  ))}
                  {timed
                    .filter((e) => e.dayOffset === di)
                    .map((e) => {
                      const top = (e.startHour - HOUR_START) * HOUR_PX
                      const height = Math.max(e.durationHours * HOUR_PX - 2, 20)
                      return (
                        <button
                          key={e.id}
                          type="button"
                          className={cn(
                            "absolute inset-x-0.5 cursor-pointer overflow-hidden rounded-md border px-1 py-0.5 text-start text-[10px] font-medium shadow-sm",
                            CATEGORY[e.category]
                          )}
                          style={{ top, height }}
                        >
                          <span className="block truncate">{e.title}</span>
                        </button>
                      )
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
