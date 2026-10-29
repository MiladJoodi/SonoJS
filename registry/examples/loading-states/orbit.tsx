"use client"

import { LoadingState } from "@sonojs/ui/components/loading-states"

export function LoadingStatesOrbit() {
  return (
    <div className="flex justify-center py-8">
      <LoadingState variant="orbit" label="Working" />
    </div>
  )
}
