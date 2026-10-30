import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import CourseEnrollmentForm01 from "@/registry/blocks/forms/course-enrollment-form/course-enrollment-form-01/course-enrollment-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/course-enrollment-form",
  "Course Enrollment Form",
  "Ready-to-use Course Enrollment Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import CourseEnrollmentForm from "@/components/blocks/forms/${name}/course-enrollment-form"

export default function Page() {
  return <CourseEnrollmentForm />
}`

export default function BlockCourseEnrollmentFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Course Enrollment Form"
        pathname="/blocks/forms/course-enrollment-form"
        description="Enroll learners with cohort selection, pricing plans, promo codes, and an enrollment summary."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="course-enrollment-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("course-enrollment-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <CourseEnrollmentForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
