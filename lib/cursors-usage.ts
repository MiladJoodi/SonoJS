/** Install path after `sonojs add <id>`. */
export function cursorImportPath(id: string): string {
  return `@/components/cursors/${id}`
}

/** Primary named export for each cursor id. */
export function cursorExportName(id: string): string {
  const map: Record<string, string> = {
    "smooth-cursor-follower": "SmoothCursorFollower",
    "follow-cursor": "FollowCursor",
    "neon-cursor": "NeonCursor",
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

export type CursorUsageSnippet = {
  /** Short “what to do” under the Usage heading. */
  blurb: string
  code: string
}

/**
 * Minimal copy-paste usage — not the full component source.
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

  if (id === "texticon-cursor") {
    return {
      blurb:
        "Install with the Command tab, then wrap your UI. Set the chip with onMouseEnter on hotspots.",
      code: `"use client"

import { ${name} } from "${path}"

export default function Page() {
  return (
    <${name} className="min-h-svh">
      {/* Put buttons / links inside — hover shows the chip */}
    </${name}>
  )
}
`,
    }
  }

  return {
    blurb:
      "1) Run the Command above. 2) Paste this into a client page. The long Manual code is the installed file — you do not rewrite it.",
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
