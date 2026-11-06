import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
    </svg>
  )
}

export function YoutubeLink({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.links.youtube}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-border/70 bg-card text-foreground shadow-none transition-colors hover:bg-canvas",
        className
      )}
    >
      <YoutubeIcon className="size-4 shrink-0" />
    </a>
  )
}
