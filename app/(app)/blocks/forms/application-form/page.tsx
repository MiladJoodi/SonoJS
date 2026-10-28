import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ApplicationForm01 from "@/registry/blocks/forms/application-form/application-form-01/application-form"
import ApplicationForm02 from "@/registry/blocks/forms/application-form/application-form-02/application-form"
import ApplicationForm03 from "@/registry/blocks/forms/application-form/application-form-03/application-form"
import ApplicationForm04 from "@/registry/blocks/forms/application-form/application-form-04/application-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/application-form",
  "Application Form",
  "Ready-to-use Application Form UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ApplicationForm from "@/components/blocks/forms/${name}/application-form"

export default function Page() {
  return <ApplicationForm />
}`

export default function BlockApplicationFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Application Form"
        pathname="/blocks/forms/application-form"
        description="Early access, job apply, partnership RFP, and cohort enrollment — elevated cards on canvas."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="application-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("application-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ApplicationForm01 />
        </BlockExample>

        <BlockExample
          name="application-form-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("application-form-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ApplicationForm02 />
        </BlockExample>

        <BlockExample
          name="application-form-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("application-form-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ApplicationForm03 />
        </BlockExample>

        <BlockExample
          name="application-form-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("application-form-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ApplicationForm04 />
        </BlockExample>
      </div>
    </article>
  )
}
