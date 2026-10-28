"use client"

import type * as React from "react"
import { CheckIcon, LockIcon, MailIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

const POINTS = [
  "Secure link expires in 30 minutes",
  "Works even if you forgot your password",
  "No password shared over email",
] as const

export default function AccountRecoveryForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <aside className="relative flex flex-col justify-between gap-8 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
        <div className="space-y-4 text-start">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 text-primary">
            <LockIcon className="size-5" aria-hidden />
          </span>
          <div className="space-y-2">
            <h1 className="text-h3 font-semibold tracking-tight">
              Locked out? We&apos;ll get you back.
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Account recovery restores access without exposing your password —
              start with the email on file.
            </p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {POINTS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-zinc-300"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <CheckIcon className="size-3" aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <LockIcon className="size-3.5" aria-hidden />
          Encrypted recovery · audit logged
        </p>
      </aside>

      <div className="flex flex-col justify-center gap-6 bg-card p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Recover with email
          </h2>
          <p className="text-sm text-muted-foreground">
            We&apos;ll send a one-time link to unlock this account.
          </p>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-2">
            <Label htmlFor="recovery-06-email">Email</Label>
            <Input
              id="recovery-06-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            <MailIcon className="size-4" aria-hidden />
            Send recovery link
          </Button>
        </form>

        <p className="text-start text-sm text-muted-foreground">
          Remembered it?{" "}
          <a
            href="#"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
          >
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  )
}
