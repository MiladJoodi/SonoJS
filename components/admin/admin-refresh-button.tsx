"use client"

import { RefreshCwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

export function AdminRefreshButton({
  onClick,
  refreshing,
}: {
  onClick: () => void
  refreshing?: boolean
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="ms-auto cursor-pointer"
      onClick={onClick}
      disabled={refreshing}
      aria-label="Refresh"
      title="Refresh"
    >
      <RefreshCwIcon
        className={cn("size-4", refreshing && "animate-spin")}
        aria-hidden
      />
    </Button>
  )
}
