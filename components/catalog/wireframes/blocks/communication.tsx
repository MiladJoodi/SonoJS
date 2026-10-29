import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Comments thread. */
export function CommunicationBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[85%] flex-col gap-1.5">
        <div className="flex gap-1.5">
          <span className="mt-0.5 size-2.5 shrink-0 rounded-full bg-foreground/20" />
          <div className="flex-1 space-y-0.5 rounded-[6px] border border-border/60 bg-card px-1.5 py-1">
            <span className="block h-0.5 w-[40%] rounded-full bg-foreground/30" />
            <span className="block h-0.5 w-[85%] rounded-full bg-foreground/15" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="mt-0.5 size-2.5 shrink-0 rounded-full bg-primary/40" />
          <div className="flex-1 space-y-0.5 rounded-[6px] border border-border/60 bg-muted/25 px-1.5 py-1">
            <span className="block h-0.5 w-[35%] rounded-full bg-foreground/30" />
            <span className="block h-0.5 w-[70%] rounded-full bg-foreground/15" />
          </div>
        </div>
      </div>
    </MarkFrame>
  )
}
