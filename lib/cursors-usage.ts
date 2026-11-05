/** Install path after `sonojs add <id>`. */
export function cursorImportPath(id: string): string {
  return `@/components/cursors/${id}`
}

/** Primary named export for each cursor id. */
export function cursorExportName(id: string): string {
  const map: Record<string, string> = {
    "smooth-cursor-follower": "SmoothCursorFollower",
    "smooth-cursor": "SmoothCursor",
    "follow-cursor": "FollowCursor",
    "neon-cursor": "NeonCursor",
    "pointer-cursor": "Pointer",
    "rainbow-cursor": "RainbowCursor",
    "bubble-cursor": "BubbleCursor",
    "ripple-cursor": "RippleCursor",
    "magnetic-cursor": "Magnetic",
    "spotlight-cursor": "SpotlightCursor",
    "clickeffect-cursor": "ClickEffectCursor",
    "texticon-cursor": "TextIconCursor",
    "arrow-cursor": "ArrowCursor",
    "scaling-cursor": "ScalingCursor",
    "3d-cursor": "ThreeDCursor",
    "trail-cursor": "TrailCursor",
    "springy-cursor": "SpringyCursor",
    "character-cursor": "CharacterCursor",
    "snowflake-cursor": "SnowflakeCursor",
    "fairydust-cursor": "FairyDustCursor",
    "textflag-cursor": "TextFlagCursor",
    "glitch-cursor": "GlitchCursor",
    "gradient-cursor": "GradientCursor",
    "multi-cursor": "MultiCursor",
    "agent-cursor": "AgentCursor",
    "invert-cursor": "InvertCursor",
    "morph-cursor": "MorphCursor",
    "ink-cursor": "InkCursor",
    "glass-cursor": "GlassCursor",
  }
  return map[id] ?? "Cursor"
}

export type CursorUsageExample = {
  title: string
  description: string
  code: string
}

export type CursorUsageSnippet = {
  /** Short “what to do” under the Usage heading. */
  blurb: string
  code: string
  /** Extra copy-paste patterns (e.g. Pointer variants). */
  examples?: CursorUsageExample[]
}

/**
 * Minimal copy-paste usage - not the full component source.
 */
export function getCursorUsage(id: string): CursorUsageSnippet {
  const name = cursorExportName(id)
  const path = cursorImportPath(id)

  if (id === "magnetic-cursor") {
    return {
      blurb:
        "Install with the Command tab, then wrap a clickable child. The pointer pulls it when nearby.",
      code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <${name}>
        <button type="button" className="rounded-md border px-4 py-2">
          Hover near me
        </button>
      </${name}>
    </div>
  )
}
`,
    }
  }

  if (id === "pointer-cursor") {
    return {
      blurb:
        "Nest <Pointer /> inside the element you want to hover. There is no variant prop — the default arrow shows when you pass nothing; use className to recolor it, or children to replace the glyph entirely (SVG, emoji, or a motion node).",
      code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="relative flex min-h-40 items-center justify-center rounded-lg border">
      <p className="text-sm text-muted-foreground">Hover this card</p>
      {/* Default arrow glyph */}
      <${name} />
    </div>
  )
}
`,
      examples: [
        {
          title: "Colored",
          description:
            "Keep the default arrow and tint it with className (fill / text utilities).",
          code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="relative flex min-h-40 items-center justify-center rounded-lg border">
      <p className="text-sm text-muted-foreground">Hover me</p>
      <${name} className="fill-blue-500" />
    </div>
  )
}
`,
        },
        {
          title: "Custom shape",
          description: "Pass any React node as children to replace the arrow.",
          code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="relative flex min-h-40 items-center justify-center rounded-lg border">
      <p className="text-sm text-muted-foreground">Hover me</p>
      <${name}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" className="fill-purple-500" />
          <circle cx="12" cy="12" r="5" className="fill-white" />
        </svg>
      </${name}>
    </div>
  )
}
`,
        },
        {
          title: "Emoji",
          description: "Children can be text or an emoji — not only SVG.",
          code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="relative flex min-h-40 items-center justify-center rounded-lg border">
      <p className="text-sm text-muted-foreground">Hover me</p>
      <${name}>
        <span className="text-2xl">👆</span>
      </${name}>
    </div>
  )
}
`,
        },
        {
          title: "Animated",
          description:
            "Wrap your glyph in motion (or any animator). Pointer only positions it.",
          code: `"use client"

import { motion } from "motion/react"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="relative flex min-h-40 items-center justify-center rounded-lg border">
      <p className="text-sm text-muted-foreground">Hover me</p>
      <${name}>
        <motion.div
          animate={{ scale: [0.8, 1, 0.8], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-2xl text-pink-600">♥</span>
        </motion.div>
      </${name}>
    </div>
  )
}
`,
        },
      ],
    }
  }

  if (id === "smooth-cursor") {
    return {
      blurb:
        "Install with the Command tab, mount SmoothCursor once, and hide the system cursor with Tailwind cursor-none on a layout wrapper (do not edit globals.css).",
      code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <div className="min-h-svh cursor-none">
      <${name} />
      {/* Your page content */}
    </div>
  )
}
`,
    }
  }

  if (id === "texticon-cursor") {
    return {
      blurb:
        "Install with the Command tab, then wrap your UI. Set the chip with onMouseEnter on hotspots.",
      code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <${name} className="min-h-svh">
      {/* Put buttons / links inside - hover shows the chip */}
    </${name}>
  )
}
`,
    }
  }

  return {
    blurb:
      "1) Run the Command above. 2) Paste this into a client page. The long Manual code is the installed file - you do not rewrite it.",
    code: `"use client"

import { useRef } from "react"

import { ${name} } from "${path}"

export default function Page() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className="relative min-h-svh cursor-none">
      <${name} containerRef={stageRef} />
      {/* Your page content */}
    </div>
  )
}
`,
  }
}
