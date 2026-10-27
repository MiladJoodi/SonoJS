"use client"

import {
  KeyRoundIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

const methods = [
  {
    title: "Authenticator app",
    description: "Use a code from your authenticator.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Text message",
    description: "Get a code by SMS.",
    Icon: MessageSquareIcon,
  },
  {
    title: "Backup code",
    description: "Use a saved single-use code.",
    Icon: KeyRoundIcon,
  },
] as const

export default function TwoFactorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-soft",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <header className="flex flex-col items-start gap-3">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Verify it is you</h1>
          <p className="text-sm text-muted-foreground">
            Choose how you want to confirm this sign-in.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-2">
        {methods.map(({ title, description, Icon }) => (
          <Button
            key={title}
            type="button"
            variant="outline"
            className="h-auto w-full justify-start gap-3 rounded-[12px] border-border/70 bg-card px-3 py-3 text-start shadow-none hover:bg-muted">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
              <Icon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {title}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {description}
              </span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
