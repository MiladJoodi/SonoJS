import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Calendar01 from "@/registry/blocks/calendar-scheduling/calendar/calendar-01/calendar"
import Calendar02 from "@/registry/blocks/calendar-scheduling/calendar/calendar-02/calendar"
import Calendar03 from "@/registry/blocks/calendar-scheduling/calendar/calendar-03/calendar"
import Calendar04 from "@/registry/blocks/calendar-scheduling/calendar/calendar-04/calendar"
import Calendar05 from "@/registry/blocks/calendar-scheduling/calendar/calendar-05/calendar"

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

const CANVAS_STAGE = "bg-canvas p-0"

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

export default function BlockCalendarDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Calendar"
        pathname="/blocks/calendar-scheduling/calendar"
        description="Production calendars — month agenda, week timeline, day focus, public booking, and team availability."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="calendar-01"
          usage={[{ title: "app/page.tsx", code: usage("calendar-01") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <Calendar01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="calendar-02"
          usage={[{ title: "app/page.tsx", code: usage("calendar-02") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <Calendar02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="calendar-03"
          usage={[{ title: "app/page.tsx", code: usage("calendar-03") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <Calendar03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="calendar-04"
          usage={[{ title: "app/page.tsx", code: usage("calendar-04") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <Calendar04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="calendar-05"
          usage={[{ title: "app/page.tsx", code: usage("calendar-05") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <Calendar05 />
        </BlockExample>
      </div>
    </article>
  )
}
