import type { Metadata } from "next"

import { Workspace } from "@/components/tools/markdown-editor"
import { noindexMetadata } from "@/lib/seo"

export const metadata: Metadata = noindexMetadata({
  title: "Markdown Editor",
  description:
    "Write Markdown with live preview. Drafts auto-save in this browser.",
  path: "/tools/markdown-editor",
})

export default function MarkdownEditorToolPage() {
  return <Workspace />
}
