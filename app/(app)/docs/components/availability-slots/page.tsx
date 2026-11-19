import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
  DocsRelated,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "availability-slots",
  "Availability Slots"
)

const exampleDefs = [
  {
    name: "availability-slots-gallery",
    title: "Gallery",
    description:
      "Calendar + time list — pick a day, then choose a free opening.",
    requires: ["button", "calendar", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "availability-slots-default",
    title: "Basic",
    description: "Single-column list built with `expandRangesToTimeSlots`.",
    requires: ["button"],
  },
  {
    name: "availability-slots-controlled",
    title: "Controlled",
    description: "Drive `value` / `onValueChange` with an external Clear.",
    requires: ["button"],
  },
  {
    name: "availability-slots-columns",
    title: "Columns",
    description: "Dense grid with `columns={3}`.",
    requires: ["button"],
  },
  {
    name: "availability-slots-disabled",
    title: "Disabled",
    description: "Per-slot `disabled` or disable the whole list.",
    requires: ["button"],
  },
  {
    name: "availability-slots-form",
    title: "Form",
    description: "Pair with `Field` and submit the selected slot JSON.",
    requires: ["button", "field"],
  },
]

const usageSource = `import {
  AvailabilitySlots,
  expandRangesToTimeSlots,
} from "@/components/availability-slots"

const slots = expandRangesToTimeSlots(
  [{ startMinutes: 9 * 60, endMinutes: 12 * 60 }],
  30
)

export function Example() {
  return (
    <AvailabilitySlots
      slots={slots}
      onValueChange={(id) => console.log(id)}
    />
  )
}`

export default async function AvailabilitySlotsDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Availability Slots"
        pathname="/docs/components/availability-slots"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Bookable time buttons for a single day — the Cal.com-style picker.
            Pair with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              Calendar
            </code>{" "}
            for the date, and use{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              Availability
            </code>{" "}
            when hosts edit weekly free hours.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
          previewClassName="items-start !min-h-0 py-6 sm:py-8"
        />
      </section>

      <DocsInstallation name="availability-slots" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="availability-slots.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "slots",
              type: "AvailabilityTimeSlot[]",
              defaultValue: "-",
              description:
                "Bookable openings (`id`, `startMinutes`, optional `endMinutes` / `label` / `disabled`).",
            },
            {
              name: "value",
              type: "string | null",
              defaultValue: "-",
              description: "Controlled selected slot id.",
            },
            {
              name: "defaultValue",
              type: "string | null",
              defaultValue: "null",
              description: "Initial selection when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(value: string | null) => void",
              defaultValue: "-",
              description: "Fires on select; click again to clear.",
            },
            {
              name: "columns",
              type: "1 | 2 | 3",
              defaultValue: "1",
              description: "Button grid density.",
            },
            {
              name: "emptyText",
              type: "string",
              defaultValue: '"No times available"',
              description: "Copy when `slots` is empty.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables every slot.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the root.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/availability",
            title: "Availability",
            description: "edit weekly free hours",
          },
          {
            href: "/docs/components/calendar",
            title: "Calendar",
            description: "pick the booking day",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label the time list",
          },
        ]}
      />
    </article>
  )
}
