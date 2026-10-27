import { formatGithubStars } from "@/lib/github"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { GithubIcon } from "@/registry/icons/github"

export function GithubLink({
  stars,
  className,
}: {
  stars?: number | null
  className?: string
}) {
  const label =
    stars != null
      ? `GitHub repository, ${formatGithubStars(stars)} stars`
      : "GitHub repository"

  return (
    <a
      href={siteConfig.links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-border/70 bg-card px-2.5 text-sm font-medium text-foreground shadow-none transition-colors hover:bg-canvas",
        className
      )}
    >
      <GithubIcon className="size-4 shrink-0" />
      {stars != null ? (
        <span className="tabular-nums">{formatGithubStars(stars)}</span>
      ) : null}
    </a>
  )
}
