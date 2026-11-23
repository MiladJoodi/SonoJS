import { PopupsPageHeader, PopupExample } from "@/components/popups"
import { pageMetadata } from "@/lib/seo"
import { popupUsageSnippet } from "@/lib/popups-usage"

export const metadata = pageMetadata({
  title: "Sale Tag",
  description:
    "Hanging price-tag sale popups - drop in on a string, swing, copy the code. Five tones: Black Friday, Cyber Monday, Kraft, Scarlet, Mint.",
  path: "/popups/sale-tag",
})

const usage = (name: string) =>
  popupUsageSnippet(name, "sale-tag", "")

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PopupsSaleTagDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <PopupsPageHeader
        title="Sale Tag"
        pathname="/popups/sale-tag"
        description="A price tag that drops from a string, springs into place, and copies your promo code. Drag sideways to swing. Close it and a corner chip brings it back."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Black Friday</h2>
            <p className="text-sm text-muted-foreground">
              Classic hanging tag - drops on a string and copies BF20.
            </p>
          </div>
          <PopupExample
            name="sale-tag-01"
            usage={[{ title: "app/page.tsx", code: usage("sale-tag-01") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Cyber Monday</h2>
            <p className="text-sm text-muted-foreground">
              Navy + cyan tag - copies CYBER20.
            </p>
          </div>
          <PopupExample
            name="sale-tag-02"
            usage={[{ title: "app/page.tsx", code: usage("sale-tag-02") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Kraft</h2>
            <p className="text-sm text-muted-foreground">
              Warm paper look - copies KRAFT20.
            </p>
          </div>
          <PopupExample
            name="sale-tag-03"
            usage={[{ title: "app/page.tsx", code: usage("sale-tag-03") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Scarlet</h2>
            <p className="text-sm text-muted-foreground">
              Crimson hang tag with gold ring - copies FLASH20.
            </p>
          </div>
          <PopupExample
            name="sale-tag-04"
            usage={[{ title: "app/page.tsx", code: usage("sale-tag-04") }]}
            {...shell}
          />
        </section>

        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h4">Mint</h2>
            <p className="text-sm text-muted-foreground">
              Deep green + mint ring - copies FRESH20.
            </p>
          </div>
          <PopupExample
            name="sale-tag-05"
            usage={[{ title: "app/page.tsx", code: usage("sale-tag-05") }]}
            {...shell}
          />
        </section>
      </div>
    </article>
  )
}
