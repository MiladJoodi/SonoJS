import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Event Invite",
  description:
    "Event Invite popup - invite card, concert poster, calendar event, guest pass, or save-the-date.",
  path: "/popups/event-invite",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "event-invite", "position=\"fixed\" startsAt=\"2027-03-12T19:00:00\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsEventInviteDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Event Invite"
        pathname="/popups/event-invite"
        description="Five invite looks - plum calendar invite, concert poster, ICS card, wristband pass, or foil save-the-date. Live countdown in every look."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Invite card</h2>
            <p className="text-sm text-muted-foreground">
              Plum card with a swinging calendar page, venue copy, and countdown.
            </p>
          </div>
          <PopupExample
            name="event-invite-01"
            usage={[{ title: "app/page.tsx", code: usage("event-invite-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Poster</h2>
            <p className="text-sm text-muted-foreground">
              Tall concert-style poster with bold type and a peach CTA.
            </p>
          </div>
          <PopupExample
            name="event-invite-02"
            usage={[{ title: "app/page.tsx", code: usage("event-invite-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Calendar event</h2>
            <p className="text-sm text-muted-foreground">
              Light ICS-style card - date rail + save event actions.
            </p>
          </div>
          <PopupExample
            name="event-invite-03"
            usage={[{ title: "app/page.tsx", code: usage("event-invite-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Guest pass</h2>
            <p className="text-sm text-muted-foreground">
              Wristband / pass strip with a dashed stub edge.
            </p>
          </div>
          <PopupExample
            name="event-invite-04"
            usage={[{ title: "app/page.tsx", code: usage("event-invite-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Save the date</h2>
            <p className="text-sm text-muted-foreground">
              Foil gold on dark - save-the-date card with countdown.
            </p>
          </div>
          <PopupExample
            name="event-invite-05"
            usage={[{ title: "app/page.tsx", code: usage("event-invite-05") }]}
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
              type: '"invite" | "poster" | "calendar" | "pass" | "save"',
              defaultValue: '"invite"',
              description:
                "invite = plum card; poster = concert; calendar = ICS; pass = wristband; save = foil STD.",
            },
            {
              name: "startsAt",
              type: "string | Date",
              description: "ISO datetime driving the live countdown.",
            },
            {
              name: "monthLabel",
              type: "string",
              defaultValue: '"MARCH"',
              description: "Month shown on calendar chrome.",
            },
            {
              name: "dayLabel",
              type: "string",
              defaultValue: '"12"',
              description: "Day number.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Save my seat"',
              description: "Primary RSVP / save control.",
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
