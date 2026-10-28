"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, SmartphoneIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { cn } from "@/lib/utils"

const DEMO_COUNTRIES = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
] as const

type DemoCountry = (typeof DEMO_COUNTRIES)[number]

export default function AccountRecoveryForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [country, setCountry] = React.useState<DemoCountry>(DEMO_COUNTRIES[0]!)
  const [phone, setPhone] = React.useState("")

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SmartphoneIcon className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Recover by phone
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose your country and enter the phone number on your account.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2 text-start">
          <Label htmlFor="recovery-02-phone">Phone number</Label>
          <InputGroup
            dir="ltr"
            className={cn(
              "h-[46px] rounded-[12px] border-border/70",
              open ? "overflow-visible" : "overflow-hidden"
            )}
          >
            <InputGroupAddon
              align="inline-start"
              className="border-e border-border/70 pe-0"
            >
              <Popover open={open} onOpenChange={setOpen} modal={false}>
                <PopoverTrigger asChild>
                  <InputGroupButton
                    type="button"
                    size="sm"
                    aria-label="Select country"
                    aria-expanded={open}
                    className="h-[calc(100%-6px)] min-h-9 cursor-pointer gap-1.5 rounded-[calc(12px-4px)] px-2.5 tabular-nums"
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {country.flag}
                    </span>
                    <span className="text-sm text-foreground">
                      {country.dial}
                    </span>
                    <ChevronsUpDownIcon className="size-3.5 opacity-50" />
                  </InputGroupButton>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-[min(100vw-2rem,18rem)] p-0"
                  dir="ltr"
                  onOpenAutoFocus={(event) => event.preventDefault()}
                  onCloseAutoFocus={(event) => event.preventDefault()}
                >
                  <div className="max-h-72 overflow-y-auto py-0">
                    {DEMO_COUNTRIES.map((item, index) => {
                      const checked = item.code === country.code
                      return (
                        <button
                          key={item.code}
                          type="button"
                          data-checked={checked ? true : undefined}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-sm outline-none",
                            "hover:bg-muted/50 focus-visible:bg-muted/50",
                            index < DEMO_COUNTRIES.length - 1 &&
                              "border-b border-border/40"
                          )}
                          onClick={() => {
                            setCountry(item)
                            setOpen(false)
                          }}
                        >
                          <span className="text-base leading-none" aria-hidden>
                            {item.flag}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-start">
                            {item.name}
                          </span>
                          <span className="text-muted-foreground tabular-nums">
                            {item.dial}
                          </span>
                          <CheckIcon
                            className={cn(
                              "size-4 shrink-0",
                              checked ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </button>
                      )
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </InputGroupAddon>
            <InputGroupInput
              id="recovery-02-phone"
              type="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(555) 000-0000"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-full text-start"
            />
          </InputGroup>
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Send recovery code
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Prefer email?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Recover with email
        </a>
      </p>
    </div>
  )
}
