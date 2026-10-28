"use client"

import * as React from "react"
import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const PEOPLE = [
  { id: "ar", name: "Alex Rivera", initials: "AR", tone: "bg-primary/15 text-primary" },
  { id: "so", name: "Sam Okonkwo", initials: "SO", tone: "bg-sky-500/15 text-sky-800 dark:text-sky-300" },
  { id: "jl", name: "Jordan Lee", initials: "JL", tone: "bg-amber-500/15 text-amber-900 dark:text-amber-300" },
  { id: "tc", name: "Taylor Chen", initials: "TC", tone: "bg-violet-500/15 text-violet-800 dark:text-violet-300" },
] as const

type Busy = {
  personId: string
  dayOffset: number
  start: string
  end: string
  label: string
}

const BUSY: Busy[] = [
  { personId: "ar", dayOffset: 0, start: "9:00", end: "11:00", label: "Design Sync" },
  { personId: "ar", dayOffset: 2, start: "13:00", end: "15:00", label: "Workshop" },
  { personId: "so", dayOffset: 0, start: "10:00", end: "12:00", label: "Standup" },
  { personId: "so", dayOffset: 1, start: "14:00", end: "16:00", label: "Customer" },
  { personId: "jl", dayOffset: 1, start: "9:00", end: "12:00", label: "Focus" },
  { personId: "jl", dayOffset: 3, start: "11:00", end: "13:00", label: "Review" },
  { personId: "tc", dayOffset: 2, start: "10:00", end: "11:30", label: "1:1" },
  { personId: "tc", dayOffset: 4, start: "15:00", end: "17:00", label: "Ship" },
]

/** Team week — readable people × day chip matrix. */
export default function Calendar05() {
  const [anchor, setAnchor] = React.useState(() => new Date())
  const weekStart = startOfWeek(anchor, { weekStartsOn: 1 })
  const days = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i))
  const today = new Date()

  return (
    <div className="w-full bg-canvas text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-start">
            <p className="text-sm font-medium text-primary">Team</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              Team availability
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {format(weekStart, "MMM d")} –{" "}
              {format(addDays(weekStart, 4), "MMM d, yyyy")} · Mon–Fri
            </p>
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
            <Badge variant="secondary">Team week</Badge>
          </div>
        </header>

        <div className="overflow-x-auto rounded-[12px] border border-border/70 bg-card shadow-soft">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/30">
                <th className="w-36 px-3 py-2.5 text-start text-xs font-semibold text-muted-foreground">
                  People
                </th>
                {days.map((day) => {
                  const isToday = isSameDay(day, today)
                  return (
                    <th
                      key={day.toISOString()}
                      className={cn(
                        "px-2 py-2.5 text-center font-normal",
                        isToday && "bg-primary/5"
                      )}
                    >
                      <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                        {format(day, "EEE")}
                      </p>
                      <p
                        className={cn(
                          "mx-auto mt-0.5 flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                          isToday && "bg-primary text-primary-foreground"
                        )}
                        dir="ltr"
                      >
                        {format(day, "d")}
                      </p>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {PEOPLE.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-border/70 last:border-b-0"
                >
                  <td className="px-3 py-2.5 align-top">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className={person.tone}>
                          {person.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 text-start">
                        <p className="truncate text-xs font-semibold">
                          {person.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  {days.map((day, di) => {
                    const blocks = BUSY.filter(
                      (b) => b.personId === person.id && b.dayOffset === di
                    )
                    return (
                      <td
                        key={day.toISOString()}
                        className={cn(
                          "px-1.5 py-2 align-top",
                          isSameDay(day, today) && "bg-primary/5"
                        )}
                      >
                        {blocks.length === 0 ? (
                          <span className="block rounded-md border border-dashed border-border/60 px-1.5 py-1 text-center text-[10px] text-muted-foreground">
                            Free
                          </span>
                        ) : (
                          <ul className="flex flex-col gap-1">
                            {blocks.map((b) => (
                              <li
                                key={`${b.label}-${b.start}`}
                                className={cn(
                                  "rounded-md px-1.5 py-1 text-start",
                                  person.tone
                                )}
                              >
                                <p className="truncate text-[10px] font-semibold leading-tight">
                                  {b.label}
                                </p>
                                <p
                                  className="mt-0.5 text-[9px] opacity-80 tabular-nums"
                                  dir="ltr"
                                >
                                  {b.start}–{b.end}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap gap-3 border-t border-border/70 px-3 py-2 text-[10px] text-muted-foreground">
            <span>Chips = busy blocks</span>
            <span>Dashed = free to schedule</span>
          </div>
        </div>
      </div>
    </div>
  )
}
