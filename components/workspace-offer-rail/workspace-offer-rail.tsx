"use client"

import * as React from "react"
import { useAuth } from "@clerk/nextjs"

import {
  AuthDialog,
  type AuthDialogMode,
  useSignedInHint,
} from "@/components/auth"
import { OFFER_RAIL_CLASS } from "@/components/sidebar-nav"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import OfferCard from "@/registry/blocks/marketing/offer-card/offer-card-01/offer-card"

import { WorkspaceContribute } from "./contribute"
import { WorkspaceOnThisPage } from "./on-this-page"

const FREE_FEATURES = [
  "Free register & sign in",
  "Every component & block",
  "Charts, tools & CLI",
  "All features - no paywall",
]

const MEMBER_FEATURES = [
  "Full library unlocked",
  "CLI + MCP install flow",
  "Docs, blocks & charts",
  "Star the repo to support us",
]

/**
 * Desktop-only offer rail on workspace layouts (docs, blocks, charts, 3d,
 * carousels, ai, cursors, marketplace). Guests → free account; members → welcome.
 */
export function WorkspaceOfferRail({
  className,
  speed = 0.9,
}: {
  className?: string
  /** Meteor lap speed - same control as offer-card-01. */
  speed?: number
}) {
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
      aria-label={isMember ? "Member welcome" : "Free account offer"}
    >
      <div className="w-full max-w-[300px] [&_h3]:text-lg [&_h3]:font-extrabold [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3_span]:font-extrabold">
        {isMember ? (
          <OfferCard
            speed={speed}
            badge="You're in"
            eyebrow="Keep"
            headlineItalic="Shipping"
            headlinePrefix="with"
            productName="SonoJS"
            description={
              <>
                Your free account is ready. Browse the library, install with the
                CLI, or wire up{" "}
                <span className="font-semibold text-foreground">MCP</span> in
                your editor.
              </>
            }
            features={MEMBER_FEATURES}
            price="Free"
            compareAt=""
            tier="MEMBER"
            ctaLabel="Star on GitHub"
            ctaHref={siteConfig.links.github}
            trustLead="Thanks for"
            trustHighlight="joining"
            trustTrail="the builders"
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
                <span className="font-semibold text-foreground">everything</span>{" "}
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
        {isMember ? (
          <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
            New here? Try{" "}
            <a
              href="/docs/mcp"
              className="cursor-pointer font-semibold text-foreground underline-offset-2 hover:underline"
            >
              MCP setup
            </a>
          </p>
        ) : (
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

        <WorkspaceOnThisPage />
        <WorkspaceContribute />
      </div>

      {!isMember ? (
        <AuthDialog
          open={authOpen}
          onOpenChange={setAuthOpen}
          defaultMode={authMode}
        />
      ) : null}
    </aside>
  )
}
