"use client"

import Link from "next/link"

import { AccountAvatarEditor } from "@/components/auth/account/avatar-editor"
import { PlanIcon } from "@/components/icons/plan/plan-icon"
import type { PlanId } from "@/components/pricing/pricing-data"
import { cn } from "@/lib/utils"

/**
 * Account header — editable avatar + name/email; plan + expiry opposite.
 * Plan mark matches /pricing (Free gray · Monthly check green · Yearly primary).
 */
export function AccountIdentityHero({
  name,
  email,
  imageUrl,
  isPro,
  planId,
  planName,
  expiryLabel,
  avatarBusy,
  onPickAvatar,
  onRemoveAvatar,
}: {
  name: string
  email?: string | null
  imageUrl?: string | null
  isPro: boolean
  planId: PlanId
  planName: string
  expiryLabel: string | null
  avatarBusy?: boolean
  onPickAvatar: (file: File) => void
  onRemoveAvatar: () => void
}) {
  return (
    <header className="border-b border-border/50 pb-6 sm:pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <AccountAvatarEditor
            imageUrl={imageUrl}
            name={name}
            email={email}
            busy={avatarBusy}
            onPickFile={onPickAvatar}
            onRemove={onRemoveAvatar}
          />

          <div className="min-w-0 space-y-1 text-start">
            <h1 className="truncate text-[clamp(1.375rem,4vw,2.125rem)] font-semibold tracking-[-0.03em] text-foreground">
              {name}
            </h1>
            {email ? (
              <p className="truncate text-sm text-muted-foreground" dir="ltr">
                {email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-[12px] border border-border/60 bg-card px-3 py-2.5 text-start sm:border-0 sm:bg-transparent sm:p-0">
          <span
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
              planId === "pro-yearly" && "bg-primary/10",
              planId === "pro-monthly" && "bg-emerald-500/15",
              planId === "free" && "bg-zinc-500/10"
            )}
            aria-hidden
          >
            <PlanIcon plan={planId} className="size-4" />
          </span>
          <div className="min-w-0 space-y-0.5 text-start">
            <p
              className={cn(
                "text-sm font-semibold tracking-tight",
                isPro ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {planName}
            </p>
            <p className="text-sm text-muted-foreground">
              {isPro ? (
                expiryLabel ? (
                  <>Expires {expiryLabel}</>
                ) : (
                  "No expiry"
                )
              ) : (
                <Link
                  href="/pricing"
                  className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Upgrade to Pro
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
