import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ContactForm01 from "@/registry/blocks/forms/contact-form/contact-form-01/contact-form"
import ContactForm02 from "@/registry/blocks/forms/contact-form/contact-form-02/contact-form"
import ContactForm03 from "@/registry/blocks/forms/contact-form/contact-form-03/contact-form"
import ContactForm04 from "@/registry/blocks/forms/contact-form/contact-form-04/contact-form"
import ContactForm05 from "@/registry/blocks/forms/contact-form/contact-form-05/contact-form"
import ContactForm06 from "@/registry/blocks/forms/contact-form/contact-form-06/contact-form"
import ContactForm07 from "@/registry/blocks/forms/contact-form/contact-form-07/contact-form"
import ContactForm08 from "@/registry/blocks/forms/contact-form/contact-form-08/contact-form"
import ContactForm09 from "@/registry/blocks/forms/contact-form/contact-form-09/contact-form"
import ContactForm10 from "@/registry/blocks/forms/contact-form/contact-form-10/contact-form"
import ContactForm11 from "@/registry/blocks/forms/contact-form/contact-form-11/contact-form"
import ContactForm12 from "@/registry/blocks/forms/contact-form/contact-form-12/contact-form"

const usage = (name: string) => `import ContactForm from "@/components/blocks/forms/${name}/contact-form"

export default function Page() {
  return <ContactForm />
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

export default function BlockContactFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Contact Form"
        pathname="/blocks/forms/contact-form"
        description="Polished contact sections — elevated cards, clear hierarchy, and ready-to-ship form layouts for marketing and product pages."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="contact-form-01"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-01") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-02"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-02") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-03"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-03") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-04"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-04") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm04 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-05"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-05") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm05 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-06"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-06") },
          ]}
        >
          <ContactForm06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-07"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-07") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm07 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-08"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-08") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm08 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-09"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-09") },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ContactForm09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-10"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-10") },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ContactForm10 className="min-h-[36rem]" />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-11"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-11") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm11 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="contact-form-12"
          usage={[
            { title: "app/page.tsx", code: usage("contact-form-12") },
          ]}
          previewClassName="bg-canvas px-8 py-12"
        >
          <div className="flex w-full items-center justify-center">
            <ContactForm12 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
