import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import JobApplicationForm01 from "@/registry/blocks/forms/job-application-form/job-application-form-01/job-application-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/job-application-form",
  "Job Application Form",
  "Ready-to-use Job Application Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import JobApplicationForm from "@/components/blocks/forms/${name}/job-application-form"

export default function Page() {
  return <JobApplicationForm />
}`

export default function BlockJobApplicationFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Job Application Form"
        pathname="/blocks/forms/job-application-form"
        description="Multi-step career applications with experience, document uploads, review, and consent."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="job-application-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("job-application-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <JobApplicationForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
