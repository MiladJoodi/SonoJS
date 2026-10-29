import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** KPI cards + bars. */
export function DashboardsAnalyticsBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[90%] flex-col gap-1.5">
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-[5px] border border-border/70 bg-card p-1"
            >
              <span className="h-0.5 w-[50%] rounded-full bg-foreground/20" />
              <span className="h-1.5 w-[70%] rounded-full bg-foreground/40" />
            </div>
          ))}
        </div>
        <div className="flex h-6 items-end gap-0.5 rounded-[5px] border border-border/60 bg-card px-1.5 py-1">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-[1px] bg-primary/55"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </MarkFrame>
  )
}
