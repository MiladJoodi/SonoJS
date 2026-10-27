"use client"

import * as React from "react"
import { format, isSameDay } from "date-fns"
import {
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  VideoIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Calendar,
  CalendarDayButton,
} from "@sonojs/ui/components/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import alexImg from "./images/alex.webp"
import davidImg from "./images/david.webp"
import mariaImg from "./images/maria.webp"
import sarahImg from "./images/sarah.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Category = "design" | "engineering" | "marketing" | "admin"

type Attendee = {
  name: string
  initials: string
  src: string
}

type CalendarEvent = {
  id: string
  title: string
  date: Date
  start: string
  end: string
  category: Category
  location?: string
  meeting?: boolean
  attendees: Attendee[]
}

const ATTENDEES = {
  sarah: {
    name: "Sarah Jenkins",
    initials: "SJ",
    src: assetSrc(sarahImg),
  },
  alex: {
    name: "Alex Rivera",
    initials: "AR",
    src: assetSrc(alexImg),
  },
  david: {
    name: "David Chen",
    initials: "DC",
    src: assetSrc(davidImg),
  },
  maria: {
    name: "Maria Garcia",
    initials: "MG",
    src: assetSrc(mariaImg),
  },
} as const

const CATEGORY_STYLES: Record<
  Category,
  { label: string; badge: string; dot: string }
> = {
  design: {
    label: "Design",
    badge: "border-transparent bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  engineering: {
    label: "Engineering",
    badge:
      "border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  marketing: {
    label: "Marketing",
    badge:
      "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  admin: {
    label: "Admin",
    badge: "border-transparent bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Design Sync",
    date: new Date(2026, 5, 15),
    start: "10:00",
    end: "10:45",
    category: "design",
    meeting: true,
    location: "Figma · Room A",
    attendees: [ATTENDEES.sarah, ATTENDEES.maria, ATTENDEES.alex],
  },
  {
    id: "2",
    title: "Weekly Standup",
    date: new Date(2026, 5, 15),
    start: "11:30",
    end: "12:00",
    category: "engineering",
    meeting: true,
    attendees: [ATTENDEES.alex, ATTENDEES.david, ATTENDEES.sarah],
  },
  {
    id: "3",
    title: "Product Launch Review",
    date: new Date(2026, 5, 18),
    start: "14:00",
    end: "15:30",
    category: "marketing",
    location: "HQ · Conference 2",
    attendees: [ATTENDEES.maria, ATTENDEES.sarah],
  },
  {
    id: "4",
    title: "Board Meeting",
    date: new Date(2026, 5, 22),
    start: "09:00",
    end: "10:30",
    category: "admin",
    location: "Executive suite",
    attendees: [ATTENDEES.david, ATTENDEES.maria, ATTENDEES.alex],
  },
  {
    id: "5",
    title: "Sprint Planning",
    date: new Date(2026, 5, 16),
    start: "13:00",
    end: "14:00",
    category: "engineering",
    meeting: true,
    attendees: [ATTENDEES.alex, ATTENDEES.david],
  },
]

function formatTimeRange(start: string, end: string) {
  const toLabel = (t: string) => {
    const [h, m] = t.split(":").map(Number)
    const d = new Date()
    d.setHours(h ?? 0, m ?? 0, 0, 0)
    return format(d, "h:mm a")
  }
  return `${toLabel(start)} – ${toLabel(end)}`
}

export default function Calendar01() {
  const [month, setMonth] = React.useState(new Date(2026, 5, 1))
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 5, 15)
  )
  const [events, setEvents] = React.useState(INITIAL_EVENTS)
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [dateValue, setDateValue] = React.useState("2026-06-15")
  const [startTime, setStartTime] = React.useState("10:00")
  const [endTime, setEndTime] = React.useState("10:45")
  const [category, setCategory] = React.useState<Category>("design")

  const eventDates = React.useMemo(
    () => events.map((e) => e.date),
    [events]
  )

  const dayEvents = React.useMemo(() => {
    if (!selected) return []
    return events
      .filter((e) => isSameDay(e.date, selected))
      .sort((a, b) => a.start.localeCompare(b.start))
  }, [events, selected])

  const openCreate = () => {
    const d = selected ?? new Date(2026, 5, 15)
    setDateValue(format(d, "yyyy-MM-dd"))
    setTitle("")
    setStartTime("10:00")
    setEndTime("10:45")
    setCategory("design")
    setOpen(true)
  }

  const saveEvent = () => {
    if (!title.trim()) return
    const [y, m, d] = dateValue.split("-").map(Number)
    const next: CalendarEvent = {
      id: String(Date.now()),
      title: title.trim(),
      date: new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1),
      start: startTime,
      end: endTime,
      category,
      attendees: [ATTENDEES.sarah],
    }
    setEvents((prev) => [...prev, next])
    setSelected(next.date)
    setMonth(next.date)
    setOpen(false)
  }

  return (
    <div className="min-h-svh bg-canvas text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Calendar</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {format(month, "MMMM yyyy")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {events.length} events this month · select a day to review the
              agenda
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date(2026, 5, 15)
                setSelected(today)
                setMonth(today)
              }}
            >
              Today
            </Button>
            <Button type="button" size="sm" className="gap-1.5" onClick={openCreate}>
              <PlusIcon className="size-4" aria-hidden />
              New event
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-[12px] border border-border/70 bg-card p-3 shadow-soft sm:p-4">
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={selected}
              onSelect={setSelected}
              modifiers={{ hasEvent: eventDates }}
              className="w-full [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(11)]"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full",
              }}
              components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                  const count = events.filter((e) =>
                    isSameDay(e.date, day.date)
                  ).length
                  return (
                    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                      {children}
                      {!modifiers.outside && count > 0 ? (
                        <span className="flex items-center justify-center gap-0.5">
                          {Array.from({ length: Math.min(count, 3) }).map(
                            (_, i) => (
                              <span
                                key={i}
                                className="size-1 rounded-full bg-primary"
                                aria-hidden
                              />
                            )
                          )}
                        </span>
                      ) : (
                        <span className="size-1 opacity-0" aria-hidden />
                      )}
                    </CalendarDayButton>
                  )
                },
              }}
            />
            <Separator className="my-4" />
            <ul className="flex flex-wrap gap-3 px-1 text-xs text-muted-foreground">
              {(Object.keys(CATEGORY_STYLES) as Category[]).map((key) => (
                <li key={key} className="flex items-center gap-1.5">
                  <span
                    className={cn("size-2 rounded-full", CATEGORY_STYLES[key].dot)}
                    aria-hidden
                  />
                  {CATEGORY_STYLES[key].label}
                </li>
              ))}
            </ul>
          </section>

          <aside className="flex min-h-105 flex-col rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="border-b border-border/70 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">
                    {selected
                      ? format(selected, "EEEE, MMM d")
                      : "Select a day"}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {dayEvents.length === 0
                      ? "No events scheduled"
                      : `${dayEvents.length} event${dayEvents.length === 1 ? "" : "s"}`}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  aria-label="Add event for selected day"
                  onClick={openCreate}
                >
                  <PlusIcon className="size-4" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {dayEvents.length === 0 ? (
                <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-[12px] border border-dashed border-border/70 bg-muted/20 px-6 text-center">
                  <p className="text-sm font-medium">Nothing on the calendar</p>
                  <p className="mt-1 max-w-55 text-xs text-muted-foreground">
                    Create an event for this day or pick another date.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    className="mt-4 gap-1.5"
                    onClick={openCreate}
                  >
                    <PlusIcon className="size-3.5" aria-hidden />
                    Add event
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {dayEvents.map((event) => {
                    const style = CATEGORY_STYLES[event.category]
                    return (
                      <li
                        key={event.id}
                        className="rounded-[12px] border border-border/70 bg-muted/20 p-4 transition-colors hover:border-primary/25 hover:bg-card"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "size-2 shrink-0 rounded-full",
                                  style.dot
                                )}
                                aria-hidden
                              />
                              <h3 className="truncate text-sm font-semibold">
                                {event.title}
                              </h3>
                            </div>
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <ClockIcon className="size-3.5" aria-hidden />
                              <span dir="ltr">
                                {formatTimeRange(event.start, event.end)}
                              </span>
                            </p>
                            {event.location ? (
                              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                {event.meeting ? (
                                  <VideoIcon className="size-3.5" aria-hidden />
                                ) : (
                                  <MapPinIcon className="size-3.5" aria-hidden />
                                )}
                                {event.location}
                              </p>
                            ) : null}
                          </div>
                          <Badge className={cn("shrink-0", style.badge)}>
                            {style.label}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="flex -space-x-2">
                            {event.attendees.slice(0, 3).map((person) => (
                              <Avatar
                                key={person.name}
                                size="sm"
                                className="ring-2 ring-card"
                              >
                                <AvatarImage
                                  src={person.src}
                                  alt={person.name}
                                />
                                <AvatarFallback>
                                  {person.initials}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {event.attendees.length > 3 ? (
                              <span className="flex size-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold ring-2 ring-card">
                                +{event.attendees.length - 3}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New event</DialogTitle>
              <DialogDescription>
                Add a meeting or reminder to your calendar.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="gap-4 px-1">
              <Field>
                <FieldLabel htmlFor="cal-01-title">Title</FieldLabel>
                <Input
                  id="cal-01-title"
                  placeholder="e.g. Design review"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="cal-01-date">Date</FieldLabel>
                  <Input
                    id="cal-01-date"
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cal-01-category">Category</FieldLabel>
                  <Select
                    value={category}
                    onValueChange={(v) => setCategory(v as Category)}
                  >
                    <SelectTrigger id="cal-01-category" className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="cal-01-start">Starts</FieldLabel>
                  <Input
                    id="cal-01-start"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cal-01-end">Ends</FieldLabel>
                  <Input
                    id="cal-01-end"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Field>
              </div>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="button" onClick={saveEvent} disabled={!title.trim()}>
                Save event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
