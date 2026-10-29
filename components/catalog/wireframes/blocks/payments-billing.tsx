import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** Payment card. */
export function PaymentsBillingBlockWireframe() {
  return (
    <MarkFrame>
      <div className="flex aspect-[1.6/1] w-[75%] max-w-[9rem] flex-col justify-between rounded-[8px] border border-border/70 bg-gradient-to-br from-primary/80 to-primary p-2">
        <div className="flex justify-between">
          <span className="size-2.5 rounded-[3px] bg-white/35" />
          <span className="h-1 w-5 rounded-full bg-white/40" />
        </div>
        <div className="space-y-1">
          <span className="block h-0.5 w-[70%] rounded-full bg-white/50" />
          <span className="block h-0.5 w-[40%] rounded-full bg-white/35" />
        </div>
      </div>
    </MarkFrame>
  )
}
