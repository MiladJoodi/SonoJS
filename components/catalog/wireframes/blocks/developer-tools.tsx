import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** API key strip with visible key glyph. */
export function DeveloperToolsBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[88%] flex-col gap-1.5 rounded-[8px] border border-border/70 bg-card p-2">
        <span className="h-0.5 w-10 rounded-full bg-foreground/25" />
        <div className="flex h-4 items-center gap-1 rounded-[4px] border border-border/60 bg-neutral-950 px-1.5 dark:bg-neutral-900">
          <span className="font-mono text-[7px] leading-none tracking-tight text-emerald-400/90">
            sk_live_••••
          </span>
          <span className="ms-auto size-2 shrink-0 rounded-[2px] bg-white/20" />
        </div>
        <div className="flex gap-1">
          <span className="h-2.5 w-9 rounded-[3px] bg-primary" />
          <span className="h-2.5 w-7 rounded-[3px] border border-border/70" />
        </div>
      </div>
    </MarkFrame>
  )
}
