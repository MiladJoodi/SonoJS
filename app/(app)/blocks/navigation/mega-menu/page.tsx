import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ServicesMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-01/mega-menu"
import InstituteMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-02/mega-menu"
import ProductsMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-03/mega-menu"
import FeaturesMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-04/mega-menu"
import ToolsMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-05/mega-menu"
import CompanyIconsMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-06/mega-menu"

const usage = (name: string) => `import MegaMenu from "@/components/blocks/navigation/${name}/mega-menu"

export default function Page() {
  return <MegaMenu />
}`

const previewProps = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
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

export default function BlockMegaMenuDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Mega Menu"
        pathname="/blocks/navigation/mega-menu"
        description="Full-width and multi-column navigation panels. Pair with a site header or use as a standalone nav block."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="mega-menu-01"
          usage={[{ title: "app/page.tsx", code: usage("mega-menu-01") }]}
          {...previewProps}
        >
          <ServicesMegaMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="mega-menu-02"
          usage={[{ title: "app/page.tsx", code: usage("mega-menu-02") }]}
          {...previewProps}
        >
          <InstituteMegaMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="mega-menu-03"
          usage={[{ title: "app/page.tsx", code: usage("mega-menu-03") }]}
          {...previewProps}
        >
          <ProductsMegaMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="mega-menu-04"
          usage={[{ title: "app/page.tsx", code: usage("mega-menu-04") }]}
          {...previewProps}
        >
          <FeaturesMegaMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="mega-menu-05"
          usage={[{ title: "app/page.tsx", code: usage("mega-menu-05") }]}
          {...previewProps}
        >
          <ToolsMegaMenu />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="mega-menu-06"
          usage={[{ title: "app/page.tsx", code: usage("mega-menu-06") }]}
          {...previewProps}
        >
          <CompanyIconsMegaMenu />
        </BlockExample>
      </div>
    </article>
  )
}
