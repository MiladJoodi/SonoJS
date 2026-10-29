import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Alert / empty state strip + CTA. */
export function FeedbackStatesBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[85%] flex-col gap-1.5">
        <div className="flex items-start gap-1.5 rounded-[6px] border border-amber-500/30 bg-amber-500/10 p-1.5">
          <span className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-500/70" />
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="h-0.5 w-[55%] rounded-full bg-foreground/35" />
            <span className="h-0.5 w-[80%] rounded-full bg-foreground/18" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-[6px] border border-border/70 bg-card py-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-muted/50">
            <span className="size-2 rounded-[2px] bg-foreground/25" />
          </span>
          <span className="h-0.5 w-12 rounded-full bg-foreground/25" />
          <span className="mt-0.5 h-2 w-9 rounded-[3px] bg-primary" />
        </div>
      </div>
    </MarkFrame>
  )
}
