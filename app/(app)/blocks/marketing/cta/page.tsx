import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Cta01 from "@/registry/blocks/marketing/cta/cta-01/cta"
import Cta02 from "@/registry/blocks/marketing/cta/cta-02/cta"
import Cta03 from "@/registry/blocks/marketing/cta/cta-03/cta"
import Cta04 from "@/registry/blocks/marketing/cta/cta-04/cta"
import Cta05 from "@/registry/blocks/marketing/cta/cta-05/cta"
import Cta06 from "@/registry/blocks/marketing/cta/cta-06/cta"
import Cta07 from "@/registry/blocks/marketing/cta/cta-07/cta"
import Cta08 from "@/registry/blocks/marketing/cta/cta-08/cta"
import Cta09 from "@/registry/blocks/marketing/cta/cta-09/cta"

const usage = (name: string) => `import Cta from "@/components/blocks/marketing/${name}/cta"

export default function Page() {
  return <Cta />
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

export default function BlockCtaDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="CTA"
        pathname="/blocks/marketing/cta"
        description="Call-to-action sections for marketing pages — headline, copy, and a primary action."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="cta-01"
          usage={[{ title: "app/page.tsx", code: usage("cta-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-02"
          usage={[{ title: "app/page.tsx", code: usage("cta-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-8 md:px-0 md:py-12"
        >
          <Cta02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-03"
          usage={[{ title: "app/page.tsx", code: usage("cta-03") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-04"
          usage={[{ title: "app/page.tsx", code: usage("cta-04") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-05"
          usage={[{ title: "app/page.tsx", code: usage("cta-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-06"
          usage={[{ title: "app/page.tsx", code: usage("cta-06") }]}
          previewAlign="center"
          previewClassName="bg-canvas overflow-visible px-0 pb-10 pt-0 md:px-0 md:pb-12"
        >
          <Cta06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-07"
          usage={[{ title: "app/page.tsx", code: usage("cta-07") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-08"
          usage={[{ title: "app/page.tsx", code: usage("cta-08") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="cta-09"
          usage={[{ title: "app/page.tsx", code: usage("cta-09") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-6 md:px-0 md:py-12"
        >
          <Cta09 />
        </BlockExample>
      </div>
    </article>
  )
}
