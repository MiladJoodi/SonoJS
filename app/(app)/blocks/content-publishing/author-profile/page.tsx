import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AuthorProfile01 from "@/registry/blocks/content-publishing/author-profile/author-profile-01/author-profile"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/content-publishing/author-profile",
  "Author Profile",
  "Ready-to-use Author Profile UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AuthorProfile from "@/components/blocks/content-publishing/${name}/author-profile"

export default function Page() {
  return <AuthorProfile />
}`

export default function BlockAuthorProfileDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Author Profile"
        pathname="/blocks/content-publishing/author-profile"
        description="Author cards with follow, stats, tags, links, and recent posts — shown as a marketing grid."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="author-profile-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("author-profile-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AuthorProfile01 />
        </BlockExample>
      </div>
    </article>
  )
}
