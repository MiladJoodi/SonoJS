import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Advent Door",
  description:
    "Advent Door popup - five looks (door, calendar-grid, wreath, candle, parcel).",
  path: "/popups/advent-door",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "advent-door", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsAdventDoorDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Advent Door"
        pathname="/popups/advent-door"
        description="Open today’s door for snow, rays, and the offer code. Five looks - evergreen door, blue calendar-grid, holly wreath, warm candle, and kraft parcel."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Open today’s door</h2>
            <p className="text-sm text-muted-foreground">
              The red door swings on a hinge; light, burst, and the behind-door offer appear with the checkout code.
            </p>
          </div>
          <PopupExample
            name="advent-door-01"
            usage={[
              { title: "app/page.tsx", code: usage("advent-door-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Calendar grid</h2>
            <p className="text-sm text-muted-foreground">
              Blue winter grid - open today’s square for the home-goods cut.
            </p>
          </div>
          <PopupExample
            name="advent-door-02"
            usage={[
              { title: "app/page.tsx", code: usage("advent-door-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Wreath</h2>
            <p className="text-sm text-muted-foreground">
              Holly green stage - festive door for garlands and wreaths.
            </p>
          </div>
          <PopupExample
            name="advent-door-03"
            usage={[
              { title: "app/page.tsx", code: usage("advent-door-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Candle</h2>
            <p className="text-sm text-muted-foreground">
              Warm amber glow - light today’s door for the candle-hour offer.
            </p>
          </div>
          <PopupExample
            name="advent-door-04"
            usage={[
              { title: "app/page.tsx", code: usage("advent-door-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Parcel</h2>
            <p className="text-sm text-muted-foreground">
              Kraft-wrapped door - unwrap for gift wrap and parcel savings.
            </p>
          </div>
          <PopupExample
            name="advent-door-05"
            usage={[
              { title: "app/page.tsx", code: usage("advent-door-05") },
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
              type: '"door" | "calendar-grid" | "wreath" | "candle" | "parcel"',
              defaultValue: '"door"',
              description:
                "door evergreen · calendar-grid blue · wreath holly · candle amber · parcel kraft.",
            },
            {
              name: "doorNumber",
              type: "string | number",
              defaultValue: "7",
              description: "Number painted on the closed door.",
            },
            {
              name: "code",
              type: "string",
              defaultValue: '"ADVENT7"',
              description: "Checkout code revealed behind the door.",
            },
            {
              name: "offerPercent",
              type: "string",
              defaultValue: '"20%"',
              description: "Large offer figure inside the doorway.",
            },
            {
              name: "openDoorLabel",
              type: "string",
              defaultValue: '"Open the door"',
              description: "CTA before the door opens.",
            },
            {
              name: "shopLabel",
              type: "string",
              defaultValue: '"Shop the offer"',
              description: "CTA after the door opens.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onOpenDoor",
              type: "() => void",
              description: "Fires when the visitor opens the door.",
            },
          ]}
        />
      </section>
    </article>
  )
}
