import { BackgroundsGallery } from "@/components/backgrounds"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Backgrounds",
  description:
    "Single-file animated backgrounds for the web - preview live, then download HTML.",
  path: "/backgrounds",
})

export default function BackgroundsIndexPage() {
  return (
    <article className="w-full max-w-none space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1">Backgrounds</h1>
        <p className="text-muted-foreground">
          Single-file animated backgrounds — open a card for the live preview
          and HTML download.
        </p>
      </header>

      <BackgroundsGallery />
    </article>
  )
}
