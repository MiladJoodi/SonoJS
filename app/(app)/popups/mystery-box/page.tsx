import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Mystery Box",
  description:
    "Pick-a-box popup - cream, gold, crate, vault, or neon looks. Light and dark ready.",
  path: "/popups/mystery-box",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "mystery-box", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsMysteryBoxDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Mystery Box"
        pathname="/popups/mystery-box"
        description="Three sealed boxes on a theme-aware stage. Visitors pick one - the lid lifts, the prize unlocks, and a code is ready to copy. Works in light and dark."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Pick a box</h2>
            <p className="text-sm text-muted-foreground">
              Cream boxes with colored ribbons - clear on light and dark.
            </p>
          </div>
          <PopupExample
            name="mystery-box-01"
            usage={[{ title: "app/page.tsx", code: usage("mystery-box-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Prize</h2>
            <p className="text-sm text-muted-foreground">
              Gold gift boxes with amber reward chrome - same pick interaction.
            </p>
          </div>
          <PopupExample
            name="mystery-box-02"
            usage={[{ title: "app/page.tsx", code: usage("mystery-box-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Crate</h2>
            <p className="text-sm text-muted-foreground">
              Warm wood stage and amber ribbons - warehouse crate energy.
            </p>
          </div>
          <PopupExample
            name="mystery-box-03"
            usage={[{ title: "app/page.tsx", code: usage("mystery-box-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Vault</h2>
            <p className="text-sm text-muted-foreground">
              Steel slate chrome - locked boxes with a cold vault feel.
            </p>
          </div>
          <PopupExample
            name="mystery-box-04"
            usage={[{ title: "app/page.tsx", code: usage("mystery-box-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Neon</h2>
            <p className="text-sm text-muted-foreground">
              Fuchsia and cyan glow with gold-style gifts.
            </p>
          </div>
          <PopupExample
            name="mystery-box-05"
            usage={[{ title: "app/page.tsx", code: usage("mystery-box-05") }]}
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
              type: '"pick" | "prize" | "crate" | "vault" | "neon"',
              defaultValue: '"pick"',
              description:
                "pick cream · prize gold · crate wood · vault steel · neon glow.",
            },
            {
              name: "prizes",
              type: "MysteryBoxPrize[]",
              description:
                "Up to three prizes (`offer`, `code`, optional `label`).",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim prize"',
              description: "Primary button label after reveal.",
            },
            {
              name: "hint",
              type: "string",
              defaultValue: '"Tap a box to open it"',
              description: "Hint shown before a box is picked.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "400",
              description: "Auto-open delay in milliseconds.",
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
