"use client"

import * as React from "react"
import {
  CheckIcon,
  FileCodeIcon,
  FolderSearchIcon,
  GitPullRequestIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    id: 1,
    label: "Attach context",
    hint: "Repo + design tokens",
    tool: "fs.read",
    detail: "Opened app/checkout/page.tsx · 214 lines",
  },
  {
    id: 2,
    label: "Run the agent",
    hint: "Plan → tools → draft",
    tool: "shell",
    detail: "npm run typecheck · exit 0",
  },
  {
    id: 3,
    label: "Review the diff",
    hint: "Approve each change",
    tool: "apply_patch",
    detail: "+48 −12 · checkout form + passkey gate",
  },
  {
    id: 4,
    label: "Ship the PR",
    hint: "Open for humans",
    tool: "gh.pr",
    detail: "Draft PR #842 · ready for review",
  },
] as const

const STREAM = [
  { kind: "think", text: "Checkout still uses password fields — swap to passkey first." },
  { kind: "tool", text: "read_file · app/checkout/page.tsx" },
  { kind: "tool", text: "grep · Passkey|WebAuthn" },
  { kind: "out", text: "Drafting PasskeyButton + fallback SMS path…" },
] as const

export default function HowItWorks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [step, setStep] = React.useState(2)
  const active = STEPS[step - 1]!

  return (
    <section
      className={cn(
        "w-full bg-zinc-950 py-10 text-zinc-50 sm:py-14",
        className
      )}
      aria-labelledby="how-it-works-03-heading"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="flex flex-col text-start lg:col-span-5">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h1
            id="how-it-works-03-heading"
            className="mt-1.5 text-h2 font-semibold tracking-tight"
          >
            An agent that ships with you in the loop.
          </h1>
          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-zinc-400">
            The 2026 loop everyone knows — attach context, let tools run, review
            the diff, open the PR. You stay the editor-in-chief.
          </p>

          <ol className="mt-6 space-y-0.5">
            {STEPS.map((item) => {
              const on = item.id === step
              const done = item.id < step
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setStep(item.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-[12px] px-2.5 py-2 text-start transition-colors",
                      on ? "bg-white/10" : "hover:bg-white/5"
                    )}
                  >
                    <span
                      dir="ltr"
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-zinc-900 tabular-nums ring-1 ring-white/20",
                        on && "ring-primary/50 text-primary",
                        done && !on && "text-primary"
                      )}
                    >
                      {done && !on ? (
                        <CheckIcon className="size-3.5" aria-hidden />
                      ) : (
                        `0${item.id}`
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-semibold",
                          on ? "text-white" : "text-zinc-400"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="block text-xs text-zinc-500">
                        {item.hint}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-[16px] border border-white/10 bg-zinc-900/80 shadow-soft">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5 text-start">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <SparklesIcon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Agent run · checkout</p>
                  <p className="truncate text-xs text-zinc-500">
                    model · sono-coder · tools on
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 border-0 bg-emerald-500/15 text-emerald-300"
              >
                Live
              </Badge>
            </div>

            <div className="space-y-3 p-4 sm:p-5">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 ring-1 ring-white/10">
                  <FolderSearchIcon className="size-3" aria-hidden />
                  repo
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 ring-1 ring-white/10">
                  <FileCodeIcon className="size-3" aria-hidden />
                  tokens.css
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 ring-1 ring-white/10">
                  <TerminalIcon className="size-3" aria-hidden />
                  typecheck
                </span>
              </div>

              <div
                dir="ltr"
                className="space-y-2 rounded-[12px] border border-white/10 bg-zinc-950/80 p-3 font-mono text-[12px] leading-relaxed"
              >
                {STREAM.map((line, i) => (
                  <p
                    key={i}
                    className={cn(
                      line.kind === "think" && "text-zinc-500",
                      line.kind === "tool" && "text-sky-300",
                      line.kind === "out" && "text-zinc-200"
                    )}
                  >
                    {line.kind === "tool" ? (
                      <>
                        <span className="text-zinc-600">› </span>
                        {line.text}
                      </>
                    ) : (
                      line.text
                    )}
                  </p>
                ))}
                <p className="flex items-center gap-2 text-zinc-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  {active.tool}
                  <span className="text-zinc-600">·</span>
                  {active.detail}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-white/10 bg-white/5 px-3 py-2.5">
                <div className="flex items-center gap-2 text-start text-sm">
                  <GitPullRequestIcon
                    className="size-4 text-primary"
                    aria-hidden
                  />
                  <span className="font-medium">{active.label}</span>
                  <span className="text-xs text-zinc-500">{active.hint}</span>
                </div>
                <Button size="sm" className="cursor-pointer">
                  {step === 4 ? "Open PR" : "Approve step"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
