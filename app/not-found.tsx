import Link from "next/link"

import { buttonVariants } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-h1">Page not found</h1>
        <p className="max-w-md text-muted-foreground">
          That URL is not part of the SonoJS docs. Try one of the hubs below.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
        >
          Home
        </Link>
        <Link
          href="/docs"
          className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        >
          Docs
        </Link>
        <Link
          href="/blocks"
          className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        >
          Blocks
        </Link>
        <Link
          href="/charts"
          className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        >
          Charts
        </Link>
      </div>
    </main>
  )
}
