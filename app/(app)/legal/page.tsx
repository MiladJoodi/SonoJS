import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { DocsPageHeader } from "@/components/docs"
import { legalNav } from "@/lib/legal-nav"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Legal",
  description: "Terms, privacy, Pro license, and refund policy for SonoJS.",
  alternates: { canonical: "/legal" },
}

export default function LegalIndexPage() {
  return (
    <article className="w-full min-w-0 space-y-10 pb-16">
      <DocsPageHeader
        title="Legal"
        pathname="/legal"
        description={`Policies for ${siteConfig.name} accounts, Pro purchases, and digital access.`}
      />

      <ul className="grid gap-3 sm:grid-cols-2">
        {legalNav.map((page) => (
          <li key={page.id}>
            <Link
              href={page.href}
              className="group flex h-full cursor-pointer flex-col gap-2 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft transition-colors hover:border-primary/35"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-base font-semibold tracking-tight text-foreground">
                  {page.title}
                </span>
                <ArrowRightIcon
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary icon-dir"
                  aria-hidden
                />
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {page.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
