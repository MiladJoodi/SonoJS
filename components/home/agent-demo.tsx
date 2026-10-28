"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const PROMPT = "Build a beautiful login form with SonoJS"

export function AgentDemo({ className }: { className?: string }) {
  const [typed, setTyped] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const [showForm, setShowForm] = React.useState(false)
  const runRef = React.useRef(0)

  const play = React.useCallback(() => {
    const id = ++runRef.current
    setShowForm(false)
    setTyped("")
    setTyping(false)

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) {
      setTyped(PROMPT)
      setShowForm(true)
      return
    }

    setTyping(true)
    window.setTimeout(function tick(i = 0) {
      if (id !== runRef.current) return
      const next = i + 1
      setTyped(PROMPT.slice(0, next))
      if (next < PROMPT.length) {
        window.setTimeout(() => tick(next), 34)
      } else {
        setTyping(false)
        window.setTimeout(() => {
          if (id === runRef.current) setShowForm(true)
        }, 380)
      }
    }, 700)
  }, [])

  React.useEffect(() => {
    play()
    return () => {
      runRef.current += 1
    }
  }, [play])

  return (
    <section
      aria-label="Example: an agent builds a login form"
      className={cn(
        "relative flex min-h-[468px] flex-col gap-5 rounded-[24px] border border-border/70 bg-muted/50 p-[22px]",
        className
      )}
    >
      <button
        type="button"
        onClick={play}
        aria-label="Replay example"
        className="absolute end-3.5 top-3.5 grid size-8 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
      >
        <RotateCcwIcon className="size-4" aria-hidden />
      </button>

      <p className="max-w-[calc(100%-2.25rem)] self-start rounded-[14px_14px_14px_4px] border border-border/70 bg-card px-4 py-3 text-start text-[15px] leading-snug text-foreground shadow-soft">
        <span className="sr-only">{PROMPT}</span>
        <span aria-hidden="true">
          {typed}
          <span
            className={cn(
              "ms-px inline-block h-[1.05em] w-0.5 translate-y-[-0.15em] bg-primary align-middle",
              typing && "animate-caret-blink motion-reduce:animate-none"
            )}
          />
        </span>
      </p>

      <div
        aria-hidden="true"
        className={cn(
          "mx-auto w-full max-w-[340px] rounded-[18px] border border-border/70 bg-card p-6 shadow-soft transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
          showForm
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3.5 scale-[0.985] opacity-0"
        )}
      >
        <div
          className={cn(
            "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "160ms" : "0ms" }}
        >
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
            Welcome back
          </h2>
        </div>
        <div
          className={cn(
            "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "230ms" : "0ms" }}
        >
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue.
          </p>
        </div>
        <div
          className={cn(
            "mt-4.5 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "300ms" : "0ms" }}
        >
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </span>
          <div className="flex h-10 items-center rounded-[10px] border border-border/70 bg-background px-3 text-sm text-muted-foreground">
            you@company.com
          </div>
        </div>
        <div
          className={cn(
            "mt-3 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "370ms" : "0ms" }}
        >
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Password
          </span>
          <div className="flex h-10 items-center rounded-[10px] border border-border/70 bg-background px-3 text-sm text-muted-foreground">
            ••••••••••
          </div>
        </div>
        <div
          className={cn(
            "mt-4.5 flex h-[42px] items-center justify-center rounded-[10px] bg-primary text-sm font-medium text-primary-foreground transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "440ms" : "0ms" }}
        >
          Sign in
        </div>
        <div
          className={cn(
            "mt-2.5 flex h-[42px] items-center justify-center rounded-[10px] border border-border/70 text-sm font-medium text-foreground transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "510ms" : "0ms" }}
        >
          Continue with GitHub
        </div>
        <div
          className={cn(
            "mt-4 text-center text-[13px] text-muted-foreground transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            showForm ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: showForm ? "580ms" : "0ms" }}
        >
          Forgot your password?
        </div>
      </div>
    </section>
  )
}
