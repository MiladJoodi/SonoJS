import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Newsletter01 from "@/registry/blocks/marketing/newsletter/newsletter-01/newsletter"
import Newsletter02 from "@/registry/blocks/marketing/newsletter/newsletter-02/newsletter"
import Newsletter03 from "@/registry/blocks/marketing/newsletter/newsletter-03/newsletter"
import Newsletter04 from "@/registry/blocks/marketing/newsletter/newsletter-04/newsletter"
import Newsletter05 from "@/registry/blocks/marketing/newsletter/newsletter-05/newsletter"
import Newsletter06 from "@/registry/blocks/marketing/newsletter/newsletter-06/newsletter"
import Newsletter07 from "@/registry/blocks/marketing/newsletter/newsletter-07/newsletter"
import Newsletter08 from "@/registry/blocks/marketing/newsletter/newsletter-08/newsletter"
import Newsletter09 from "@/registry/blocks/marketing/newsletter/newsletter-09/newsletter"

const usage = (name: string) => `import Newsletter from "@/components/blocks/marketing/${name}/newsletter"

export default function Page() {
  return <Newsletter />
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

export default function BlockNewsletterDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Newsletter"
        pathname="/blocks/marketing/newsletter"
        description="Email signup sections — headline, short copy, and a subscribe form."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="newsletter-01"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-8 md:px-8 md:py-12"
        >
          <Newsletter01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-02"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-02") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-8 md:px-8 md:py-12"
        >
          <Newsletter02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-03"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Newsletter03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-04"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-04") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-8 md:px-8 md:py-12"
        >
          <Newsletter04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-05"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-8 md:px-8 md:py-12"
        >
          <Newsletter05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-06"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Newsletter06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-07"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Newsletter07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-08"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 pb-16 pt-0"
        >
          <Newsletter08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="newsletter-09"
          usage={[{ title: "app/page.tsx", code: usage("newsletter-09") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-0 py-8 md:px-8 md:py-12"
        >
          <Newsletter09 />
        </BlockExample>
      </div>
    </article>
  )
}
