import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { GithubIcon } from "@/registry/icons/github"

export function GithubLink({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub repository"
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-card text-foreground shadow-none transition-colors hover:bg-canvas",
        className
      )}
    >
      <GithubIcon className="size-4 shrink-0" />
    </a>
  )
}
