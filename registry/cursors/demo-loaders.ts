type CursorModule = Record<string, unknown>
type DemoLoader = () => Promise<CursorModule>

/** Stable map — do not recreate inside a function (breaks effect deps). */
const LOADERS: Record<string, DemoLoader> = {
  "smooth-cursor-follower": () => import("./smooth-cursor-follower/demo"),
  "smooth-cursor": () => import("./smooth-cursor/demo"),
  "pointer-cursor": () => import("./pointer-cursor/demo"),
  "follow-cursor": () => import("./follow-cursor/demo"),
  "ripple-cursor": () => import("./ripple-cursor/demo"),
  "magnetic-cursor": () => import("./magnetic-cursor/demo"),
  "neon-cursor": () => import("./neon-cursor/demo"),
  "rainbow-cursor": () => import("./rainbow-cursor/demo"),
  "bubble-cursor": () => import("./bubble-cursor/demo"),
  "spotlight-cursor": () => import("./spotlight-cursor/demo"),
  "clickeffect-cursor": () => import("./clickeffect-cursor/demo"),
  "texticon-cursor": () => import("./texticon-cursor/demo"),
  "arrow-cursor": () => import("./arrow-cursor/demo"),
  "scaling-cursor": () => import("./scaling-cursor/demo"),
  "3d-cursor": () => import("./3d-cursor/demo"),
  "trail-cursor": () => import("./trail-cursor/demo"),
  "springy-cursor": () => import("./springy-cursor/demo"),
  "character-cursor": () => import("./character-cursor/demo"),
  "snowflake-cursor": () => import("./snowflake-cursor/demo"),
  "fairydust-cursor": () => import("./fairydust-cursor/demo"),
  "textflag-cursor": () => import("./textflag-cursor/demo"),
  "glitch-cursor": () => import("./glitch-cursor/demo"),
  "gradient-cursor": () => import("./gradient-cursor/demo"),
  "multi-cursor": () => import("./multi-cursor/demo"),
  "agent-cursor": () => import("./agent-cursor/demo"),
  "invert-cursor": () => import("./invert-cursor/demo"),
  "morph-cursor": () => import("./morph-cursor/demo"),
  "ink-cursor": () => import("./ink-cursor/demo"),
  "glass-cursor": () => import("./glass-cursor/demo"),
}

/** In-flight / resolved dynamic imports — revisiting a card is instant. */
const moduleCache = new Map<string, Promise<CursorModule>>()

export function getCursorDemoLoader(id: string): DemoLoader | null {
  return LOADERS[id] ?? null
}

/** Load (or reuse) the demo module for `id`. */
export function loadCursorDemoModule(id: string): Promise<CursorModule> | null {
  const load = LOADERS[id]
  if (!load) return null

  let pending = moduleCache.get(id)
  if (!pending) {
    pending = load().catch((error) => {
      moduleCache.delete(id)
      throw error
    })
    moduleCache.set(id, pending)
  }
  return pending
}

/** Warm the module cache on hover before the preview mounts. */
export function prefetchCursorDemo(id: string) {
  void loadCursorDemoModule(id)
}
