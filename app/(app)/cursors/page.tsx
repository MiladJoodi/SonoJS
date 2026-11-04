import { CursorGallery } from "@/components/cursors"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Cursors",
  description:
    "Preview installable cursor effects for React, then add them with the CLI.",
  path: "/cursors",
})

export default function CursorsIndexPage() {
  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Cursors</h1>
        <p className="text-muted-foreground">
          Preview installable cursor effects for React, then add them with the
          CLI.
        </p>
      </header>

      <CursorGallery />
    </article>
  )
}
