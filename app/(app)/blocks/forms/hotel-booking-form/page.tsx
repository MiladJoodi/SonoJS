import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import HotelBookingForm01 from "@/registry/blocks/forms/hotel-booking-form/hotel-booking-form-01/hotel-booking-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/hotel-booking-form",
  "Hotel Booking Form",
  "Ready-to-use Hotel Booking Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import HotelBookingForm from "@/components/blocks/forms/${name}/hotel-booking-form"

export default function Page() {
  return <HotelBookingForm />
}`

export default function BlockHotelBookingFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Hotel Booking Form"
        pathname="/blocks/forms/hotel-booking-form"
        description="Reserve rooms with check-in dates, guest counters, room types, and a clear price breakdown."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="hotel-booking-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("hotel-booking-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <HotelBookingForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
