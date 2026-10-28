"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  LockIcon,
  MailIcon,
  RocketIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: "account", label: "Account", icon: UserIcon },
  { id: "verify", label: "Verify", icon: ShieldCheckIcon },
  { id: "experience", label: "Experience", icon: SparklesIcon },
  { id: "launch", label: "Launch", icon: RocketIcon },
] as const

const POINTS = [
  "Account in under two minutes",
  "Email verification built in",
  "Onboarding tailored to you",
] as const

const EXPERIENCE_OPTIONS = [
  {
    value: "beginner",
    label: "Just starting out",
    desc: "Learning React and modern UI",
  },
  {
    value: "intermediate",
    label: "Growing team",
    desc: "Building production apps",
  },
  {
    value: "expert",
    label: "Senior / architect",
    desc: "Design systems and scale",
  },
] as const

export default function SetupWizard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = React.useState(0)
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [experience, setExperience] = React.useState("")

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2">
        <aside className="relative flex flex-col justify-between gap-8 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
          <div className="space-y-4 text-start">
            <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 text-primary">
              <RocketIcon className="size-5" aria-hidden />
            </span>
            <div className="space-y-2">
              <h1 className="text-h3 font-semibold tracking-tight">
                Set up in minutes
              </h1>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Create an account, verify your email, and pick how you work —
                then jump straight into the product.
              </p>
            </div>
          </div>

          <ol className="space-y-3" aria-label="Progress">
            {STEPS.map((item, index) => {
              const done = index < step
              const current = index === step
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 text-sm"
                  aria-current={current ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                      done && "border-primary bg-primary text-primary-foreground",
                      current &&
                        !done &&
                        "border-primary/60 bg-primary/20 text-primary",
                      !done &&
                        !current &&
                        "border-white/15 bg-white/5 text-zinc-500"
                    )}
                  >
                    {done ? (
                      <CheckIcon className="size-3.5" aria-hidden />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      current || done ? "text-zinc-100" : "text-zinc-500"
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              )
            })}
          </ol>

          <ul className="space-y-2.5 border-t border-white/10 pt-5">
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
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="border-b border-border/70 px-5 py-3 lg:hidden">
            <Progress
              value={((step + 1) / STEPS.length) * 100}
              className="h-1.5"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Step {step + 1} of {STEPS.length} · {STEPS[step].label}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
            {step === 0 ? (
              <FieldGroup className="gap-5">
                <div className="space-y-1.5 text-start">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Create your account
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll use this email for verification and updates.
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="setup-wizard-03-name">
                    Full name
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <UserIcon aria-hidden />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="setup-wizard-03-name"
                      placeholder="Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="setup-wizard-03-email">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <MailIcon aria-hidden />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="setup-wizard-03-email"
                      type="email"
                      dir="ltr"
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="setup-wizard-03-password">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <LockIcon aria-hidden />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="setup-wizard-03-password"
                      type="password"
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                  <FieldDescription>
                    8+ characters with letters and numbers.
                  </FieldDescription>
                </Field>
                <Button
                  type="button"
                  className="w-full cursor-pointer gap-2"
                  onClick={next}
                >
                  Continue
                  <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </FieldGroup>
            ) : null}

            {step === 1 ? (
              <div className="flex flex-col gap-5">
                <div className="space-y-1.5 text-start">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Enter verification code
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sent to{" "}
                    <span dir="ltr" className="font-medium text-foreground">
                      {email || "alex@company.com"}
                    </span>
                  </p>
                </div>
                <div dir="ltr" className="flex justify-start">
                  <InputOTP
                    id="setup-wizard-03-otp"
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer gap-2"
                    onClick={back}
                  >
                    <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 cursor-pointer gap-2"
                    onClick={next}
                  >
                    Verify
                    <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-5">
                <div className="space-y-1.5 text-start">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Experience level
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Helps us personalize tips and defaults.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2"
                  role="radiogroup"
                  aria-label="Experience level"
                >
                  {EXPERIENCE_OPTIONS.map((opt) => {
                    const selected = experience === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setExperience(opt.value)}
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] border px-3 py-3 text-start transition-colors",
                          selected
                            ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                            : "border-border/70 hover:bg-muted/40"
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-medium">
                            {opt.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {opt.desc}
                          </span>
                        </span>
                        {selected ? (
                          <CheckCircle2Icon
                            className="size-4 shrink-0 text-primary"
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer gap-2"
                    onClick={back}
                  >
                    <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 cursor-pointer gap-2"
                    disabled={!experience}
                    onClick={next}
                  >
                    Continue
                    <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="flex flex-col gap-5 text-start">
                <Badge className="w-fit border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  You&apos;re all set
                </Badge>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Welcome aboard
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your account is verified and ready. Open the dashboard to
                    continue.
                  </p>
                </div>
                <Button type="button" className="w-full cursor-pointer gap-2">
                  Go to dashboard
                  <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
                <button
                  type="button"
                  className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  onClick={() => {
                    setStep(0)
                    setOtp("")
                    setExperience("")
                  }}
                >
                  Start over
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
