import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Sale Signup",
  description:
    "Early Black Friday email signup modal - five looks (houses, coupon, VIP, inbox, split).",
  path: "/popups/sale-signup",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "sale-signup", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsSaleSignupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Sale Signup"
        pathname="/popups/sale-signup"
        description="A split signup modal for early Black Friday: email capture, house-shaped discount tiers, and a matching free-gift house card. Five looks - cream houses, teal coupon, gold VIP, blue inbox, and coral split."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">House tiers</h2>
            <p className="text-sm text-muted-foreground">
              Cream email panel, burgundy house-shaped tiers, and a matching free-gift house card.
            </p>
          </div>
          <PopupExample
            name="sale-signup-01"
            usage={[{ title: "app/page.tsx", code: usage("sale-signup-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Coupon form</h2>
            <p className="text-sm text-muted-foreground">
              Teal and mint coupon panel - clip the deal into your inbox.
            </p>
          </div>
          <PopupExample
            name="sale-signup-02"
            usage={[{ title: "app/page.tsx", code: usage("sale-signup-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">VIP pass</h2>
            <p className="text-sm text-muted-foreground">
              Black and gold members panel for exclusive early tiers.
            </p>
          </div>
          <PopupExample
            name="sale-signup-03"
            usage={[{ title: "app/page.tsx", code: usage("sale-signup-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Inbox capture</h2>
            <p className="text-sm text-muted-foreground">
              Slate and blue email capture - deals land in your mail.
            </p>
          </div>
          <PopupExample
            name="sale-signup-04"
            usage={[{ title: "app/page.tsx", code: usage("sale-signup-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Split offer</h2>
            <p className="text-sm text-muted-foreground">
              Coral form with a navy tier panel - two sides, one offer.
            </p>
          </div>
          <PopupExample
            name="sale-signup-05"
            usage={[{ title: "app/page.tsx", code: usage("sale-signup-05") }]}
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
              type: '"houses" | "coupon-form" | "vip-pass" | "inbox-capture" | "split-offer"',
              defaultValue: '"houses"',
              description:
                "houses cream/burgundy · coupon-form teal · vip-pass black/gold · inbox-capture slate/blue · split-offer coral/navy.",
            },
            {
              name: "eyebrow",
              type: "string",
              defaultValue: '"BLACK FRIDAY CAME EARLY"',
              description: "Small label above the title.",
            },
            {
              name: "ctaLabel",
              type: "string",
              defaultValue: '"Get the deals"',
              description: "Submit button label.",
            },
            {
              name: "delayMs",
              type: "number",
              defaultValue: "0",
              description: "Auto-open delay in milliseconds.",
            },
            {
              name: "position",
              type: '"fixed" | "absolute"',
              defaultValue: '"absolute"',
              description:
                "Use fixed on live sites; absolute inside a relative demo stage.",
            },
            {
              name: "onSubmit",
              type: "(email: string) => void | Promise<void>",
              description: "Called with the email when the form submits.",
            },
          ]}
        />
      </section>
    </article>
  )
}
