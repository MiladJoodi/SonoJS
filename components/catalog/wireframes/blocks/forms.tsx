import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Contact form fields. */
export function FormsBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[78%] max-w-[10rem] flex-col gap-1 rounded-[8px] border border-border/70 bg-card p-2">
        <span className="h-0.5 w-6 rounded-full bg-foreground/25" />
        <div className="h-2.5 rounded-[4px] border border-border/60 bg-muted/25" />
        <span className="mt-0.5 h-0.5 w-5 rounded-full bg-foreground/25" />
        <div className="h-2.5 rounded-[4px] border border-border/60 bg-muted/25" />
        <span className="mt-0.5 h-0.5 w-7 rounded-full bg-foreground/25" />
        <div className="h-5 rounded-[4px] border border-border/60 bg-muted/20" />
        <div className="mt-0.5 h-2.5 w-[45%] self-end rounded-[4px] bg-primary" />
      </div>
    </MarkFrame>
  )
}
