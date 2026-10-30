import { CheckIcon, PackageIcon, TruckIcon } from "lucide-react"

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@sonojs/ui/components/timeline"
import { cn } from "@sonojs/ui/lib/utils"

const shipment = [
  {
    id: 1,
    date: "Tue · 09:14",
    title: "Order confirmed",
    description: "Payment captured. Warehouse slot reserved for same-day pick.",
    done: true,
  },
  {
    id: 2,
    date: "Tue · 14:02",
    title: "Packed & labeled",
    description: "Parcel weighed, sealed, and handed to the carrier hub.",
    done: true,
  },
  {
    id: 3,
    date: "Wed · 08:40",
    title: "Out for delivery",
    description: "On the local route. Estimated window 10:00–13:00.",
    done: true,
  },
  {
    id: 4,
    date: "Wed · —",
    title: "Delivered",
    description: "Awaiting signature at the delivery address.",
    done: false,
  },
]

export function TimelineWithIcons() {
  return (
    <div className="w-full max-w-md space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Tracking · SJ-88421
          </p>
          <h3 className="text-base font-semibold tracking-tight">
            Overnight parcel
          </h3>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/70 text-muted-foreground">
          <PackageIcon className="size-4" />
        </div>
      </div>

      <Timeline defaultValue={3} className="ps-10">
        {shipment.map((item) => (
          <TimelineItem key={item.id} step={item.id}>
            <TimelineHeader>
              <TimelineSeparator className="top-6 bottom-0" />
              <TimelineDate className="font-mono text-[11px] tracking-wide">
                {item.date}
              </TimelineDate>
              <TimelineTitle className="text-sm font-semibold text-foreground">
                {item.title}
              </TimelineTitle>
              <TimelineIndicator
                className={cn(
                  "flex size-6 items-center justify-center border-none",
                  item.done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {item.done ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  <TruckIcon className="size-3.5" />
                )}
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="text-sm leading-relaxed">
              {item.description}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
