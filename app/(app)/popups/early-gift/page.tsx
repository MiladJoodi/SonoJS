import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Early Gift",
  description:
    "Before-the-rush gift popup - five looks (pink, teal, gold, sleigh, violet). Unwrap, copy, claim.",
  path: "/popups/early-gift",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "early-gift", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsEarlyGiftDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Early Gift"
        pathname="/popups/early-gift"
        description="A dark early-access popup: floating gift box, unwrap reveal, dashed code row, and a claim CTA. Five looks - pink gift, teal unwrap, gold bow-tag, sleigh, and violet surprise-lid."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Before the rush</h2>
            <p className="text-sm text-muted-foreground">
              Classic pink ribbons - tap the gift to unwrap early access and copy the code.
            </p>
          </div>
          <PopupExample
            name="early-gift-01"
            usage={[{ title: "app/page.tsx", code: usage("early-gift-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Unwrap</h2>
            <p className="text-sm text-muted-foreground">
              Teal and mint ribbons with a fresh glow - peel back the deal early.
            </p>
          </div>
          <PopupExample
            name="early-gift-02"
            usage={[{ title: "app/page.tsx", code: usage("early-gift-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Bow tag</h2>
            <p className="text-sm text-muted-foreground">
              Gold and amber bow chrome - a warm tagged early cut.
            </p>
          </div>
          <PopupExample
            name="early-gift-03"
            usage={[{ title: "app/page.tsx", code: usage("early-gift-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Sleigh</h2>
            <p className="text-sm text-muted-foreground">
              Deep red ribbons with evergreen accents - delivered before the rush.
            </p>
          </div>
          <PopupExample
            name="early-gift-04"
            usage={[{ title: "app/page.tsx", code: usage("early-gift-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Surprise lid</h2>
            <p className="text-sm text-muted-foreground">
              Violet and indigo glow - lift the lid for a surprise code.
            </p>
          </div>
          <PopupExample
            name="early-gift-05"
            usage={[{ title: "app/page.tsx", code: usage("early-gift-05") }]}
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
              type: '"gift" | "unwrap" | "bow-tag" | "sleigh" | "surprise-lid"',
              defaultValue: '"gift"',
              description:
                "gift pink · unwrap teal · bow-tag gold · sleigh red/evergreen · surprise-lid violet.",
            },
            {
              name: "offer",
              type: "string",
              defaultValue: '"30% off"',
              description: "Large headline offer after unwrap.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"EARLY30"',
              description: "Promo code copied by Copy / Claim.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Claim early gift"',
              description: "Primary button label.",
            },
            {
              name: "hint",
              type: "string",
              defaultValue: '"Tap the gift to unwrap"',
              description: "Label under the sealed gift box.",
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
