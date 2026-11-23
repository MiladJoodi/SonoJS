"use client"

import { CURSOR_STAGE_DARK } from "../_stage"
import SplashCursor from "./splash-cursor"

export default function SplashCursorDemo() {
  return (
    <div className={`${CURSOR_STAGE_DARK} cursor-none`}>
      <SplashCursor
        rainbow={false}
        size={1}
        force={1}
        swirl={3}
        trail={1}
        clickSplash
        colorSpeed={1}
        intensity={1}
        momentum={1}
        shading={1}
        glow={0}
        quality="high"
        intro
        contained
      />
    </div>
  )
}
