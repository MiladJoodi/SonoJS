import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Landing hero: media + copy + CTAs. */
export function MarketingBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[90%] overflow-hidden rounded-[8px] border border-border/70 bg-card">
        <div className="flex w-[48%] flex-col justify-center gap-1 p-2">
          <span className="h-0.5 w-6 rounded-full bg-primary/55" />
          <span className="h-1.5 w-[90%] rounded-full bg-foreground/40" />
          <span className="h-0.5 w-[75%] rounded-full bg-foreground/18" />
          <div className="mt-1 flex gap-1">
            <span className="h-2.5 w-7 rounded-[4px] bg-primary" />
            <span className="h-2.5 w-7 rounded-[4px] border border-border/70" />
          </div>
        </div>
        <div className="w-[52%] bg-gradient-to-br from-primary/25 via-primary/10 to-muted/40" />
      </div>
    </MarkFrame>
  )
}
