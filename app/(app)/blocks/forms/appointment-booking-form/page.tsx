import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AppointmentBookingForm01 from "@/registry/blocks/forms/appointment-booking-form/appointment-booking-form-01/appointment-booking-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/appointment-booking-form",
  "Appointment Booking Form",
  "Ready-to-use Appointment Booking Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AppointmentBookingForm from "@/components/blocks/forms/${name}/appointment-booking-form"

export default function Page() {
  return <AppointmentBookingForm />
}`

export default function BlockAppointmentBookingFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Appointment Booking Form"
        pathname="/blocks/forms/appointment-booking-form"
        description="Book services with specialists, calendar availability, time slots, and a live booking summary."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="appointment-booking-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("appointment-booking-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AppointmentBookingForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
