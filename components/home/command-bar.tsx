import { CopyButton } from "@/components/docs"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function CommandBar({ className }: { className?: string }) {
  const command = siteConfig.mcpInitCommand

  return (
    <div
      className={cn(
        "flex h-[46px] w-full max-w-xl items-center justify-between gap-2 rounded-[12px] border border-[color:var(--code-border)] bg-[color:var(--code-bg)] ps-3 pe-1.5",
        className
      )}
    >
      <code className="flex min-w-0 items-center gap-1.5 truncate font-mono text-[13px] leading-none text-[color:var(--code-fg)]">
        <span className="shrink-0 text-[color:var(--code-syntax-comment)] select-none">
          $
        </span>
        <span className="min-w-0 truncate">{command}</span>
        <span
          aria-hidden
          className="ms-0.5 inline-block h-3.5 w-1.5 shrink-0 rounded-[1px] bg-primary animate-caret-blink motion-reduce:animate-none"
        />
      </code>
      <CopyButton
        value={command}
        tooltipSide="top"
        className="size-8 shrink-0 md:min-w-9"
      />
    </div>
  )
}
