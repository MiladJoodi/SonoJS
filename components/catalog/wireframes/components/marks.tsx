import type { ReactNode } from "react"

import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

function Frame({ children }: { children: ReactNode }) {
  return <MarkFrame density="bold">{children}</MarkFrame>
}

function Bars({ n = 3, wide }: { n?: number; wide?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 ${wide ? "w-full" : "w-[75%]"}`}>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="h-1 rounded-full bg-foreground/25"
          style={{ width: `${90 - i * 12}%` }}
        />
      ))}
    </div>
  )
}

/** Large, scan-readable CSS marks for component catalog thumbs. */
export function getCssComponentMark(slug: string) {
  switch (slug) {
    /* —— AI —— */
    case "agent-activity":
    case "agent-activity-2":
      return (
        <Frame>
          <div className="flex w-[88%] flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-3.5 shrink-0 rounded-full bg-primary/55" />
                <span className="h-1.5 flex-1 rounded-full bg-foreground/25" />
              </div>
            ))}
          </div>
        </Frame>
      )
    case "agent-code-block":
    case "code-block":
      return (
        <Frame>
          <div className="w-[90%] space-y-2 rounded-[8px] border border-border/70 bg-card p-2.5">
            <div className="flex gap-1">
              <span className="size-2 rounded-full bg-foreground/30" />
              <span className="size-2 rounded-full bg-foreground/30" />
              <span className="size-2 rounded-full bg-foreground/30" />
            </div>
            <span className="block h-1.5 w-[92%] rounded-full bg-foreground/30" />
            <span className="block h-1.5 w-[72%] rounded-full bg-primary/45" />
            <span className="block h-1.5 w-[82%] rounded-full bg-foreground/22" />
          </div>
        </Frame>
      )
    case "approval-card":
    case "tool-approval":
      return (
        <Frame>
          <div className="flex w-[88%] flex-col gap-2 rounded-[10px] border border-border/70 bg-card p-2.5">
            <Bars n={2} wide />
            <div className="mt-1 flex gap-2">
              <span className="h-7 flex-1 rounded-[6px] border border-border/70" />
              <span className="h-7 flex-1 rounded-[6px] bg-primary" />
            </div>
          </div>
        </Frame>
      )
    case "attachment":
      return (
        <Frame>
          <div className="flex w-[85%] items-center gap-2.5 rounded-[8px] border border-border/70 bg-card px-2.5 py-2.5">
            <span className="size-8 shrink-0 rounded-[6px] bg-muted/70" />
            <Bars n={2} />
          </div>
        </Frame>
      )
    case "bubble":
    case "message":
      return (
        <Frame>
          <div className="flex w-[90%] flex-col gap-2">
            <div className="ms-auto w-[58%] rounded-[10px] rounded-ee-[3px] bg-primary/45 px-2.5 py-2">
              <span className="block h-1.5 w-[85%] rounded-full bg-primary-foreground/50" />
            </div>
            <div className="w-[70%] space-y-1.5 rounded-[10px] border border-border/60 bg-muted/40 px-2.5 py-2">
              <span className="block h-1.5 w-full rounded-full bg-foreground/30" />
              <span className="block h-1.5 w-[75%] rounded-full bg-foreground/20" />
            </div>
          </div>
        </Frame>
      )
    case "citations":
      return (
        <Frame>
          <div className="flex w-[88%] flex-col gap-2">
            <Bars n={3} wide />
            <div className="flex gap-1.5">
              <span className="h-5 w-10 rounded-full bg-primary/30" />
              <span className="h-5 w-12 rounded-full bg-primary/30" />
            </div>
          </div>
        </Frame>
      )
    case "file-diff":
      return (
        <Frame>
          <div className="w-[90%] overflow-hidden rounded-[8px] border border-border/70 bg-card">
            <div className="bg-emerald-500/20 px-2.5 py-1.5">
              <span className="block h-1.5 w-[75%] rounded-full bg-emerald-600/55" />
            </div>
            <div className="bg-red-500/20 px-2.5 py-1.5">
              <span className="block h-1.5 w-[60%] rounded-full bg-red-600/55" />
            </div>
            <div className="px-2.5 py-1.5">
              <span className="block h-1.5 w-[65%] rounded-full bg-foreground/25" />
            </div>
          </div>
        </Frame>
      )
    case "image-generation":
    case "image-generation-2":
      return (
        <Frame>
          <div className="relative aspect-square w-[62%] overflow-hidden rounded-[10px] border border-border/70 bg-gradient-to-br from-violet-500/30 via-sky-400/25 to-amber-300/30">
            <span className="absolute start-1.5 top-1.5 size-2.5 border-s-2 border-t-2 border-foreground/40" />
            <span className="absolute end-1.5 top-1.5 size-2.5 border-e-2 border-t-2 border-foreground/40" />
            <span className="absolute bottom-1.5 start-1.5 size-2.5 border-b-2 border-s-2 border-foreground/40" />
            <span className="absolute bottom-1.5 end-1.5 size-2.5 border-b-2 border-e-2 border-foreground/40" />
          </div>
        </Frame>
      )
    case "loading-states":
    case "spinner":
      return (
        <Frame>
          <div className="size-10 rounded-full border-[3px] border-border/50 border-t-primary" />
        </Frame>
      )
    case "message-scroller":
      return (
        <Frame>
          <div className="relative flex h-[85%] w-[82%] flex-col gap-2 overflow-hidden rounded-[8px] border border-border/60 bg-card p-2.5">
            <Bars n={4} wide />
            <span className="absolute bottom-2 end-2 size-5 rounded-full border border-border/70 bg-card" />
          </div>
        </Frame>
      )
    case "prompt-input":
    case "prompt-input-2":
      return (
        <Frame>
          <div className="flex h-9 w-[92%] items-center gap-2 rounded-[10px] border border-border/70 bg-card px-2.5">
            <span className="h-1.5 flex-1 rounded-full bg-foreground/18" />
            <span className="size-6 shrink-0 rounded-full bg-primary" />
          </div>
        </Frame>
      )
    case "reasoning-text":
    case "streaming-response":
      return (
        <Frame>
          <div className="w-[88%] space-y-2">
            <Bars n={3} wide />
            <span className="block h-1.5 w-[35%] rounded-full bg-primary/55" />
          </div>
        </Frame>
      )
    case "selection-actions":
      return (
        <Frame>
          <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card p-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="size-6 rounded-full bg-muted/70" />
            ))}
          </div>
        </Frame>
      )
    case "structured-output":
      return (
        <Frame>
          <div className="w-[85%] space-y-2.5 rounded-[8px] border border-border/70 bg-card p-2.5">
            <div className="flex justify-between gap-2">
              <span className="h-1.5 w-[40%] rounded-full bg-foreground/30" />
              <span className="h-1.5 w-[25%] rounded-full bg-primary/45" />
            </div>
            <div className="flex justify-between gap-2">
              <span className="h-1.5 w-[45%] rounded-full bg-foreground/30" />
              <span className="h-1.5 w-[30%] rounded-full bg-foreground/22" />
            </div>
            <div className="flex justify-between gap-2">
              <span className="h-1.5 w-[35%] rounded-full bg-foreground/30" />
              <span className="h-1.5 w-[28%] rounded-full bg-foreground/22" />
            </div>
          </div>
        </Frame>
      )
    case "task-rows":
    case "todo-list":
      return (
        <Frame>
          <div className="flex w-[88%] flex-col gap-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="size-4 shrink-0 rounded-[4px] border-2 border-border/80" />
                <span className="h-1.5 flex-1 rounded-full bg-foreground/25" />
              </div>
            ))}
          </div>
        </Frame>
      )
    case "trace":
      return (
        <Frame>
          <div className="flex w-[85%] flex-col">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-2.5">
                <div className="flex w-3.5 flex-col items-center">
                  <span className="size-3 shrink-0 rounded-full bg-primary/65" />
                  {i < 2 ? <span className="h-5 w-0.5 bg-border" /> : null}
                </div>
                <span className="mt-1 h-1.5 flex-1 rounded-full bg-foreground/25" />
              </div>
            ))}
          </div>
        </Frame>
      )

    /* —— Forms —— */
    case "button":
    case "rainbow-button":
      return (
        <Frame>
          <span className="h-8 w-20 rounded-[8px] bg-primary" />
        </Frame>
      )
    case "button-group":
      return (
        <Frame>
          <div className="flex overflow-hidden rounded-[8px] border border-border/70">
            <span className="h-8 w-12 border-e border-border/70 bg-card" />
            <span className="h-8 w-12 border-e border-border/70 bg-primary/25" />
            <span className="h-8 w-12 bg-card" />
          </div>
        </Frame>
      )
    case "calendar":
    case "date-picker":
      return (
        <Frame>
          <div className="w-[72%] rounded-[10px] border border-border/70 bg-card p-2">
            <div className="mb-2 flex items-center justify-between px-0.5">
              <span className="h-1.5 w-10 rounded-full bg-foreground/30" />
              <div className="flex gap-1">
                <span className="size-3 rounded-[3px] bg-foreground/15" />
                <span className="size-3 rounded-[3px] bg-foreground/15" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 21 }, (_, i) => (
                <span
                  key={i}
                  className={
                    i === 10
                      ? "aspect-square rounded-[4px] bg-primary"
                      : "aspect-square rounded-[4px] bg-muted/45"
                  }
                />
              ))}
            </div>
          </div>
        </Frame>
      )
    case "checkbox":
      return (
        <Frame>
          <div className="flex items-center gap-2.5">
            <span className="flex size-5 items-center justify-center rounded-[5px] bg-primary">
              <span className="h-1 w-2.5 rounded-full bg-primary-foreground" />
            </span>
            <span className="h-1.5 w-16 rounded-full bg-foreground/30" />
          </div>
        </Frame>
      )
    case "combobox":
    case "select":
    case "native-select":
      return (
        <Frame>
          <div className="flex h-8 w-[82%] items-center justify-between rounded-[8px] border border-border/70 bg-card px-2.5">
            <span className="h-1.5 w-[50%] rounded-full bg-foreground/30" />
            <span className="size-2.5 rotate-45 border-e-2 border-b-2 border-foreground/35" />
          </div>
        </Frame>
      )
    case "field":
    case "input":
    case "input-group":
      return (
        <Frame>
          <div className="flex w-[85%] flex-col gap-1.5">
            <span className="h-1.5 w-12 rounded-full bg-foreground/35" />
            <div className="h-8 rounded-[8px] border border-border/70 bg-card" />
          </div>
        </Frame>
      )
    case "input-otp":
      return (
        <Frame>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="size-8 rounded-[6px] border border-border/70 bg-card"
              />
            ))}
          </div>
        </Frame>
      )
    case "label":
      return (
        <Frame>
          <div className="flex w-[80%] flex-col gap-1.5">
            <span className="h-1.5 w-14 rounded-full bg-foreground/40" />
            <div className="h-8 rounded-[8px] border border-border/70 bg-card" />
          </div>
        </Frame>
      )
    case "radio-group":
      return (
        <Frame>
          <div className="flex flex-col gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span
                  className={
                    i === 0
                      ? "size-5 rounded-full border-[4px] border-primary"
                      : "size-5 rounded-full border-2 border-border/80"
                  }
                />
                <span className="h-1.5 w-14 rounded-full bg-foreground/25" />
              </div>
            ))}
          </div>
        </Frame>
      )
    case "slider":
      return (
        <Frame>
          <div className="relative flex h-8 w-[85%] items-center">
            <span className="h-1.5 w-full rounded-full bg-muted" />
            <span className="absolute start-0 h-1.5 w-[48%] rounded-full bg-primary" />
            <span className="absolute start-[44%] size-4 rounded-full border border-border/70 bg-card" />
          </div>
        </Frame>
      )
    case "switch":
      return (
        <Frame>
          <div className="flex h-5 w-9 items-center justify-end rounded-full bg-primary px-0.5">
            <span className="size-4 rounded-full bg-card" />
          </div>
        </Frame>
      )
    case "textarea":
      return (
        <Frame>
          <div className="h-14 w-[85%] space-y-1.5 rounded-[8px] border border-border/70 bg-card p-2.5">
            <Bars n={3} wide />
          </div>
        </Frame>
      )
    case "toggle":
      return (
        <Frame>
          <span className="flex size-9 items-center justify-center rounded-[8px] border border-border/70 bg-muted/50">
            <span className="size-3.5 rounded-[3px] bg-foreground/35" />
          </span>
        </Frame>
      )
    case "toggle-group":
      return (
        <Frame>
          <div className="flex overflow-hidden rounded-[8px] border border-border/70">
            <span className="h-8 w-10 bg-primary/30" />
            <span className="h-8 w-10 border-s border-border/70 bg-card" />
            <span className="h-8 w-10 border-s border-border/70 bg-card" />
          </div>
        </Frame>
      )

    /* —— Layout —— */
    case "accordion":
      return (
        <Frame>
          <div className="w-[90%] space-y-1.5">
            <div className="flex items-center justify-between rounded-[8px] border border-border/70 bg-card px-2.5 py-2">
              <span className="h-1.5 w-[55%] rounded-full bg-foreground/35" />
              <span className="size-2 rotate-45 border-e-2 border-b-2 border-foreground/35" />
            </div>
            <div className="rounded-[8px] border border-border/50 bg-muted/25 px-2.5 py-2">
              <Bars n={2} wide />
            </div>
          </div>
        </Frame>
      )
    case "card":
      return (
        <Frame>
          <div className="flex w-[82%] flex-col gap-2 rounded-[10px] border border-border/70 bg-card p-3">
            <span className="h-2 w-[55%] rounded-full bg-foreground/35" />
            <Bars n={2} wide />
            <span className="mt-1 h-7 w-[40%] rounded-[6px] bg-primary" />
          </div>
        </Frame>
      )
    case "collapsible":
      return (
        <Frame>
          <div className="w-[85%] rounded-[8px] border border-border/70 bg-card p-2.5">
            <div className="mb-2 flex justify-between">
              <span className="h-1.5 w-[50%] rounded-full bg-foreground/35" />
              <span className="h-1.5 w-3 rounded-full bg-foreground/25" />
            </div>
            <Bars n={2} wide />
          </div>
        </Frame>
      )
    case "item":
      return (
        <Frame>
          <div className="flex w-[88%] items-center gap-2.5 rounded-[8px] border border-border/70 bg-card px-2.5 py-2.5">
            <span className="size-8 shrink-0 rounded-[6px] bg-muted/70" />
            <Bars n={2} />
          </div>
        </Frame>
      )
    case "resizable":
      return (
        <Frame>
          <div className="flex h-16 w-[90%] overflow-hidden rounded-[8px] border border-border/70">
            <div className="w-[40%] bg-muted/40" />
            <div className="w-1 bg-border" />
            <div className="flex-1 bg-card" />
          </div>
        </Frame>
      )
    case "scroll-area":
      return (
        <Frame>
          <div className="relative h-16 w-[70%] overflow-hidden rounded-[8px] border border-border/70 bg-card p-2">
            <Bars n={5} wide />
            <span className="absolute end-1 top-2 h-7 w-1 rounded-full bg-foreground/30" />
          </div>
        </Frame>
      )
    case "separator":
      return (
        <Frame>
          <div className="flex w-[80%] flex-col gap-3">
            <span className="h-1.5 w-full rounded-full bg-foreground/25" />
            <span className="h-px w-full bg-border" />
            <span className="h-1.5 w-full rounded-full bg-foreground/25" />
          </div>
        </Frame>
      )
    case "tabs":
      return (
        <Frame>
          <div className="w-[90%]">
            <div className="mb-2.5 flex gap-3 border-b border-border/60 pb-0">
              <span className="h-3 w-12 border-b-2 border-primary" />
              <span className="h-3 w-12" />
              <span className="h-3 w-12" />
            </div>
            <Bars n={2} wide />
          </div>
        </Frame>
      )

    /* —— Overlays —— */
    case "alert-dialog":
    case "dialog":
      return (
        <Frame>
          <div className="relative flex size-full items-center justify-center">
            <div className="absolute inset-0.5 rounded-[4px] bg-foreground/15" />
            <div className="relative z-10 flex w-[82%] flex-col gap-2 rounded-[10px] border border-border/70 bg-card p-3">
              <span className="h-2 w-[55%] rounded-full bg-foreground/40" />
              <Bars n={2} wide />
              <div className="mt-1 flex justify-end gap-1.5">
                <span className="h-7 w-12 rounded-[6px] border border-border/70" />
                <span className="h-7 w-12 rounded-[6px] bg-primary" />
              </div>
            </div>
          </div>
        </Frame>
      )
    case "sheet":
    case "drawer":
      return (
        <Frame>
          <div className="relative flex size-full overflow-hidden rounded-[4px]">
            <div className="flex-1 bg-foreground/10" />
            <div className="flex w-[48%] flex-col gap-2 border-s border-border/70 bg-card p-2.5">
              <span className="h-1.5 w-[55%] rounded-full bg-foreground/35" />
              <Bars n={3} wide />
              <span className="mt-auto h-7 w-full rounded-[6px] bg-primary" />
            </div>
          </div>
        </Frame>
      )
    case "command":
      return (
        <Frame>
          <div className="w-[90%] overflow-hidden rounded-[10px] border border-border/70 bg-card">
            <div className="flex h-8 items-center gap-2 border-b border-border/60 px-2.5">
              <span className="size-3 rounded-full border-2 border-foreground/30" />
              <span className="h-1.5 w-[55%] rounded-full bg-foreground/22" />
            </div>
            <div className="space-y-1 p-1.5">
              <span className="block h-7 w-full rounded-[6px] bg-primary/25" />
              <span className="block h-7 w-full rounded-[6px] bg-muted/40" />
              <span className="block h-7 w-full rounded-[6px] bg-muted/40" />
            </div>
          </div>
        </Frame>
      )
    case "context-menu":
    case "dropdown-menu":
    case "menubar":
      return (
        <Frame>
          <div className="w-[58%] space-y-1 rounded-[8px] border border-border/70 bg-card p-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={
                  i === 1
                    ? "block h-6 w-full rounded-[5px] bg-primary/20"
                    : "block h-6 w-full rounded-[5px] bg-muted/35"
                }
              />
            ))}
          </div>
        </Frame>
      )
    case "hover-card":
    case "popover":
      return (
        <Frame>
          <div className="flex flex-col items-center gap-1.5">
            <span className="h-7 w-14 rounded-[6px] border border-border/70 bg-card" />
            <div className="w-24 space-y-1.5 rounded-[8px] border border-border/70 bg-card p-2.5">
              <Bars n={2} wide />
            </div>
          </div>
        </Frame>
      )
    case "tooltip":
      return (
        <Frame>
          <div className="flex flex-col items-center gap-0.5">
            <span className="rounded-[6px] bg-foreground px-3 py-2">
              <span className="block h-1.5 w-10 rounded-full bg-background/85" />
            </span>
            <span className="size-2.5 rotate-45 bg-foreground" />
          </div>
        </Frame>
      )

    /* —— Feedback —— */
    case "alert":
      return (
        <Frame>
          <div className="flex w-[90%] items-start gap-2.5 rounded-[8px] border border-border/70 bg-card p-2.5">
            <span className="mt-0.5 size-3.5 shrink-0 rounded-full bg-primary/55" />
            <Bars n={2} />
          </div>
        </Frame>
      )
    case "badge":
      return (
        <Frame>
          <span className="rounded-full bg-primary/25 px-4 py-2">
            <span className="block h-1.5 w-10 rounded-full bg-primary/75" />
          </span>
        </Frame>
      )
    case "empty":
      return (
        <Frame>
          <div className="flex flex-col items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-muted/55">
              <span className="size-4 rounded-[3px] bg-foreground/30" />
            </span>
            <span className="h-1.5 w-16 rounded-full bg-foreground/30" />
            <span className="h-1 w-20 rounded-full bg-foreground/16" />
            <span className="mt-0.5 h-7 w-14 rounded-[6px] border border-border/70 bg-card" />
          </div>
        </Frame>
      )
    case "kbd":
      return (
        <Frame>
          <span className="rounded-[6px] border border-border/70 bg-muted/50 px-3 py-1.5">
            <span className="block h-2 w-5 rounded-full bg-foreground/40" />
          </span>
        </Frame>
      )
    case "marker":
      return (
        <Frame>
          <span className="rounded-[5px] bg-amber-400/45 px-3 py-1.5">
            <span className="block h-1.5 w-14 rounded-full bg-foreground/45" />
          </span>
        </Frame>
      )
    case "progress":
      return (
        <Frame>
          <div className="h-2.5 w-[85%] overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[62%] rounded-full bg-primary" />
          </div>
        </Frame>
      )
    case "skeleton":
      return (
        <Frame>
          <div className="flex w-[85%] flex-col gap-2">
            <span className="h-4 w-full rounded-[6px] bg-muted/65" />
            <span className="h-4 w-[82%] rounded-[6px] bg-muted/55" />
            <span className="h-4 w-[65%] rounded-[6px] bg-muted/45" />
          </div>
        </Frame>
      )
    case "sonner":
      return (
        <Frame>
          <div className="flex w-[88%] items-center gap-2.5 rounded-[10px] border border-border/70 bg-card p-2.5">
            <span className="size-3.5 shrink-0 rounded-full bg-emerald-500/75" />
            <Bars n={2} />
          </div>
        </Frame>
      )

    /* —— Data —— */
    case "avatar":
      return (
        <Frame>
          <span className="size-12 rounded-full bg-primary/45" />
        </Frame>
      )
    case "carousel":
      return (
        <Frame>
          <div className="flex w-[92%] items-center gap-1.5">
            <span className="size-3 shrink-0 rounded-full bg-foreground/25" />
            <div className="h-14 flex-1 rounded-[8px] border border-border/70 bg-muted/40" />
            <span className="size-3 shrink-0 rounded-full bg-foreground/25" />
          </div>
        </Frame>
      )
    case "data-table":
    case "table":
      return (
        <Frame>
          <div className="w-[92%] overflow-hidden rounded-[8px] border border-border/70 bg-card">
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-2 py-1.5">
              <span className="size-2.5 shrink-0 rounded-[3px] border border-foreground/35" />
              <span className="h-1.5 w-[24%] rounded-full bg-foreground/40" />
              <span className="h-1.5 w-[32%] rounded-full bg-foreground/30" />
              <span className="ms-auto h-1.5 w-[20%] rounded-full bg-foreground/30" />
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 border-b border-border/40 px-2 py-1.5 last:border-b-0"
              >
                <span className="size-2.5 shrink-0 rounded-[3px] border border-foreground/25" />
                <span className="h-1.5 w-[24%] rounded-full bg-foreground/25" />
                <span className="h-1.5 w-[32%] rounded-full bg-foreground/18" />
                <span
                  className={
                    i === 0
                      ? "ms-auto h-2.5 w-[20%] rounded-full bg-emerald-500/50"
                      : "ms-auto h-2.5 w-[20%] rounded-full bg-muted/70"
                  }
                />
              </div>
            ))}
          </div>
        </Frame>
      )
    case "pagination":
      return (
        <Frame>
          <div className="flex items-center gap-1.5">
            <span className="size-7 rounded-[6px] border border-border/70" />
            <span className="size-7 rounded-[6px] bg-primary" />
            <span className="size-7 rounded-[6px] border border-border/70" />
            <span className="size-7 rounded-[6px] border border-border/70" />
          </div>
        </Frame>
      )

    /* —— Navigation —— */
    case "breadcrumb":
      return (
        <Frame>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-8 rounded-full bg-foreground/30" />
            <span className="size-1 rounded-full bg-foreground/35" />
            <span className="h-1.5 w-10 rounded-full bg-foreground/30" />
            <span className="size-1 rounded-full bg-foreground/35" />
            <span className="h-1.5 w-12 rounded-full bg-foreground/45" />
          </div>
        </Frame>
      )
    case "navigation-menu":
      return (
        <Frame>
          <div className="flex h-9 w-[92%] items-center gap-3 rounded-[8px] border border-border/70 bg-card px-3">
            <span className="h-1.5 w-10 rounded-full bg-foreground/35" />
            <span className="h-1.5 w-10 rounded-full bg-foreground/22" />
            <span className="h-1.5 w-10 rounded-full bg-foreground/22" />
            <span className="ms-auto h-6 w-12 rounded-[5px] bg-primary" />
          </div>
        </Frame>
      )

    default:
      return (
        <Frame>
          <div className="flex w-[80%] flex-col gap-2 rounded-[8px] border border-border/70 bg-card p-3">
            <span className="size-6 rounded-[5px] bg-primary/40" />
            <Bars n={2} wide />
          </div>
        </Frame>
      )
  }
}
