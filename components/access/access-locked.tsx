"use client"

import * as React from "react"
import Link from "next/link"
import { LockIcon } from "lucide-react"

import {
  AuthDialog,
  type AuthDialogMode,
} from "@/components/auth"
import { ProIcon } from "@/components/icons/pro-icon"
import type { ContentAccess } from "@/lib/access"
import { Button } from "@sonojs/ui/components/button"

function openAuth(
  setMode: (mode: AuthDialogMode) => void,
  setOpen: (open: boolean) => void,
  mode: AuthDialogMode
) {
  setMode(mode)
  // Defer open so the same click does not dismiss the overlay.
  queueMicrotask(() => setOpen(true))
}

export function AccessLocked({
  access,
  className,
}: {
  access: ContentAccess
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<AuthDialogMode>("sign-in")

  const isPro = access === "pro"

  return (
    <div
      className={
        className ??
        "flex flex-col items-start gap-4 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft"
      }
    >
      <div
        className={
          isPro
            ? "flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"
            : "flex size-10 items-center justify-center rounded-full bg-muted"
        }
      >
        {isPro ? (
          <ProIcon className="size-5" aria-hidden />
        ) : (
          <LockIcon className="size-4 text-muted-foreground" aria-hidden />
        )}
      </div>
      <div className="space-y-1.5">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {isPro ? "Pro only" : "Members only"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isPro
            ? "This item needs a Pro plan. Ask an admin to set plan: \"pro\" and planExpiresAt (ISO) in Clerk."
            : "Sign in to view and use this item."}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          className="cursor-pointer shadow-none"
          onClick={() => openAuth(setMode, setOpen, "sign-in")}
        >
          Sign in
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="cursor-pointer border-border/70 bg-card shadow-none"
          onClick={() => openAuth(setMode, setOpen, "sign-up")}
        >
          Create account
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="cursor-pointer"
          asChild
        >
          <Link href="/account">Account</Link>
        </Button>
      </div>
      <AuthDialog open={open} onOpenChange={setOpen} defaultMode={mode} />
    </div>
  )
}
