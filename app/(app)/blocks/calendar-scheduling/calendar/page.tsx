import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Calendar01 from "@/registry/blocks/calendar-scheduling/calendar/calendar-01/calendar"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/calendar-scheduling/calendar",
  "Calendar",
  "Ready-to-use Calendar UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import CalendarBlock from "@/components/blocks/calendar-scheduling/${name}/calendar"

export default function Page() {
  return <CalendarBlock />
}`

export default function BlockCalendarDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Calendar"
        pathname="/blocks/calendar-scheduling/calendar"
        description="Month view with event markers, selected-day agenda, and create-event dialog."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="calendar-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("calendar-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Calendar01 />
        </BlockExample>
      </div>
    </article>
  )
}
