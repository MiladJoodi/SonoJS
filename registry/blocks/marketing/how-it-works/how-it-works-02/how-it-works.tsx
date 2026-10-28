"use client"

import * as React from "react"
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const NAV = [
  {
    id: 1,
    label: "Service",
    hint: "What do you need?",
  },
  {
    id: 2,
    label: "Day",
    hint: "When works?",
  },
  {
    id: 3,
    label: "Time",
    hint: "Pick a slot",
  },
  {
    id: 4,
    label: "Confirm",
    hint: "You’re set",
  },
] as const

const SERVICES = [
  { name: "Consult", mins: "30 min", price: "Free" },
  { name: "Follow-up", mins: "20 min", price: "$45" },
  { name: "Check-in", mins: "15 min", price: "$25" },
] as const

const DAYS = [
  { d: "12", w: "Mon" },
  { d: "13", w: "Tue" },
  { d: "14", w: "Wed", on: true },
  { d: "15", w: "Thu" },
  { d: "16", w: "Fri" },
  { d: "17", w: "Sat" },
  { d: "18", w: "Sun" },
] as const

const SLOTS = ["9:00", "9:30", "11:00", "14:15", "16:45", "18:00"] as const

export default function HowItWorks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [step, setStep] = React.useState(1)
  const [service, setService] = React.useState(0)
  const [day, setDay] = React.useState(2)
  const [slot, setSlot] = React.useState("11:00")

  const active = NAV[step - 1]!
  const canBack = step > 1
  const canNext = step < 4

  return (
    <section
      className={cn(
        "w-full bg-canvas py-10 text-foreground sm:py-14",
        className
      )}
      aria-labelledby="how-it-works-02-heading"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="flex flex-col text-start lg:col-span-5">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h1
            id="how-it-works-02-heading"
            className="mt-1.5 text-h2 font-semibold tracking-tight"
          >
            Book like people actually book.
          </h1>
          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">
            One quiet desk — tap through service, day, time, confirm.
          </p>

          <ol className="mt-6 space-y-0.5">
            {NAV.map((item) => {
              const on = item.id === step
              const done = item.id < step
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setStep(item.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-[12px] px-2.5 py-2 text-start transition-colors",
                      on
                        ? "bg-muted/70"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <span
                      dir="ltr"
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold tabular-nums ring-1 ring-border/70",
                        on && "text-primary ring-primary/40",
                        done && !on && "text-primary",
                        !on && !done && "text-muted-foreground"
                      )}
                    >
                      {done && !on ? (
                        <CheckCircle2Icon className="size-3.5" aria-hidden />
                      ) : (
                        `0${item.id}`
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-semibold",
                          on ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {item.hint}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="mt-auto hidden pt-6 lg:block">
            <p className="text-xs text-muted-foreground">
              Try the panel — steps stay in sync.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-[16px] border border-border/70 bg-card shadow-soft">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
              <div className="min-w-0 text-start">
                <p className="text-xs font-medium text-muted-foreground">
                  North Clinic · Booking
                </p>
                <p className="truncate text-sm font-semibold">{active.label}</p>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden>
                {NAV.map((item) => (
                  <span
                    key={item.id}
                    className={cn(
                      "h-1.5 w-6 rounded-full transition-colors",
                      item.id <= step ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="min-h-[18rem] p-4 sm:p-5">
              {step === 1 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Choose a visit type
                  </p>
                  {SERVICES.map((s, i) => {
                    const on = service === i
                    return (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setService(i)}
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] border px-3.5 py-3 text-start transition-colors",
                          on
                            ? "border-primary/40 bg-primary/5"
                            : "border-border/70 hover:bg-muted/40"
                        )}
                      >
                        <span>
                          <span className="block text-sm font-semibold">
                            {s.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {s.mins}
                          </span>
                        </span>
                        <span
                          dir="ltr"
                          className="font-mono text-sm tabular-nums text-muted-foreground"
                        >
                          {s.price}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : null}

              {step === 2 ? (
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <CalendarDaysIcon className="size-4 opacity-70" aria-hidden />
                      March 2026
                    </p>
                    <div className="flex gap-1">
                      <span className="flex size-8 items-center justify-center rounded-md border border-border/70 text-muted-foreground">
                        <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
                      </span>
                      <span className="flex size-8 items-center justify-center rounded-md border border-border/70 text-muted-foreground">
                        <ChevronRightIcon className="size-4 icon-dir" aria-hidden />
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2" dir="ltr">
                    {DAYS.map((d, i) => {
                      const on = day === i
                      return (
                        <button
                          key={d.d}
                          type="button"
                          onClick={() => setDay(i)}
                          className={cn(
                            "flex cursor-pointer flex-col items-center rounded-[12px] border py-3 transition-colors",
                            on
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-transparent bg-muted/50 text-foreground hover:bg-muted"
                          )}
                        >
                          <span className="text-[10px] font-medium uppercase opacity-80">
                            {d.w}
                          </span>
                          <span className="mt-1 text-sm font-semibold tabular-nums">
                            {d.d}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3.5" aria-hidden />
                    In-person · 214 Market St
                  </p>
                </div>
              ) : null}

              {step === 3 ? (
                <div>
                  <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon className="size-4" aria-hidden />
                    Open slots for Wed {DAYS[day]?.d}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" dir="ltr">
                    {SLOTS.map((t) => {
                      const on = slot === t
                      const popular = t === "11:00"
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSlot(t)}
                          className={cn(
                            "relative flex h-[46px] cursor-pointer items-center justify-center rounded-[12px] border text-sm font-medium tabular-nums transition-colors",
                            on
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border/70 hover:bg-muted/50"
                          )}
                        >
                          {t}
                          {popular && !on ? (
                            <span className="absolute -top-2 end-2 rounded-full bg-primary/10 px-1.5 text-[9px] font-semibold text-primary">
                              Hot
                            </span>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="flex h-full flex-col items-stretch justify-center gap-6 py-4">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2Icon className="size-7" aria-hidden />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">You’re booked</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Confirmation lands in your inbox in a moment.
                    </p>
                  </div>
                  <div className="rounded-[12px] border border-border/70 bg-muted/40 p-4 text-start">
                    <p className="text-sm font-semibold">
                      {SERVICES[service]?.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                      Wed {DAYS[day]?.d} · {slot}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Dr. Sofia Rivera · North Clinic
                    </p>
                  </div>
                  <Button type="button" variant="outline" className="w-full cursor-pointer">
                    Add to calendar
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/70 px-5 py-4">
              <Button
                type="button"
                variant="ghost"
                disabled={!canBack}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
                Back
              </Button>
              {canNext ? (
                <Button
                  type="button"
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  className="cursor-pointer"
                >
                  Continue
                  <ChevronRightIcon className="size-4 icon-dir" aria-hidden />
                </Button>
              ) : (
                <Button asChild className="cursor-pointer">
                  <a href="#">Done</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
