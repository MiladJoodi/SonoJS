import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import InlineCreateCommandMenu from "@/registry/blocks/navigation/command-menu/command-menu-01/command-menu"
import GlobalLauncherCommandMenu from "@/registry/blocks/navigation/command-menu/command-menu-02/command-menu"
import PeopleScoutCommandMenu from "@/registry/blocks/navigation/command-menu/command-menu-03/command-menu"
import CodeJumpCommandMenu from "@/registry/blocks/navigation/command-menu/command-menu-04/command-menu"
import IntegrationSplitCommandMenu from "@/registry/blocks/navigation/command-menu/command-menu-05/command-menu"
import SlashStudioCommandMenu from "@/registry/blocks/navigation/command-menu/command-menu-06/command-menu"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/navigation/command-menu", "Command Menu", "Ready-to-use Command Menu UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import CommandMenu from "@/components/blocks/navigation/${name}/command-menu"

export default function Page() {
  return <CommandMenu />
}`

const previewProps = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0 overflow-hidden",
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

export default function BlockCommandMenuDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Command Menu"
        pathname="/blocks/navigation/command-menu"
        description="Searchable command palettes — embedded create, global launcher, people scout, file jump, integrations, and slash actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="command-menu-01"
          usage={[{ title: "app/page.tsx", code: usage("command-menu-01") }]}
          {...previewProps}
        >
          <InlineCreateCommandMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="command-menu-02"
          usage={[{ title: "app/page.tsx", code: usage("command-menu-02") }]}
          {...previewProps}
        >
          <GlobalLauncherCommandMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="command-menu-03"
          usage={[{ title: "app/page.tsx", code: usage("command-menu-03") }]}
          {...previewProps}
        >
          <PeopleScoutCommandMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="command-menu-04"
          usage={[{ title: "app/page.tsx", code: usage("command-menu-04") }]}
          {...previewProps}
        >
          <CodeJumpCommandMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="command-menu-05"
          usage={[{ title: "app/page.tsx", code: usage("command-menu-05") }]}
          {...previewProps}
        >
          <IntegrationSplitCommandMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="command-menu-06"
          usage={[{ title: "app/page.tsx", code: usage("command-menu-06") }]}
          {...previewProps}
        >
          <SlashStudioCommandMenu />
        </BlockExample>
      </div>
    </article>
  )
}
