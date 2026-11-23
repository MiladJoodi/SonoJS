import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Away Notice",
  description:
    "Away Notice popup - postcard note, corkboard pin, out-of-office email, leave calendar, or door sign.",
  path: "/popups/away-notice",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "away-notice", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsAwayNoticeDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Away Notice"
        pathname="/popups/away-notice"
        description="Five away looks - sage postcard, corkboard pin, out-of-office email, leave calendar, or a be-back door sign."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Team note</h2>
            <p className="text-sm text-muted-foreground">
              Sage card with a tilted postcard on a landscape - stamp slams the return date.
            </p>
          </div>
          <PopupExample
            name="away-notice-01"
            usage={[{ title: "app/page.tsx", code: usage("away-notice-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Corkboard</h2>
            <p className="text-sm text-muted-foreground">
              Pinned note on a cork texture with a return date line.
            </p>
          </div>
          <PopupExample
            name="away-notice-02"
            usage={[{ title: "app/page.tsx", code: usage("away-notice-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Out of office</h2>
            <p className="text-sm text-muted-foreground">
              Email-style auto-reply chrome with a dashed return date.
            </p>
          </div>
          <PopupExample
            name="away-notice-03"
            usage={[{ title: "app/page.tsx", code: usage("away-notice-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Leave calendar</h2>
            <p className="text-sm text-muted-foreground">
              Calendar leave block with a closed date range.
            </p>
          </div>
          <PopupExample
            name="away-notice-04"
            usage={[{ title: "app/page.tsx", code: usage("away-notice-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Door sign</h2>
            <p className="text-sm text-muted-foreground">
              Wooden door-frame be-back sign with a stamped return time.
            </p>
          </div>
          <PopupExample
            name="away-notice-05"
            usage={[{ title: "app/page.tsx", code: usage("away-notice-05") }]}
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
              type: '"note" | "cork" | "email" | "calendar" | "door"',
              defaultValue: '"note"',
              description:
                "note = postcard; cork = pin board; email = OOO mail; calendar = leave block; door = be-back sign.",
            },
            {
              name: "titleLine1",
              type: "string",
              description: "First line of the title.",
            },
            {
              name: "titleLine2",
              type: "string",
              description: "Second line of the title.",
            },
            {
              name: "dateLabel",
              type: "React.ReactNode",
              description: "Return / closed date chrome.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Lovely, thank you"',
              description: "Primary dismiss / acknowledge control.",
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
