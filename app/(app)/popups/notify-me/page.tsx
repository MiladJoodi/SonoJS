import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Notify Me",
  description:
    "Notify Me popup - bell, shelf, SMS, calendar drop, or compact corner toast waitlist.",
  path: "/popups/notify-me",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "notify-me", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsNotifyMeDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Notify Me"
        pathname="/popups/notify-me"
        description="Five waitlist looks - ringing bell, cream shelf, SMS capture, calendar drop date, or a compact corner toast."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Back in stock</h2>
            <p className="text-sm text-muted-foreground">
              Gold pulse around the bell, pill email field, Notify me CTA, then a
              success swap.
            </p>
          </div>
          <PopupExample
            name="notify-me-01"
            usage={[
              { title: "app/page.tsx", code: usage("notify-me-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Shelf waitlist</h2>
            <p className="text-sm text-muted-foreground">
              Warm cream card - product on a shelf, Sold out eyebrow, email
              capture, then a success state. No bell chrome.
            </p>
          </div>
          <PopupExample
            name="notify-me-02"
            usage={[
              { title: "app/page.tsx", code: usage("notify-me-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">SMS notify</h2>
            <p className="text-sm text-muted-foreground">
              Phone number capture instead of email - one SMS when it restocks.
            </p>
          </div>
          <PopupExample
            name="notify-me-03"
            usage={[
              { title: "app/page.tsx", code: usage("notify-me-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Calendar drop</h2>
            <p className="text-sm text-muted-foreground">
              Drop date tile on the left, email reminder form on the right.
            </p>
          </div>
          <PopupExample
            name="notify-me-04"
            usage={[
              { title: "app/page.tsx", code: usage("notify-me-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Corner toast</h2>
            <p className="text-sm text-muted-foreground">
              Compact waitlist card that sits in the bottom-end corner.
            </p>
          </div>
          <PopupExample
            name="notify-me-05"
            usage={[
              { title: "app/page.tsx", code: usage("notify-me-05") },
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
              type: '"bell" | "shelf" | "sms" | "calendar" | "toast"',
              defaultValue: '"bell"',
              description:
                "bell = navy ringing bell; shelf = cream product; sms = phone capture; calendar = drop date; toast = compact corner.",
            },
            {
              name: "eyebrow",
              type: "string",
              defaultValue: '"BACK IN STOCK SOON"',
              description: "Label above the headline.",
            },
            {
              name: "title",
              type: "React.ReactNode",
              defaultValue: '"Be the first to know."',
              description: "Main headline. Italics render via nested <i>.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Notify me"',
              description: "Submit pill label.",
            },
            {
              name: "onSubmit",
              type: "(value: string) => void | Promise<void>",
              description:
                "Called with the trimmed email or phone (sms) before the success state.",
            },
            {
              name: "dropDateLabel",
              type: "string",
              defaultValue: '"Nov 28"',
              description: "Date shown on the calendar look.",
            },
            {
              name: "successEyebrow",
              type: "string",
              defaultValue: '"YOU ARE ON THE LIST"',
              description: "Label shown after a successful submit.",
            },
            {
              name: "bellSrc",
              type: "string",
              defaultValue: "bundled notify-bell.webp",
              description: "Bell image (`bell` / `toast`).",
            },
            {
              name: "productSrc",
              type: "string",
              defaultValue: "bundled waitlist-lamp.webp",
              description: "Product image (`shelf` / `calendar`).",
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
