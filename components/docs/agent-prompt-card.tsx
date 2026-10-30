"use client"

import { Badge } from "@sonojs/ui/components/badge"

import { CopyButton } from "@/components/docs/copy-button"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function AgentPromptCard({
  className,
  prompt = siteConfig.mcpAgentSetupPrompt,
  title = "Prompt your agent to set up MCP",
  description = "Paste into Cursor, Claude, Codex, or any coding agent.",
}: {
  className?: string
  prompt?: string
  title?: string
  description?: string
}) {
  return (
    <aside
      className={cn(
        "overflow-hidden rounded-[12px] border border-border/70 bg-card text-start shadow-soft",
        className
      )}
      aria-label={title}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <Badge
              variant="secondary"
              className="rounded-full border-transparent bg-primary/10 text-primary"
            >
              Prompt
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <CopyButton
          value={prompt}
          tone="chrome"
          tooltipIdle="Copy prompt"
          tooltipCopied="Copied"
          className="shrink-0"
        />
      </div>

      <div className="relative bg-muted/40 px-4 py-3 sm:px-5">
        <pre
          dir="ltr"
          className="max-h-28 overflow-hidden font-mono text-[12.5px] leading-[1.55] whitespace-pre-wrap text-muted-foreground"
        >
          {prompt}
        </pre>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-muted/95 to-transparent"
        />
      </div>
    </aside>
  )
}
