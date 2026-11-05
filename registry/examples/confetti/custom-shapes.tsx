"use client"

import confetti from "canvas-confetti"

import { Button } from "@sonojs/ui/components/button"

export function ConfettiCustomShapes() {
  const handleClick = () => {
    const scalar = 2
    const triangle = confetti.shapeFromPath({
      path: "M0 10 L5 0 L10 10z",
    })
    const square = confetti.shapeFromPath({
      path: "M0 0 L10 0 L10 10 L0 10 Z",
    })
    const coin = confetti.shapeFromPath({
      path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
    })
    const tree = confetti.shapeFromPath({
      path: "M5 0 L10 10 L0 10 Z",
    })

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [triangle, square, coin, tree],
      scalar,
    }

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      })

      confetti({
        ...defaults,
        particleCount: 5,
      })

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }

  return (
    <div className="relative flex w-full items-center justify-center py-8">
      <Button onClick={handleClick}>Trigger Shapes</Button>
    </div>
  )
}
