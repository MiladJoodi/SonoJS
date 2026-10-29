import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Dropzone + file chips. */
export function FilesMediaBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[88%] flex-col gap-1.5">
        <div className="flex h-9 flex-col items-center justify-center gap-1 rounded-[8px] border border-dashed border-border/80 bg-card">
          <span className="size-3.5 rounded-[3px] border border-border/70 bg-muted/50" />
          <span className="h-0.5 w-10 rounded-full bg-foreground/25" />
        </div>
        <div className="flex gap-1">
          {[38, 32, 28].map((w, i) => (
            <div
              key={i}
              className="flex h-3 flex-1 items-center gap-1 rounded-[4px] border border-border/60 bg-card px-1"
            >
              <span className="size-1.5 shrink-0 rounded-[2px] bg-primary/40" />
              <span
                className="h-0.5 rounded-full bg-foreground/20"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </MarkFrame>
  )
}
