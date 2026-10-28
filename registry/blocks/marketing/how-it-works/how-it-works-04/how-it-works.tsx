"use client"

import * as React from "react"
import {
  CheckIcon,
  FingerprintIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    id: 1,
    label: "Email in",
    hint: "No password yet",
    title: "What’s your work email?",
    body: "We’ll send a one-time code — then lock the account to this device.",
  },
  {
    id: 2,
    label: "Verify device",
    hint: "Trusted phone",
    title: "Confirm it’s you",
    body: "Open the push on your phone or enter the 6-digit code from SMS.",
  },
  {
    id: 3,
    label: "Create passkey",
    hint: "Face ID / Touch ID",
    title: "Skip passwords forever",
    body: "Save a passkey on this device. Banks, Google, and Apple already taught people this gesture.",
  },
  {
    id: 4,
    label: "You’re in",
    hint: "Workspace ready",
    title: "Welcome to North",
    body: "Signed in with a passkey. Next visit is one tap — no reset links.",
  },
] as const

export default function HowItWorks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [step, setStep] = React.useState(3)
  const active = STEPS[step - 1]!

  return (
    <section
      className={cn(
        "w-full bg-white py-10 text-foreground sm:py-14 dark:bg-background",
        className
      )}
      aria-labelledby="how-it-works-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h1
            id="how-it-works-04-heading"
            className="mt-1.5 text-h2 font-semibold tracking-tight"
          >
            Sign-in the way people actually do it now.
          </h1>
          <p className="mx-auto mt-2.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Email → device trust → passkey → in. The same four beats you see on
            banks, airlines, and every serious SaaS in 2026.
          </p>
        </header>

        {/* Progress rail */}
        <ol className="mx-auto mt-8 flex max-w-3xl items-start justify-between gap-2">
          {STEPS.map((item, index) => {
            const on = item.id === step
            const done = item.id < step
            return (
              <li
                key={item.id}
                className="flex min-w-0 flex-1 flex-col items-center gap-2"
              >
                <div className="flex w-full items-center">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "h-px flex-1",
                        done || on ? "bg-primary/40" : "bg-border/70"
                      )}
                    />
                  ) : (
                    <span className="flex-1" />
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(item.id)}
                    className={cn(
                      "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-xs font-semibold tabular-nums ring-1 ring-border/70 transition-colors dark:bg-card",
                      on && "text-primary ring-primary/40",
                      done && !on && "text-primary",
                      !on && !done && "text-muted-foreground"
                    )}
                    aria-current={on ? "step" : undefined}
                    aria-label={`${item.label}: ${item.hint}`}
                  >
                    {done && !on ? (
                      <CheckIcon className="size-3.5" aria-hidden />
                    ) : (
                      `0${item.id}`
                    )}
                  </button>
                  {index < STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "h-px flex-1",
                        done ? "bg-primary/40" : "bg-border/70"
                      )}
                    />
                  ) : (
                    <span className="flex-1" />
                  )}
                </div>
                <div className="min-w-0 px-0.5 text-center">
                  <p
                    className={cn(
                      "truncate text-xs font-semibold",
                      on ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </p>
                  <p className="hidden truncate text-[10px] text-muted-foreground sm:block">
                    {item.hint}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Phone / card stage */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="text-start lg:col-span-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Step 0{step}
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
              {active.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {active.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button
                size="sm"
                className="cursor-pointer"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
              >
                {step === 4 ? "Open workspace" : "Continue"}
              </Button>
              {step > 1 ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                >
                  Back
                </Button>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[24px] border border-border/70 bg-card p-1 shadow-soft">
              <div className="rounded-[20px] bg-muted/40 px-5 py-6 dark:bg-muted/20">
                <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-foreground/15" />

                {step === 1 ? (
                  <div className="space-y-4 text-start">
                    <p className="text-sm font-semibold">Work email</p>
                    <div className="rounded-[12px] border border-border/70 bg-background px-3 py-2.5 text-sm text-muted-foreground">
                      you@north.studio
                    </div>
                    <Button className="w-full cursor-pointer" size="sm">
                      Send code
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground">
                      No password on this screen — on purpose.
                    </p>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-4 text-center">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white ring-1 ring-border/70 dark:bg-card">
                      <SmartphoneIcon className="size-5 text-primary" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Check your phone</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Push sent to ···· 4821
                      </p>
                    </div>
                    <div
                      dir="ltr"
                      className="flex justify-center gap-2 font-mono text-lg font-semibold tabular-nums"
                    >
                      {["4", "8", "2", "·", "·", "·"].map((d, i) => (
                        <span
                          key={i}
                          className="flex size-9 items-center justify-center rounded-md border border-border/70 bg-background"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-4 text-center">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                      <FingerprintIcon className="size-7" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Create a passkey</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Use Face ID, Touch ID, or your device PIN
                      </p>
                    </div>
                    <Button className="w-full cursor-pointer" size="sm">
                      <KeyRoundIcon className="size-4" aria-hidden />
                      Save passkey
                    </Button>
                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                      <ShieldCheckIcon className="size-3.5" aria-hidden />
                      Synced to your password manager
                    </p>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="space-y-4 text-center">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <CheckIcon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">You&apos;re signed in</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Passkey · this Mac · North workspace
                      </p>
                    </div>
                    <div className="rounded-[12px] border border-border/70 bg-background p-3 text-start">
                      <p className="text-xs text-muted-foreground">Next up</p>
                      <p className="mt-1 text-sm font-medium">
                        Invite 2 teammates · Connect Slack
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
