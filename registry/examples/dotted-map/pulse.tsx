"use client"

import { DottedMap, type Marker } from "@sonojs/ui/components/dotted-map"

const markers: Marker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 0.3,
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 0.3,
    pulse: false,
  },
]

export function DottedMapPulse() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-[12px] border border-border/70">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-200%" />
      <DottedMap markers={markers} pulse />
    </div>
  )
}
