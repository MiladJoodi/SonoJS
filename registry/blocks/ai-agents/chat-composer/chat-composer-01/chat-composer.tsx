"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  MicIcon,
  PaperclipIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  SparklesIcon,
  SquareIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@/lib/utils"

const press =
  "rounded-full transition-[scale,background-color] duration-150 ease-out active:scale-[0.96] motion-reduce:active:scale-100"

export default function ChatComposer01() {
  const [message, setMessage] = React.useState("")
  const [listening, setListening] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const send = () => {
    if (!message.trim()) return
    setMessage("")
    setListening(false)
  }

  return (
    <div className="w-full bg-white px-4 py-2 text-foreground dark:bg-background sm:px-6">
      <h1 className="mx-auto mb-6 max-w-2xl text-balance text-center text-3xl font-semibold leading-tight tracking-tight">
        How can I help you today?
      </h1>

      <form
        className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2.5"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          className="sr-only"
          multiple
          ref={fileInputRef}
          type="file"
          tabIndex={-1}
          aria-hidden
        />

        <InputGroup className="h-13 rounded-full border border-border/70 bg-card px-2.5 shadow-soft has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupAddon align="inline-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton
                  type="button"
                  aria-label="Add attachments"
                  className={cn(
                    press,
                    "rounded-full border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                  )}
                  size="icon-sm"
                >
                  <PlusIcon className="size-4" aria-hidden />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="w-64 rounded-[16px] p-1.5"
              >
                <DropdownMenuGroup className="flex flex-col gap-0.5">
                  <DropdownMenuItem
                    className="gap-2.5 rounded-[10px] px-2.5 py-2"
                    onSelect={() => fileInputRef.current?.click()}
                  >
                    <PaperclipIcon className="size-4 opacity-60" aria-hidden />
                    Add photos & files
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2.5 rounded-[10px] px-2.5 py-2">
                    <SparklesIcon className="size-4 opacity-60" aria-hidden />
                    Agent mode
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2.5 rounded-[10px] px-2.5 py-2">
                    <SearchIcon className="size-4 opacity-60" aria-hidden />
                    Deep Research
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>

          <InputGroupInput
            className="text-[15px] md:text-[15px]"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder={listening ? "Listening..." : "Ask anything"}
            aria-label="Ask anything"
            value={message}
          />

          <InputGroupAddon align="inline-end" className="gap-1">
            <InputGroupButton
              type="button"
              aria-label={
                listening ? "Stop voice input" : "Record audio message"
              }
              aria-pressed={listening}
              className={cn(
                press,
                "rounded-full border border-transparent",
                listening
                  ? "border-destructive/30 bg-destructive/15 text-destructive hover:bg-destructive/25 hover:text-destructive"
                  : "text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
              )}
              size="icon-sm"
              onClick={() => setListening((v) => !v)}
            >
              {listening ? (
                <SquareIcon
                  className="size-3.5 fill-current animate-pulse motion-reduce:animate-none"
                  aria-hidden
                />
              ) : (
                <MicIcon className="size-4" aria-hidden />
              )}
            </InputGroupButton>

            <InputGroupButton
              type="button"
              aria-label="Audio visualization"
              className={cn(
                press,
                "rounded-full border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
              )}
              size="icon-sm"
            >
              <AudioLinesIcon className="size-4" aria-hidden />
            </InputGroupButton>

            <InputGroupButton
              type="submit"
              aria-label="Send message"
              className={cn(
                press,
                "rounded-full disabled:opacity-40"
              )}
              disabled={!message.trim()}
              size="icon-sm"
              variant="default"
            >
              <SendIcon className="size-4 icon-dir" aria-hidden />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
