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
  {
    id: "account",
    label: "Account",
    blurb: "Name, email, password",
    icon: UserIcon,
  },
  {
    id: "verify",
    label: "Verify",
    blurb: "Confirm your email",
    icon: ShieldCheckIcon,
  },
  {
    id: "experience",
    label: "Experience",
    blurb: "Tailor onboarding",
    icon: SparklesIcon,
  },
  {
    id: "launch",
    label: "Launch",
    blurb: "You're ready",
    icon: RocketIcon,
  },
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
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid lg:grid-cols-[minmax(14rem,17rem)_minmax(0,1fr)]">
        <aside className="hidden flex-col gap-1 border-b border-border/70 bg-muted/40 p-5 sm:p-6 lg:flex lg:border-b-0 lg:border-e">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Setup
          </p>
          <ol className="flex flex-col gap-1" aria-label="Onboarding steps">
            {STEPS.map((item, index) => {
              const Icon = item.icon
              const done = index < step
              const current = index === step
              return (
                <li key={item.id}>
                  <div
                    className={cn(
                      "flex w-full items-start gap-3 rounded-[12px] px-3 py-2.5 text-start",
                      current && "bg-card shadow-soft ring-1 ring-border/70"
                    )}
                    aria-current={current ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                        done &&
                          "border-primary bg-primary text-primary-foreground",
                        current &&
                          !done &&
                          "border-primary bg-primary/10 text-primary",
                        !done &&
                          !current &&
                          "border-border/70 bg-transparent text-muted-foreground"
                      )}
                    >
                      {done ? (
                        <CheckIcon className="size-3.5" aria-hidden />
                      ) : (
                        <Icon className="size-3.5" aria-hidden />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-medium",
                          current || done
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {item.blurb}
                      </span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-border/70 px-5 py-3 lg:hidden">
            <Progress
              value={((step + 1) / STEPS.length) * 100}
              className="h-1.5"
              aria-label={`Step ${step + 1} of ${STEPS.length}`}
            />
            <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
              Step {step + 1} of {STEPS.length} · {STEPS[step].label}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {step === 0 ? (
              <FieldGroup className="gap-6">
                <div className="space-y-1.5 text-start">
                  <h1 className="text-h3 font-semibold tracking-tight">
                    Create your account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Tell us who you are — then we&apos;ll verify your email.
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="setup-wizard-02-name">
                    Full name
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <UserIcon aria-hidden />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="setup-wizard-02-name"
                      placeholder="Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="setup-wizard-02-email">
                    Email address
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <MailIcon aria-hidden />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="setup-wizard-02-email"
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
                  <FieldLabel htmlFor="setup-wizard-02-password">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <LockIcon aria-hidden />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="setup-wizard-02-password"
                      type="password"
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                  <FieldDescription>
                    Use 8+ characters with a mix of letters and numbers.
                  </FieldDescription>
                </Field>
                <Button
                  type="button"
                  size="lg"
                  className="w-full cursor-pointer gap-2 sm:w-auto sm:self-start"
                  onClick={next}
                >
                  Continue
                  <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </FieldGroup>
            ) : null}

            {step === 1 ? (
              <div className="flex max-w-md flex-col gap-6">
                <div className="space-y-1.5 text-start">
                  <h1 className="text-h3 font-semibold tracking-tight">
                    Verify your email
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter the code we sent to{" "}
                    <span dir="ltr" className="font-medium text-foreground">
                      {email || "alex@company.com"}
                    </span>
                  </p>
                </div>
                <div dir="ltr" className="flex justify-start">
                  <InputOTP
                    id="setup-wizard-02-otp"
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
                    size="lg"
                    className="cursor-pointer gap-2"
                    onClick={back}
                  >
                    <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="cursor-pointer gap-2"
                    onClick={next}
                  >
                    Verify
                    <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="max-w-lg space-y-6">
                <div className="space-y-1.5 text-start">
                  <h1 className="text-h3 font-semibold tracking-tight">
                    Experience level
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Pick what fits best — you can change this later.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2.5"
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
                          "flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] border px-4 py-3.5 text-start transition-colors",
                          selected
                            ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                            : "border-border/70 hover:bg-muted/40"
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">
                            {opt.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {opt.desc}
                          </span>
                        </span>
                        {selected ? (
                          <CheckCircle2Icon
                            className="size-5 shrink-0 text-primary"
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
                    size="lg"
                    className="cursor-pointer gap-2"
                    onClick={back}
                  >
                    <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="cursor-pointer gap-2"
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
              <div className="flex max-w-md flex-col gap-5 text-start">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <RocketIcon className="size-6" aria-hidden />
                </span>
                <Badge className="w-fit border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  Setup complete
                </Badge>
                <div className="space-y-1.5">
                  <h1 className="text-h3 font-semibold tracking-tight">
                    You&apos;re ready to build
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Jump into your dashboard or revisit these steps anytime.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    size="lg"
                    className="cursor-pointer gap-2"
                  >
                    Go to dashboard
                    <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => {
                      setStep(0)
                      setOtp("")
                      setExperience("")
                    }}
                  >
                    Start over
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
