import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Testimonial01 from "@/registry/blocks/marketing/testimonials/testimonials-01/testimonial"
import Testimonial02 from "@/registry/blocks/marketing/testimonials/testimonials-02/testimonial"
import Testimonial03 from "@/registry/blocks/marketing/testimonials/testimonials-03/testimonial"
import Testimonial04 from "@/registry/blocks/marketing/testimonials/testimonials-04/testimonial"
import Testimonial05 from "@/registry/blocks/marketing/testimonials/testimonials-05/testimonial"
import Testimonial06 from "@/registry/blocks/marketing/testimonials/testimonials-06/testimonial"
import Testimonial07 from "@/registry/blocks/marketing/testimonials/testimonials-07/testimonial"
import Testimonial08 from "@/registry/blocks/marketing/testimonials/testimonials-08/testimonial"
import Testimonial09 from "@/registry/blocks/marketing/testimonials/testimonials-09/testimonial"
import Testimonial10 from "@/registry/blocks/marketing/testimonials/testimonials-10/testimonial"
import Testimonial11 from "@/registry/blocks/marketing/testimonials/testimonials-11/testimonial"
import Testimonial12 from "@/registry/blocks/marketing/testimonials/testimonials-12/testimonial"
import Testimonial13 from "@/registry/blocks/marketing/testimonials/testimonials-13/testimonial"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/testimonials", "Testimonials", "Ready-to-use Testimonials UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Testimonial from "@/components/blocks/marketing/${name}/testimonial"

export default function Page() {
  return <Testimonial />
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

export default function BlockTestimonialsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Testimonials"
        pathname="/blocks/marketing/testimonials"
        description="Customer quote sections with rating stars, short copy, and an avatar caption."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="testimonials-01"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-01") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-02"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-02") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-03"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-03") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-04"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-04") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial04 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-05"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-05") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial05 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-06"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-06") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial06 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-07"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-07") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial07 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-08"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-08") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial08 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-09"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-09") },
          ]}
          previewClassName="bg-canvas px-8 pb-12 pt-16"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial09 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-10"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-10") },
          ]}
          previewClassName="bg-canvas p-0"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial10 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-11"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-11") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial11 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-12"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-12") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial12 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="testimonials-13"
          usage={[
            { title: "app/page.tsx", code: usage("testimonials-13") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <Testimonial13 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
