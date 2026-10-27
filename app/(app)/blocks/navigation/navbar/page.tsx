import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MinimalNavbar from "@/registry/blocks/navigation/navbar/navbar-01/navbar"
import SaasNavbar from "@/registry/blocks/navigation/navbar/navbar-02/navbar"
import CenteredNavbar from "@/registry/blocks/navigation/navbar/navbar-03/navbar"
import TransparentNavbar from "@/registry/blocks/navigation/navbar/navbar-04/navbar"
import MegaMenuNavbar from "@/registry/blocks/navigation/navbar/navbar-05/navbar"
import EcommerceNavbar from "@/registry/blocks/navigation/navbar/navbar-06/navbar"
import StickyNavbar from "@/registry/blocks/navigation/navbar/navbar-07/navbar"
import ResourcesMegaNavbar from "@/registry/blocks/navigation/navbar/navbar-08/navbar"
import MediumResourcesNavbar from "@/registry/blocks/navigation/navbar/navbar-09/navbar"
import CompactResourcesNavbar from "@/registry/blocks/navigation/navbar/navbar-10/navbar"
import NestedDropdownNavbar from "@/registry/blocks/navigation/navbar/navbar-11/navbar"
import MenuOffcanvasNavbar from "@/registry/blocks/navigation/navbar/navbar-12/navbar"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/navigation/navbar", "Navbar", "Ready-to-use Navbar UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Navbar from "@/components/blocks/navigation/${name}/navbar"

export default function Page() {
  return <Navbar />
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

export default function BlockNavbarDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Navbar"
        pathname="/blocks/navigation/navbar"
        description="Site navigation bars. Each example has its own name and install command."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="navbar-01"
          usage={[{ title: "app/page.tsx", code: usage("navbar-01") }]}
          {...previewProps}
        >
          <MinimalNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-02"
          usage={[{ title: "app/page.tsx", code: usage("navbar-02") }]}
          {...previewProps}
        >
          <SaasNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-03"
          usage={[{ title: "app/page.tsx", code: usage("navbar-03") }]}
          {...previewProps}
        >
          <CenteredNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-04"
          usage={[{ title: "app/page.tsx", code: usage("navbar-04") }]}
          {...previewProps}
        >
          <TransparentNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-05"
          usage={[{ title: "app/page.tsx", code: usage("navbar-05") }]}
          {...previewProps}
        >
          <MegaMenuNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-06"
          usage={[{ title: "app/page.tsx", code: usage("navbar-06") }]}
          {...previewProps}
        >
          <EcommerceNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-07"
          usage={[{ title: "app/page.tsx", code: usage("navbar-07") }]}
          {...previewProps}
        >
          <StickyNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-08"
          usage={[{ title: "app/page.tsx", code: usage("navbar-08") }]}
          {...previewProps}
        >
          <ResourcesMegaNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-09"
          usage={[{ title: "app/page.tsx", code: usage("navbar-09") }]}
          {...previewProps}
        >
          <MediumResourcesNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-10"
          usage={[{ title: "app/page.tsx", code: usage("navbar-10") }]}
          {...previewProps}
        >
          <CompactResourcesNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-11"
          usage={[{ title: "app/page.tsx", code: usage("navbar-11") }]}
          {...previewProps}
        >
          <NestedDropdownNavbar />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="navbar-12"
          usage={[{ title: "app/page.tsx", code: usage("navbar-12") }]}
          {...previewProps}
        >
          <MenuOffcanvasNavbar />
        </BlockExample>
      </div>
    </article>
  )
}
