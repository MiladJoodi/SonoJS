"use client"

import { CopyButton } from "@/components/docs/copy-button"
import { formatInstallCommands } from "@/lib/format-install-commands"
import { cn } from "@/lib/utils"

/**
 * Soft install hint - same bar as button-group example footers.
 * Shows each install step as its own copyable command (no shell chaining).
 */
export function InstallNeedsHint({
  label = "This example also needs",
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
        "space-y-1.5 border-t border-border/60 bg-muted/20 px-3 py-2 text-[12.5px] text-muted-foreground",
        className
      )}
    >
      <span className="block">{label}</span>
      {commands.map((command) => (
        <div key={command} className="flex items-start gap-1.5">
          <code className="min-w-0 flex-1 whitespace-normal break-all rounded-md border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[11.5px] leading-snug text-foreground">
            {command}
          </code>
          <CopyButton
            value={command}
            tooltip={copyTooltip}
            className="mt-0.5 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
          />
        </div>
      ))}
    </div>
  )
}
