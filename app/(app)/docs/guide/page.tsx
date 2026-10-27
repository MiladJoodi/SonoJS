import Link from "next/link"

import { ComponentSource } from "@/components/docs"
import { buttonVariants } from "@sonojs/ui/components/button"
import { docsGuideMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = docsGuideMetadata(
  "/docs/guide",
  "Guide",
  "A short path from an empty project to your first SonoJS React component."
)

export default function GuideDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">Guide</h1>
        <p className="leading-relaxed text-muted-foreground">
          A short path from empty project to your first SonoJS component.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-h3">Init the system</h2>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={`npx @sonojs/ui@latest init`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Add Button</h2>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={`npx @sonojs/ui@latest add button`}
        />
        <ComponentSource
          title="app/page.tsx"
          lang="tsx"
          code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Continue</Button>
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Next</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Browse the component reference, set RTL/LTR once on{" "}
          <code className="sono-inline-code">&lt;html&gt;</code>, or wire the MCP
          server for agents.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/components"
            className={cn(
              buttonVariants({ variant: "default" }),
              "cursor-pointer"
            )}
          >
            Components
          </Link>
          <Link
            href="/docs/direction"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "cursor-pointer"
            )}
          >
            Direction
          </Link>
          <Link
            href="/docs/mcp"
            className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer")}
          >
            MCP Server
          </Link>
        </div>
      </section>
    </article>
  )
}
