import Link from "next/link"

import { buttonVariants } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export function BlockComingSoon({
  title,
  category,
}: {
  title: string
  category: string
}) {
  return (
    <article className="flex w-full min-w-0 flex-col gap-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">{category}</p>
        <h1 className="text-h1">{title}</h1>
        <p className="leading-relaxed text-muted-foreground">
          This block is under development. The layout, preview, and install
          command will land here when it ships.
        </p>
      </header>

      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
        <p className="text-sm font-medium text-foreground">Under development</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Check back soon, or browse ready blocks and components in the
          meantime.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Link
            href="/blocks/authentication/login"
            className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
          >
            View Login block
          </Link>
          <Link
            href="/blocks"
            className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
          >
            All blocks
          </Link>
        </div>
      </div>
    </article>
  )
}
