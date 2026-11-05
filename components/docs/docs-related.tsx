import Link from "next/link"

export type DocsRelatedLink = {
  href: string
  title: string
  description?: string
}

/**
 * Contextual “Related” links for docs SEO / crawl paths.
 * Keep copy short — not a second nav.
 */
export function DocsRelated({
  links,
  heading = "Related",
}: {
  links: DocsRelatedLink[]
  heading?: string
}) {
  if (links.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="text-h3">{heading}</h2>
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {link.title}
            </Link>
            {link.description ? (
              <span className="text-muted-foreground">
                {" — "}
                {link.description}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
