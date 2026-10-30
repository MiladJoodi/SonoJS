import type { LucideIcon } from "lucide-react"
import {
  MousePointer2Icon,
  SparklesIcon,
  WavesIcon,
} from "lucide-react"

export type CursorCategory = "pointer" | "trail" | "interaction"
export type CursorPortStatus = "pending" | "ported"

export type CursorsCatalogEntry = {
  id: string
  category: CursorCategory
  title: string
  description: string
  status: CursorPortStatus
  featured?: boolean
}

export const CURSOR_CATEGORIES = [
  "pointer",
  "trail",
  "interaction",
] as const satisfies readonly CursorCategory[]

export const CURSOR_CATEGORY_META: Record<
  CursorCategory,
  { title: string; description: string; icon: LucideIcon }
> = {
  pointer: {
    title: "Pointer",
    description: "Lagging dots, rings, and neon followers.",
    icon: MousePointer2Icon,
  },
  trail: {
    title: "Trail",
    description: "Particle and color trails that follow the pointer.",
    icon: WavesIcon,
  },
  interaction: {
    title: "Interaction",
    description: "Click ripples, magnets, spotlights, and context chips.",
    icon: SparklesIcon,
  },
}

/** Sparse featured set for green sidebar bullets. */
export const CURSOR_FEATURED_IDS = new Set([
  "smooth-cursor-follower",
  "magnetic-cursor",
  "neon-cursor",
  "spotlight-cursor",
])

export const cursorsCatalog: CursorsCatalogEntry[] = [
  // Ported — pointer
  {
    id: "smooth-cursor-follower",
    category: "pointer",
    title: "Smooth Follower",
    description: "Dual smooth dots that lag behind the pointer.",
    status: "ported",
  },
  {
    id: "follow-cursor",
    category: "pointer",
    title: "Follow Cursor",
    description: "Soft canvas dot that eases toward the pointer.",
    status: "ported",
  },
  {
    id: "neon-cursor",
    category: "pointer",
    title: "Neon Cursor",
    description: "Neon ring and trail with motion springs.",
    status: "ported",
  },
  // Ported — trail
  {
    id: "rainbow-cursor",
    category: "trail",
    title: "Rainbow Cursor",
    description: "Color-cycling canvas trail behind the pointer.",
    status: "ported",
  },
  {
    id: "bubble-cursor",
    category: "trail",
    title: "Bubble Cursor",
    description: "Rising bubble particles along the pointer path.",
    status: "ported",
  },
  // Ported — interaction
  {
    id: "ripple-cursor",
    category: "interaction",
    title: "Ripple Cursor",
    description: "Expanding ripples emitted as the pointer moves.",
    status: "ported",
  },
  {
    id: "magnetic-cursor",
    category: "interaction",
    title: "Magnetic Cursor",
    description: "Pull interactive children toward the pointer.",
    status: "ported",
  },
  {
    id: "spotlight-cursor",
    category: "interaction",
    title: "Spotlight Cursor",
    description: "Dark vignette with a soft light that follows the pointer.",
    status: "ported",
  },
  {
    id: "clickeffect-cursor",
    category: "interaction",
    title: "Click Effect",
    description: "Ripple bursts and particles on click.",
    status: "ported",
  },
  {
    id: "texticon-cursor",
    category: "interaction",
    title: "Text Icon Cursor",
    description: "Contextual text or icon chip near the pointer.",
    status: "ported",
  },
  // Ported — pointer (batch 2)
  {
    id: "arrow-cursor",
    category: "pointer",
    title: "Arrow Cursor",
    description: "Velocity-aware chevron that rotates with motion.",
    status: "ported",
  },
  {
    id: "scaling-cursor",
    category: "pointer",
    title: "Scaling Cursor",
    description: "Elastic core and ring that scale on hover targets.",
    status: "ported",
  },
  {
    id: "3d-cursor",
    category: "pointer",
    title: "3D Cursor",
    description: "Concentric rings with CSS perspective parallax.",
    status: "ported",
  },
  // Ported — trail (batch 2)
  {
    id: "trail-cursor",
    category: "trail",
    title: "Trail Cursor",
    description: "Soft ghost stamps that fade behind the pointer.",
    status: "ported",
  },
  {
    id: "springy-cursor",
    category: "trail",
    title: "Springy Cursor",
    description: "Physics spring chain of primary beads.",
    status: "ported",
  },
  {
    id: "character-cursor",
    category: "trail",
    title: "Character Cursor",
    description: "Flying letter particles that drift and fade.",
    status: "ported",
  },
  {
    id: "snowflake-cursor",
    category: "trail",
    title: "Snowflake Cursor",
    description: "Crystal flakes with spin and gentle fall.",
    status: "ported",
  },
  {
    id: "fairydust-cursor",
    category: "trail",
    title: "Fairy Dust",
    description: "Primary and gold sparkles with gravity and twinkle.",
    status: "ported",
  },
  {
    id: "textflag-cursor",
    category: "trail",
    title: "Text Flag",
    description: "Letters that wave behind the pointer like a flag.",
    status: "ported",
  },
  // Ported — interaction (batch 2)
  {
    id: "glitch-cursor",
    category: "interaction",
    title: "Glitch Cursor",
    description: "RGB-split layers with brief scramble on move.",
    status: "ported",
  },
  {
    id: "gradient-cursor",
    category: "interaction",
    title: "Gradient Cursor",
    description: "Soft dual gradient blobs with spring lag.",
    status: "ported",
  },
  {
    id: "multi-cursor",
    category: "interaction",
    title: "Multi Cursor",
    description: "Offset clones with staggered lag and opacity.",
    status: "ported",
  },
  // Ported — 2026 trends
  {
    id: "agent-cursor",
    category: "interaction",
    title: "Agent Cursor",
    description: "AI copilot orb with Ask / Rewrite / Explain chips.",
    status: "ported",
  },
  {
    id: "invert-cursor",
    category: "pointer",
    title: "Invert Cursor",
    description: "Editorial lens using mix-blend-mode difference.",
    status: "ported",
  },
  {
    id: "morph-cursor",
    category: "pointer",
    title: "Morph Cursor",
    description: "Semantic morph between dot, ring, caret, and play.",
    status: "ported",
  },
  {
    id: "ink-cursor",
    category: "trail",
    title: "Ink Cursor",
    description: "Soft liquid-ink smear driven by pointer velocity.",
    status: "ported",
  },
  {
    id: "glass-cursor",
    category: "interaction",
    title: "Glass Cursor",
    description: "Frosted liquid-glass disc with a specular highlight.",
    status: "ported",
  },
]

export function isCursorCategory(value: string): value is CursorCategory {
  return (CURSOR_CATEGORIES as readonly string[]).includes(value)
}

export function isCursorFeatured(id: string): boolean {
  return CURSOR_FEATURED_IDS.has(id)
}

export function getCursorCategoryIcon(category: CursorCategory): LucideIcon {
  return CURSOR_CATEGORY_META[category].icon
}

export function getCursorEntry(id: string): CursorsCatalogEntry | undefined {
  return cursorsCatalog.find((e) => e.id === id)
}

export function getCursorsByCategory(
  category: CursorCategory
): CursorsCatalogEntry[] {
  return cursorsCatalog.filter((e) => e.category === category)
}

export function cursorViewHref(id: string): string {
  return `/cursors/view/${id}`
}

export function cursorCategoryHref(category: CursorCategory): string {
  return `/cursors/${category}`
}

export function getCursorAdjacent(id: string): {
  previous: CursorsCatalogEntry | null
  next: CursorsCatalogEntry | null
} {
  const ported = cursorsCatalog.filter((e) => e.status === "ported")
  const index = ported.findIndex((e) => e.id === id)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: ported[index - 1] ?? null,
    next: ported[index + 1] ?? null,
  }
}
