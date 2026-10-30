import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import RestaurantReservationForm01 from "@/registry/blocks/forms/restaurant-reservation-form/restaurant-reservation-form-01/restaurant-reservation-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/restaurant-reservation-form",
  "Restaurant Reservation Form",
  "Ready-to-use Restaurant Reservation Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import RestaurantReservationForm from "@/components/blocks/forms/${name}/restaurant-reservation-form"

export default function Page() {
  return <RestaurantReservationForm />
}`

export default function BlockRestaurantReservationFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Restaurant Reservation Form"
        pathname="/blocks/forms/restaurant-reservation-form"
        description="Reserve a table with party size, date and time slots, seating preference, and occasion details."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="restaurant-reservation-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("restaurant-reservation-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <RestaurantReservationForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
