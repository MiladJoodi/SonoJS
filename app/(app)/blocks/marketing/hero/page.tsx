import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Hero01 from "@/registry/blocks/marketing/hero/hero-01/hero"
import Hero02 from "@/registry/blocks/marketing/hero/hero-02/hero"
import Hero03 from "@/registry/blocks/marketing/hero/hero-03/hero"
import Hero04 from "@/registry/blocks/marketing/hero/hero-04/hero"
import Hero05 from "@/registry/blocks/marketing/hero/hero-05/hero"
import Hero06 from "@/registry/blocks/marketing/hero/hero-06/hero"
import Hero07 from "@/registry/blocks/marketing/hero/hero-07/hero"
import Hero08 from "@/registry/blocks/marketing/hero/hero-08/hero"
import Hero09 from "@/registry/blocks/marketing/hero/hero-09/hero"
import Hero10 from "@/registry/blocks/marketing/hero/hero-10/hero"

const usage = (name: string) => `import Hero from "@/components/blocks/marketing/${name}/hero"

export default function Page() {
  return <Hero />
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

export default function BlockHeroDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Hero"
        pathname="/blocks/marketing/hero"
        description="Marketing heroes — headline, CTA, brand logos, and product imagery."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="hero-01"
          usage={[{ title: "app/page.tsx", code: usage("hero-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-02"
          usage={[{ title: "app/page.tsx", code: usage("hero-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-03"
          usage={[{ title: "app/page.tsx", code: usage("hero-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-04"
          usage={[{ title: "app/page.tsx", code: usage("hero-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-05"
          usage={[{ title: "app/page.tsx", code: usage("hero-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-06"
          usage={[{ title: "app/page.tsx", code: usage("hero-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-07"
          usage={[{ title: "app/page.tsx", code: usage("hero-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-08"
          usage={[{ title: "app/page.tsx", code: usage("hero-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-09"
          usage={[{ title: "app/page.tsx", code: usage("hero-09") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="hero-10"
          usage={[{ title: "app/page.tsx", code: usage("hero-10") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Hero10 />
        </BlockExample>
      </div>
    </article>
  )
}
