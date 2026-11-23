import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Follow Us",
  description:
    "Follow Us popup - board, night list, marquee chips, tile grid, or story phone.",
  path: "/popups/follow-us",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "follow-us", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsFollowUsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Follow Us"
        pathname="/popups/follow-us"
        description="Five social looks - cream board, night list, scrolling marquee, icon grid, or a story phone frame."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Social board</h2>
            <p className="text-sm text-muted-foreground">
              Five tinted badges stagger in. Counts animate to IG 48K, TT 126K, YT
              32K, FB 21K, and LI 9.4K.
            </p>
          </div>
          <PopupExample
            name="follow-us-01"
            usage={[
              { title: "app/page.tsx", code: usage("follow-us-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Night list</h2>
            <p className="text-sm text-muted-foreground">
              Vertical dark card - each channel is a full row with count, not a
              badge board. Same rolling numbers, different layout.
            </p>
          </div>
          <PopupExample
            name="follow-us-02"
            usage={[
              { title: "app/page.tsx", code: usage("follow-us-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Marquee chips</h2>
            <p className="text-sm text-muted-foreground">
              Wide cream card - channel chips scroll horizontally, then a Follow
              all CTA under the strip.
            </p>
          </div>
          <PopupExample
            name="follow-us-03"
            usage={[
              { title: "app/page.tsx", code: usage("follow-us-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Icon grid</h2>
            <p className="text-sm text-muted-foreground">
              Compact 3-column tile grid - each channel is a tinted square with
              abbr, count, and label.
            </p>
          </div>
          <PopupExample
            name="follow-us-04"
            usage={[
              { title: "app/page.tsx", code: usage("follow-us-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Story phone</h2>
            <p className="text-sm text-muted-foreground">
              Dark card with a phone-frame story preview, Follow CTA inside the
              device, and a compact channel list under it.
            </p>
          </div>
          <PopupExample
            name="follow-us-05"
            usage={[
              { title: "app/page.tsx", code: usage("follow-us-05") },
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
              type: '"board" | "night" | "marquee" | "grid" | "story"',
              defaultValue: '"board"',
              description:
                "board = cream badges; night = dark rows; marquee = scrolling chips; grid = tiles; story = phone frame.",
            },
            {
              name: "eyebrow",
              type: "string",
              defaultValue: '"FOLLOW US"',
              description: "Label above the headline.",
            },
            {
              name: "title",
              type: "React.ReactNode",
              defaultValue: "Come along for the ride.",
              description: "Headline (italic allowed).",
            },
            {
              name: "channels",
              type: "FollowUsChannel[]",
              defaultValue: "IG, TT, YT, FB, LI",
              description: "Social rows: abbr, label, href, count, background.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Follow"',
              description: "Primary CTA on marquee / story looks.",
            },
            {
              name: "dismissLabel",
              type: "string",
              defaultValue: '"Maybe later"',
              description: "Secondary dismiss link under the row.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "360",
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
