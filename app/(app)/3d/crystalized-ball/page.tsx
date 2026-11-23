import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Crystalized Ball",
  description:
    "Interactive OGL crystal sphere with a crackling electric rim and glowing particles. Install with the SonoJS CLI.",
  path: "/3d/crystalized-ball",
})

const exampleDefs = [
  {
    name: "crystalized-ball-default",
    title: "Plasma",
    description:
      "Pink crackling rim with rising square particles and interactive glow.",
    npmRequires: ["ogl"],
  },
]

const usage = `"use client"

import CrystalizedBall from "@/components/3d/crystalized-ball"

export default function Page() {
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
}`

export default async function CrystalizedBallDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Crystalized Ball"
        pathname="/3d/crystalized-ball"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A glass-like crystal sphere with an electric rim, glowing dust, and
            pointer interaction. Rendered with OGL and WebGL2.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
          previewClassName="p-0"
        />
      </section>

      <DocsInstallation name="crystalized-ball" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            { name: "preset", type: "Preset", defaultValue: '"plasma"', description: "Selects a visual preset." },
            { name: "color", type: "string", defaultValue: "preset color", description: "Crystal rim and particle tint." },
            { name: "theme", type: '"dark" | "light"', defaultValue: '"dark"', description: "Sets light or dark crystal rendering." },
            { name: "size", type: "number", defaultValue: "0.7", description: "Crystal size within the stage." },
            { name: "interactive", type: "boolean", defaultValue: "true", description: "Enables pointer response." },
            { name: "hoverStrength", type: "number", defaultValue: "0.7", description: "Pointer influence strength." },
            { name: "strands", type: "number", description: "Number of electric strands around the crystal." },
            { name: "crackle", type: "number", description: "Electric rim crackle intensity." },
            { name: "flares", type: "number", description: "Rim flare strength." },
            { name: "glow", type: "number", description: "Outer glow intensity." },
            { name: "sparks", type: "number", description: "Spark density and brightness." },
            { name: "particleCount", type: "number", description: "Requested number of dust particles." },
            { name: "fill", type: "number", description: "Crystal fill amount." },
            { name: "motion", type: '"rise" | "fall" | "drift" | "orbit"', description: "Particle movement direction." },
            { name: "particleShape", type: '"square" | "round"', description: "Particle shape." },
            { name: "depth", type: "number", description: "Particle depth and parallax." },
            { name: "sway", type: "number", description: "Particle sway amount." },
            { name: "twinkle", type: "number", description: "Particle twinkle amount." },
            { name: "haze", type: "number", description: "Atmospheric haze strength." },
            { name: "dustSpeed", type: "number", description: "Dust animation speed." },
            { name: "speed", type: "number", defaultValue: "1", description: "Global animation speed." },
            { name: "intro", type: "boolean", defaultValue: "true", description: "Plays the intro animation." },
            { name: "paused", type: "boolean", defaultValue: "false", description: "Pauses the animation." },
            { name: "className", type: "string", description: "Classes on the stage container." },
            { name: "style", type: "CSSProperties", description: "Inline styles on the stage container." },
          ]}
        />
      </section>
    </article>
  )
}
