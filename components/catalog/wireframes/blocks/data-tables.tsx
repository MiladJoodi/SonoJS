import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Table with checkbox + status pills. */
export function DataTablesBlockWireframe() {
  return (
    <MarkFrame>
      <div className="w-[90%] overflow-hidden rounded-[6px] border border-border/70 bg-card">
        <div className="flex items-center gap-1 border-b border-border/60 bg-muted/35 px-1.5 py-1">
          <span className="size-1.5 shrink-0 rounded-[2px] border border-foreground/30" />
          <span className="h-1 w-[22%] rounded-full bg-foreground/35" />
          <span className="h-1 w-[30%] rounded-full bg-foreground/28" />
          <span className="ms-auto h-1 w-[18%] rounded-full bg-foreground/28" />
        </div>
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex items-center gap-1 border-b border-border/40 px-1.5 py-1 last:border-b-0"
          >
            <span className="size-1.5 shrink-0 rounded-[2px] border border-foreground/25" />
            <span className="h-1 w-[22%] rounded-full bg-foreground/22" />
            <span className="h-1 w-[30%] rounded-full bg-foreground/16" />
            <span
              className={
                row === 0
                  ? "ms-auto h-1.5 w-[18%] rounded-full bg-emerald-500/45"
                  : "ms-auto h-1.5 w-[18%] rounded-full bg-muted/70"
              }
            />
          </div>
        ))}
      </div>
    </MarkFrame>
  )
}
