"use client"

import * as React from "react"
import { ArrowUpIcon, PlusIcon, SquareIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@sonojs/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { SPRING_SWAP } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type PromptModel = {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export type PromptAction = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export type PromptInput2Props = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "defaultValue" | "onChange" | "onSubmit" | "children"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  models?: PromptModel[]
  model?: string
  defaultModel?: string
  onModelChange?: (model: string) => void
  actions?: PromptAction[]
  onAction?: (action: string) => void
  onSubmit?: (value: string, model?: string) => void | Promise<void>
  loading?: boolean
  onStop?: () => void
  minRows?: number
  maxRows?: number
  leadingAction?: React.ReactNode
  className?: string
}

/** A prompt bar for composing agent requests with model selection and quick actions. */
function PromptInput2({
  value,
  defaultValue = "",
  onValueChange,
  models = [],
  model,
  defaultModel,
  onModelChange,
  actions = [],
  onAction,
  onSubmit,
  loading = false,
  onStop,
  minRows = 2,
  maxRows = 8,
  leadingAction,
  className,
  disabled,
  placeholder = "Ask the agent to do something…",
  "aria-label": ariaLabel = "Prompt",
  onKeyDown,
  ...textareaProps
}: PromptInput2Props) {
  const reduce = useReducedMotion() ?? false
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const measurementRef = React.useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalModel, setInternalModel] = React.useState(
    defaultModel ?? models[0]?.value
  )
  const [actionsOpen, setActionsOpen] = React.useState(false)
  const currentValue = value ?? internalValue
  const currentModelValue = model ?? internalModel
  const currentModel = models.find(
    (option) => option.value === currentModelValue
  )
  const canSubmit = Boolean(currentValue.trim()) && !disabled && !loading

  const resizeTextarea = React.useCallback(() => {
    const textarea = textareaRef.current
    const measurement = measurementRef.current
    if (!textarea || !measurement || textarea.value !== currentValue) return

    const lineHeight = 24
    const nextHeight = Math.min(
      Math.max(measurement.scrollHeight, minRows * lineHeight),
      maxRows * lineHeight
    )
    const height = `${nextHeight}px`
    if (textarea.style.height !== height) textarea.style.height = height
  }, [currentValue, maxRows, minRows])

  React.useLayoutEffect(() => {
    resizeTextarea()
  }, [resizeTextarea])

  React.useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(resizeTextarea)
    observer.observe(textarea)
    return () => observer.disconnect()
  }, [resizeTextarea])

  const setValue = (next: string) => {
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
  }

  const setModel = (next: string) => {
    if (model === undefined) setInternalModel(next)
    onModelChange?.(next)
  }

  const submit = (event?: React.FormEvent) => {
    event?.preventDefault()
    const prompt = currentValue.trim()
    if (!prompt || disabled || loading) return

    onSubmit?.(prompt, currentModelValue)
    if (value === undefined) setInternalValue("")
    textareaRef.current?.focus({ preventScroll: true })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(event)
    if (
      event.defaultPrevented ||
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return
    }
    event.preventDefault()
    submit()
  }

  return (
    <form
      data-slot="prompt-input-2"
      onSubmit={submit}
      className={cn(
        "relative w-full rounded-2xl border border-border/70 bg-card p-2 shadow-soft transition-colors focus-within:border-foreground/25",
        disabled && "opacity-60",
        className
      )}
    >
      <div
        ref={measurementRef}
        aria-hidden
        className="pointer-events-none invisible absolute inset-x-2 top-0 whitespace-pre-wrap wrap-break-word px-2 text-sm leading-6"
      >
        {`${currentValue}\u200b`}
      </div>
      <textarea
        ref={textareaRef}
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        rows={minRows}
        {...textareaProps}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className="scrollbar-none block w-full resize-none overflow-y-auto bg-transparent px-2 pt-1.5 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground/55"
      />

      <div className="mt-1 flex min-h-8 items-center gap-1">
        {actions.length ? (
          <Popover open={actionsOpen} onOpenChange={setActionsOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                disabled={disabled || loading}
                aria-label="Add to prompt"
                className="rounded-full"
              >
                <motion.span
                  aria-hidden
                  animate={{ rotate: actionsOpen ? 45 : 0 }}
                  transition={reduce ? { duration: 0 } : SPRING_SWAP}
                  className="grid place-items-center"
                >
                  <PlusIcon className="size-4" />
                </motion.span>
              </Button>
            </PopoverTrigger>

            <PopoverContent
              side="top"
              align="start"
              sideOffset={8}
              className="w-56 rounded-[12px] p-1.5 shadow-soft"
            >
              {actions.map((action) => (
                <button
                  key={action.value}
                  type="button"
                  disabled={action.disabled}
                  onClick={() => {
                    onAction?.(action.value)
                    setActionsOpen(false)
                  }}
                  className="flex w-full cursor-pointer items-start gap-2.5 rounded-[12px] px-2.5 py-2 text-start outline-none transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  {action.icon ? (
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4">
                      {action.icon}
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <span className="block text-sm text-foreground">
                      {action.label}
                    </span>
                    {action.description ? (
                      <span className="mt-0.5 block text-xs leading-4 text-muted-foreground">
                        {action.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              ))}
            </PopoverContent>
          </Popover>
        ) : null}
        {leadingAction}
        {models.length ? (
          <div className="min-w-0">
            <Select
              value={currentModelValue}
              onValueChange={setModel}
              disabled={disabled || loading}
            >
              <SelectTrigger
                size="sm"
                className="h-8 w-auto max-w-52 border-0 bg-transparent px-2 py-0 text-xs shadow-none hover:bg-muted focus-visible:ring-2 dark:bg-transparent dark:hover:bg-muted/50"
              >
                <SelectValue placeholder="Choose model">
                  <span className="flex min-w-0 items-center gap-1.5">
                    {currentModel?.icon ? (
                      <span className="grid size-4 shrink-0 place-items-center text-muted-foreground [&_svg]:size-3.5">
                        {currentModel.icon}
                      </span>
                    ) : null}
                    <span className="truncate text-muted-foreground">
                      {currentModel?.label ?? "Choose model"}
                    </span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="w-52 shadow-soft"
              >
                {models.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="py-2"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {option.icon ? (
                        <span className="grid size-5 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4">
                          {option.icon}
                        </span>
                      ) : null}
                      <span className="min-w-0 truncate text-sm text-foreground">
                        {option.label}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <Button
          type={loading ? "button" : "submit"}
          size="icon-xs"
          disabled={loading ? !onStop : !canSubmit}
          aria-label={loading ? "Stop generating" : "Send prompt"}
          onClick={loading ? onStop : undefined}
          className="ms-auto rounded-full"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={loading ? "stop" : "send"}
              initial={
                reduce ? { opacity: 1 } : { opacity: 0, y: 3, scale: 0.8 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, y: -3, scale: 0.8 }
              }
              transition={reduce ? { duration: 0 } : SPRING_SWAP}
              className="grid place-items-center"
            >
              {loading ? (
                <SquareIcon className="size-3 fill-current" />
              ) : (
                <ArrowUpIcon className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </form>
  )
}

export { PromptInput2 }
