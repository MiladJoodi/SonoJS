import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Profile card + settings rows. */
export function UserAccountBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[85%] flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-[8px] border border-border/70 bg-card p-1.5">
          <span className="size-6 shrink-0 rounded-full bg-primary/40" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="h-0.5 w-[50%] rounded-full bg-foreground/35" />
            <span className="h-0.5 w-[65%] rounded-full bg-foreground/15" />
          </div>
          <span className="h-2 w-6 shrink-0 rounded-full bg-primary/25" />
        </div>
        <div className="space-y-0.5 rounded-[6px] border border-border/60 bg-card p-1">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-[3px] px-1 py-0.5"
            >
              <span className="size-1.5 rounded-[2px] bg-foreground/20" />
              <span className="h-0.5 flex-1 rounded-full bg-foreground/18" />
              <span className="h-0.5 w-2 rounded-full bg-foreground/12" />
            </div>
          ))}
        </div>
      </div>
    </MarkFrame>
  )
}
