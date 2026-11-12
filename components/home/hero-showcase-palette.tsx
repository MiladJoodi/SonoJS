"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  DemoCard,
  Stagger,
} from "@/components/home/hero-showcase-chrome"
import { cn } from "@/lib/utils"

const COMMANDS = [
  ["New project", "N"],
  ["Invite teammate", "I"],
  ["Switch theme", "T"],
  ["Open settings", ","],
  ["Deploy to production", "D"],
] as const

export function ShowcasePalettePreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [q, setQ] = React.useState("")
  const [toast, setToast] = React.useState("")
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    setQ("")
    setToast("")
  }, [show])

  const filtered = COMMANDS.filter((c) =>
    c[0].toLowerCase().includes(q.toLowerCase())
  )

  function run(name: string) {
    setToast(`Ran: ${name}`)
    if (name === "Switch theme") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
  }

  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered[0]) run(filtered[0][0])
          }}
          placeholder="Type a command…"
          aria-label="Command"
          className="h-10 w-full rounded-[10px] border border-border/70 bg-background px-3 text-sm outline-none focus-visible:border-primary"
        />
      </Stagger>
      <Stagger i={1} show={show}>
        <ul className="mt-2.5 grid gap-0.5">
          {filtered.length === 0 ? (
            <li>
              <button
                type="button"
                disabled
                className="w-full rounded-lg px-2.5 py-2 text-start text-sm text-muted-foreground"
              >
                No commands found
              </button>
            </li>
          ) : (
            filtered.map((c, i) => (
              <li key={c[0]}>
                <button
                  type="button"
                  onClick={() => run(c[0])}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm hover:bg-muted",
                    i === 0 && "bg-muted"
                  )}
                >
                  {c[0]}
                  <kbd className="font-mono text-xs text-muted-foreground">
                    {c[1]}
                  </kbd>
                </button>
              </li>
            ))
          )}
        </ul>
      </Stagger>
      <Stagger i={2} show={show}>
        <p
          role="status"
          className="mt-2.5 min-h-[18px] text-[13px] text-primary"
        >
          {toast}
        </p>
      </Stagger>
    </DemoCard>
  )
}

