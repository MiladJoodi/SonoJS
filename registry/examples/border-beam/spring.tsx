"use client"

import { Button } from "@sonojs/ui/components/button"
import { BorderBeam } from "@sonojs/ui/components/border-beam"

export function BorderBeamSpring() {
  return (
    <div className="flex w-full justify-center py-8">
      <Button className="relative overflow-hidden" size="lg" variant="outline">
        Buy Now
        <BorderBeam
          size={40}
          initialOffset={20}
          className="from-transparent via-yellow-500 to-transparent"
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
          }}
        />
      </Button>
    </div>
  )
}
