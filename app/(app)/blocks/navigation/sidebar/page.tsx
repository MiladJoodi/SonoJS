import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SimpleSidebar from "@/registry/blocks/navigation/sidebar/sidebar-01/sidebar"
import IconSidebar from "@/registry/blocks/navigation/sidebar/sidebar-02/sidebar"
import UserSidebar from "@/registry/blocks/navigation/sidebar/sidebar-03/sidebar"
import CollapsibleSidebar from "@/registry/blocks/navigation/sidebar/sidebar-04/sidebar"
import InsightsSidebar from "@/registry/blocks/navigation/sidebar/sidebar-05/sidebar"
import AccentSidebar from "@/registry/blocks/navigation/sidebar/sidebar-06/sidebar"
import SearchSidebar from "@/registry/blocks/navigation/sidebar/sidebar-07/sidebar"
import ChatSidebar from "@/registry/blocks/navigation/sidebar/sidebar-08/sidebar"
import DualRailSidebar from "@/registry/blocks/navigation/sidebar/sidebar-09/sidebar"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/navigation/sidebar", "Sidebar", "Ready-to-use Sidebar UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Sidebar from "@/components/blocks/navigation/${name}/sidebar"

export default function Page() {
  return <Sidebar />
}`

const previewProps = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas",
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

export default function BlockSidebarDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Sidebar"
        pathname="/blocks/navigation/sidebar"
        description="App side navigation with section labels and link groups. Pair with a top navbar or use as the primary chrome for dashboards."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="sidebar-01"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-01") }]}
          {...previewProps}
        >
          <SimpleSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-02"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-02") }]}
          {...previewProps}
        >
          <IconSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-03"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-03") }]}
          {...previewProps}
        >
          <UserSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-04"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-04") }]}
          {...previewProps}
        >
          <CollapsibleSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-05"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-05") }]}
          {...previewProps}
        >
          <InsightsSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-06"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-06") }]}
          {...previewProps}
        >
          <AccentSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-07"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-07") }]}
          {...previewProps}
        >
          <SearchSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-08"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-08") }]}
          {...previewProps}
        >
          <ChatSidebar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="sidebar-09"
          usage={[{ title: "app/page.tsx", code: usage("sidebar-09") }]}
          previewAlign="start"
          previewClassName="bg-white p-0 h-180 overflow-hidden dark:bg-background"
        >
          <div className="h-180">
            <DualRailSidebar />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
