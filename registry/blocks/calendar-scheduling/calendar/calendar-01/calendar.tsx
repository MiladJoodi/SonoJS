"use client"

import * as React from "react"
import { addMonths, format, isSameDay } from "date-fns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
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

function atNoon(offsetDays: number) {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() + offsetDays)
  return d
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

function buildInitialEvents(): CalendarEvent[] {
  return [
    {
      id: "1",
      title: "Design Sync",
      date: atNoon(0),
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
      date: atNoon(0),
      start: "11:30",
      end: "12:00",
      category: "engineering",
      meeting: true,
      attendees: [ATTENDEES.alex, ATTENDEES.david, ATTENDEES.sarah],
    },
    {
      id: "3",
      title: "Sprint Planning",
      date: atNoon(1),
      start: "13:00",
      end: "14:00",
      category: "engineering",
      meeting: true,
      attendees: [ATTENDEES.alex, ATTENDEES.david],
    },
    {
      id: "4",
      title: "Product Launch Review",
      date: atNoon(3),
      start: "14:00",
      end: "15:30",
      category: "marketing",
      location: "HQ · Conference 2",
      attendees: [ATTENDEES.maria, ATTENDEES.sarah],
    },
    {
      id: "5",
      title: "Board Meeting",
      date: atNoon(7),
      start: "09:00",
      end: "10:30",
      category: "admin",
      location: "Executive suite",
      attendees: [ATTENDEES.david, ATTENDEES.maria, ATTENDEES.alex],
    },
  ]
}

function formatTimeRange(start: string, end: string) {
  const toLabel = (t: string) => {
    const [h, m] = t.split(":").map(Number)
    const d = new Date()
    d.setHours(h ?? 0, m ?? 0, 0, 0)
    return format(d, "h:mm a")
  }
  return `${toLabel(start)} – ${toLabel(end)}`
}

/** Month + day agenda with create/edit dialog. */
export default function Calendar01() {
  const [month, setMonth] = React.useState(() => new Date())
  const [selected, setSelected] = React.useState<Date | undefined>(() =>
    atNoon(0)
  )
  const [events, setEvents] = React.useState(buildInitialEvents)
  const [open, setOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [title, setTitle] = React.useState("")
  const [dateValue, setDateValue] = React.useState(() =>
    format(atNoon(0), "yyyy-MM-dd")
  )
  const [startTime, setStartTime] = React.useState("10:00")
  const [endTime, setEndTime] = React.useState("10:45")
  const [category, setCategory] = React.useState<Category>("design")

  const dayEvents = React.useMemo(() => {
    if (!selected) return []
    return events
      .filter((e) => isSameDay(e.date, selected))
      .sort((a, b) => a.start.localeCompare(b.start))
  }, [events, selected])

  const openCreate = () => {
    const d = selected ?? atNoon(0)
    setEditingId(null)
    setDateValue(format(d, "yyyy-MM-dd"))
    setTitle("")
    setStartTime("10:00")
    setEndTime("10:45")
    setCategory("design")
    setOpen(true)
  }

  const openEdit = (event: CalendarEvent) => {
    setEditingId(event.id)
    setDateValue(format(event.date, "yyyy-MM-dd"))
    setTitle(event.title)
    setStartTime(event.start)
    setEndTime(event.end)
    setCategory(event.category)
    setOpen(true)
  }

  const saveEvent = () => {
    if (!title.trim()) return
    const [y, m, d] = dateValue.split("-").map(Number)
    const date = new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0)
    if (editingId) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                title: title.trim(),
                date,
                start: startTime,
                end: endTime,
                category,
              }
            : e
        )
      )
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          title: title.trim(),
          date,
          start: startTime,
          end: endTime,
          category,
          attendees: [ATTENDEES.sarah],
        },
      ])
    }
    setSelected(date)
    setMonth(date)
    setOpen(false)
  }

  const deleteEvent = () => {
    if (!editingId) return
    setEvents((prev) => prev.filter((e) => e.id !== editingId))
    setOpen(false)
  }

  return (
    <div className="w-full bg-canvas text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-start">
            <p className="text-sm font-medium text-primary">Calendar</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {format(month, "MMMM yyyy")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {events.length} events · select a day to review the agenda
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border border-border/70 bg-card p-0.5 shadow-soft">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer"
                aria-label="Previous month"
                onClick={() => setMonth((m) => addMonths(m, -1))}
              >
                <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
              </Button>
              <span
                className="min-w-28 px-2 text-center text-sm font-semibold tabular-nums"
                dir="ltr"
              >
                {format(month, "MMM yyyy")}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer"
                aria-label="Next month"
                onClick={() => setMonth((m) => addMonths(m, 1))}
              >
                <ChevronRightIcon className="icon-dir size-4" aria-hidden />
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => {
                const today = atNoon(0)
                setSelected(today)
                setMonth(today)
              }}
            >
              Today
            </Button>
            <Button
              type="button"
              size="sm"
              className="cursor-pointer gap-1.5"
              onClick={openCreate}
            >
              <PlusIcon className="size-4" aria-hidden />
              New event
            </Button>
          </div>
        </header>

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-[12px] border border-border/70 bg-card p-2 shadow-soft sm:p-3">
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={selected}
              onSelect={setSelected}
              hideNavigation
              className="w-full [--cell-size:--spacing(8)]"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full",
                month_caption: "justify-start px-1",
                caption_label: "text-sm font-semibold",
              }}
              components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                  const dayCats = events
                    .filter((e) => isSameDay(e.date, day.date))
                    .map((e) => e.category)
                  const unique = [...new Set(dayCats)].slice(0, 3)
                  return (
                    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                      {children}
                      {!modifiers.outside && unique.length > 0 ? (
                        <span className="flex items-center justify-center gap-0.5">
                          {unique.map((cat) => (
                            <span
                              key={cat}
                              className={cn(
                                "size-1 rounded-full",
                                CATEGORY_STYLES[cat].dot
                              )}
                              aria-hidden
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="size-1 opacity-0" aria-hidden />
                      )}
                    </CalendarDayButton>
                  )
                },
              }}
            />
            <Separator className="my-3" />
            <ul className="flex flex-wrap gap-3 px-1 pb-1 text-xs text-muted-foreground">
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

          <aside className="flex flex-col rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="border-b border-border/70 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="text-start">
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
                  className="cursor-pointer"
                  aria-label="Add event for selected day"
                  onClick={openCreate}
                >
                  <PlusIcon className="size-4" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="max-h-[28rem] overflow-y-auto p-3 pb-8">
              {dayEvents.length === 0 ? (
                <div className="flex min-h-32 flex-col items-center justify-center rounded-[12px] border border-dashed border-border/70 bg-muted/20 px-4 py-8 text-center">
                  <p className="text-sm font-medium">Nothing on the calendar</p>
                  <p className="mt-1 max-w-55 text-xs text-muted-foreground">
                    Create an event for this day or pick another date.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    className="mt-4 cursor-pointer gap-1.5"
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
                      <li key={event.id}>
                        <button
                          type="button"
                          onClick={() => openEdit(event)}
                          className="w-full cursor-pointer rounded-[12px] border border-border/70 bg-muted/20 p-3 text-start transition-colors hover:border-primary/25 hover:bg-card"
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
                                <PencilIcon
                                  className="size-3 shrink-0 text-muted-foreground"
                                  aria-hidden
                                />
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
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex -space-x-2 rtl:space-x-reverse">
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
                            </div>
                          </div>
                        </button>
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
              <DialogTitle>
                {editingId ? "Edit event" : "New event"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Update or remove this calendar event."
                  : "Add a meeting or reminder to your calendar."}
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
                    dir="ltr"
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
                    <SelectTrigger id="cal-01-category" className="w-full cursor-pointer">
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
                    dir="ltr"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cal-01-end">Ends</FieldLabel>
                  <Input
                    id="cal-01-end"
                    type="time"
                    dir="ltr"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Field>
              </div>
            </FieldGroup>
            <DialogFooter className="flex-row gap-2 sm:justify-between">
              {editingId ? (
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer gap-1.5 text-destructive hover:text-destructive"
                  onClick={deleteEvent}
                >
                  <Trash2Icon className="size-3.5" aria-hidden />
                  Delete
                </Button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={saveEvent}
                  disabled={!title.trim()}
                >
                  {editingId ? "Save changes" : "Save event"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
