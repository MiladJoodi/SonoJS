"use client"

import * as React from "react"
import {
  BotIcon,
  ChevronDownIcon,
  CircleDashedIcon,
  CircleIcon,
  CloudIcon,
  CodeIcon,
  GlobeIcon,
  HistoryIcon,
  LaptopIcon,
  LoaderCircleIcon,
  PaperclipIcon,
  PlusIcon,
  SendIcon,
  UserIcon,
  WandSparklesIcon,
  ZapIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

const pill =
  "h-6 gap-1 rounded-full border border-transparent px-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
const menuItem = "gap-2 rounded-[calc(1rem-6px)] text-xs"
const menuContent = "max-w-xs rounded-2xl border-border bg-popover p-1.5"

export default function ChatComposer03() {
  const [input, setInput] = React.useState("")
  const [selectedModel, setSelectedModel] = React.useState("Local")
  const [selectedAgent, setSelectedAgent] = React.useState("Agent")
  const [selectedPerformance, setSelectedPerformance] = React.useState("High")
  const [autoMode, setAutoMode] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const send = () => {
    if (!input.trim()) return
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send()
  }

  return (
    <div className="mx-auto w-full max-w-xl bg-white px-4 py-16 text-foreground dark:bg-background sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
        <input
          className="sr-only"
          multiple
          ref={fileInputRef}
          type="file"
          tabIndex={-1}
          aria-hidden
        />

        <div className="grow px-3 pt-3 pb-2">
          <form onSubmit={handleSubmit}>
            <Textarea
              ref={textareaRef}
              className="max-h-[25vh] min-h-10 w-full resize-none border-0 bg-transparent p-0 text-sm shadow-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 dark:bg-transparent"
              onChange={(e) => setInput(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = `${target.scrollHeight}px`
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder="Ask anything"
              aria-label="Ask anything"
              rows={1}
              value={input}
            />
          </form>
        </div>

        <div className="mb-2 flex items-center justify-between px-2">
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="size-7 rounded-full border border-border/70 p-0 hover:bg-accent"
                  size="icon-xs"
                  variant="ghost"
                  aria-label="Add tools"
                >
                  <PlusIcon className="size-3" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={menuContent}>
                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem
                    className={menuItem}
                    onSelect={() => fileInputRef.current?.click()}
                  >
                    <PaperclipIcon className="size-4 opacity-60" aria-hidden />
                    Attach Files
                  </DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}>
                    <CodeIcon className="size-4 opacity-60" aria-hidden />
                    Code Interpreter
                  </DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}>
                    <GlobeIcon className="size-4 opacity-60" aria-hidden />
                    Web Search
                  </DropdownMenuItem>
                  <DropdownMenuItem className={menuItem}>
                    <HistoryIcon className="size-4 opacity-60" aria-hidden />
                    Chat History
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="button"
              className={cn(
                "h-7 gap-1 rounded-full border border-border/70 px-2 hover:bg-accent",
                autoMode
                  ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                  : "text-muted-foreground"
              )}
              onClick={() => setAutoMode((v) => !v)}
              size="sm"
              variant="ghost"
              aria-pressed={autoMode}
            >
              <WandSparklesIcon className="size-3" aria-hidden />
              <span className="text-xs">Auto</span>
            </Button>
          </div>

          <Button
            type="button"
            className="size-7 rounded-full p-0 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!input.trim()}
            onClick={send}
            aria-label="Send message"
          >
            <SendIcon className="size-3 icon-dir" aria-hidden />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-0 pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" className={pill} size="sm" variant="ghost">
              <LaptopIcon className="size-3" aria-hidden />
              <span>{selectedModel}</span>
              <ChevronDownIcon className="size-3" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className={menuContent}>
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedModel("Local")}
              >
                <LaptopIcon className="size-4 opacity-60" aria-hidden />
                Local
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedModel("Cloud")}
              >
                <CloudIcon className="size-4 opacity-60" aria-hidden />
                Cloud
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" className={pill} size="sm" variant="ghost">
              <UserIcon className="size-3" aria-hidden />
              <span>{selectedAgent}</span>
              <ChevronDownIcon className="size-3" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className={menuContent}>
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedAgent("Agent")}
              >
                <UserIcon className="size-4 opacity-60" aria-hidden />
                Agent
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedAgent("Assistant")}
              >
                <BotIcon className="size-4 opacity-60" aria-hidden />
                Assistant
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" className={pill} size="sm" variant="ghost">
              <ZapIcon className="size-3" aria-hidden />
              <span>{selectedPerformance}</span>
              <ChevronDownIcon className="size-3" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className={menuContent}>
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedPerformance("High")}
              >
                <CircleIcon className="size-4 opacity-60" aria-hidden />
                High
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedPerformance("Medium")}
              >
                <LoaderCircleIcon className="size-4 opacity-60" aria-hidden />
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                className={menuItem}
                onSelect={() => setSelectedPerformance("Low")}
              >
                <CircleDashedIcon className="size-4 opacity-60" aria-hidden />
                Low
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
