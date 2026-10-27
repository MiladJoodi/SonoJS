import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ContentSection01 from "@/registry/blocks/marketing/content-section/content-section-01/content-section"
import ContentSection02 from "@/registry/blocks/marketing/content-section/content-section-02/content-section"
import ContentSection03 from "@/registry/blocks/marketing/content-section/content-section-03/content-section"
import ContentSection04 from "@/registry/blocks/marketing/content-section/content-section-04/content-section"
import ContentSection05 from "@/registry/blocks/marketing/content-section/content-section-05/content-section"
import ContentSection06 from "@/registry/blocks/marketing/content-section/content-section-06/content-section"
import ContentSection07 from "@/registry/blocks/marketing/content-section/content-section-07/content-section"
import ContentSection08 from "@/registry/blocks/marketing/content-section/content-section-08/content-section"
import ContentSection09 from "@/registry/blocks/marketing/content-section/content-section-09/content-section"
import ContentSection10 from "@/registry/blocks/marketing/content-section/content-section-10/content-section"
import ContentSection11 from "@/registry/blocks/marketing/content-section/content-section-11/content-section"
import ContentSection12 from "@/registry/blocks/marketing/content-section/content-section-12/content-section"

const usage = (name: string) =>
  `import ContentSection from "@/components/blocks/marketing/${name}/content-section"

export default function Page() {
  return <ContentSection />
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

export default function BlockContentSectionDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Content Section"
        pathname="/blocks/marketing/content-section"
        description="Copy + media splits — headline, body paragraphs, and a supporting image."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="content-section-01"
          usage={[{ title: "app/page.tsx", code: usage("content-section-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-02"
          usage={[{ title: "app/page.tsx", code: usage("content-section-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-03"
          usage={[{ title: "app/page.tsx", code: usage("content-section-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-04"
          usage={[{ title: "app/page.tsx", code: usage("content-section-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-05"
          usage={[{ title: "app/page.tsx", code: usage("content-section-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-06"
          usage={[{ title: "app/page.tsx", code: usage("content-section-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-07"
          usage={[{ title: "app/page.tsx", code: usage("content-section-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-08"
          usage={[{ title: "app/page.tsx", code: usage("content-section-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-09"
          usage={[{ title: "app/page.tsx", code: usage("content-section-09") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-10"
          usage={[{ title: "app/page.tsx", code: usage("content-section-10") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection10 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-11"
          usage={[{ title: "app/page.tsx", code: usage("content-section-11") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection11 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="content-section-12"
          usage={[{ title: "app/page.tsx", code: usage("content-section-12") }]}
          previewAlign="start"
          previewClassName="bg-canvas px-0 py-0 md:px-0"
        >
          <ContentSection12 />
        </BlockExample>
      </div>
    </article>
  )
}
