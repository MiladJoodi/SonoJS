import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Mini month grid. */
export function CalendarSchedulingBlockWireframe() {
  return (
    <MarkFrame>
      <div className="w-[70%] max-w-[7.5rem] rounded-[8px] border border-border/70 bg-card p-1.5">
        <div className="mb-1 flex items-center justify-between px-0.5">
          <span className="h-0.5 w-6 rounded-full bg-foreground/30" />
          <div className="flex gap-0.5">
            <span className="size-1.5 rounded-[2px] bg-foreground/15" />
            <span className="size-1.5 rounded-[2px] bg-foreground/15" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 28 }, (_, i) => (
            <span
              key={i}
              className={
                i === 14
                  ? "aspect-square rounded-[2px] bg-primary"
                  : "aspect-square rounded-[2px] bg-muted/40"
              }
            />
          ))}
        </div>
      </div>
    </MarkFrame>
  )
}
