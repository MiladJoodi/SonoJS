import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("confetti", "Confetti")

const exampleDefs = [
  {
    name: "confetti-default",
    title: "Default",
    description:
      "Hover the canvas to fire. Uses `Confetti` with an imperative `fire()` via ref.",
  },
  {
    name: "confetti-basic",
    title: "Basic",
    description: "`ConfettiButton` fires from the button click origin.",
  },
  {
    name: "confetti-random-direction",
    title: "Random direction",
    description:
      "Pass a getter for `angle` so each click launches in a random direction.",
  },
  {
    name: "confetti-fireworks",
    title: "Fireworks",
    description:
      "Call `canvas-confetti` on an interval for a short fireworks burst.",
    requires: ["button"],
    npmRequires: ["canvas-confetti"],
  },
  {
    name: "confetti-side-cannons",
    title: "Side cannons",
    description: "RAF loop that sprays from both sides of the viewport.",
    requires: ["button"],
    npmRequires: ["canvas-confetti"],
  },
  {
    name: "confetti-stars",
    title: "Stars",
    description: "Burst with `shapes: [\"star\"]` and circle accents.",
    requires: ["button"],
    npmRequires: ["canvas-confetti"],
  },
  {
    name: "confetti-custom-shapes",
    title: "Custom shapes",
    description: "Build particles with `confetti.shapeFromPath()`.",
    requires: ["button"],
    npmRequires: ["canvas-confetti"],
  },
  {
    name: "confetti-emoji",
    title: "Emoji",
    description: "Use `confetti.shapeFromText()` for emoji particles.",
    requires: ["button"],
    npmRequires: ["canvas-confetti"],
  },
]

const usageSource = `import { useRef } from "react"

import { Confetti, type ConfettiRef } from "@/components/confetti"

export function Example() {
  const confettiRef = useRef<ConfettiRef>(null)

  return (
    <div>
      <Confetti ref={confettiRef} manualstart />
      <button type="button" onClick={() => confettiRef.current?.fire()}>
        Trigger Confetti
      </button>
    </div>
  )
}`

export default async function ConfettiDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Confetti"
        pathname="/docs/components/confetti"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Canvas confetti bursts for celebrating wins, form submits, and other
            special moments. Includes `Confetti` and `ConfettiButton`.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="confetti" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="confetti.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <h3 className="text-h4">Confetti</h3>
        <DocsApiProps
          rows={[
            {
              name: "options",
              type: "ConfettiOptions",
              defaultValue: "{}",
              description:
                "Default options merged into automatic and imperative `fire()` calls.",
            },
            {
              name: "globalOptions",
              type: "ConfettiGlobalOptions",
              defaultValue: "{ resize: true, useWorker: true }",
              description: "Passed to `canvas-confetti.create()`.",
            },
            {
              name: "manualstart",
              type: "boolean",
              defaultValue: "false",
              description: "Skip auto-fire on mount; use `ref.fire()` instead.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the canvas element.",
            },
          ]}
        />
        <h3 className="text-h4">ConfettiRef</h3>
        <DocsApiProps
          rows={[
            {
              name: "fire",
              type: "(options?: ConfettiOptions) => Promise<null | undefined>",
              description:
                "Imperatively trigger a burst on the canvas instance.",
            },
          ]}
        />
        <h3 className="text-h4">ConfettiButton</h3>
        <DocsApiProps
          rows={[
            {
              name: "options",
              type: "ConfettiOptions & ConfettiGlobalOptions",
              defaultValue: "{}",
              description:
                "Options for the global confetti burst on click (origin from the button).",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Button label and children.",
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Credits</h2>
        <ul className="list-disc space-y-1 ps-5 text-muted-foreground">
          <li>
            Credit to{" "}
            <a
              href="https://www.x.com/bankkroll_eth"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              Bankk
            </a>
          </li>
          <li>
            Inspired by{" "}
            <a
              href="https://www.npmjs.com/package/canvas-confetti"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              canvas-confetti
            </a>
          </li>
        </ul>
      </section>
    </article>
  )
}
