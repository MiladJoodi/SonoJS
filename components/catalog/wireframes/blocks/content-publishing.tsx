import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Blog grid — featured + compact. */
export function ContentPublishingBlockWireframe() {
  return (
    <MarkFrame>
      <div className="grid w-[90%] grid-cols-2 gap-1.5">
        <div className="overflow-hidden rounded-[6px] border border-border/70 bg-card">
          <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-muted/40" />
          <div className="space-y-0.5 p-1">
            <span className="inline-block h-1 w-5 rounded-full bg-primary/40" />
            <span className="block h-0.5 w-[90%] rounded-full bg-foreground/30" />
            <span className="block h-0.5 w-[60%] rounded-full bg-foreground/15" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex flex-1 overflow-hidden rounded-[5px] border border-border/70 bg-card"
            >
              <div className="w-[36%] bg-muted/45" />
              <div className="flex flex-1 flex-col justify-center gap-0.5 p-1">
                <span className="h-0.5 w-[85%] rounded-full bg-foreground/28" />
                <span className="h-0.5 w-[55%] rounded-full bg-foreground/14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarkFrame>
  )
}
