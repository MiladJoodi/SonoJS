import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Luck Wheel",
  description:
    "Luck Wheel popup - classic casino, neon, minimal, ticket, or arcade spin with prize codes.",
  path: "/popups/luck-wheel",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "luck-wheel", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsLuckWheelDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Luck Wheel"
        pathname="/popups/luck-wheel"
        description="Five spin looks - classic gold casino, neon glow, flat minimal, carnival ticket, or arcade bezel. Same Slow / Normal / Fast math in every look."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Casino spin</h2>
            <p className="text-sm text-muted-foreground">
              Sixteen slices - multipliers, Jackpot, Mega, and Empty. Gold rim,
              center Spin, then copy the code.
            </p>
          </div>
          <PopupExample
            name="luck-wheel-01"
            usage={[
              { title: "app/page.tsx", code: usage("luck-wheel-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Neon</h2>
            <p className="text-sm text-muted-foreground">
              Cyan / magenta rim glow on a dark card. Fewer slices, louder
              lights - same spin rules.
            </p>
          </div>
          <PopupExample
            name="luck-wheel-02"
            usage={[
              { title: "app/page.tsx", code: usage("luck-wheel-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Minimal</h2>
            <p className="text-sm text-muted-foreground">
              White card, gray slices, no spark chrome - quiet spin for calmer
              brands.
            </p>
          </div>
          <PopupExample
            name="luck-wheel-03"
            usage={[
              { title: "app/page.tsx", code: usage("luck-wheel-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Ticket</h2>
            <p className="text-sm text-muted-foreground">
              Cream carnival stub with dashed border and side notches around the
              wheel.
            </p>
          </div>
          <PopupExample
            name="luck-wheel-04"
            usage={[
              { title: "app/page.tsx", code: usage("luck-wheel-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Arcade</h2>
            <p className="text-sm text-muted-foreground">
              Chunky amber / violet bezel, dense bright segments, loud win
              chrome.
            </p>
          </div>
          <PopupExample
            name="luck-wheel-05"
            usage={[
              { title: "app/page.tsx", code: usage("luck-wheel-05") },
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
              type: '"classic" | "neon" | "minimal" | "ticket" | "arcade"',
              defaultValue: '"classic"',
              description:
                "Chrome / palette only - spin math stays the same.",
            },
            {
              name: "segments",
              type: "LuckWheelSegment[]",
              defaultValue: "look defaults",
              description:
                "Wheel slices: `label`, optional `offer` / `code`, `color`, `empty`.",
            },
            {
              name: "defaultSpeed",
              type: '"slow" | "normal" | "fast"',
              defaultValue: '"normal"',
              description: "Initial spin speed preset.",
            },
            {
              name: "pickIndex",
              type: "(segments) => number",
              description: "Optional weighted picker; defaults to uniform random.",
            },
            {
              name: "onResult",
              type: "(segment, index) => void",
              description: "Fires when the wheel stops.",
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
