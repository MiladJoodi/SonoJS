import { CursorGallery } from "@/components/cursors"
import { cursorsCatalog } from "@/lib/cursors-catalog"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Cursors",
  description:
    "Browse SonoJS cursor effects — pointer followers, trails, and interaction demos. Install with the CLI.",
  path: "/cursors",
})

export default function CursorsIndexPage() {
  const pending = cursorsCatalog.filter((e) => e.status === "pending").length
  const ported = cursorsCatalog.filter((e) => e.status === "ported").length

  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Cursors</h1>
        <p className="text-muted-foreground">
          Pointer followers, trails, and interaction effects. Open a card for
          a live preview, install command, and source.
        </p>
        <p className="text-sm text-muted-foreground">
          {ported} ported · {pending} pending · {cursorsCatalog.length} total
        </p>
      </header>

      <CursorGallery />
    </article>
  )
}
