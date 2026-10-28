import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AuthorProfile01 from "@/registry/blocks/content-publishing/author-profile/author-profile-01/author-profile"
import AuthorProfile02 from "@/registry/blocks/content-publishing/author-profile/author-profile-02/author-profile"
import AuthorProfile03 from "@/registry/blocks/content-publishing/author-profile/author-profile-03/author-profile"
import AuthorProfile04 from "@/registry/blocks/content-publishing/author-profile/author-profile-04/author-profile"
import AuthorProfile05 from "@/registry/blocks/content-publishing/author-profile/author-profile-05/author-profile"
import AuthorProfile06 from "@/registry/blocks/content-publishing/author-profile/author-profile-06/author-profile"
import AuthorProfile07 from "@/registry/blocks/content-publishing/author-profile/author-profile-07/author-profile"
import AuthorProfile08 from "@/registry/blocks/content-publishing/author-profile/author-profile-08/author-profile"
import AuthorProfile09 from "@/registry/blocks/content-publishing/author-profile/author-profile-09/author-profile"
import AuthorProfile10 from "@/registry/blocks/content-publishing/author-profile/author-profile-10/author-profile"

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

const CANVAS_STAGE = "bg-canvas p-0"

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

export default function BlockAuthorProfileDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Author Profile"
        pathname="/blocks/content-publishing/author-profile"
        description="Publishing identity — directory cards, profile hero, cover split, compact rows, spotlight theater, tabs workspace, type bio, team rail, stats dashboard, and social chip card."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="author-profile-01"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-01") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-02"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-02") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-03"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-03") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-04"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-04") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-05"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-05") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-06"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-06") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile06 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-07"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-07") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-08"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-08") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile08 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-09"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-09") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile09 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="author-profile-10"
          usage={[{ title: "app/page.tsx", code: usage("author-profile-10") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <AuthorProfile10 />
        </BlockExample>
      </div>
    </article>
  )
}
