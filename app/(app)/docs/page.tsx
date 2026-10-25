import Link from "next/link"

import { buttonVariants } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export default function DocsIndexPage() {
  return (
    <article className="w-full min-w-0 space-y-6">
      <h1 className="text-h1">Introduction</h1>
      <p className="leading-relaxed text-muted-foreground">
        SonoJS is a copy-source React component system. Init once, add what you
        need, and own the files in your app.
      </p>
      <p className="leading-relaxed text-muted-foreground">
        Built for agents and humans: clear CLI, registry installs, and an MCP
        server so your tools can work with the same components.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/docs/installation"
          className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
        >
          Installation
        </Link>
        <Link
          href="/docs/components"
          className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        >
          Components
        </Link>
      </div>
    </article>
  )
}
