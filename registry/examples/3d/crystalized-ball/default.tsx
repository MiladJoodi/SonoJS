"use client"

import CrystalizedBall from "@sonojs/ui/components/3d/crystalized-ball"

export function CrystalizedBallDefault() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-[12px] bg-black">
      <CrystalizedBall
        preset="plasma"
        color="#F25BD0"
        size={0.7}
        crackle={0.85}
        fill={0.5}
        interactive
        hoverStrength={0.7}
        strands={6}
        flares={0.65}
        glow={0.9}
        sparks={0.6}
        particleCount={15000}
        motion="rise"
        particleShape="square"
        depth={0.6}
        sway={0.5}
        twinkle={0.5}
        haze={0.7}
        dustSpeed={1}
        speed={1}
        intro
        paused={false}
      />
    </div>
  )
}
