import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SocialLinks01 from "@/registry/blocks/marketing/social-links/social-links-01/social-links"

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
        description="Link-in-bio profile with atmosphere, glass card, tone-colored destinations, and social chips."
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
      </div>
    </article>
  )
}
