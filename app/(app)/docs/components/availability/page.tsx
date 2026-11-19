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

export const metadata = componentDocsMetadata("availability", "Availability")

const exampleDefs = [
  {
    name: "availability-gallery",
    title: "Gallery",
    description:
      "Week grid with a slot count badge. Drag empty cells to paint free time.",
    requires: ["badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "availability-default",
    title: "Basic",
    description: "Uncontrolled grid with a couple of seed slots.",
  },
  {
    name: "availability-controlled",
    title: "Controlled",
    description: "Drive `value` / `onValueChange` with an external Clear all.",
    requires: ["button"],
  },
  {
    name: "availability-slot-size",
    title: "Slot size",
    description: "Finer snap with `slotMinutes={15}`.",
  },
  {
    name: "availability-disabled",
    title: "Disabled / read-only",
    description: "`disabled` dims the grid; `readOnly` keeps it visible but locked.",
  },
  {
    name: "availability-form",
    title: "Form",
    description: "Pair with `Field` and submit a JSON summary of slots.",
    requires: ["field", "button"],
  },
]

const usageSource = `import { Availability } from "@/components/availability"

export function Example() {
  return (
    <Availability
      defaultValue={[
        { id: "mon", day: 1, startMinutes: 9 * 60, endMinutes: 12 * 60 },
      ]}
      onValueChange={(slots) => console.log(slots)}
    />
  )
}`

export default async function AvailabilityDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Availability"
        pathname="/docs/components/availability"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Weekly free-time editor for hosts. Drag empty cells to paint hours,
            resize edges, and press Delete to remove a block. For guests picking
            a bookable opening, use{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              Availability Slots
            </code>
            .
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

      <DocsInstallation name="availability" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="availability.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "AvailabilitySlot[]",
              defaultValue: "-",
              description:
                "Controlled slots (`id`, `day` 0–6, `startMinutes`, `endMinutes`).",
            },
            {
              name: "defaultValue",
              type: "AvailabilitySlot[]",
              defaultValue: "[]",
              description: "Initial slots when uncontrolled.",
            },
            {
              name: "onValueChange",
              type: "(slots: AvailabilitySlot[]) => void",
              defaultValue: "-",
              description: "Fires after paint, resize, merge, or delete.",
            },
            {
              name: "weekStartsOn",
              type: "0 | 1",
              defaultValue: "1",
              description: "`0` Sunday, `1` Monday. Display order also follows dir.",
            },
            {
              name: "dayStartMinutes",
              type: "number",
              defaultValue: "480",
              description: "Visible day start from midnight (default 8:00).",
            },
            {
              name: "dayEndMinutes",
              type: "number",
              defaultValue: "1200",
              description: "Visible day end from midnight (default 20:00).",
            },
            {
              name: "slotMinutes",
              type: "number",
              defaultValue: "30",
              description: "Snap increment for paint and resize.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables interaction and dims the grid.",
            },
            {
              name: "readOnly",
              type: "boolean",
              defaultValue: "false",
              description: "Shows slots without paint, resize, or delete.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Merged onto the root surface.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/availability-slots",
            title: "Availability Slots",
            description: "bookable time buttons for a day",
          },
          {
            href: "/docs/components/calendar",
            title: "Calendar",
            description: "pick dates on a month grid",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "label and describe the week",
          },
        ]}
      />
    </article>
  )
}
