"use client"

import * as React from "react"
import { ExternalLinkIcon, MailOpenIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const RESEND_SECONDS = 45
const MASKED_EMAIL = "j•••@example.com"

export default function AccountRecoveryForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [seconds, setSeconds] = React.useState(RESEND_SECONDS)

  React.useEffect(() => {
    if (seconds <= 0) return
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
  }, [seconds])

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
          <MailOpenIcon className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Check your inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            We sent a recovery link to{" "}
            <span dir="ltr" className="font-medium text-foreground">
              {MASKED_EMAIL}
            </span>
          </p>
        </div>
      </header>

      <Button type="button" className="w-full cursor-pointer">
        <ExternalLinkIcon className="size-4" aria-hidden />
        Open mail app
      </Button>

      <div className="flex flex-col items-center gap-2 text-center text-sm">
        {seconds > 0 ? (
          <p className="text-muted-foreground" dir="ltr">
            Resend email in {seconds}s
          </p>
        ) : (
          <button
            type="button"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            onClick={() => setSeconds(RESEND_SECONDS)}
          >
            Resend email
          </button>
        )}
        <a
          href="#"
          className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Use a different email
        </a>
      </div>
    </div>
  )
}
