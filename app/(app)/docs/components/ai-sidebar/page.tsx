import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("ai-sidebar", "AI Sidebar")

const exampleDefs = [
  {
    name: "ai-sidebar-default",
    title: "Expanded",
    description:
      "Brand header, new chat, quick nav, searchable history with pin/rename/delete, and a profile footer.",
    requires: ["button", "input", "avatar"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "ai-sidebar-collapsed",
    title: "Collapsed",
    description:
      "`collapsed` shows a compact icon rail. Toggle with `onToggleCollapse`.",
    requires: ["button", "input", "avatar"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { AiSidebar } from "@/components/sonojs/ai-sidebar"

export function Example() {
  return (
    <AiSidebar
      brandName="Sono"
      user={{ name: "Alex Rivera", plan: "Free" }}
      onNewChat={() => {}}
      onSelectChat={(id) => console.log(id)}
    />
  )
}`

export default async function AiSidebarDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="AI Sidebar"
        pathname="/docs/components/ai-sidebar"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A feature-packed AI navigation sidebar — brand header, chat history
            groups, search, new chat, hover actions, collapsed rail, and user
            footer. Fully prop-driven.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="ai-sidebar" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="ai-sidebar.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "brandName",
              type: "string",
              defaultValue: '"Sono"',
              description: "Brand title in the header.",
            },
            {
              name: "brandLogo",
              type: "ReactNode",
              defaultValue: "Bot icon",
              description: "Logo beside the brand title.",
            },
            {
              name: "navItems",
              type: "AiSidebarNavItem[]",
              defaultValue: "defaults",
              description: "Quick navigation rows (Images, Library, …).",
            },
            {
              name: "moreNavItems",
              type: "AiSidebarNavItem[]",
              defaultValue: "defaults",
              description: "Extra items under the More menu.",
            },
            {
              name: "chatHistoryGroups",
              type: "AiSidebarChatGroup[]",
              defaultValue: "defaults",
              description: "Grouped conversation lists.",
            },
            {
              name: "activeChatId",
              type: "string",
              defaultValue: '"chat-1"',
              description: "Currently selected chat id.",
            },
            {
              name: "user",
              type: "AiSidebarUser",
              defaultValue: "defaults",
              description: "Name, email, avatar, and plan for the footer.",
            },
            {
              name: "collapsed",
              type: "boolean",
              defaultValue: "false",
              description: "Compact 64px icon rail.",
            },
            {
              name: "searchQuery",
              type: "string",
              defaultValue: "—",
              description: "Controlled search query (optional).",
            },
            {
              name: "onNewChat",
              type: "() => void",
              defaultValue: "—",
              description: "New chat button callback.",
            },
            {
              name: "onSelectChat",
              type: "(chatId: string) => void",
              defaultValue: "—",
              description: "Fired when a conversation is selected.",
            },
            {
              name: "onToggleCollapse",
              type: "() => void",
              defaultValue: "—",
              description: "Expand / collapse control callback.",
            },
            {
              name: "onPinChat / onRenameChat / onDeleteChat",
              type: "callbacks",
              defaultValue: "—",
              description: "History item actions from the hover menu.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the root aside.",
            },
          ]}
        />
      </section>
    </article>
  )
}
