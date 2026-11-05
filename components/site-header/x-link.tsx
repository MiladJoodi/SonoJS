import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { XIcon } from "@/registry/icons/x"

export function XLink({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.links.x}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X (Twitter)"
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-card text-foreground shadow-none transition-colors hover:bg-canvas",
        className
      )}
    >
      <XIcon className="size-4 shrink-0" />
    </a>
  )
}
