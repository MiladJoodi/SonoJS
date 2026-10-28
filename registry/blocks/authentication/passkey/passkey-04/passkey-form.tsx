"use client"

import type * as React from "react"
import {
  FingerprintIcon,
  LaptopIcon,
  PlusIcon,
  SmartphoneIcon,
  UsbIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const keys = [
  {
    name: "This Mac",
    meta: "Last used · today",
    Icon: LaptopIcon,
    current: true,
  },
  {
    name: "iPhone",
    meta: "Last used · 3 days ago",
    Icon: SmartphoneIcon,
    current: false,
  },
  {
    name: "Security key",
    meta: "Last used · 2 weeks ago",
    Icon: UsbIcon,
    current: false,
  },
] as const

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-3 text-start">
        <div className="flex w-full items-start justify-between gap-3">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FingerprintIcon className="size-5" aria-hidden />
          </span>
          <Badge
            variant="secondary"
            className="border-0 bg-muted text-muted-foreground"
          >
            {keys.length} passkeys
          </Badge>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Manage passkeys
          </h1>
          <p className="text-sm text-muted-foreground">
            Devices and keys that can sign you in. Revoke anything you no longer
            use.
          </p>
        </div>
      </header>

      <ul className="flex flex-col gap-2">
        {keys.map((key) => (
          <li
            key={key.name}
            className="flex items-center gap-3 rounded-[12px] border border-border/70 px-3 py-3"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
              <key.Icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-foreground">{key.name}</p>
                {key.current ? (
                  <Badge className="border-0 bg-primary/15 text-primary hover:bg-primary/15">
                    This device
                  </Badge>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">{key.meta}</p>
            </div>
            {!key.current ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Revoke
              </Button>
            ) : null}
          </li>
        ))}
      </ul>

      <Button type="button" variant="outline" className="w-full cursor-pointer">
        <PlusIcon className="size-4" aria-hidden />
        Add a passkey
      </Button>
    </div>
  )
}
