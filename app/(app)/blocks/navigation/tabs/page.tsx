import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Tabs01 from "@/registry/blocks/navigation/tabs/tabs-01/tabs"
import Tabs02 from "@/registry/blocks/navigation/tabs/tabs-02/tabs"
import Tabs03 from "@/registry/blocks/navigation/tabs/tabs-03/tabs"
import Tabs04 from "@/registry/blocks/navigation/tabs/tabs-04/tabs"
import Tabs05 from "@/registry/blocks/navigation/tabs/tabs-05/tabs"
import Tabs06 from "@/registry/blocks/navigation/tabs/tabs-06/tabs"
import Tabs07 from "@/registry/blocks/navigation/tabs/tabs-07/tabs"
import Tabs08 from "@/registry/blocks/navigation/tabs/tabs-08/tabs"
import Tabs09 from "@/registry/blocks/navigation/tabs/tabs-09/tabs"
import Tabs10 from "@/registry/blocks/navigation/tabs/tabs-10/tabs"
import Tabs11 from "@/registry/blocks/navigation/tabs/tabs-11/tabs"
import Tabs12 from "@/registry/blocks/navigation/tabs/tabs-12/tabs"

const usage = (name: string) => `import Tabs from "@/components/blocks/navigation/${name}/tabs"

export default function Page() {
  return <Tabs />
}`

const previewProps = {
  previewAlign: "center" as const,
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

const examples = [
  { name: "tabs-01", node: <Tabs01 /> },
  { name: "tabs-02", node: <Tabs02 /> },
  { name: "tabs-03", node: <Tabs03 /> },
  { name: "tabs-04", node: <Tabs04 /> },
  { name: "tabs-05", node: <Tabs05 /> },
  { name: "tabs-06", node: <Tabs06 /> },
  { name: "tabs-07", node: <Tabs07 /> },
  { name: "tabs-08", node: <Tabs08 /> },
  { name: "tabs-09", node: <Tabs09 /> },
  { name: "tabs-10", node: <Tabs10 /> },
  { name: "tabs-11", node: <Tabs11 /> },
  { name: "tabs-12", node: <Tabs12 /> },
] as const

export default function BlockTabsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Tabs"
        pathname="/blocks/navigation/tabs"
        description="Production section switchers — each pattern is a different product surface, not a restyle of the same demo."
      />

      <div className="flex flex-col gap-8">
        {examples.map((example, index) => (
          <div key={example.name} className="contents">
            {index > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={example.name}
              usage={[{ title: "app/page.tsx", code: usage(example.name) }]}
              {...previewProps}
            >
              <div className="flex w-full items-center justify-center bg-canvas px-8 py-12">
                <div className="w-full min-w-0 max-w-full">{example.node}</div>
              </div>
            </BlockExample>
          </div>
        ))}
      </div>
    </article>
  )
}
