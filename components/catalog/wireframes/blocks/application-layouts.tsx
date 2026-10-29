import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** App shell: sidebar + header + content tiles. */
export function ApplicationLayoutsBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex h-[82%] w-[92%] overflow-hidden rounded-[6px] border border-border/70 bg-card">
        <div className="flex w-[26%] flex-col gap-1 border-e border-border/60 bg-muted/30 p-1">
          <span className="mb-0.5 size-2 rounded-[3px] bg-primary/70" />
          {[72, 58, 64, 50, 55].map((w, i) => (
            <span
              key={i}
              className={
                i === 1
                  ? "h-1.5 rounded-[2px] bg-primary/25"
                  : "h-1 rounded-[2px] bg-foreground/15"
              }
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-3 items-center gap-1 border-b border-border/50 px-1.5">
            <span className="h-0.5 w-[30%] rounded-full bg-foreground/25" />
            <span className="ms-auto size-1.5 rounded-full bg-foreground/20" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-1 p-1.5">
            <div className="rounded-[4px] border border-border/60 bg-muted/20" />
            <div className="rounded-[4px] border border-border/60 bg-muted/20" />
            <div className="col-span-2 rounded-[4px] border border-border/60 bg-muted/15" />
          </div>
        </div>
      </div>
    </MarkFrame>
  )
}
