import Link from "next/link"

import { ComponentSource } from "@/components/docs"
import { buttonVariants } from "@sonojs/ui/components/button"
import { docsGuideMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = docsGuideMetadata(
  "/docs/installation",
  "Installation",
  "Set up the SonoJS design system once, then add React components as you need them with the CLI."
)

export default function InstallationDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">Installation</h1>
        <p className="leading-relaxed text-muted-foreground">
          Set up the design system once, then add components as you need them.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-h3">1. Init</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Copies base utilities, direction helpers, and{" "}
          <code className="text-foreground">styles/sonojs.css</code> tokens into
          your project. It also wires your{" "}
          <code className="text-foreground">globals.css</code> Tailwind entry:
          imports SonoJS, pins <code className="text-foreground">@theme</code> /{" "}
          <code className="text-foreground">@source</code>, and removes
          create-next-app{" "}
          <code className="text-foreground">prefers-color-scheme</code>{" "}
          <code className="text-foreground">:root</code> colors so dark mode stays
          class-based (<code className="text-foreground">.dark</code> only). Restart
          the dev server after init if styles look stale.
        </p>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={`npx @sonojs/ui@latest init`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">2. Add a component</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Installs the source file and any required registry or npm dependencies.
        </p>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={`npx @sonojs/ui@latest add button`}
        />
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/docs/cli"
          className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        >
          CLI reference
        </Link>
        <Link
          href="/docs/guide"
          className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer")}
        >
          Guide
        </Link>
      </div>
    </article>
  )
}
