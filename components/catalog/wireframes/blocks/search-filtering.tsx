import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Search bar + results. */
export function SearchFilteringBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[88%] flex-col gap-1.5">
        <div className="flex h-3.5 items-center gap-1 rounded-[6px] border border-border/70 bg-card px-1.5">
          <span className="size-1.5 rounded-full border border-foreground/30" />
          <span className="h-0.5 flex-1 rounded-full bg-foreground/15" />
        </div>
        {[75, 60].map((w, i) => (
          <div
            key={i}
            className="flex flex-col gap-0.5 rounded-[5px] border border-border/60 bg-card px-1.5 py-1"
          >
            <span
              className="h-0.5 rounded-full bg-foreground/30"
              style={{ width: `${w}%` }}
            />
            <span className="h-0.5 w-[90%] rounded-full bg-foreground/12" />
          </div>
        ))}
      </div>
    </MarkFrame>
  )
}
