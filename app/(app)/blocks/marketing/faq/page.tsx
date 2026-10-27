import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Faq01 from "@/registry/blocks/marketing/faq/faq-01/faq"
import Faq02 from "@/registry/blocks/marketing/faq/faq-02/faq"
import Faq03 from "@/registry/blocks/marketing/faq/faq-03/faq"
import Faq04 from "@/registry/blocks/marketing/faq/faq-04/faq"
import Faq05 from "@/registry/blocks/marketing/faq/faq-05/faq"
import Faq06 from "@/registry/blocks/marketing/faq/faq-06/faq"
import Faq07 from "@/registry/blocks/marketing/faq/faq-07/faq"
import Faq08 from "@/registry/blocks/marketing/faq/faq-08/faq"
import Faq09 from "@/registry/blocks/marketing/faq/faq-09/faq"
import Faq10 from "@/registry/blocks/marketing/faq/faq-10/faq"
import Faq11 from "@/registry/blocks/marketing/faq/faq-11/faq"
import Faq12 from "@/registry/blocks/marketing/faq/faq-12/faq"
import Faq13 from "@/registry/blocks/marketing/faq/faq-13/faq"
import Faq14 from "@/registry/blocks/marketing/faq/faq-14/faq"
import Faq15 from "@/registry/blocks/marketing/faq/faq-15/faq"
import Faq16 from "@/registry/blocks/marketing/faq/faq-16/faq"
import Faq17 from "@/registry/blocks/marketing/faq/faq-17/faq"
import Faq18 from "@/registry/blocks/marketing/faq/faq-18/faq"
import Faq19 from "@/registry/blocks/marketing/faq/faq-19/faq"
import Faq20 from "@/registry/blocks/marketing/faq/faq-20/faq"

const usage = (name: string) =>
  `import Faq from "@/components/blocks/marketing/${name}/faq"

export default function Page() {
  return <Faq />
}`

export default function BlockFaqDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="FAQ"
        pathname="/blocks/marketing/faq"
        description="Accordion-style frequently asked questions for marketing and launch pages."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="faq-01"
          usage={[{ title: "app/page.tsx", code: usage("faq-01") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Faq01 />
        </BlockExample>

        <BlockExample
          name="faq-02"
          usage={[{ title: "app/page.tsx", code: usage("faq-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq02 />
        </BlockExample>

        <BlockExample
          name="faq-03"
          usage={[{ title: "app/page.tsx", code: usage("faq-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq03 />
        </BlockExample>

        <BlockExample
          name="faq-04"
          usage={[{ title: "app/page.tsx", code: usage("faq-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq04 />
        </BlockExample>

        <BlockExample
          name="faq-05"
          usage={[{ title: "app/page.tsx", code: usage("faq-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Faq05 />
        </BlockExample>

        <BlockExample
          name="faq-06"
          usage={[{ title: "app/page.tsx", code: usage("faq-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq06 />
        </BlockExample>

        <BlockExample
          name="faq-07"
          usage={[{ title: "app/page.tsx", code: usage("faq-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq07 />
        </BlockExample>

        <BlockExample
          name="faq-08"
          usage={[{ title: "app/page.tsx", code: usage("faq-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq08 />
        </BlockExample>

        <BlockExample
          name="faq-09"
          usage={[{ title: "app/page.tsx", code: usage("faq-09") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq09 />
        </BlockExample>

        <BlockExample
          name="faq-10"
          usage={[{ title: "app/page.tsx", code: usage("faq-10") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq10 />
        </BlockExample>

        <BlockExample
          name="faq-11"
          usage={[{ title: "app/page.tsx", code: usage("faq-11") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq11 />
        </BlockExample>

        <BlockExample
          name="faq-12"
          usage={[{ title: "app/page.tsx", code: usage("faq-12") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq12 />
        </BlockExample>

        <BlockExample
          name="faq-13"
          usage={[{ title: "app/page.tsx", code: usage("faq-13") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq13 />
        </BlockExample>

        <BlockExample
          name="faq-14"
          usage={[{ title: "app/page.tsx", code: usage("faq-14") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq14 />
        </BlockExample>

        <BlockExample
          name="faq-15"
          usage={[{ title: "app/page.tsx", code: usage("faq-15") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq15 />
        </BlockExample>

        <BlockExample
          name="faq-16"
          usage={[{ title: "app/page.tsx", code: usage("faq-16") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq16 />
        </BlockExample>

        <BlockExample
          name="faq-17"
          usage={[{ title: "app/page.tsx", code: usage("faq-17") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq17 />
        </BlockExample>

        <BlockExample
          name="faq-18"
          usage={[{ title: "app/page.tsx", code: usage("faq-18") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq18 />
        </BlockExample>

        <BlockExample
          name="faq-19"
          usage={[{ title: "app/page.tsx", code: usage("faq-19") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq19 />
        </BlockExample>

        <BlockExample
          name="faq-20"
          usage={[{ title: "app/page.tsx", code: usage("faq-20") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Faq20 />
        </BlockExample>
      </div>
    </article>
  )
}
