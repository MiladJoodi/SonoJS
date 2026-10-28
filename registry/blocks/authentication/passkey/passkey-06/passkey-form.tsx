"use client"

import type * as React from "react"
import { CheckIcon, FingerprintIcon, LockIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const POINTS = [
  "Works with Face ID & Windows Hello",
  "Phishing-resistant by design",
  "Synced where you already trust",
] as const

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <aside className="relative flex flex-col justify-between gap-8 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
        <div className="space-y-4 text-start">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 text-primary">
            <FingerprintIcon className="size-5" aria-hidden />
          </span>
          <div className="space-y-2">
            <h1 className="text-h3 font-semibold tracking-tight">
              No passwords. Just you.
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Passkeys replace shared secrets with a private key on your device —
              the default people expect in 2026.
            </p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {POINTS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-zinc-300"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <CheckIcon className="size-3" aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <LockIcon className="size-3.5" aria-hidden />
          WebAuthn · FIDO2
        </p>
      </aside>

      <div className="flex flex-col justify-center gap-6 bg-card p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in with a passkey saved on this device or your phone.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <Button type="button" className="w-full cursor-pointer">
            <FingerprintIcon className="size-4" aria-hidden />
            Continue with passkey
          </Button>
          <Button type="button" variant="outline" className="w-full cursor-pointer">
            Email me a sign-in link
          </Button>
        </div>

        <p className="text-start text-sm text-muted-foreground">
          New here?{" "}
          <a
            href="#"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}
