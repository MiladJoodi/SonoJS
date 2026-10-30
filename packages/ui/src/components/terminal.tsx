"use client"

import * as React from "react"
import Ansi from "ansi-to-react"
import { CheckIcon, CopyIcon, TerminalIcon, Trash2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"
import { cn } from "@sonojs/ui/lib/utils"

type TerminalContextValue = {
  output: string
  isStreaming: boolean
  autoScroll: boolean
  onClear?: () => void
}

const TerminalContext = React.createContext<TerminalContextValue>({
  output: "",
  isStreaming: false,
  autoScroll: true,
})

function useTerminalContext() {
  return React.useContext(TerminalContext)
}

export type TerminalHeaderProps = React.ComponentProps<"div">

function TerminalHeader({ className, ...props }: TerminalHeaderProps) {
  return (
    <div
      data-slot="terminal-header"
      className={cn(
        "flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--code-border)] bg-[var(--code-header-bg)] px-3 py-2 sm:px-4",
        className
      )}
      {...props}
    />
  )
}

export type TerminalTitleProps = React.ComponentProps<"div">

function TerminalTitle({
  className,
  children,
  ...props
}: TerminalTitleProps) {
  return (
    <div
      data-slot="terminal-title"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 truncate text-sm text-[var(--code-header-fg)]",
        className
      )}
      {...props}
    >
      <TerminalIcon className="size-4 shrink-0" aria-hidden />
      <span className="truncate">{children ?? "Terminal"}</span>
    </div>
  )
}

export type TerminalStatusProps = React.ComponentProps<"div">

function TerminalStatus({
  className,
  children,
  ...props
}: TerminalStatusProps) {
  const { isStreaming } = useTerminalContext()

  if (!isStreaming) return null

  return (
    <div
      data-slot="terminal-status"
      className={cn(
        "flex shrink-0 items-center gap-2 text-xs text-[var(--code-header-fg)]",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <Spinner className="size-3.5" />
          <span className="whitespace-nowrap">Streaming</span>
        </>
      )}
    </div>
  )
}

export type TerminalActionsProps = React.ComponentProps<"div">

function TerminalActions({ className, ...props }: TerminalActionsProps) {
  return (
    <div
      data-slot="terminal-actions"
      className={cn("flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  )
}

export type TerminalCopyButtonProps = React.ComponentProps<typeof Button> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
}

function TerminalCopyButton({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: TerminalCopyButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const timeoutRef = React.useRef(0)
  const { output } = useTerminalContext()

  const copyToClipboard = React.useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"))
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      setIsCopied(true)
      onCopy?.()
      timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout)
    } catch (error) {
      onError?.(error as Error)
    }
  }, [output, onCopy, onError, timeout])

  React.useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current)
    },
    []
  )

  const Icon = isCopied ? CheckIcon : CopyIcon

  return (
    <Button
      type="button"
      data-slot="terminal-copy-button"
      variant="ghost"
      size="icon-xs"
      aria-label={isCopied ? "Copied" : "Copy output"}
      className={cn(
        "size-10 text-[var(--code-header-fg)] hover:bg-white/10 hover:text-[var(--code-fg)] sm:size-8",
        className
      )}
      onClick={copyToClipboard}
      {...props}
    >
      {children ?? <Icon className="size-3.5" />}
    </Button>
  )
}

export type TerminalClearButtonProps = React.ComponentProps<typeof Button>

function TerminalClearButton({
  children,
  className,
  ...props
}: TerminalClearButtonProps) {
  const { onClear } = useTerminalContext()

  if (!onClear) return null

  return (
    <Button
      type="button"
      data-slot="terminal-clear-button"
      variant="ghost"
      size="icon-xs"
      aria-label="Clear output"
      className={cn(
        "size-10 text-[var(--code-header-fg)] hover:bg-white/10 hover:text-[var(--code-fg)] sm:size-8",
        className
      )}
      onClick={onClear}
      {...props}
    >
      {children ?? <Trash2Icon className="size-3.5" />}
    </Button>
  )
}

export type TerminalContentProps = React.ComponentProps<"div">

function TerminalContent({
  className,
  children,
  ...props
}: TerminalContentProps) {
  const { output, isStreaming, autoScroll } = useTerminalContext()
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [output, autoScroll])

  return (
    <div
      data-slot="terminal-content"
      ref={containerRef}
      className={cn(
        "max-h-96 min-w-0 overflow-auto overscroll-contain p-3 font-mono text-sm leading-relaxed text-[var(--code-fg)] sm:p-4",
        className
      )}
      {...props}
    >
      {children ?? (
        <pre className="min-w-0 whitespace-pre-wrap break-words">
          <Ansi>{output}</Ansi>
          {isStreaming ? (
            <span
              aria-hidden
              className="ms-0.5 inline-block h-4 w-2 animate-pulse bg-[var(--code-fg)]"
            />
          ) : null}
        </pre>
      )}
    </div>
  )
}

export type TerminalProps = React.ComponentProps<"div"> & {
  output: string
  isStreaming?: boolean
  autoScroll?: boolean
  onClear?: () => void
}

function Terminal({
  output,
  isStreaming = false,
  autoScroll = true,
  onClear,
  className,
  children,
  ...props
}: TerminalProps) {
  const contextValue = React.useMemo(
    () => ({ autoScroll, isStreaming, onClear, output }),
    [autoScroll, isStreaming, onClear, output]
  )

  return (
    <TerminalContext.Provider value={contextValue}>
      <div
        data-slot="terminal"
        data-streaming={isStreaming ? "" : undefined}
        className={cn(
          "sonojs flex w-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-[var(--code-border)] bg-[var(--code-bg)] text-[var(--code-fg)]",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <TerminalHeader>
              <TerminalTitle />
              <div className="flex items-center gap-1">
                <TerminalStatus />
                <TerminalActions>
                  <TerminalCopyButton />
                  {onClear ? <TerminalClearButton /> : null}
                </TerminalActions>
              </div>
            </TerminalHeader>
            <TerminalContent />
          </>
        )}
      </div>
    </TerminalContext.Provider>
  )
}

export {
  Terminal,
  TerminalHeader,
  TerminalTitle,
  TerminalStatus,
  TerminalActions,
  TerminalCopyButton,
  TerminalClearButton,
  TerminalContent,
}
