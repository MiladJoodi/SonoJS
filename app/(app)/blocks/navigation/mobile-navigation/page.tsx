import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MobileNavigation01 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-01/mobile-navigation"
import MobileNavigation02 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-02/mobile-navigation"
import MobileNavigation03 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-03/mobile-navigation"
import MobileNavigation04 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-04/mobile-navigation"
import MobileNavigation05 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-05/mobile-navigation"
import MobileNavigation06 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-06/mobile-navigation"
import MobileNavigation07 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-07/mobile-navigation"
import MobileNavigation08 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-08/mobile-navigation"
import MobileNavigation09 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-09/mobile-navigation"
import MobileNavigation10 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-10/mobile-navigation"
import MobileNavigation11 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-11/mobile-navigation"
import MobileNavigation12 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-12/mobile-navigation"
import MobileNavigation13 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-13/mobile-navigation"
import MobileNavigation14 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-14/mobile-navigation"

const usage = (name: string) => `import MobileNavigation from "@/components/blocks/navigation/${name}/mobile-navigation"

export default function Page() {
  return <MobileNavigation />
}`

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

const examples = [
  { name: "mobile-navigation-01", node: <MobileNavigation01 /> },
  { name: "mobile-navigation-02", node: <MobileNavigation02 /> },
  { name: "mobile-navigation-03", node: <MobileNavigation03 /> },
  { name: "mobile-navigation-04", node: <MobileNavigation04 /> },
  { name: "mobile-navigation-05", node: <MobileNavigation05 /> },
  { name: "mobile-navigation-06", node: <MobileNavigation06 /> },
  { name: "mobile-navigation-07", node: <MobileNavigation07 /> },
  { name: "mobile-navigation-08", node: <MobileNavigation08 /> },
  { name: "mobile-navigation-09", node: <MobileNavigation09 /> },
  { name: "mobile-navigation-10", node: <MobileNavigation10 /> },
  { name: "mobile-navigation-11", node: <MobileNavigation11 /> },
  { name: "mobile-navigation-12", node: <MobileNavigation12 /> },
  { name: "mobile-navigation-13", node: <MobileNavigation13 /> },
  { name: "mobile-navigation-14", node: <MobileNavigation14 /> },
] as const

export default function BlockMobileNavigationDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Mobile Navigation"
        pathname="/blocks/navigation/mobile-navigation"
        description="Production bottom bars and floating docks for app shells — distinct patterns with clear active states, labels, and safe-area padding."
      />

      <div className="flex flex-col gap-8">
        {examples.map((example, index) => (
          <div key={example.name} className="contents">
            {index > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={example.name}
              usage={[
                {
                  title: "app/page.tsx",
                  code: usage(example.name),
                },
              ]}
              previewAlign="start"
              previewClassName="bg-canvas p-4 sm:p-6"
            >
              <div className="mx-auto w-full max-w-md">{example.node}</div>
            </BlockExample>
          </div>
        ))}
      </div>
    </article>
  )
}
