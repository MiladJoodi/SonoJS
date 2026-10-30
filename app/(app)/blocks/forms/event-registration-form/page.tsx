import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import EventRegistrationForm01 from "@/registry/blocks/forms/event-registration-form/event-registration-form-01/event-registration-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/event-registration-form",
  "Event Registration Form",
  "Ready-to-use Event Registration Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import EventRegistrationForm from "@/components/blocks/forms/${name}/event-registration-form"

export default function Page() {
  return <EventRegistrationForm />
}`

export default function BlockEventRegistrationFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Event Registration Form"
        pathname="/blocks/forms/event-registration-form"
        description="Register for events with ticket types, attendee details, dietary options, and a registration summary."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="event-registration-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("event-registration-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <EventRegistrationForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
