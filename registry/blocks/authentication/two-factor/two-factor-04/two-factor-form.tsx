"use client"

import * as React from "react"
import {
  KeyRoundIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const methods = [
  {
    id: "authenticator",
    title: "Authenticator app",
    description: "Use a code from your authenticator.",
    Icon: ShieldCheckIcon,
    recommended: true,
  },
  {
    id: "sms",
    title: "Text message",
    description: "Get a code by SMS to ···· 4242.",
    Icon: MessageSquareIcon,
    recommended: false,
  },
  {
    id: "backup",
    title: "Backup code",
    description: "Use a saved single-use code.",
    Icon: KeyRoundIcon,
    recommended: false,
  },
] as const

export default function TwoFactorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [selected, setSelected] = React.useState<string>("authenticator")

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-1.5 text-start">
        <h1 className="text-h3 font-semibold tracking-tight text-foreground">
          Verify it&apos;s you
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose how you want to confirm this sign-in.
        </p>
      </header>

      <div
        className="flex flex-col gap-2"
        role="radiogroup"
        aria-label="Two-factor method"
      >
        {methods.map(({ id, title, description, Icon, recommended }) => {
          const on = selected === id
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setSelected(id)}
              className={cn(
                "flex w-full cursor-pointer items-start gap-3 rounded-[12px] border px-3 py-3 text-start transition-colors",
                on
                  ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                  : "border-border/70 bg-card hover:bg-muted/40"
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-md",
                  on
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-foreground"
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {title}
                  </span>
                  {recommended ? (
                    <Badge className="border-0 bg-primary/15 text-primary hover:bg-primary/15">
                      Recommended
                    </Badge>
                  ) : null}
                </span>
                <span className="text-xs text-muted-foreground">
                  {description}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <Button type="button" className="w-full cursor-pointer">
        Continue
      </Button>
    </div>
  )
}
