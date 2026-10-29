import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Product grid 2-up. */
export function EcommerceBlockWireframe() {
  return (
    <MarkFrame>
      <div className="grid w-[88%] grid-cols-2 gap-1.5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[6px] border border-border/70 bg-card"
          >
            <div className="aspect-square bg-muted/45" />
            <div className="flex flex-col gap-0.5 p-1">
              <span className="h-0.5 w-[75%] rounded-full bg-foreground/30" />
              <div className="flex items-center justify-between gap-1">
                <span className="h-0.5 w-[35%] rounded-full bg-primary/65" />
                <span className="size-2 rounded-[2px] bg-primary/40" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </MarkFrame>
  )
}
