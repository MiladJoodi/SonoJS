"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CircleHelpIcon,
  LoaderCircleIcon,
  MessageSquareTextIcon,
  XIcon,
} from "lucide-react"
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { AgentDisclosure } from "@sonojs/ui/components/agent-disclosure"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  EASE_OUT,
  EASE_OUT_CSS,
  SPRING_LAYOUT,
  SPRING_PRESS,
  SPRING_SWAP,
} from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type ApprovalCardStatus =
  | "pending"
  | "submitting"
  | "approved"
  | "rejected"
  | "changes-requested"
  | "answered"

export type ApprovalCardOption = {
  value: string
  label: string
  disabled?: boolean
}

export type ApprovalCardQuestion = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  options?: ApprovalCardOption[]
  multiple?: boolean
  autoAdvance?: boolean
  allowCustom?: boolean
  customPlaceholder?: string
}

export type ApprovalCardAnswer = {
  selected: string[]
  custom?: string
}

export type ApprovalCardAnswers = Record<string, ApprovalCardAnswer>

export type ApprovalCardProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  questions?: ApprovalCardQuestion[]
  status?: ApprovalCardStatus
  answers?: ApprovalCardAnswers
  defaultAnswers?: ApprovalCardAnswers
  onAnswersChange?: (answers: ApprovalCardAnswers) => void
  step?: number
  defaultStep?: number
  onStepChange?: (step: number) => void
  onSubmit?: (answers: ApprovalCardAnswers) => void
  onApprove?: () => void
  onReject?: () => void
  onRequestChanges?: () => void
  onDismiss?: () => void
  approveLabel?: React.ReactNode
  submitLabel?: React.ReactNode
  result?: React.ReactNode
  className?: string
}

const EMPTY_ANSWER: ApprovalCardAnswer = { selected: [], custom: "" }

const ROLL_BLUR = "blur(3px)"
const ROLL_EXIT_TRANSITION = { duration: 0.14, ease: EASE_OUT } as const

const TEXT_ROLL_VARIANTS: Variants = {
  initial: { opacity: 0, y: "90%", filter: ROLL_BLUR },
  animate: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: SPRING_SWAP,
  },
  exit: {
    opacity: 0,
    y: "-90%",
    filter: ROLL_BLUR,
    transition: ROLL_EXIT_TRANSITION,
  },
}

function ActionSwapRollText({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const measureRef = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()

  React.useLayoutEffect(() => {
    const nextWidth = measureRef.current?.offsetWidth
    if (!nextWidth) return
    setWidth((currentWidth) =>
      currentWidth === nextWidth ? currentWidth : nextWidth
    )
  })

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap align-bottom",
        className
      )}
      style={{
        width,
        transition: reduce ? undefined : `width 220ms ${EASE_OUT_CSS}`,
      }}
    >
      <span
        ref={measureRef}
        aria-hidden
        className="invisible inline-block whitespace-nowrap"
      >
        {children}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={`roll-${value}`}
          variants={TEXT_ROLL_VARIANTS}
          initial={reduce ? false : "initial"}
          animate={
            reduce
              ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }
              : "animate"
          }
          exit={reduce ? undefined : "exit"}
          className="absolute start-0 top-0 inline-block will-change-[opacity,filter,transform]"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

type RadioCtx = {
  value: string
  setValue: (value: string) => void
  layoutId: string
}

const RadioCtx = React.createContext<RadioCtx | null>(null)

function useRadioGroup() {
  const ctx = React.useContext(RadioCtx)
  if (!ctx) {
    throw new Error("RadioGroupItem must be used inside <RadioGroup>")
  }
  return ctx
}

function RadioGroup({
  value,
  defaultValue = "",
  onValueChange,
  children,
  className,
  orientation = "vertical",
}: {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
  orientation?: "vertical" | "horizontal"
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const layoutId = React.useId()
  const reduce = useReducedMotion()
  const controlled = value !== undefined
  const current = controlled ? value : internal
  const setValue = React.useCallback(
    (next: string) => {
      if (!controlled) setInternal(next)
      onValueChange?.(next)
    },
    [controlled, onValueChange]
  )
  const contextValue = React.useMemo(
    () => ({ value: current ?? "", setValue, layoutId }),
    [current, layoutId, setValue]
  )

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : SPRING_LAYOUT}>
      <RadioCtx.Provider value={contextValue}>
        <div
          role="radiogroup"
          className={cn(
            "flex gap-3",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
            className
          )}
        >
          {children}
        </div>
      </RadioCtx.Provider>
    </MotionConfig>
  )
}

function RadioGroupItem({
  value,
  label,
  disabled,
  className,
  id: idProp,
}: {
  value: string
  label?: string
  disabled?: boolean
  className?: string
  id?: string
}) {
  const { value: groupValue, setValue, layoutId } = useRadioGroup()
  const autoId = React.useId()
  const id = idProp ?? autoId
  const reduce = useReducedMotion()
  const selected = groupValue === value

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-3",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <motion.button
        id={id}
        type="button"
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        onClick={() => !disabled && setValue(value)}
        whileTap={reduce || disabled ? undefined : { scale: 0.92 }}
        transition={SPRING_PRESS}
        data-state={selected ? "checked" : "unchecked"}
        className={cn(
          "relative inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 outline-none transition-colors duration-200",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-60",
          selected
            ? "border-primary"
            : "border-muted-foreground/50 hover:border-muted-foreground"
        )}
      >
        {selected ? (
          <motion.span
            layoutId={layoutId}
            className="absolute inset-1 rounded-full bg-primary"
            transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          />
        ) : null}
      </motion.button>
      {label ? (
        <span
          className={cn(
            "select-none text-sm text-foreground",
            disabled && "opacity-60"
          )}
        >
          {label}
        </span>
      ) : null}
    </label>
  )
}

function ApprovalInput({
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
  className,
  classNames,
}: {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  classNames?: { field?: string; input?: string }
}) {
  const id = React.useId()
  const controlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = controlled ? (value ?? "") : internal
  const [focused, setFocused] = React.useState(false)

  const handleChange = (next: string) => {
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div
        data-state={focused ? "focused" : "idle"}
        className={cn(
          "relative h-11 overflow-hidden rounded-full border border-border transition-colors duration-200",
          focused && "border-foreground/40 ring-2 ring-ring/40",
          disabled && "opacity-60",
          classNames?.field
        )}
      >
        <input
          id={id}
          value={current}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "peer h-full w-full bg-transparent text-base leading-6 text-foreground caret-foreground outline-none",
            "placeholder:text-muted-foreground/60",
            "px-3.5",
            disabled && "cursor-not-allowed",
            classNames?.input
          )}
        />
      </div>
    </div>
  )
}

function getStatusLabel(status: ApprovalCardStatus) {
  if (status === "submitting") return "Submitting"
  if (status === "approved") return "Approved"
  if (status === "rejected") return "Rejected"
  if (status === "changes-requested") return "Changes requested"
  if (status === "answered") return "Response submitted"
  return "Input required"
}

function getStatusClass(status: ApprovalCardStatus) {
  if (status === "approved" || status === "answered") {
    return "text-emerald-600 dark:text-emerald-400"
  }
  if (status === "rejected") return "text-rose-600 dark:text-rose-400"
  if (status === "changes-requested") {
    return "text-amber-600 dark:text-amber-400"
  }
  return "text-muted-foreground"
}

function getStatusBadgeClass(status: ApprovalCardStatus) {
  if (status === "pending" || status === "changes-requested") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
  }
  if (status === "submitting") {
    return "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
  }
  if (status === "approved" || status === "answered") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  }
  return "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
}

function isAnswered(answer: ApprovalCardAnswer) {
  return answer.selected.length > 0 || Boolean(answer.custom?.trim())
}

function QuestionOptions({
  question,
  answer,
  disabled,
  onChange,
  onSingleSelect,
}: {
  question: ApprovalCardQuestion
  answer: ApprovalCardAnswer
  disabled: boolean
  onChange: (answer: ApprovalCardAnswer) => void
  onSingleSelect?: () => void
}) {
  const custom = answer.custom ?? ""

  return (
    <div className="mt-3">
      {question.options?.length ? (
        question.multiple ? (
          <div className="grid gap-0.5">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "inline-flex min-h-9 cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1",
                  (disabled || option.disabled) && "cursor-not-allowed opacity-60"
                )}
              >
                <Checkbox
                  checked={answer.selected.includes(option.value)}
                  disabled={disabled || option.disabled}
                  onCheckedChange={(checked) =>
                    onChange({
                      ...answer,
                      selected: checked
                        ? [...answer.selected, option.value]
                        : answer.selected.filter((v) => v !== option.value),
                    })
                  }
                />
                <span className="select-none text-sm text-foreground">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <RadioGroup
            value={answer.selected[0] ?? ""}
            onValueChange={(value) => {
              onChange({ selected: [value], custom: "" })
              onSingleSelect?.()
            }}
            className="gap-0.5"
          >
            {question.options.map((option) => (
              <RadioGroupItem
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={disabled || option.disabled}
                className="min-h-9 rounded-lg px-1.5 py-1"
              />
            ))}
          </RadioGroup>
        )
      ) : null}

      {question.allowCustom ? (
        <ApprovalInput
          value={custom}
          disabled={disabled}
          placeholder={question.customPlaceholder ?? "Add another response…"}
          onChange={(value) =>
            onChange({
              selected: question.multiple ? answer.selected : [],
              custom: value,
            })
          }
          className={cn("p-0.5", question.options?.length && "mt-1.5")}
          classNames={{
            field:
              "h-10 rounded-xl border-0 bg-background/70 focus-within:bg-background",
            input: "px-3 text-sm",
          }}
        />
      ) : null}
    </div>
  )
}

function ProgressDots({ current, ids }: { current: number; ids: string[] }) {
  return (
    <span className="flex gap-1.5">
      <span className="sr-only">
        Question {current + 1} of {ids.length}
      </span>
      {ids.map((id, index) => (
        <motion.span
          key={id}
          aria-hidden="true"
          initial={{
            scale: index === current ? 1 : 0.75,
            opacity: index <= current ? 1 : 0.35,
          }}
          animate={{
            scale: index === current ? 1 : 0.75,
            opacity: index <= current ? 1 : 0.35,
          }}
          transition={SPRING_SWAP}
          className="size-1.5 rounded-full bg-foreground"
        />
      ))}
    </span>
  )
}

function ApprovalCard({
  title = "Approval required",
  description,
  children,
  questions = [],
  status = "pending",
  answers,
  defaultAnswers = {},
  onAnswersChange,
  step,
  defaultStep = 0,
  onStepChange,
  onSubmit,
  onApprove,
  onReject,
  onRequestChanges,
  onDismiss,
  approveLabel = "Approve",
  submitLabel = "Submit response",
  result,
  className,
}: ApprovalCardProps) {
  const reduce = useReducedMotion() ?? false
  const [internalAnswers, setInternalAnswers] =
    React.useState<ApprovalCardAnswers>(defaultAnswers)
  const [internalStep, setInternalStep] = React.useState(defaultStep)
  const autoAdvanceTimer = React.useRef<number | undefined>(undefined)
  const currentAnswers = answers ?? internalAnswers
  const currentStep = Math.min(
    Math.max(0, step ?? internalStep),
    Math.max(0, questions.length - 1)
  )
  const question = questions[currentStep]
  const questionMode = questions.length > 0
  const pending = status === "pending"
  const busy = status === "submitting"
  const interactive = pending || busy
  const currentAnswer = question
    ? (currentAnswers[question.id] ?? EMPTY_ANSWER)
    : EMPTY_ANSWER
  const displayTitle = question?.title ?? title
  const titleKey = question?.id ?? String(status)
  const statusLabel = getStatusLabel(status)

  const clearAutoAdvance = React.useCallback(() => {
    if (autoAdvanceTimer.current === undefined) return
    window.clearTimeout(autoAdvanceTimer.current)
    autoAdvanceTimer.current = undefined
  }, [])

  React.useEffect(() => clearAutoAdvance, [clearAutoAdvance])

  const setAnswers = React.useCallback(
    (next: ApprovalCardAnswers) => {
      if (answers === undefined) setInternalAnswers(next)
      onAnswersChange?.(next)
    },
    [answers, onAnswersChange]
  )

  const setStep = (next: number) => {
    clearAutoAdvance()
    if (step === undefined) setInternalStep(next)
    onStepChange?.(next)
  }

  const updateCurrentAnswer = (next: ApprovalCardAnswer) => {
    if (!question) return
    setAnswers({ ...currentAnswers, [question.id]: next })
  }

  const continueQuestion = () => {
    if (currentStep < questions.length - 1) {
      setStep(currentStep + 1)
      return
    }
    onSubmit?.(currentAnswers)
  }

  const queueAutoAdvance = () => {
    if (
      !question ||
      question.multiple ||
      question.autoAdvance === false ||
      currentStep >= questions.length - 1 ||
      busy
    ) {
      return
    }

    clearAutoAdvance()
    autoAdvanceTimer.current = window.setTimeout(() => {
      setStep(currentStep + 1)
    }, 240)
  }

  return (
    <div
      data-slot="approval-card"
      data-state={status}
      aria-busy={busy}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/70 bg-card p-4 text-sm",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-5 shrink-0 place-items-center text-muted-foreground",
            getStatusClass(status)
          )}
        >
          {busy ? (
            <LoaderCircleIcon
              className={cn("size-4", !reduce && "animate-spin")}
            />
          ) : interactive ? (
            questionMode ? (
              <CircleHelpIcon className="size-4" />
            ) : (
              <MessageSquareTextIcon className="size-4" />
            )
          ) : status === "rejected" ? (
            <XIcon className="size-4" />
          ) : (
            <CheckIcon className="size-4" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-3">
            <h3 className="min-w-0 flex-1 text-base font-medium leading-5 text-foreground">
              <ActionSwapRollText value={titleKey}>
                {displayTitle}
              </ActionSwapRollText>
            </h3>
            {questionMode && interactive ? (
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground/65">
                {currentStep + 1}/{questions.length}
              </span>
            ) : (
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors",
                  getStatusBadgeClass(status)
                )}
              >
                {statusLabel}
              </span>
            )}
            {onDismiss ? (
              <button
                type="button"
                aria-label="Dismiss"
                onClick={onDismiss}
                className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </div>

          <AgentDisclosure open={interactive}>
            {questionMode && question ? (
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={question.id}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
                >
                  {question.description ? (
                    <p className="mt-1 leading-5 text-muted-foreground">
                      {question.description}
                    </p>
                  ) : null}
                  <QuestionOptions
                    question={question}
                    answer={currentAnswer}
                    disabled={busy}
                    onChange={updateCurrentAnswer}
                    onSingleSelect={queueAutoAdvance}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div>
                {description ? (
                  <p className="mt-1 leading-5 text-muted-foreground">
                    {description}
                  </p>
                ) : null}
                {children ? <div className="mt-3">{children}</div> : null}
              </div>
            )}

            {questionMode ? (
              <div className="mt-4 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous question"
                  disabled={busy || currentStep === 0}
                  onClick={() => setStep(currentStep - 1)}
                  className="rounded-full"
                >
                  <ArrowLeftIcon className="size-4 icon-dir" />
                </Button>
                <ProgressDots
                  current={currentStep}
                  ids={questions.map((item) => item.id)}
                />
                <Button
                  size={
                    currentStep === questions.length - 1 ? "sm" : "icon-sm"
                  }
                  aria-label={
                    currentStep === questions.length - 1
                      ? "Submit response"
                      : "Next question"
                  }
                  disabled={busy || !isAnswered(currentAnswer)}
                  onClick={continueQuestion}
                  className="ms-auto rounded-full"
                >
                  {busy ? (
                    <LoaderCircleIcon
                      className={cn("size-4", !reduce && "animate-spin")}
                    />
                  ) : currentStep === questions.length - 1 ? (
                    <>
                      {submitLabel}
                      <ArrowRightIcon className="size-3.5 icon-dir" />
                    </>
                  ) : (
                    <ArrowRightIcon className="size-4 icon-dir" />
                  )}
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  disabled={busy}
                  onClick={onApprove}
                  className="rounded-full"
                >
                  {approveLabel}
                </Button>
                {onRequestChanges ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={busy}
                    onClick={onRequestChanges}
                    className="rounded-full"
                  >
                    Request changes
                  </Button>
                ) : null}
                {onReject ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={busy}
                    onClick={onReject}
                    className="rounded-full text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400"
                  >
                    Reject
                  </Button>
                ) : null}
              </div>
            )}
          </AgentDisclosure>

          {!interactive ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {result ?? statusLabel}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
