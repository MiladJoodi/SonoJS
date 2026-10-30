import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import OfferCard01 from "@/registry/blocks/marketing/offer-card/offer-card-01/offer-card"
import OfferCard02 from "@/registry/blocks/marketing/offer-card/offer-card-02/offer-card"
import OfferCard03 from "@/registry/blocks/marketing/offer-card/offer-card-03/offer-card"
import OfferCard04 from "@/registry/blocks/marketing/offer-card/offer-card-04/offer-card"
import OfferCard05 from "@/registry/blocks/marketing/offer-card/offer-card-05/offer-card"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/offer-card",
  "Offer Card",
  "Pro upsell offer cards with meteor border animation for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import OfferCard from "@/components/blocks/marketing/${name}/offer-card"

export default function Page() {
  return <OfferCard />
}`

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

const shell = {
  previewAlign: "center" as const,
  previewClassName: "bg-canvas px-4 py-10 sm:px-6 md:px-10 md:py-14",
}

export default function BlockOfferCardDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Offer Card"
        pathname="/blocks/marketing/offer-card"
        description="Meteor-border upsell cards — pricing tiers, aura glass, enterprise seats, and flash deals. Default meteor speed is 0.9 on every variant (override with the speed prop)."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="offer-card-01"
          usage={[{ title: "app/page.tsx", code: usage("offer-card-01") }]}
          {...shell}
        >
          <div className="flex w-full justify-center">
            <OfferCard01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="offer-card-02"
          usage={[{ title: "app/page.tsx", code: usage("offer-card-02") }]}
          {...shell}
        >
          <div className="flex w-full justify-center">
            <OfferCard02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="offer-card-03"
          usage={[{ title: "app/page.tsx", code: usage("offer-card-03") }]}
          {...shell}
        >
          <div className="flex w-full justify-center">
            <OfferCard03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="offer-card-04"
          usage={[{ title: "app/page.tsx", code: usage("offer-card-04") }]}
          {...shell}
        >
          <div className="flex w-full justify-center">
            <OfferCard04 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="offer-card-05"
          usage={[{ title: "app/page.tsx", code: usage("offer-card-05") }]}
          {...shell}
        >
          <div className="flex w-full justify-center">
            <OfferCard05 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
