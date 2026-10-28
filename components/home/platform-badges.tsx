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
    <div
      className={cn(
        "relative w-full",
        /* Soft edge hint that more badges scroll horizontally on narrow screens */
        "before:pointer-events-none before:absolute before:inset-y-0 before:start-0 before:z-10 before:w-6 before:bg-linear-to-r before:from-[var(--background)] before:to-transparent before:content-[''] sm:before:hidden",
        "after:pointer-events-none after:absolute after:inset-y-0 after:end-0 after:z-10 after:w-8 after:bg-linear-to-l after:from-[var(--background)] after:to-transparent after:content-[''] sm:after:hidden",
        className
      )}
    >
      <div className="w-full overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul
          className="flex w-max max-w-none flex-nowrap items-center gap-1.5 px-0.5 sm:gap-2"
          aria-label="Built for modern stacks and AI coding agents"
        >
          {PLATFORMS.map(({ label, Icon }) => (
            <li key={label} className="shrink-0">
              <span
                title={label}
                aria-label={label}
                className="inline-flex size-8 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground shadow-soft backdrop-blur-sm sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3 sm:text-sm sm:font-medium"
              >
                <Icon className="size-3.5 sm:size-4" aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
