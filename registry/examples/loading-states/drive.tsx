"use client"

import { LoadingState } from "@sonojs/ui/components/loading-states"

export function LoadingStatesDrive() {
  return (
    <div className="flex justify-center py-8">
      <LoadingState variant="drive" label="Working" />
    </div>
  )
}
