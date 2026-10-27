import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SimpleColumnsFooter from "@/registry/blocks/marketing/footer/footer-01/footer"
import LogoSocialFooter from "@/registry/blocks/marketing/footer/footer-02/footer"
import DarkColumnsFooter from "@/registry/blocks/marketing/footer/footer-03/footer"
import BrandBlurbFooter from "@/registry/blocks/marketing/footer/footer-04/footer"
import GradientDarkFooter from "@/registry/blocks/marketing/footer/footer-05/footer"
import StoreColumnsFooter from "@/registry/blocks/marketing/footer/footer-06/footer"
import ContactNewsletterFooter from "@/registry/blocks/marketing/footer/footer-07/footer"
import CenteredSocialFooter from "@/registry/blocks/marketing/footer/footer-08/footer"
import MinimalBrandFooter from "@/registry/blocks/marketing/footer/footer-09/footer"
import NewsletterColumnsFooter from "@/registry/blocks/marketing/footer/footer-10/footer"
import PhotoSplitFooter from "@/registry/blocks/marketing/footer/footer-11/footer"
import NewsletterPillFooter from "@/registry/blocks/marketing/footer/footer-12/footer"
import CenteredMutedFooter from "@/registry/blocks/marketing/footer/footer-13/footer"
import ContactColumnsFooter from "@/registry/blocks/marketing/footer/footer-14/footer"
import CareerCtaFooter from "@/registry/blocks/marketing/footer/footer-15/footer"
import NewsletterLegalFooter from "@/registry/blocks/marketing/footer/footer-16/footer"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/footer", "Footer", "Ready-to-use Footer UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Footer from "@/components/blocks/marketing/${name}/footer"

export default function Page() {
  return <Footer />
}`

const previewProps = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

export default function BlockFooterDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Footer"
        pathname="/blocks/marketing/footer"
        description="Site footers with link columns, newsletters, and legal chrome — sixteen distinct layouts, each ready to drop in."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="footer-01"
          usage={[{ title: "app/page.tsx", code: usage("footer-01") }]}
          {...previewProps}
        >
          <SimpleColumnsFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-02"
          usage={[{ title: "app/page.tsx", code: usage("footer-02") }]}
          {...previewProps}
        >
          <LogoSocialFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-03"
          usage={[{ title: "app/page.tsx", code: usage("footer-03") }]}
          {...previewProps}
        >
          <DarkColumnsFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-04"
          usage={[{ title: "app/page.tsx", code: usage("footer-04") }]}
          {...previewProps}
        >
          <BrandBlurbFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-05"
          usage={[{ title: "app/page.tsx", code: usage("footer-05") }]}
          {...previewProps}
        >
          <GradientDarkFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-06"
          usage={[{ title: "app/page.tsx", code: usage("footer-06") }]}
          {...previewProps}
        >
          <StoreColumnsFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-07"
          usage={[{ title: "app/page.tsx", code: usage("footer-07") }]}
          {...previewProps}
        >
          <ContactNewsletterFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-08"
          usage={[{ title: "app/page.tsx", code: usage("footer-08") }]}
          {...previewProps}
        >
          <CenteredSocialFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-09"
          usage={[{ title: "app/page.tsx", code: usage("footer-09") }]}
          {...previewProps}
        >
          <MinimalBrandFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-10"
          usage={[{ title: "app/page.tsx", code: usage("footer-10") }]}
          {...previewProps}
        >
          <NewsletterColumnsFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-11"
          usage={[{ title: "app/page.tsx", code: usage("footer-11") }]}
          {...previewProps}
        >
          <PhotoSplitFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-12"
          usage={[{ title: "app/page.tsx", code: usage("footer-12") }]}
          {...previewProps}
        >
          <NewsletterPillFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-13"
          usage={[{ title: "app/page.tsx", code: usage("footer-13") }]}
          {...previewProps}
        >
          <CenteredMutedFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-14"
          usage={[{ title: "app/page.tsx", code: usage("footer-14") }]}
          {...previewProps}
        >
          <ContactColumnsFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-15"
          usage={[{ title: "app/page.tsx", code: usage("footer-15") }]}
          {...previewProps}
        >
          <CareerCtaFooter />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="footer-16"
          usage={[{ title: "app/page.tsx", code: usage("footer-16") }]}
          {...previewProps}
        >
          <NewsletterLegalFooter />
        </BlockExample>
      </div>
    </article>
  )
}
