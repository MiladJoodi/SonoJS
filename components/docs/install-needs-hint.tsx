"use client"

import { CopyButton } from "@/components/docs/copy-button"
import { formatInstallCommands } from "@/lib/format-install-commands"
import { cn } from "@/lib/utils"

/**
 * Soft install hint - same bar as button-group example footers.
 * Shows each install step as its own copyable command (no shell chaining).
 */
export function InstallNeedsHint({
  label = "Also needs",
  registry = [],
  npm = [],
  className,
  copyTooltip = true,
}: {
  label?: string
  /** Registry items → `npx @sonojs/ui@latest add …` */
  registry?: string[]
  /** npm packages → `npm i …` (e.g. lucide-react, react-day-picker) */
  npm?: string[]
  className?: string
  copyTooltip?: boolean
}) {
  const commands = formatInstallCommands({ registry, npm })
  if (commands.length === 0) return null

  return (
    <div
      className={cn(
        "space-y-1.5 border-t border-border/60 bg-card px-3 py-2 text-[12.5px] text-muted-foreground",
        className
      )}
    >
      <span className="block">{label}</span>
      {commands.map((command) => (
        <div key={command} className="flex max-w-full items-center gap-1">
          <code className="min-w-0 whitespace-normal break-all rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-[11.5px] leading-snug text-foreground">
            {command}
          </code>
          <CopyButton
            value={command}
            tooltip={copyTooltip}
            tone="chrome"
            className="shrink-0"
          />
        </div>
      ))}
    </div>
  )
}
