import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { LinkedinIcon } from "@/registry/icons/linkedin"

export function LinkedinLink({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.links.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn company page"
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-card text-foreground shadow-none transition-colors hover:bg-canvas",
        className
      )}
    >
      <LinkedinIcon className="size-4 shrink-0 [&_path]:fill-current" />
    </a>
  )
}
