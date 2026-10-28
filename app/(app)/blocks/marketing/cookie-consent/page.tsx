import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import CookieConsent01 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-01/cookie-consent"
import CookieConsent02 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-02/cookie-consent"
import CookieConsent03 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-03/cookie-consent"
import CookieConsent04 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-04/cookie-consent"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/cookie-consent",
  "Cookie Consent",
  "Ready-to-use Cookie Consent UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import CookieConsent from "@/components/blocks/marketing/${name}/cookie-consent"

export default function Page() {
  return <CookieConsent />
}`

const previewProps = {
  previewAlign: "center" as const,
  previewClassName: "bg-canvas",
  previewSize: "compact" as const,
}

export default function BlockCookieConsentDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Cookie Consent"
        pathname="/blocks/marketing/cookie-consent"
        description="Bottom card, full-width strip, center modal, and a dark corner card."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="cookie-consent-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("cookie-consent-01"),
            },
          ]}
          {...previewProps}
        >
          <CookieConsent01 />
        </BlockExample>

        <BlockExample
          name="cookie-consent-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("cookie-consent-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas"
          previewSize="compact"
        >
          <CookieConsent02 />
        </BlockExample>

        <BlockExample
          name="cookie-consent-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("cookie-consent-03"),
            },
          ]}
          {...previewProps}
        >
          <CookieConsent03 />
        </BlockExample>

        <BlockExample
          name="cookie-consent-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("cookie-consent-04"),
            },
          ]}
          {...previewProps}
        >
          <CookieConsent04 />
        </BlockExample>
      </div>
    </article>
  )
}
