import { BlockExample } from "@/components/blocks"
import MinimalNavbar from "@/registry/blocks/navigation/navbar/navbar-01/navbar"
import SaasNavbar from "@/registry/blocks/navigation/navbar/navbar-02/navbar"
import CenteredNavbar from "@/registry/blocks/navigation/navbar/navbar-03/navbar"
import TransparentNavbar from "@/registry/blocks/navigation/navbar/navbar-04/navbar"
import MegaMenuNavbar from "@/registry/blocks/navigation/navbar/navbar-05/navbar"
import EcommerceNavbar from "@/registry/blocks/navigation/navbar/navbar-06/navbar"
import StickyNavbar from "@/registry/blocks/navigation/navbar/navbar-07/navbar"
import MobileFirstNavbar from "@/registry/blocks/navigation/navbar/navbar-08/navbar"

const usage = (name: string) => `import Navbar from "@/components/blocks/navigation/${name}/navbar"

export default function Page() {
  return <Navbar />
}`

const previewProps = {
  previewAlign: "start" as const,
  previewClassName: "bg-card",
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
      <header className="space-y-2">
        <h1 className="text-h1">Navbar</h1>
        <p className="text-muted-foreground">
          Site navigation bars. Each example has its own name and install
          command.
        </p>
      </header>

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
          <MobileFirstNavbar />
        </BlockExample>
      </div>
    </article>
  )
}
