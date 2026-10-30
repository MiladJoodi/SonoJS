import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProjectInquiryForm01 from "@/registry/blocks/forms/project-inquiry-form/project-inquiry-form-01/project-inquiry-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/project-inquiry-form",
  "Project Inquiry Form",
  "Ready-to-use Project Inquiry Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ProjectInquiryForm from "@/components/blocks/forms/${name}/project-inquiry-form"

export default function Page() {
  return <ProjectInquiryForm />
}`

export default function BlockProjectInquiryFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Project Inquiry Form"
        pathname="/blocks/forms/project-inquiry-form"
        description="Collect client project requests with budget ranges, timelines, attachments, and review."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="project-inquiry-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("project-inquiry-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProjectInquiryForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
