import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Age Check",
  description:
    "Age Check popup - orbit, stamp, classic, ID card, or split Yes / No gate.",
  path: "/popups/age-check",
})

const usage = (name: string) =>
  popupUsageSnippet(
    name,
    "age-check",
    `        position="fixed"
        onConfirm={() => {
          // allow entry
        }}
        onDeny={() => {
          // redirect away
        }}`
  )

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsAgeCheckDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Age Check"
        pathname="/popups/age-check"
        description="Five gates - gold orbit, passport stamp, classic Yes / No, ID-card DOB, or a full-bleed split."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Orbit gate</h2>
            <p className="text-sm text-muted-foreground">
              Dark burgundy card. Gold ring spins, 18+ rolls into place, then Yes /
              No. Near-opaque underlay.
            </p>
          </div>
          <PopupExample
            name="age-check-01"
            usage={[
              { title: "app/page.tsx", code: usage("age-check-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Passport stamp</h2>
            <p className="text-sm text-muted-foreground">
              Cream paper card - lined sheet, crimson ink seal, then Enter / Leave
              stacked full-width.
            </p>
          </div>
          <PopupExample
            name="age-check-02"
            usage={[
              { title: "app/page.tsx", code: usage("age-check-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Classic gate</h2>
            <p className="text-sm text-muted-foreground">
              The everyday pattern - white card, shield, clear question, Yes / No
              side by side, short legal line under the buttons.
            </p>
          </div>
          <PopupExample
            name="age-check-03"
            usage={[
              { title: "app/page.tsx", code: usage("age-check-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">ID card</h2>
            <p className="text-sm text-muted-foreground">
              Landscape plastic ID - photo strip, DOB columns, then Confirm /
              Leave at 46px side by side.
            </p>
          </div>
          <PopupExample
            name="age-check-04"
            usage={[
              { title: "app/page.tsx", code: usage("age-check-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Split gate</h2>
            <p className="text-sm text-muted-foreground">
              Full-bleed card split in half - huge Yes on green, huge No on muted
              charcoal. Tap either side.
            </p>
          </div>
          <PopupExample
            name="age-check-05"
            usage={[
              { title: "app/page.tsx", code: usage("age-check-05") },
            ]}
            {...shell}
          />
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "look",
              type: '"orbit" | "stamp" | "classic" | "id" | "split"',
              defaultValue: '"orbit"',
              description:
                "orbit = gold ring; stamp = passport seal; classic = Yes/No card; id = plastic ID + DOB; split = Yes|No halves.",
            },
            {
              name: "eyebrow",
              type: "string",
              defaultValue: '"AGE CHECK"',
              description: "Small label above the title.",
            },
            {
              name: "ageLabel",
              type: "string",
              defaultValue: '"18+"',
              description: "Age shown in the ring, stamp, or classic eyebrow.",
            },
            {
              name: "title",
              type: "string",
              defaultValue: '"Are you 18 or older?"',
              description: "Main question.",
            },
            {
              name: "description",
              type: "string",
              defaultValue:
                '"You must be of legal drinking age to enter this site."',
              description: "Supporting line under the title.",
            },
            {
              name: "confirmLabel",
              type: "string",
              defaultValue: '"Yes, I am 18+"',
              description: "Primary enter control.",
            },
            {
              name: "denyLabel",
              type: "string",
              defaultValue: '"No, take me back"',
              description: "Secondary leave control.",
            },
            {
              name: "finePrint",
              type: "string",
              description:
                "Legal line under the buttons (classic / id). Ignored by orbit / stamp / split.",
            },
            {
              name: "denyHref",
              type: "string",
              defaultValue: '"#"',
              description: "Where the deny link goes when `onDeny` is not used.",
            },
            {
              name: "onConfirm",
              type: "() => void",
              description: "Fires when the visitor confirms age.",
            },
            {
              name: "onDeny",
              type: "() => void",
              description:
                "Fires when the visitor declines (also closes the gate).",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "320",
              description: "Auto-open delay when `defaultOpen` is true.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"fixed"',
              description: "`absolute` for framed demos; `fixed` for live sites.",
            },
          ]}
        />
      </section>
    </article>
  )
}
