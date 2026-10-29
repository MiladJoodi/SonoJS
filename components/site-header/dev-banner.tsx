import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function DevBanner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        "border-b border-emerald-500/20 bg-emerald-500/[0.08] text-foreground dark:border-emerald-400/20 dark:bg-emerald-400/[0.1]",
        className
      )}
    >
      <div className="container-wrapper">
        <div className="flex h-8 items-center justify-center gap-2 px-1 text-center sm:gap-2.5">
          <span
            aria-hidden
            className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_0_0_3px] shadow-emerald-500/20 dark:bg-emerald-400 dark:text-emerald-950 dark:shadow-emerald-400/25"
          >
            <CheckIcon className="size-2.5" strokeWidth={3.5} />
          </span>
          <p className="min-w-0 text-[12px] font-medium leading-none tracking-tight text-foreground/90 sm:text-[13px]">
            <span className="hidden sm:inline">
              Sono is under development — new pieces land fast.{" "}
            </span>
            <span className="sm:hidden">Sono is growing fast. </span>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-semibold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300"
            >
              Star us on GitHub
            </Link>
            <span aria-hidden>.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
