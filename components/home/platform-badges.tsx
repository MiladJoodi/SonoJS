import { NextjsIcon } from "@/components/icons/brand/nextjs"
import { ReactIcon } from "@/components/icons/brand/react"
import { TailwindIcon } from "@/components/icons/brand/tailwind"
import { TypescriptIcon } from "@/components/icons/brand/typescript"
import { ClaudeIcon } from "@/components/icons/tools/claude"
import { CodexIcon } from "@/components/icons/tools/codex"
import { CopilotIcon } from "@/components/icons/tools/copilot"
import { CursorIcon } from "@/components/icons/tools/cursor"
import { cn } from "@/lib/utils"

const PLATFORMS = [
  { label: "React", Icon: ReactIcon },
  { label: "Next.js", Icon: NextjsIcon },
  { label: "Tailwind", Icon: TailwindIcon },
  { label: "TypeScript", Icon: TypescriptIcon },
  { label: "Cursor", Icon: CursorIcon },
  { label: "Claude", Icon: ClaudeIcon },
  { label: "Copilot", Icon: CopilotIcon },
  { label: "Codex", Icon: CodexIcon },
] as const

export function PlatformBadges({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "m-0 flex list-none flex-wrap items-center justify-center gap-1.5 p-0 sm:justify-start sm:gap-2",
        className
      )}
      aria-label="Built for modern stacks and AI coding agents"
    >
      {PLATFORMS.map(({ label, Icon }) => (
        <li key={label} className="block shrink-0 grow-0">
          <span
            title={label}
            className="inline-flex h-8 w-8 shrink-0 grow-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-card/80 text-foreground shadow-soft backdrop-blur-sm sm:h-9 sm:w-auto sm:min-w-max sm:gap-1.5 sm:overflow-visible sm:px-3 sm:text-sm sm:font-medium"
          >
            <Icon className="size-3.5 shrink-0 sm:size-4" aria-hidden />
            {/* Desktop: visible label. Mobile: icon-only + sr-only name. */}
            <span className="hidden shrink-0 sm:inline">{label}</span>
            <span className="sr-only sm:hidden">{label}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
