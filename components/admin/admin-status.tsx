import { cn } from "@/lib/utils"

type Tone = "success" | "warning" | "danger" | "muted" | "info"

function toneForStatus(status: string | null | undefined): Tone {
  const s = (status ?? "").trim().toLowerCase()
  if (!s) return "muted"

  if (
    s === "active" ||
    s === "succeeded" ||
    s === "processed" ||
    s === "trialing" ||
    s === "yes" ||
    s === "complete" ||
    s === "paid"
  ) {
    return "success"
  }

  if (
    s === "past_due" ||
    s === "pending" ||
    s === "processing" ||
    s === "incomplete" ||
    s === "open" ||
    s === "action_required"
  ) {
    return "warning"
  }

  if (
    s === "failed" ||
    s === "canceled" ||
    s === "cancelled" ||
    s === "unpaid" ||
    s === "incomplete_expired" ||
    s === "no"
  ) {
    return "danger"
  }

  if (s === "manual" || s === "stripe") return "info"

  return "muted"
}

const DOT: Record<Tone, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
  muted: "bg-muted-foreground/50",
  info: "bg-sky-500",
}

const LABEL: Record<Tone, string> = {
  success: "text-emerald-700 dark:text-emerald-400",
  warning: "text-amber-800 dark:text-amber-300",
  danger: "text-destructive",
  muted: "text-muted-foreground",
  info: "text-sky-700 dark:text-sky-300",
}

export function AdminStatus({
  status,
  className,
}: {
  status: string | null | undefined
  className?: string
}) {
  if (!status) {
    return <span className={cn("text-muted-foreground", className)}>—</span>
  }

  const tone = toneForStatus(status)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-start",
        LABEL[tone],
        className
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", DOT[tone])}
        aria-hidden
      />
      <span>{status}</span>
    </span>
  )
}
