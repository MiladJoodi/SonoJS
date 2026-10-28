"use client"

import type * as React from "react"
import { Link2Icon, ShieldCheckIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const ACCOUNTS = [
  {
    id: "google",
    name: "Google",
    email: "alex.rivera@gmail.com",
    connected: true,
    Icon: GoogleIcon,
  },
  {
    id: "apple",
    name: "Apple",
    email: null,
    connected: false,
    Icon: AppleIcon,
  },
  {
    id: "github",
    name: "GitHub",
    email: "alexrivera",
    connected: true,
    Icon: GithubIcon,
  },
] as const

export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-8 text-foreground sm:py-10",
        className
      )}
      aria-labelledby="account-settings-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 sm:px-6">
        <header className="space-y-1.5 text-start">
          <div className="mb-3 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Link2Icon className="size-5" aria-hidden />
          </div>
          <h1
            id="account-settings-04-heading"
            className="text-h3 font-semibold tracking-tight"
          >
            Connected accounts
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in faster with a provider you already trust. Disconnect anytime.
          </p>
        </header>

        <ul className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          {ACCOUNTS.map((account) => (
            <li
              key={account.id}
              className="flex flex-col gap-3 border-b border-border/70 px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/40">
                <account.Icon />
              </span>
              <div className="min-w-0 flex-1 text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{account.name}</p>
                  {account.connected ? (
                    <Badge className="border-0 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      Connected
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="border-0 bg-muted text-muted-foreground"
                    >
                      Not connected
                    </Badge>
                  )}
                </div>
                {account.email ? (
                  <p
                    className="mt-0.5 truncate text-xs text-muted-foreground"
                    dir="ltr"
                  >
                    {account.email}
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Use Apple to sign in on this account.
                  </p>
                )}
              </div>
              {account.connected ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 cursor-pointer self-start sm:self-center"
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  className="h-9 cursor-pointer self-start sm:self-center"
                >
                  Connect
                </Button>
              )}
            </li>
          ))}
        </ul>

        <p className="inline-flex items-start gap-1.5 text-start text-xs text-muted-foreground">
          <ShieldCheckIcon
            className="mt-0.5 size-3.5 shrink-0 text-primary"
            aria-hidden
          />
          We never post without asking. Connections are used only for sign-in.
        </p>
      </div>
    </section>
  )
}
