"use client"

import { LoadingState } from "@sonojs/ui/components/loading-states"

export function LoadingStatesDots() {
  return (
    <div className="flex justify-center py-8">
      <LoadingState variant="dots" label="Working" />
    </div>
  )
}
