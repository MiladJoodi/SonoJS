"use client"

import * as React from "react"
import { FingerprintIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("")
  const emailReady = email.includes("@") && email.includes(".")

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-1.5 text-start">
        <h1 className="text-h3 font-semibold tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email — we&apos;ll offer a passkey when one is available.
        </p>
      </header>

      <div className="grid gap-2">
        <Label htmlFor="passkey-02-email">Email</Label>
        <Input
          id="passkey-02-email"
          type="email"
          dir="ltr"
          autoFocus
          autoComplete="username webauthn"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-[46px] rounded-[12px] border-border/70 shadow-none"
        />
      </div>

      <Button
        type="button"
        className="w-full cursor-pointer"
        disabled={!emailReady}
      >
        <FingerprintIcon className="size-4" aria-hidden />
        Continue with passkey
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or password</span>
        <Separator className="flex-1" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="passkey-02-password">Password</Label>
          <Input
            id="passkey-02-password"
            type="password"
            autoComplete="current-password"
            placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
            required
            className="h-[46px] rounded-[12px] border-border/70 shadow-none"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="w-full cursor-pointer"
          disabled={!emailReady}
        >
          Sign in with password
        </Button>
      </form>
    </div>
  )
}
