import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Wizard steps. */
export function OnboardingBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[85%] flex-col items-center gap-2">
        <div className="flex w-full items-center gap-1 px-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-1">
              <span
                className={
                  i === 0
                    ? "size-2.5 shrink-0 rounded-full bg-primary"
                    : "size-2.5 shrink-0 rounded-full border border-border/70 bg-card"
                }
              />
              {i < 2 ? (
                <span className="h-0.5 flex-1 rounded-full bg-border/80" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="w-full rounded-[6px] border border-border/70 bg-card p-2">
          <span className="mb-1.5 block h-1 w-[45%] rounded-full bg-foreground/30" />
          <div className="h-2.5 rounded-[4px] border border-border/60 bg-muted/25" />
          <div className="mt-1 h-2.5 w-[40%] rounded-[4px] bg-primary" />
        </div>
      </div>
    </MarkFrame>
  )
}
