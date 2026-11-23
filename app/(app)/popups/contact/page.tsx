import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact popup - corner pill, chat bubbles, business card, hotline, or support desk.",
  path: "/popups/contact",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "contact", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsContactDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Contact"
        pathname="/popups/contact"
        description="Five support looks - corner pill, messenger chat, business card, hotline number, or desk hours."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Corner pill</h2>
            <p className="text-sm text-muted-foreground">
              Bottom-end card with online avatar, Call / WhatsApp / Email. No underlay.
            </p>
          </div>
          <PopupExample
            name="contact-01"
            usage={[{ title: "app/page.tsx", code: usage("contact-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Chat bubbles</h2>
            <p className="text-sm text-muted-foreground">
              Messenger-style thread preview with channel CTAs under the bubbles.
            </p>
          </div>
          <PopupExample
            name="contact-02"
            usage={[{ title: "app/page.tsx", code: usage("contact-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Business card</h2>
            <p className="text-sm text-muted-foreground">
              Split card - brand stripe + phone / email actions.
            </p>
          </div>
          <PopupExample
            name="contact-03"
            usage={[{ title: "app/page.tsx", code: usage("contact-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Hotline</h2>
            <p className="text-sm text-muted-foreground">
              Dark card with a large tap-to-call phone number.
            </p>
          </div>
          <PopupExample
            name="contact-04"
            usage={[{ title: "app/page.tsx", code: usage("contact-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Support desk</h2>
            <p className="text-sm text-muted-foreground">
              Hours block plus Call / Chat / Email tiles.
            </p>
          </div>
          <PopupExample
            name="contact-05"
            usage={[{ title: "app/page.tsx", code: usage("contact-05") }]}
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
              type: '"pill" | "chat" | "card" | "hotline" | "desk"',
              defaultValue: '"pill"',
              description:
                "pill = corner card; chat = bubbles; card = business card; hotline = big number; desk = hours.",
            },
            {
              name: "callHref",
              type: "string",
              defaultValue: '"#"',
              description: "Call destination. Demo default is `#` (no navigation).",
            },
            {
              name: "whatsappHref",
              type: "string",
              defaultValue: '"#"',
              description:
                "WhatsApp / chat destination. Demo default is `#` (no navigation).",
            },
            {
              name: "emailHref",
              type: "string",
              defaultValue: '"#"',
              description: "Email destination. Demo default is `#` (no navigation).",
            },
            {
              name: "phoneDisplay",
              type: "string",
              description: "Visible phone on card / hotline looks.",
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
