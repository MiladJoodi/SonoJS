import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Login card: fields + primary CTA. */
export function AuthenticationBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex w-[72%] max-w-[9.5rem] flex-col gap-1.5 rounded-[8px] border border-border/70 bg-card p-2">
        <div className="mx-auto mb-0.5 size-2.5 rounded-full bg-foreground/15" />
        <div className="h-2.5 rounded-[4px] border border-border/60 bg-muted/30" />
        <div className="h-2.5 rounded-[4px] border border-border/60 bg-muted/30" />
        <div className="mt-0.5 h-2.5 rounded-[4px] bg-primary" />
        <div className="mx-auto mt-0.5 h-0.5 w-[40%] rounded-full bg-foreground/15" />
      </div>
    </MarkFrame>
  )
}
