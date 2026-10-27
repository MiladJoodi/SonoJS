import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import CookieConsent01 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-01/cookie-consent"

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

export default function BlockCookieConsentDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Cookie Consent"
        pathname="/blocks/marketing/cookie-consent"
        description="Lean bottom cookie bars — Accept, Reject, and Manage preferences without the clutter."
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
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <CookieConsent01 />
        </BlockExample>
      </div>
    </article>
  )
}
