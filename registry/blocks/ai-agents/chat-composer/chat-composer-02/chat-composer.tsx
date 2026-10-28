"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  BookOpenTextIcon,
  CloudIcon,
  GaugeIcon,
  ImageIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

const PROMPTS = [
  {
    icon: BookOpenTextIcon,
    text: "Write documentation",
    prompt:
      "Write comprehensive documentation for this codebase, including setup instructions, API references, and usage examples.",
  },
  {
    icon: GaugeIcon,
    text: "Optimize performance",
    prompt:
      "Analyze the codebase for performance bottlenecks and suggest optimizations to improve loading times and runtime efficiency.",
  },
  {
    icon: TriangleAlertIcon,
    text: "Find and fix 3 bugs",
    prompt:
      "Scan through the codebase to identify and fix 3 critical bugs, providing detailed explanations for each fix.",
  },
] as const

const MODELS = [
  {
    value: "gpt-5",
    name: "GPT-5",
    description: "Most advanced model",
    max: true,
  },
  {
    value: "gpt-4o",
    name: "GPT-4o",
    description: "Fast and capable",
  },
  {
    value: "claude-3.5",
    name: "Claude 3.5 Sonnet",
    description: "Great for coding tasks",
  },
] as const

function MaxBadge() {
  return (
    <span className="inline-flex h-3.75 items-center rounded-[4px] border border-border/80 bg-muted/40 px-1.25">
      <span
        className="text-[9px] font-bold uppercase leading-none tracking-[0.06em]"
        style={{
          background:
            "linear-gradient(to right, rgb(129, 161, 193), rgb(125, 124, 155))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        MAX
      </span>
    </span>
  )
}

export default function ChatComposer02() {
  const [inputValue, setInputValue] = React.useState("")
  const [modelValue, setModelValue] = React.useState<string>(MODELS[0].value)
  const selectedModel =
    MODELS.find((m) => m.value === modelValue) ?? MODELS[0]
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
    inputRef.current?.focus()
  }

  const send = () => {
    if (!inputValue.trim()) return
    setInputValue("")
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 bg-white px-4 py-16 text-foreground dark:bg-background sm:px-6">
      <div className="flex min-h-30 cursor-text flex-col rounded-2xl border border-border/70 bg-card shadow-soft">
        <div
          className="relative max-h-64.5 flex-1 overflow-y-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <Textarea
            ref={inputRef}
            className="min-h-12 w-full resize-none wrap-break-word border-0 bg-transparent p-3 text-base whitespace-pre-wrap shadow-none outline-none transition-[padding] duration-200 ease-in-out focus-visible:ring-0 md:text-base dark:bg-transparent"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ask anything"
            aria-label="Ask anything"
            rows={2}
            value={inputValue}
          />
        </div>

        <div className="flex min-h-10 items-center gap-2 p-2 pb-1">
          <div className="flex size-7 items-center justify-center rounded-full bg-muted">
            <CloudIcon className="size-4 text-muted-foreground" aria-hidden />
          </div>

          <Select value={modelValue} onValueChange={setModelValue}>
            <SelectTrigger
              size="sm"
              aria-label="Select model"
              className="h-7 rounded-full border-transparent bg-transparent px-2 text-sm font-medium text-foreground shadow-none transition-[background-color,color] hover:bg-muted aria-expanded:bg-muted dark:bg-transparent dark:hover:bg-muted"
            >
              <SelectValue>
                <span className="flex items-center gap-1.5">
                  <span>{selectedModel.name}</span>
                  {"max" in selectedModel && selectedModel.max ? (
                    <MaxBadge />
                  ) : null}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              align="start"
              position="popper"
              sideOffset={6}
              className="w-64 p-1"
            >
              {MODELS.map((model) => (
                <SelectItem
                  className="rounded-md py-1.5"
                  key={model.value}
                  value={model.value}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 font-medium">
                      {model.name}
                      {"max" in model && model.max ? <MaxBadge /> : null}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {model.description}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ms-auto flex items-center gap-1.5">
            <Button
              type="button"
              aria-label="Attach images"
              title="Attach images"
              className="rounded-full text-muted-foreground transition-[background-color,color] hover:text-foreground"
              size="icon-sm"
              variant="ghost"
            >
              <ImageIcon className="size-4.5" aria-hidden />
            </Button>

            <Button
              type="button"
              aria-label="Send message"
              className="rounded-full transition-[background-color,scale,opacity] active:not-disabled:scale-[0.96]"
              disabled={!inputValue.trim()}
              size="icon-sm"
              onClick={send}
            >
              <ArrowUpIcon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {PROMPTS.map((button) => {
          const Icon = button.icon
          return (
            <Button
              key={button.text}
              type="button"
              variant="outline"
              className={cn(
                "group/button h-8 gap-1.5 rounded-full border-border/70 bg-background ps-2.5 pe-3.5 text-sm font-normal text-foreground shadow-[0_1px_2px_oklch(0_0_0/0.05)] transition-[background-color,color,scale,box-shadow] duration-150 ease-out hover:bg-muted active:scale-[0.96] motion-reduce:active:scale-100 dark:bg-muted/40 dark:hover:bg-muted"
              )}
              onClick={() => handlePromptClick(button.prompt)}
            >
              <Icon
                className="size-4 text-muted-foreground transition-colors duration-150 group-hover/button:text-foreground"
                aria-hidden
              />
              {button.text}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
