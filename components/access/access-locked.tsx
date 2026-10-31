"use client"

import * as React from "react"
import Link from "next/link"
import { LockIcon } from "lucide-react"

import {
  AuthDialog,
  type AuthDialogMode,
} from "@/components/auth"
import { ProIcon } from "@/components/icons/pro-icon"
import type { ContentAccess } from "@/lib/access"
import { cn } from "@/lib/utils"

/** Decorative lines — look like a real code sample behind the glass. */
const FAKE_LINES = [
  { c: "kw", t: "npx" },
  { c: "str", t: " @sonojs/ui@latest add …" },
  { c: "cmt", t: "" },
  { c: "kw", t: "import" },
  { c: "var", t: " { Component } " },
  { c: "kw", t: "from" },
  { c: "str", t: ' "@/components/…"' },
  { c: "cmt", t: "" },
  { c: "kw", t: "export function" },
  { c: "fn", t: " Example" },
  { c: "op", t: "() {" },
  { c: "cmt", t: "" },
  { c: "op", t: "  return <" },
  { c: "type", t: "Component" },
  { c: "op", t: " />" },
  { c: "op", t: "}" },
] as const

const TONE: Record<(typeof FAKE_LINES)[number]["c"], string> = {
  kw: "text-[color:var(--code-syntax-keyword)]",
  str: "text-[color:var(--code-syntax-string)]",
  var: "text-[color:var(--code-syntax-variable)]",
  fn: "text-[color:var(--code-syntax-function)]",
  type: "text-[color:var(--code-syntax-type)]",
  op: "text-[color:var(--code-fg)]",
  cmt: "text-[color:var(--code-syntax-comment)]",
}

export function AccessLocked({
  access,
  className,
}: {
  access: ContentAccess
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<AuthDialogMode>("sign-in")
  const isPro = access === "pro"

  const openSignIn = () => {
    setMode("sign-in")
    queueMicrotask(() => setOpen(true))
  }

  return (
    <>
      <div
        className={cn(
          "sono-code-block relative overflow-hidden select-none",
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-1 border-b border-[color:var(--code-border)] px-4 py-2">
          <div className="min-w-0 truncate font-mono text-[14px] font-normal text-[color:var(--code-header-fg)]">
            {isPro ? "pro.tsx" : "source.tsx"}
          </div>
        </div>

        <div className="relative min-h-[11rem]">
          <pre
            aria-hidden
            className="pointer-events-none px-4 py-3 font-mono text-[14px] leading-[1.65] blur-[5px] saturate-75"
          >
            <code>
              {chunkLines(FAKE_LINES).map((line, i) => (
                <div key={i} className="whitespace-pre">
                  {line.map((tok, j) => (
                    <span key={j} className={TONE[tok.c]}>
                      {tok.t || " "}
                    </span>
                  ))}
                </div>
              ))}
            </code>
          </pre>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[color:var(--code-bg)]/50 backdrop-blur-[2px]">
            {isPro ? (
              <ProIcon className="size-4 text-primary" aria-hidden />
            ) : (
              <LockIcon
                className="size-4 text-[color:var(--code-header-fg)]"
                aria-hidden
              />
            )}
            {isPro ? (
              <Link
                href="/pricing"
                className="cursor-pointer text-sm font-medium text-[color:var(--code-fg)] underline-offset-4 hover:underline"
              >
                Pro required
              </Link>
            ) : (
              <button
                type="button"
                onClick={openSignIn}
                className="cursor-pointer text-sm font-medium text-[color:var(--code-fg)] underline-offset-4 hover:underline"
              >
                Just log in
              </button>
            )}
          </div>
        </div>
      </div>
      {isPro ? null : (
        <AuthDialog open={open} onOpenChange={setOpen} defaultMode={mode} />
      )}
    </>
  )
}

function chunkLines(
  tokens: readonly { c: (typeof FAKE_LINES)[number]["c"]; t: string }[]
) {
  const lines: { c: (typeof FAKE_LINES)[number]["c"]; t: string }[][] = [[]]
  for (const tok of tokens) {
    if (tok.c === "cmt" && tok.t === "") {
      lines.push([])
      continue
    }
    lines[lines.length - 1]!.push(tok)
  }
  return lines.filter((l) => l.length > 0)
}
