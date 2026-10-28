import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SocialLinks01 from "@/registry/blocks/marketing/social-links/social-links-01/social-links"
import SocialLinks02 from "@/registry/blocks/marketing/social-links/social-links-02/social-links"
import SocialLinks03 from "@/registry/blocks/marketing/social-links/social-links-03/social-links"
import SocialLinks04 from "@/registry/blocks/marketing/social-links/social-links-04/social-links"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/social-links",
  "Social Links",
  "Ready-to-use Social Links UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import SocialLinks from "@/components/blocks/marketing/${name}/social-links"

export default function Page() {
  return <SocialLinks />
}`

export default function BlockSocialLinksDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Social Links"
        pathname="/blocks/marketing/social-links"
        description="Link-in-bio profiles — glass card, dark cinematic, split magazine, and site-simple Sono chrome."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="social-links-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("social-links-01"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <SocialLinks01 />
        </BlockExample>

        <BlockExample
          name="social-links-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("social-links-02"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-zinc-950 p-0"
        >
          <SocialLinks02 />
        </BlockExample>

        <BlockExample
          name="social-links-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("social-links-03"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <SocialLinks03 />
        </BlockExample>

        <BlockExample
          name="social-links-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("social-links-04"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
          previewSize="compact"
        >
          <SocialLinks04 />
        </BlockExample>
      </div>
    </article>
  )
}
