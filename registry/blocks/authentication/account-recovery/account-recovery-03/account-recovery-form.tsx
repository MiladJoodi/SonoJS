"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Calendar } from "@sonojs/ui/components/calendar"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 shadow-none"

export default function AccountRecoveryForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>()
  const [month, setMonth] = React.useState<Date>(
    () => new Date(2000, 0, 1)
  )

  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_28px_56px_-28px_rgba(10,10,12,0.18)]",
        "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_28px_56px_-28px_rgba(0,0,0,0.48)]",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-3">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Verify your identity</h1>
          <p className="text-sm text-muted-foreground">
            Answer a few details so we can confirm this account is yours.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="recovery-03-email">Account email</Label>
          <Input
            id="recovery-03-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className={controlClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="recovery-03-name">Full name on the account</Label>
          <Input
            id="recovery-03-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            required
            className={controlClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="recovery-03-dob">Date of birth</Label>
          <div className="relative" dir="ltr">
            <Input
              id="recovery-03-dob"
              type="text"
              dir="ltr"
              readOnly
              required
              value={date ? format(date, "MMM d, yyyy") : ""}
              placeholder="Select date"
              className={cn(controlClass, "cursor-pointer pe-10")}
              onClick={() => setOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setOpen(true)
                }
              }}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Open calendar"
                  className="absolute end-2 top-1/2 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <CalendarIcon className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
                dir="ltr"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date}
                  month={month}
                  onMonthChange={setMonth}
                  startMonth={new Date(1920, 0)}
                  endMonth={new Date()}
                  disabled={{ after: new Date() }}
                  onSelect={(next) => {
                    setDate(next)
                    if (next) setMonth(next)
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
        >
          Continue
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Need help?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Contact support
        </a>
      </p>
    </div>
  )
}
