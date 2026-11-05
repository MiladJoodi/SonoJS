"use client"

import { ConfettiButton } from "@sonojs/ui/components/confetti"

export function ConfettiRandomDirection() {
  return (
    <div className="relative flex w-full justify-center py-8">
      <ConfettiButton
        options={{
          get angle() {
            return Math.random() * 360
          },
        }}
      >
        Random Confetti
      </ConfettiButton>
    </div>
  )
}
