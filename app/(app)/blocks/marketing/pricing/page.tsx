import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Pricing01 from "@/registry/blocks/marketing/pricing/pricing-01/pricing"
import Pricing02 from "@/registry/blocks/marketing/pricing/pricing-02/pricing"
import Pricing03 from "@/registry/blocks/marketing/pricing/pricing-03/pricing"
import Pricing04 from "@/registry/blocks/marketing/pricing/pricing-04/pricing"
import Pricing05 from "@/registry/blocks/marketing/pricing/pricing-05/pricing"
import Pricing06 from "@/registry/blocks/marketing/pricing/pricing-06/pricing"
import Pricing07 from "@/registry/blocks/marketing/pricing/pricing-07/pricing"
import Pricing08 from "@/registry/blocks/marketing/pricing/pricing-08/pricing"
import Pricing09 from "@/registry/blocks/marketing/pricing/pricing-09/pricing"
import Pricing10 from "@/registry/blocks/marketing/pricing/pricing-10/pricing"

const usage = (name: string) => `import Pricing from "@/components/blocks/marketing/${name}/pricing"

export default function Page() {
  return <Pricing />
}`

const previewProps = {
  previewAlign: "center" as const,
  previewClassName: "bg-canvas px-0 py-8 md:px-8 md:py-12",
}

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

export default function BlockPricingDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Pricing"
        pathname="/blocks/marketing/pricing"
        description="Pricing tables for marketing pages — tier cards with features, highlights, and CTAs."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="pricing-01"
          usage={[{ title: "app/page.tsx", code: usage("pricing-01") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-02"
          usage={[{ title: "app/page.tsx", code: usage("pricing-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Pricing02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-03"
          usage={[{ title: "app/page.tsx", code: usage("pricing-03") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Pricing03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-04"
          usage={[{ title: "app/page.tsx", code: usage("pricing-04") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing04 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-05"
          usage={[{ title: "app/page.tsx", code: usage("pricing-05") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing05 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-06"
          usage={[{ title: "app/page.tsx", code: usage("pricing-06") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center overflow-visible py-8">
            <Pricing06 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-07"
          usage={[{ title: "app/page.tsx", code: usage("pricing-07") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing07 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-08"
          usage={[{ title: "app/page.tsx", code: usage("pricing-08") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing08 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-09"
          usage={[{ title: "app/page.tsx", code: usage("pricing-09") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing09 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="pricing-10"
          usage={[{ title: "app/page.tsx", code: usage("pricing-10") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Pricing10 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
