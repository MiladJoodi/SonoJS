"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import {
  AuthDialog,
  type AuthDialogMode,
} from "@/components/auth/auth-dialog"
import { useSignedInHint } from "@/components/auth/signed-in-hint"
import { OFFER_RAIL_CLASS } from "@/components/sidebar-nav"
import { cn } from "@/lib/utils"
import OfferCard from "@/registry/blocks/marketing/offer-card/offer-card-01/offer-card"

import { WorkspaceContribute } from "./contribute"

const FREE_FEATURES = [
  "Free register & sign in",
  "Every component & block",
  "Charts, tools & CLI",
  "All features - no paywall",
]

const TEMPLATE_FEATURES = [
  "+120 free templates",
  "Live demos",
  "Full source download",
  "Filter by stack",
]

export type WorkspaceOfferRailMode = "full" | "toc"

/**
 * Desktop-only right rail on workspace layouts.
 * - `full`: offer card + contribute (docs, blocks, …)
 * - `toc`: contribute only (legal pages)
 */
export function WorkspaceOfferRail({
  className,
  speed = 0.9,
  mode = "full",
}: {
  className?: string
  /** Meteor lap speed - same control as offer-card-01. */
  speed?: number
  mode?: WorkspaceOfferRailMode
}) {
  const tocOnly = mode === "toc"
  const { isLoaded, isSignedIn } = useAuth()
  const initialSignedIn = useSignedInHint()
  const signedIn = isLoaded ? Boolean(isSignedIn) : initialSignedIn
  const [authOpen, setAuthOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<AuthDialogMode>("sign-up")

  React.useEffect(() => {
    if (signedIn && authOpen) setAuthOpen(false)
  }, [signedIn, authOpen])

  const isMember = signedIn

  return (
    <aside
      className={cn(OFFER_RAIL_CLASS, className)}
      aria-label={
        tocOnly
          ? "Contribute"
          : isMember
            ? "Templates offer"
            : "Free account offer"
      }
    >
      <div className="w-full max-w-[300px] [&_h3]:text-lg [&_h3]:font-extrabold [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3_span]:font-extrabold">
        {!tocOnly ? (
          <>
            {isMember ? (
              <OfferCard
                speed={speed}
                badge="Free kits"
                eyebrow="Full projects"
                headlineItalic="Browse"
                headlinePrefix="our"
                productName="Templates"
                description="Live demos, then download the source and customize."
                features={TEMPLATE_FEATURES}
                price="Free"
                compareAt=""
                tier="KITS"
                ctaLabel="View templates"
                ctaHref="/templates"
                trustLead="Preview ·"
                trustHighlight="download ·"
                trustTrail="ship"
              />
            ) : (
              <OfferCard
                speed={speed}
                badge="Free forever"
                eyebrow="Start"
                headlineItalic="Building"
                headlinePrefix="with"
                productName="SonoJS"
                description={
                  <>
                    Create a free account and unlock{" "}
                    <span className="font-semibold text-foreground">
                      everything
                    </span>{" "}
                    - components, blocks, charts, and tools.{" "}
                    <span className="font-semibold text-foreground">
                      No credit card
                    </span>
                    .
                  </>
                }
                features={FREE_FEATURES}
                price="$0"
                compareAt=""
                tier="FREE"
                ctaLabel="Create free account"
                onCtaClick={() => {
                  setAuthMode("sign-up")
                  setAuthOpen(true)
                }}
                trustLead="Trusted by"
                trustHighlight="builders"
                trustTrail="shipping free"
              />
            )}
            {isMember ? null : (
              <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  className="cursor-pointer font-semibold text-foreground underline-offset-2 hover:underline"
                  onClick={() => {
                    setAuthMode("sign-in")
                    setAuthOpen(true)
                  }}
                >
                  Sign in
                </button>
              </p>
            )}
          </>
        ) : null}

        <WorkspaceContribute className={tocOnly ? "mt-0 border-t-0 pt-0" : undefined} />
      </div>

      {!tocOnly && !isMember ? (
        <AuthDialog
          open={authOpen}
          onOpenChange={setAuthOpen}
          defaultMode={authMode}
        />
      ) : null}
    </aside>
  )
}
