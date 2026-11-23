import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Blackout",
  description:
    "Blackout popup - five looks (neon, fuse, static-TV, power-cut, ember). Lights cut, sign buzzes, discount rolls up.",
  path: "/popups/blackout",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "blackout", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsBlackoutDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Blackout"
        pathname="/popups/blackout"
        description="Brick wall, lights cut out, neon buzzes letter by letter, then the discount rolls up. Five looks - neon pink/cyan, amber fuse, green CRT static, cold power-cut, and ember coals."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Neon</h2>
            <p className="text-sm text-muted-foreground">
              Classic magenta BLACK WEEK on brick - cyan date, sparks, rolled 50% OFF.
            </p>
          </div>
          <PopupExample
            name="blackout-01"
            usage={[{ title: "app/page.tsx", code: usage("blackout-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Fuse</h2>
            <p className="text-sm text-muted-foreground">
              Amber blown-fuse glow - SHORT SALE buzzes on, then 40% OFF.
            </p>
          </div>
          <PopupExample
            name="blackout-02"
            usage={[{ title: "app/page.tsx", code: usage("blackout-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Static TV</h2>
            <p className="text-sm text-muted-foreground">
              Green CRT phosphor - NO SIGNAL buzzes through the static for 35% OFF.
            </p>
          </div>
          <PopupExample
            name="blackout-03"
            usage={[{ title: "app/page.tsx", code: usage("blackout-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Power cut</h2>
            <p className="text-sm text-muted-foreground">
              Cold emergency white after the grid fails - POWER CUT, then 45% OFF.
            </p>
          </div>
          <PopupExample
            name="blackout-04"
            usage={[{ title: "app/page.tsx", code: usage("blackout-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ember</h2>
            <p className="text-sm text-muted-foreground">
              Orange coal glow - EMBER SALE burns in, then 55% OFF.
            </p>
          </div>
          <PopupExample
            name="blackout-05"
            usage={[{ title: "app/page.tsx", code: usage("blackout-05") }]}
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
              type: '"neon" | "fuse" | "static-tv" | "power-cut" | "ember"',
              defaultValue: '"neon"',
              description:
                "neon pink/cyan · fuse amber · static-tv green CRT · power-cut cold white · ember orange coals.",
            },
            {
              name: "neonText",
              type: "string",
              defaultValue: '"BLACK WEEK"',
              description: "Neon sign text revealed letter by letter.",
            },
            {
              name: "flickerLetter",
              type: "string",
              defaultValue: '"C"',
              description:
                "Glyph that keeps hard neon-flickering after the sign settles. Falls back to the first letter of the second word when missing.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"50% OFF"',
              description: "Discount that rolls up after the neon finishes.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Shop in the dark"',
              description: "Primary button after the sequence completes.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
          ]}
        />
      </section>
    </article>
  )
}
