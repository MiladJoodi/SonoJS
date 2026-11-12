"use client"

import * as React from "react"

import {
  DemoCard,
  ShowcaseMotionContext,
  Stagger,
} from "@/components/home/hero-showcase-chrome"
import { ShowcaseChartPreviewLazy } from "@/components/home/hero-showcase-chart-lazy"
import { loadHomeBelowFoldCss } from "@/components/home/home-below-fold-css"

export function ShowcaseLoginPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <h2 className="text-[20px] font-semibold tracking-[-0.02em]">
          Welcome back
        </h2>
      </Stagger>
      <Stagger i={1} show={show}>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">
          Sign in to continue.
        </p>
      </Stagger>
      <Stagger i={2} show={show}>
        <label className="mb-3 block text-start">
          <span className="mb-1.5 block text-[13px] font-medium">Email</span>
          <input
            type="email"
            placeholder="you@company.com"
            tabIndex={-1}
            readOnly
            className="h-10 w-full rounded-[10px] border border-border/70 bg-background px-3 text-sm outline-none"
          />
        </label>
      </Stagger>
      <Stagger i={3} show={show}>
        <label className="mb-3 block text-start">
          <span className="mb-1.5 block text-[13px] font-medium">Password</span>
          <input
            type="password"
            placeholder="••••••••••"
            tabIndex={-1}
            readOnly
            className="h-10 w-full rounded-[10px] border border-border/70 bg-background px-3 text-sm outline-none"
          />
        </label>
      </Stagger>
      <Stagger i={4} show={show}>
        <button
          type="button"
          disabled
          tabIndex={-1}
          className="mt-1 flex h-[42px] w-full cursor-not-allowed items-center justify-center rounded-[10px] bg-primary text-sm font-medium text-primary-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          Sign in
        </button>
      </Stagger>
      <Stagger i={5} show={show}>
        <button
          type="button"
          disabled
          tabIndex={-1}
          className="mt-2.5 flex h-[42px] w-full cursor-not-allowed items-center justify-center rounded-[10px] border border-border/70 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
        >
          Continue with GitHub
        </button>
      </Stagger>
      <Stagger i={6} show={show}>
        <p className="mt-3.5 text-center text-[13px] text-muted-foreground">
          Forgot your password?
        </p>
      </Stagger>
    </DemoCard>
  )
}

type PanelProps = { show: boolean; className?: string }

function ShowcasePanelPlaceholder() {
  return (
    <div
      aria-hidden
      className="w-full max-w-[350px] rounded-[14px] border border-border/70 bg-card p-4 shadow-soft sm:rounded-[18px] sm:p-[22px]"
    >
      <div className="h-[12rem] w-full sm:h-[14rem]" />
    </div>
  )
}

/** Loads a non-default hero demo only when that chip is selected. */
function ShowcasePanelLazy({
  id,
  show,
}: {
  id: "pricing" | "player" | "palette"
  show: boolean
}) {
  const [Comp, setComp] = React.useState<React.ComponentType<PanelProps> | null>(
    null
  )

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        // Panel utilities + sono-eq live in home-below-fold.css — wait to avoid FOUC.
        await loadHomeBelowFoldCss()
        if (cancelled) return
        const Panel =
          id === "pricing"
            ? (await import("@/components/home/hero-showcase-pricing"))
                .ShowcasePricingPreview
            : id === "player"
              ? (await import("@/components/home/hero-showcase-player"))
                  .ShowcasePlayerPreview
              : (await import("@/components/home/hero-showcase-palette"))
                  .ShowcasePalettePreview
        if (!cancelled) setComp(() => Panel)
      } catch {
        /* keep placeholder */
      }
    })()

    return () => {
      cancelled = true
    }
  }, [id])

  if (!Comp) return <ShowcasePanelPlaceholder />
  return <Comp show={show} />
}

export type ShowcaseDemoId =
  | "login"
  | "pricing"
  | "player"
  | "palette"
  | "chart"

export function ShowcasePreviewFor({
  id,
  show,
  animate = true,
}: {
  id: ShowcaseDemoId
  show: boolean
  /** Entrance + stagger - false after first hero load. */
  animate?: boolean
}) {
  return (
    <ShowcaseMotionContext.Provider value={animate}>
      {id === "pricing" || id === "player" || id === "palette" ? (
        <ShowcasePanelLazy id={id} show={show} />
      ) : id === "chart" ? (
        <ShowcaseChartPreviewLazy show={show} />
      ) : (
        <ShowcaseLoginPreview show={show} />
      )}
    </ShowcaseMotionContext.Provider>
  )
}
