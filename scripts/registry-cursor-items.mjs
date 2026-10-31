/** Cursor effects for `registry:cursor` (light only — no WebGL / patterns). */

/** @typedef {{ path: string, type: string, target?: string }} RegistryFileDef */
/** @typedef {{
 *   name: string,
 *   type: string,
 *   title: string,
 *   description?: string,
 *   access?: "public" | "member" | "pro",
 *   dependencies?: string[],
 *   registryDependencies?: string[],
 *   files: RegistryFileDef[]
 * }} RegistryItemDef
 */

/** Cursor installs/code on the site require a Free (signed-in) account or higher. */
const CURSOR_SITE_ACCESS = "member"

/** @type {RegistryItemDef[]} */
export const cursorRegistryItems = [
  {
    name: "use-mouse",
    type: "registry:hook",
    title: "useMouse",
    description: "Track page and element-relative pointer position.",
    files: [
      {
        path: "registry/hooks/use-mouse.ts",
        type: "registry:hook",
        target: "hooks/use-mouse.ts",
      },
    ],
  },
  {
    name: "use-spotlight",
    type: "registry:hook",
    title: "useSpotlight",
    description: "Canvas 2D spotlight vignette that follows the pointer.",
    files: [
      {
        path: "registry/hooks/use-spotlight.ts",
        type: "registry:hook",
        target: "hooks/use-spotlight.ts",
      },
    ],
  },
  {
    name: "smooth-cursor-follower",
    type: "registry:cursor",
    title: "Smooth Follower",
    description: "Dual smooth dots that lag behind the pointer.",
    files: [
      {
        path: "registry/cursors/smooth-cursor-follower/smooth-cursor-follower.tsx",
        type: "registry:component",
        target: "components/cursors/smooth-cursor-follower.tsx",
      },
    ],
  },
  {
    name: "follow-cursor",
    type: "registry:cursor",
    title: "Follow Cursor",
    description: "Soft canvas dot that eases toward the pointer.",
    files: [
      {
        path: "registry/cursors/follow-cursor/follow-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/follow-cursor.tsx",
      },
    ],
  },
  {
    name: "ripple-cursor",
    type: "registry:cursor",
    title: "Ripple Cursor",
    description: "Expanding ripples emitted as the pointer moves.",
    files: [
      {
        path: "registry/cursors/ripple-cursor/ripple-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/ripple-cursor.tsx",
      },
    ],
  },
  {
    name: "magnetic-cursor",
    type: "registry:cursor",
    title: "Magnetic Cursor",
    description: "Pull interactive children toward the pointer.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/cursors/magnetic-cursor/magnetic-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/magnetic-cursor.tsx",
      },
    ],
  },
  {
    name: "neon-cursor",
    type: "registry:cursor",
    title: "Neon Cursor",
    description: "Neon ring and trail with motion springs.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/cursors/neon-cursor/neon-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/neon-cursor.tsx",
      },
    ],
  },
  {
    name: "rainbow-cursor",
    type: "registry:cursor",
    title: "Rainbow Cursor",
    description: "Color-cycling canvas trail behind the pointer.",
    files: [
      {
        path: "registry/cursors/rainbow-cursor/rainbow-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/rainbow-cursor.tsx",
      },
    ],
  },
  {
    name: "bubble-cursor",
    type: "registry:cursor",
    title: "Bubble Cursor",
    description: "Rising bubble particles along the pointer path.",
    files: [
      {
        path: "registry/cursors/bubble-cursor/bubble-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/bubble-cursor.tsx",
      },
    ],
  },
  {
    name: "spotlight-cursor",
    type: "registry:cursor",
    title: "Spotlight Cursor",
    description: "Dark vignette with a soft light that follows the pointer.",
    registryDependencies: ["use-spotlight"],
    files: [
      {
        path: "registry/cursors/spotlight-cursor/spotlight-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/spotlight-cursor.tsx",
      },
    ],
  },
  {
    name: "clickeffect-cursor",
    type: "registry:cursor",
    title: "Click Effect",
    description: "Ripple bursts and particles on click.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/cursors/clickeffect-cursor/clickeffect-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/clickeffect-cursor.tsx",
      },
    ],
  },
  {
    name: "texticon-cursor",
    type: "registry:cursor",
    title: "Text Icon Cursor",
    description: "Contextual text or icon chip near the pointer.",
    dependencies: ["lucide-react"],
    registryDependencies: ["use-mouse"],
    files: [
      {
        path: "registry/cursors/texticon-cursor/texticon-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/texticon-cursor.tsx",
      },
    ],
  },
  {
    name: "arrow-cursor",
    type: "registry:cursor",
    title: "Arrow Cursor",
    description: "Velocity-aware chevron that rotates with motion.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/cursors/arrow-cursor/arrow-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/arrow-cursor.tsx",
      },
    ],
  },
  {
    name: "scaling-cursor",
    type: "registry:cursor",
    title: "Scaling Cursor",
    description: "Elastic core and ring that scale on hover targets.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/cursors/scaling-cursor/scaling-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/scaling-cursor.tsx",
      },
    ],
  },
  {
    name: "3d-cursor",
    type: "registry:cursor",
    title: "3D Cursor",
    description: "Concentric rings with CSS perspective parallax.",
    files: [
      {
        path: "registry/cursors/3d-cursor/3d-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/3d-cursor.tsx",
      },
    ],
  },
  {
    name: "trail-cursor",
    type: "registry:cursor",
    title: "Trail Cursor",
    description: "Soft ghost stamps that fade behind the pointer.",
    files: [
      {
        path: "registry/cursors/trail-cursor/trail-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/trail-cursor.tsx",
      },
    ],
  },
  {
    name: "springy-cursor",
    type: "registry:cursor",
    title: "Springy Cursor",
    description: "Physics spring chain of primary beads.",
    files: [
      {
        path: "registry/cursors/springy-cursor/springy-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/springy-cursor.tsx",
      },
    ],
  },
  {
    name: "character-cursor",
    type: "registry:cursor",
    title: "Character Cursor",
    description: "Flying letter particles that drift and fade.",
    files: [
      {
        path: "registry/cursors/character-cursor/character-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/character-cursor.tsx",
      },
    ],
  },
  {
    name: "snowflake-cursor",
    type: "registry:cursor",
    title: "Snowflake Cursor",
    description: "Crystal flakes with spin and gentle fall.",
    files: [
      {
        path: "registry/cursors/snowflake-cursor/snowflake-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/snowflake-cursor.tsx",
      },
    ],
  },
  {
    name: "fairydust-cursor",
    type: "registry:cursor",
    title: "Fairy Dust",
    description: "Primary and gold sparkles with gravity and twinkle.",
    files: [
      {
        path: "registry/cursors/fairydust-cursor/fairydust-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/fairydust-cursor.tsx",
      },
    ],
  },
  {
    name: "textflag-cursor",
    type: "registry:cursor",
    title: "Text Flag",
    description: "Letters that wave behind the pointer like a flag.",
    files: [
      {
        path: "registry/cursors/textflag-cursor/textflag-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/textflag-cursor.tsx",
      },
    ],
  },
  {
    name: "glitch-cursor",
    type: "registry:cursor",
    title: "Glitch Cursor",
    description: "RGB-split layers with brief scramble on move.",
    files: [
      {
        path: "registry/cursors/glitch-cursor/glitch-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/glitch-cursor.tsx",
      },
    ],
  },
  {
    name: "gradient-cursor",
    type: "registry:cursor",
    title: "Gradient Cursor",
    description: "Soft dual gradient blobs with spring lag.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/cursors/gradient-cursor/gradient-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/gradient-cursor.tsx",
      },
    ],
  },
  {
    name: "multi-cursor",
    type: "registry:cursor",
    title: "Multi Cursor",
    description: "Offset clones with staggered lag and opacity.",
    files: [
      {
        path: "registry/cursors/multi-cursor/multi-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/multi-cursor.tsx",
      },
    ],
  },
  {
    name: "agent-cursor",
    type: "registry:cursor",
    title: "Agent Cursor",
    description: "AI copilot orb with Ask / Rewrite / Explain chips.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/cursors/agent-cursor/agent-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/agent-cursor.tsx",
      },
    ],
  },
  {
    name: "invert-cursor",
    type: "registry:cursor",
    title: "Invert Cursor",
    description: "Editorial lens using mix-blend-mode difference.",
    files: [
      {
        path: "registry/cursors/invert-cursor/invert-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/invert-cursor.tsx",
      },
    ],
  },
  {
    name: "morph-cursor",
    type: "registry:cursor",
    title: "Morph Cursor",
    description: "Semantic morph between dot, ring, caret, and play.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/cursors/morph-cursor/morph-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/morph-cursor.tsx",
      },
    ],
  },
  {
    name: "ink-cursor",
    type: "registry:cursor",
    title: "Ink Cursor",
    description: "Soft liquid-ink smear driven by pointer velocity.",
    files: [
      {
        path: "registry/cursors/ink-cursor/ink-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/ink-cursor.tsx",
      },
    ],
  },
  {
    name: "glass-cursor",
    type: "registry:cursor",
    title: "Glass Cursor",
    description: "Frosted liquid-glass disc with a specular highlight.",
    files: [
      {
        path: "registry/cursors/glass-cursor/glass-cursor.tsx",
        type: "registry:component",
        target: "components/cursors/glass-cursor.tsx",
      },
    ],
  },
]

for (const item of cursorRegistryItems) {
  if (item.type === "registry:cursor") {
    item.access = CURSOR_SITE_ACCESS
  }
}
