import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { DocsApiProps } from "@/components/docs"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Get the App",
  description:
    "Get the App popup - phone, pulse install, store pills, devices duo, or slim install banner.",
  path: "/popups/get-the-app",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "get-the-app", "position=\"fixed\"")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsGetTheAppDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Get the App"
        pathname="/popups/get-the-app"
        description="Five download looks - tilted phone, pulse install card, store pills only, phone + tablet duo, or a slim bottom install strip."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">App download</h2>
            <p className="text-sm text-muted-foreground">
              Phone swings in on the Y axis. Store links, rating, and QR sit on
              the right. Dark underlay keeps focus on the card.
            </p>
          </div>
          <PopupExample
            name="get-the-app-01"
            usage={[
              { title: "app/page.tsx", code: usage("get-the-app-01") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Pulse install</h2>
            <p className="text-sm text-muted-foreground">
              Dark navy card - pulsing lime rings around the app icon, feature
              chips, then store CTAs. No QR hero.
            </p>
          </div>
          <PopupExample
            name="get-the-app-02"
            usage={[
              { title: "app/page.tsx", code: usage("get-the-app-02") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Store pills</h2>
            <p className="text-sm text-muted-foreground">
              Clean download card - store badges only. No phone mock and no large
              QR hero.
            </p>
          </div>
          <PopupExample
            name="get-the-app-03"
            usage={[
              { title: "app/page.tsx", code: usage("get-the-app-03") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Devices duo</h2>
            <p className="text-sm text-muted-foreground">
              Phone and tablet side by side with stacked store CTAs on the right.
            </p>
          </div>
          <PopupExample
            name="get-the-app-04"
            usage={[
              { title: "app/page.tsx", code: usage("get-the-app-04") },
            ]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Install banner</h2>
            <p className="text-sm text-muted-foreground">
              Slim bottom strip (~720×160) - small QR, short copy, store pills.
            </p>
          </div>
          <PopupExample
            name="get-the-app-05"
            usage={[
              { title: "app/page.tsx", code: usage("get-the-app-05") },
            ]}
            previewSize="compact"
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
              type: '"phone" | "pulse" | "stores" | "devices" | "banner"',
              defaultValue: '"phone"',
              description:
                "phone = navy tilted phone; pulse = icon rings + chips; stores = pills only; devices = phone+tablet; banner = slim strip.",
            },
            {
              name: "eyebrow",
              type: "string",
              defaultValue: '"GET THE APP"',
              description: "Label above the headline.",
            },
            {
              name: "title",
              type: "React.ReactNode",
              defaultValue: "Your kitchen, in your pocket.",
              description: "Headline (italic allowed).",
            },
            {
              name: "appStoreHref",
              type: "string",
              defaultValue: '"#"',
              description: "App Store URL. Demo default is `#` (no navigation).",
            },
            {
              name: "googlePlayHref",
              type: "string",
              defaultValue: '"#"',
              description: "Play Store URL. Demo default is `#` (no navigation).",
            },
            {
              name: "rating",
              type: "number",
              defaultValue: "4.8",
              description: "Star fill out of 5.",
            },
            {
              name: "screenSrc",
              type: "string",
              defaultValue: "bundled app-screen.webp",
              description: "Phone/tablet screen image (`phone` / `devices`).",
            },
            {
              name: "qrSrc",
              type: "string",
              defaultValue: "bundled app-qr.webp",
              description: "QR code image URL.",
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
