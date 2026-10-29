import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Navbar + page band — scans as site chrome. */
export function NavigationBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[90%] flex-col gap-1.5">
        <div className="flex h-4 items-center gap-1.5 rounded-[5px] border border-border/70 bg-card px-1.5">
          <span className="size-2 shrink-0 rounded-[3px] bg-primary/80" />
          <span className="h-0.5 w-3 rounded-full bg-foreground/30" />
          <span className="ms-auto h-0.5 w-2.5 rounded-full bg-foreground/18" />
          <span className="h-0.5 w-2.5 rounded-full bg-foreground/18" />
          <span className="h-0.5 w-2.5 rounded-full bg-foreground/18" />
          <span className="h-2 w-4 rounded-[3px] bg-primary" />
        </div>
        <div className="flex h-9 flex-col justify-center gap-1 rounded-[5px] border border-border/60 bg-muted/25 px-2">
          <span className="h-1 w-[45%] rounded-full bg-foreground/30" />
          <span className="h-0.5 w-[65%] rounded-full bg-foreground/15" />
        </div>
        <div className="flex gap-1">
          <span className="h-3 flex-1 rounded-[4px] border border-border/60 bg-card" />
          <span className="h-3 flex-1 rounded-[4px] border border-border/60 bg-card" />
          <span className="h-3 flex-1 rounded-[4px] border border-border/60 bg-card" />
        </div>
      </div>
    </MarkFrame>
  )
}
