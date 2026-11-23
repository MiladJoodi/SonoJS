import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Chrome Bloom",
  description:
    "Chrome Bloom popup - five looks (orb, petal, prism, lens-flare, mirror). Chrome orb opens around a first-visit code.",
  path: "/popups/chrome-bloom",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "chrome-bloom", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsChromeBloomDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Chrome Bloom"
        pathname="/popups/chrome-bloom"
        description="Tap the chrome orb to open a first-visit offer, then reveal a holographic code. Five looks - lime orb, rose petal, violet prism, gold lens-flare, and silver mirror."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Orb</h2>
            <p className="text-sm text-muted-foreground">
              Classic lime chrome - halves part with a flash; reveal ORBIT15.
            </p>
          </div>
          <PopupExample
            name="chrome-bloom-01"
            usage={[
              { title: "app/page.tsx", code: usage("chrome-bloom-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Petal</h2>
            <p className="text-sm text-muted-foreground">
              Rose bloom chrome - soft petals, sharp deal, PETAL18.
            </p>
          </div>
          <PopupExample
            name="chrome-bloom-02"
            usage={[
              { title: "app/page.tsx", code: usage("chrome-bloom-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Prism</h2>
            <p className="text-sm text-muted-foreground">
              Violet refraction - catch the spectrum and copy PRISM20.
            </p>
          </div>
          <PopupExample
            name="chrome-bloom-03"
            usage={[
              { title: "app/page.tsx", code: usage("chrome-bloom-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Lens flare</h2>
            <p className="text-sm text-muted-foreground">
              Gold flash chrome - catch the flare and copy FLARE22.
            </p>
          </div>
          <PopupExample
            name="chrome-bloom-04"
            usage={[
              { title: "app/page.tsx", code: usage("chrome-bloom-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Mirror</h2>
            <p className="text-sm text-muted-foreground">
              Silver reflective chrome - look twice, pay less with MIRROR16.
            </p>
          </div>
          <PopupExample
            name="chrome-bloom-05"
            usage={[
              { title: "app/page.tsx", code: usage("chrome-bloom-05") },
            ]}
            {...shell}
          />
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "look",
              type: '"orb" | "petal" | "prism" | "lens-flare" | "mirror"',
              defaultValue: '"orb"',
              description:
                "orb lime · petal rose · prism violet · lens-flare gold · mirror silver.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"ORBIT15"',
              description: "First-order checkout code revealed after the orb opens.",
            },
            {
              name: "revealLabel",
              type: "string",
              defaultValue: '"Reveal my code"',
              description: "CTA after the orb opens, before the code appears.",
            },
            {
              name: "shopLabel",
              type: "string",
              defaultValue: '"Shop now"',
              description: "CTA after the code is revealed.",
            },
            {
              name: "hintLabel",
              type: "string",
              defaultValue: '"Tap the orb to open it"',
              description: "Pill hint shown while the orb is closed.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onOpenOrb",
              type: "() => void",
              description: "Fires when the visitor opens the orb.",
            },
            {
              name: "onRevealCode",
              type: "() => void",
              description: "Fires when the visitor reveals the code.",
            },
          ]}
        />
      </section>
    </article>
  )
}
