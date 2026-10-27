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

function WizardSteps({
  activeStep,
}: {
  activeStep: number
}) {
  return (
    <nav aria-label="Onboarding progress" className="mb-8">
      <ol className="flex items-center gap-1 sm:gap-2">
        {STEPS.map((step, index) => {
          const Icon = step.icon
          const done = index < activeStep
          const current = index === activeStep
          return (
            <li key={step.id} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors sm:size-9",
                  done &&
                    "border-primary bg-primary text-primary-foreground",
                  current &&
                    !done &&
                    "border-primary bg-primary/10 text-primary",
                  !done &&
                    !current &&
                    "border-border/70 bg-muted/50 text-muted-foreground"
                )}
                aria-current={current ? "step" : undefined}
              >
                {done ? (
                  <CheckIcon className="size-3.5" aria-hidden />
                ) : (
                  <Icon className="size-3.5" aria-hidden />
                )}
              </div>
              <span
                className={cn(
                  "hidden truncate text-xs font-medium sm:block",
                  current || done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {index < STEPS.length - 1 ? (
                <div
                  className={cn(
                    "mx-1 hidden h-px min-w-2 flex-1 sm:block",
                    index < activeStep ? "bg-primary" : "bg-border/70"
                  )}
                  aria-hidden
                />
              ) : null}
            </li>
          )
        })}
      </ol>
      <Progress
        value={((activeStep + 1) / STEPS.length) * 100}
        className="mt-4 h-1.5 sm:hidden"
        aria-label={`Step ${activeStep + 1} of ${STEPS.length}`}
      />
      <p className="mt-2 text-xs text-muted-foreground sm:hidden" aria-live="polite">
        Step {activeStep + 1} of {STEPS.length} · {STEPS[activeStep].label}
      </p>
    </nav>
  )
}

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
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8">
        <WizardSteps activeStep={step} />

        {step === 0 ? (
          <FieldGroup className="gap-6">
            <div className="space-y-1 text-start">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Get started with SonoJS in under 2 minutes.
              </p>
            </div>

            <Field>
              <FieldLabel htmlFor="setup-wizard-01-name">
                Full name
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <UserIcon aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  id="setup-wizard-01-name"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="setup-wizard-01-email">
                Email address
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <MailIcon aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  id="setup-wizard-01-email"
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="setup-wizard-01-password">
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LockIcon aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  id="setup-wizard-01-password"
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
              className="w-full gap-2"
              onClick={next}
            >
              Continue
              <ArrowRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
          </FieldGroup>
        ) : null}

        {step === 1 ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-lg bg-emerald-500/10">
              <ShieldCheckIcon
                className="size-7 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-semibold tracking-tight">
                Check your email
              </h1>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">
                  {email || "alex@company.com"}
                </span>
              </p>
            </div>

            <div className="w-full space-y-3">
              <label htmlFor="setup-wizard-01-otp" className="sr-only">
                Verification code
              </label>
              <div dir="ltr" className="flex w-full justify-center">
                <InputOTP
                  id="setup-wizard-01-otp"
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  containerClassName="justify-center"
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
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive it?{" "}
                <button
                  type="button"
                  className="cursor-pointer font-medium text-primary hover:underline"
                >
                  Resend code
                </button>
              </p>
            </div>

            <div className="flex w-full gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
                onClick={back}
              >
                <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                Back
              </Button>
              <Button
                type="button"
                size="lg"
                className="flex-[1.6] gap-2"
                onClick={next}
              >
                Verify
                <ArrowRightIcon className="icon-dir size-4" aria-hidden />
              </Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <div className="space-y-1 text-start">
              <h1 className="text-2xl font-semibold tracking-tight">
                Your experience level
              </h1>
              <p className="text-sm text-muted-foreground">
                We&apos;ll tailor your onboarding based on this.
              </p>
            </div>

            <div
              className="flex flex-col gap-3"
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
                      "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border-2 p-4 text-start transition-colors",
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-border/70 bg-canvas hover:border-border"
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
                className="flex-1 gap-2"
                onClick={back}
              >
                <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
                Back
              </Button>
              <Button
                type="button"
                size="lg"
                className="flex-[1.6] gap-2"
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
          <div className="flex flex-col items-center gap-6 py-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <RocketIcon className="size-8 text-primary" aria-hidden />
            </div>
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              >
                You&apos;re all set
              </Badge>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to SonoJS
              </h1>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                Your workspace is ready. Start exploring components, blocks, and
                charts tailored for production apps.
              </p>
            </div>
            <Button type="button" size="lg" className="w-full gap-2">
              Go to Dashboard
              <ArrowRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
            <button
              type="button"
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
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
  )
}
