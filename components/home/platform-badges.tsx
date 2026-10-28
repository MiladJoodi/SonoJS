import {
  ClaudeIcon,
  CodexIcon,
  CopilotIcon,
  CursorIcon,
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/components/home/icons"
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
    <div className={cn("w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      <ul
        className="mx-auto flex w-max max-w-none flex-nowrap items-center justify-center gap-1.5 px-1 sm:gap-2"
        aria-label="Built for modern stacks and AI coding agents"
      >
        {PLATFORMS.map(({ label, Icon }) => (
          <li key={label} className="shrink-0">
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-2.5 text-xs font-medium text-foreground shadow-soft backdrop-blur-sm sm:h-9 sm:px-3 sm:text-sm">
              <Icon className="size-3.5 sm:size-4" />
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
