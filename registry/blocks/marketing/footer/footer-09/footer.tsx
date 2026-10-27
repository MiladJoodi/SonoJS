import type * as React from "react"

import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { SlackIcon } from "@/registry/icons/slack"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"

const social = [
  { label: "Google", href: "#", Icon: GoogleIcon },
  { label: "Slack", href: "#", Icon: SlackIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "X", href: "#", Icon: XIcon },
] as const

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("bg-card", className)} {...props}>
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center sm:px-6">
        <a
          href="#"
          aria-label="SonoJS"
          className="cursor-pointer rounded-md text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          SonoJS
        </a>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          We&apos;re part of the{" "}
          <a
            href="#"
            className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            SonoJS
          </a>{" "}
          family.
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-[12px] border border-border/70 bg-background/60 px-5 py-3 shadow-soft"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          {social.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <Icon className="size-4 shrink-0" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-muted-foreground">© 2026 SonoJS.</p>
      </div>
    </footer>
  )
}
