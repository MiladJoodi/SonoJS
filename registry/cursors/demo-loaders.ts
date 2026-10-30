export function getCursorDemoLoader(
  id: string
): (() => Promise<Record<string, unknown>>) | null {
  const loaders: Record<string, () => Promise<Record<string, unknown>>> = {
    "smooth-cursor-follower": () => import("./smooth-cursor-follower/demo"),
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
  return loaders[id] ?? null
}
