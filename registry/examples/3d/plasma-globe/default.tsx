"use client"

import { PlasmaGlobe } from "@sonojs/ui/components/3d/plasma-globe"

/** Same component users get from `sonojs add plasma-globe` (needs `ogl`). */
export function PlasmaGlobeDefault() {
  return (
    <div
      className={[
        "relative h-[min(360px,62svh)] w-full overflow-hidden rounded-[12px] sm:h-[480px]",
        // Light: soft ice stage · dark: deep slate (canvas is transparent)
        "bg-[linear-gradient(180deg,#eef6ff_0%,#f8fafc_48%,#e2e8f0_100%)]",
        "dark:bg-[linear-gradient(180deg,#020617_0%,#0b1220_55%,#020617_100%)]",
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(37,99,235,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_58%,rgba(37,99,235,0.28),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[18%] bottom-[7%] h-8 rounded-[100%] bg-[radial-gradient(ellipse,rgba(37,99,235,0.22),transparent_70%)] blur-md sm:h-10 dark:bg-[radial-gradient(ellipse,rgba(56,189,248,0.35),transparent_70%)]"
        aria-hidden
      />
      <PlasmaGlobe className="relative z-[1] h-full w-full" height="100%" />
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center px-3 sm:bottom-4">
        <span className="max-w-[92%] rounded-full border border-border/70 bg-card/80 px-3 py-1 text-center text-[10px] font-medium tracking-wide text-foreground/80 shadow-sm backdrop-blur-md sm:text-[11px] dark:border-cyan-400/25 dark:bg-slate-950/70 dark:text-cyan-100/90">
          Drag to bend the arcs
        </span>
      </div>
    </div>
  )
}
