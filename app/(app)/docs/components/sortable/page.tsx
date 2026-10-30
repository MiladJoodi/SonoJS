import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("sortable", "Sortable")

const exampleDefs = [
  {
    name: "sortable-default",
    title: "Asset pipeline",
    description:
      "Ranked CDN assets with typed chips. Same source as `add sortable-default`.",
    requires: ["sortable", "badge", "sonner"],
    npmRequires: ["lucide-react", "sonner"],
  },
  {
    name: "sortable-grid",
    title: "Content board",
    description:
      'Mosaic with `strategy="grid"` and featured span. Same source as `add sortable-grid`.',
    requires: ["sortable", "badge", "sonner"],
    npmRequires: ["lucide-react", "sonner"],
  },
  {
    name: "sortable-nested",
    title: "Product variants",
    description:
      "Nested groups and values with swatches. Same source as `add sortable-nested`.",
    requires: ["sortable", "badge", "sonner"],
    npmRequires: ["lucide-react", "sonner"],
  },
  {
    name: "sortable-playlist",
    title: "Up next",
    description:
      "Music queue with album art covers. Same source as `add sortable-playlist`.",
    requires: ["sortable", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "sortable-notifications",
    title: "Delivery priority",
    description:
      "Channel ladder with `Switch`. Same source as `add sortable-notifications`.",
    requires: ["sortable", "badge", "switch"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "sortable-navigation",
    title: "App sidebar",
    description:
      "Workspace nav with Lucide icons. Same source as `add sortable-navigation`.",
    requires: ["sortable", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "sortable-media-library",
    title: "Media tiles",
    description:
      "Gallery with photo thumbs. Same source as `add sortable-media-library`.",
    requires: ["sortable", "badge"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "sortable-optimistic",
    title: "Release checklist",
    description:
      "`onValueCommit` + rollback toast. Same source as `add sortable-optimistic`.",
    requires: ["sortable", "badge", "sonner"],
    npmRequires: ["lucide-react", "sonner"],
  },
]

const usageSource = `"use client"

import { useState } from "react"

import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable"

export function Example() {
  const [items, setItems] = useState([
    { id: "1", label: "One" },
    { id: "2", label: "Two" },
  ])

  return (
    <Sortable
      value={items}
      onValueChange={setItems}
      getItemValue={(item) => item.id}
    >
      {items.map((item) => (
        <SortableItem key={item.id} value={item.id}>
          <div className="flex items-center gap-2">
            <SortableItemHandle>⋮⋮</SortableItemHandle>
            {item.label}
          </div>
        </SortableItem>
      ))}
    </Sortable>
  )
}`

const compositionSource = `Sortable
├── SortableItem
│   └── SortableItemHandle
└── SortableOverlay (optional)`

export default async function SortableDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Sortable"
        pathname="/docs/components/sortable"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Drag-and-drop reordering for lists. Put drag listeners on{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              SortableItemHandle
            </code>{" "}
            so the rest of the row stays clickable. Supports vertical, horizontal,
            and grid strategies, plus keyboard reordering.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="sortable" />

      <section className="space-y-3">
        <h2 className="text-h3">Composition</h2>
        <ComponentSource
          title="structure"
          lang="tsx"
          code={compositionSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="sortable.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value",
              type: "T[]",
              description: "Controlled list of items.",
            },
            {
              name: "onValueChange",
              type: "(value: T[]) => void",
              description: "Called with the reordered array after a drop.",
            },
            {
              name: "getItemValue",
              type: "(item: T) => string",
              description: "Stable unique id for each item (used as the drag id).",
            },
            {
              name: "strategy",
              type: '"vertical" | "horizontal" | "grid"',
              default: '"vertical"',
              description: "Layout strategy for measuring and animating items.",
            },
            {
              name: "onValueCommit",
              type: "(value: T[], meta) => void",
              description:
                "Fires after a successful reorder with indexes and the previous value.",
            },
            {
              name: "onMove",
              type: "(event) => void",
              description:
                "Custom move handler. When set, skips the default arrayMove + onValueChange.",
            },
          ]}
        />
        <p className="text-secondary text-muted-foreground">
          Drag only activates from{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            SortableItemHandle
          </code>
          . Items without a handle cannot be dragged.
        </p>
      </section>
    </article>
  )
}
