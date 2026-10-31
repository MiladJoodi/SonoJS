"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import {
  AuthDialog,
  type AuthDialogMode,
} from "@/components/auth"
import { OFFER_RAIL_CLASS } from "@/components/sidebar-nav"
import { cn } from "@/lib/utils"
import OfferCard from "@/registry/blocks/marketing/offer-card/offer-card-01/offer-card"

const FREE_FEATURES = [
  "Free register & sign in",
  "Every component & block",
  "Charts, tools & CLI",
  "All features — no paywall",
]

/**
 * Desktop-only free-account promo in the workspace third column
 * (docs / blocks / charts). Hidden on mobile and when signed in.
 * CTA opens the same AuthDialog as the header (sign-up mode).
 */
export function WorkspaceOfferRail({
  className,
  speed = 0.9,
}: {
  className?: string
  /** Meteor lap speed — same control as offer-card-01. */
  speed?: number
}) {
  const { isSignedIn, isLoaded } = useAuth()
  const [authOpen, setAuthOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<AuthDialogMode>("sign-up")

  React.useEffect(() => {
    if (isSignedIn && authOpen) setAuthOpen(false)
  }, [isSignedIn, authOpen])

  if (!isLoaded || isSignedIn) return null

  return (
    <aside
      className={cn(OFFER_RAIL_CLASS, className)}
      aria-label="Free account offer"
    >
      <div className="w-full max-w-[300px] [&_h3]:text-lg [&_h3]:font-extrabold [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3_span]:font-extrabold">
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
              <span className="font-semibold text-foreground">everything</span>{" "}
              — components, blocks, charts, and tools.{" "}
              <span className="font-semibold text-foreground">No credit card</span>.
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
      </div>

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultMode={authMode}
      />
    </aside>
  )
}
