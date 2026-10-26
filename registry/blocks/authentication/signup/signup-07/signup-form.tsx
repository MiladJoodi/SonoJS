"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 shadow-none"

const steps = ["Account", "Profile", "Done"] as const

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex w-full items-center gap-2">
      {steps.map((label, index) => {
        const n = index + 1
        const active = n === step
        const done = n < step
        return (
          <li key={label} className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                  done && "bg-primary text-primary-foreground",
                  active && "bg-primary text-primary-foreground",
                  !done && !active && "bg-muted text-muted-foreground"
                )}
              >
                {done ? <CheckIcon className="size-3.5" /> : n}
              </span>
              <span
                className={cn(
                  "truncate text-xs font-medium",
                  active || done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            <div
              className={cn(
                "h-0.5 w-full rounded-full",
                done || active ? "bg-primary" : "bg-muted"
              )}
            />
          </li>
        )
      })}
    </ol>
  )
}

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = React.useState(1)

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-6 py-10",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
          "flex w-full max-w-md flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
          "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_28px_56px_-28px_rgba(10,10,12,0.18)]",
          "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_28px_56px_-28px_rgba(0,0,0,0.48)]"
        )}
      >
        <header className="flex flex-col items-start gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
          <div className="space-y-1.5">
            <h1 className="text-h3 text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Three short steps. No password reset yet.
            </p>
          </div>
        </header>

        <Stepper step={step} />

        {step === 1 ? (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setStep(2)
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-07-name">Name</Label>
              <Input
                id="signup-07-name"
                autoComplete="name"
                placeholder="Lila Reyes"
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-07-email">Email</Label>
              <Input
                id="signup-07-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-07-password">Password</Label>
              <Input
                id="signup-07-password"
                type="password"
                autoComplete="new-password"
                placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                required
                className={controlClass}
              />
            </div>
            <Button
              type="submit"
              className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
            >
              Continue
            </Button>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setStep(3)
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-07-company">Company</Label>
              <Input
                id="signup-07-company"
                autoComplete="organization"
                placeholder="Cove Studio"
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-07-role">Role</Label>
              <Input
                id="signup-07-role"
                placeholder="Designer"
                className={controlClass}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="h-[46px] rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="h-[46px] rounded-[12px] shadow-none"
              >
                Continue
              </Button>
            </div>
          </form>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckIcon className="size-6" />
            </span>
            <div className="space-y-1.5">
              <h2 className="text-h4 text-foreground">{"You're all set"}</h2>
              <p className="text-sm text-muted-foreground">
                Your account is ready. Jump into the workspace.
              </p>
            </div>
            <Button
              type="button"
              className="mt-2 h-[46px] w-full rounded-[12px] shadow-none"
            >
              Open workspace
            </Button>
            <button
              type="button"
              className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              onClick={() => setStep(1)}
            >
              Start over
            </button>
          </div>
        ) : null}

        {step < 3 ? (
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        ) : null}
      </div>
    </div>
  )
}
