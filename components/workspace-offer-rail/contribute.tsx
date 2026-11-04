import {
  BugIcon,
  HeartIcon,
  LightbulbIcon,
  StarIcon,
  type LucideIcon,
} from "lucide-react"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

type ContributeItem = {
  label: string
  icon: LucideIcon
  href?: string
  disabled?: boolean
}

const ITEMS: ContributeItem[] = [
  {
    label: "Star our repo",
    icon: StarIcon,
    href: siteConfig.links.github,
  },
  {
    label: "Report an issue",
    icon: BugIcon,
    href: siteConfig.links.githubNewIssue,
  },
  {
    label: "Request a feature",
    icon: LightbulbIcon,
    href: siteConfig.links.githubNewIssue,
  },
  {
    label: "Donate",
    icon: HeartIcon,
    disabled: true,
  },
]

const linkClass = cn(
  "flex h-8 w-full min-w-0 items-center gap-2 rounded-md px-2 text-start text-[12.5px] font-medium leading-snug outline-none transition-colors",
  "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring"
)

/** Compact contribute links under the offer card (desktop rail). */
export function WorkspaceContribute({ className }: { className?: string }) {
  return (
    <nav
      className={cn("mt-5 w-full max-w-[300px] border-t border-border/50 pt-4", className)}
      aria-label="Contribute"
    >
      <p className="mb-1.5 px-2 text-[11px] font-semibold tracking-wide text-muted-foreground/80 uppercase">
        Contribute
      </p>
      <ul className="flex flex-col gap-0.5">
        {ITEMS.map((item) => {
          const Icon = item.icon
          if (item.disabled || !item.href) {
            return (
              <li key={item.label}>
                <span
                  className={cn(
                    linkClass,
                    "pointer-events-none cursor-default opacity-45 hover:bg-transparent hover:text-muted-foreground"
                  )}
                  aria-disabled="true"
                >
                  <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  <span className="min-w-0 truncate">{item.label}</span>
                </span>
              </li>
            )
          }
          return (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(linkClass, "cursor-pointer")}
              >
                <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                <span className="min-w-0 truncate">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
