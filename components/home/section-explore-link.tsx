import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Quiet inline section CTA — text + arrow, not a primary Button.
 */
export function HomeSectionExploreLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const classes = cn(
    "inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline",
    className
  )

  const content = (
    <>
      {children}
      <ArrowRightIcon className="size-3.5 icon-dir" strokeWidth={1.8} aria-hidden />
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} prefetch={false} className={classes}>
      {content}
    </Link>
  )
}
