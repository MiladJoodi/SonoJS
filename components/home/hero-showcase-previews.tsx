"use client"

import * as React from "react"
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Area, AreaChart as RechartsAreaChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import {
  MARKET_UP,
  chartAreaGradientStops,
  chartNeonGlowProps,
  chartNeonOverflowClassName,
} from "@/registry/charts/_lib/chart-styles"
import { useMarketNeon } from "@/registry/charts/_lib/use-market-neon"
import { cn } from "@/lib/utils"

function DemoCard({
  className,
  children,
  show,
}: {
  className?: string
  children: React.ReactNode
  show: boolean
}) {
  return (
    <div
      className={cn(
        "w-full max-w-[350px] rounded-[14px] border border-border/70 bg-card p-4 text-foreground shadow-soft sm:rounded-[18px] sm:p-[22px]",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
        show
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-3.5 scale-[0.985] opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

function Stagger({
  i,
  show,
  className,
  children,
}: {
  i: number
  show: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className
      )}
      style={{
        transitionDelay: show ? `${i * 70 + 120}ms` : "0ms",
      }}
    >
      {children}
    </div>
  )
}

export function ShowcaseLoginPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [signedIn, setSignedIn] = React.useState(false)

  React.useEffect(() => {
    setSignedIn(false)
  }, [show])

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
          onClick={() => {
            setSignedIn(true)
          }}
          className="mt-1 flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
        >
          {signedIn ? "Signed in ✓" : "Sign in"}
        </button>
      </Stagger>
      <Stagger i={5} show={show}>
        <button
          type="button"
          tabIndex={-1}
          className="mt-2.5 flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-border/70 text-sm font-medium"
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

const PRICES = [12, 29, 79] as const

export function ShowcasePricingPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [plan, setPlan] = React.useState(1)
  const [yearly, setYearly] = React.useState(false)

  React.useEffect(() => {
    setPlan(1)
    setYearly(false)
  }, [show])

  const price = Math.round(PRICES[plan]! * (yearly ? 0.8 : 1))

  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <div className="mb-3 flex gap-1 rounded-[10px] border border-border/70 bg-background p-[3px]">
          {(["Solo", "Team", "Scale"] as const).map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={plan === i}
              onClick={() => {
                setPlan(i)
              }}
              className={cn(
                "h-[30px] flex-1 cursor-pointer rounded-[7px] text-[13px] font-medium transition-colors",
                plan === i
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </Stagger>
      <Stagger i={1} show={show}>
        <div className="mb-3 flex gap-1 rounded-[10px] border border-border/70 bg-background p-[3px]">
          {(
            [
              { label: "Monthly", short: "Monthly", yr: false },
              { label: "Yearly · save 20%", short: "Yearly", yr: true },
            ] as const
          ).map((b) => (
            <button
              key={b.label}
              type="button"
              aria-pressed={yearly === b.yr}
              title={b.label}
              onClick={() => {
                setYearly(b.yr)
              }}
              className={cn(
                "h-[30px] flex-1 cursor-pointer rounded-[7px] px-1 text-[12px] font-medium transition-colors sm:text-[13px]",
                yearly === b.yr
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <span className="sm:hidden">{b.short}</span>
              <span className="hidden sm:inline">{b.label}</span>
            </button>
          ))}
        </div>
      </Stagger>
      <Stagger i={2} show={show}>
        <p className="mt-2 text-[2.25rem] leading-none font-semibold tracking-[-0.04em] sm:text-[46px]">
          ${price}
          <small className="ms-1 text-xs font-normal tracking-normal text-muted-foreground sm:text-sm">
            / seat / month
          </small>
        </p>
      </Stagger>
      <Stagger i={3} show={show}>
        <ul className="mt-3.5 grid gap-2 text-sm text-muted-foreground">
          {[
            "Unlimited projects",
            "Shared team workspaces",
            "Email support",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-start">
              <span
                className="size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </Stagger>
      <Stagger i={4} show={show}>
        <button
          type="button"
          className="mt-4 flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Choose plan
        </button>
      </Stagger>
    </DemoCard>
  )
}

const EQ_BARS = Array.from({ length: 13 }, (_, b) => ({
  h: 18 + Math.round(Math.abs(Math.sin(b * 0.95 + 0.4)) * 64),
  d: -(b * 0.08),
}))

const PLAYER_TRACKS = [
  { title: "Low tide", artist: "Sono Sessions" },
  { title: "Night drive", artist: "Sono Sessions" },
  { title: "Glass house", artist: "Sono Sessions" },
] as const

export function ShowcasePlayerPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [playing, setPlaying] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(0)
  const [track, setTrack] = React.useState(0)
  const [playGen, setPlayGen] = React.useState(0)
  const timerRef = React.useRef<number | null>(null)
  const elapsedRef = React.useRef(0)

  React.useEffect(() => {
    setPlaying(false)
    elapsedRef.current = 0
    setElapsed(0)
    setTrack(0)
    if (timerRef.current) window.clearInterval(timerRef.current)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [show])

  React.useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    if (!playing) return

    timerRef.current = window.setInterval(() => {
      elapsedRef.current += 0.32
      if (elapsedRef.current >= 204) elapsedRef.current = 0
      setElapsed(elapsedRef.current)
    }, 320)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [playing, playGen])

  const mins = Math.floor(elapsed / 60)
  const secs = Math.floor(elapsed % 60)
  const pct = Math.min(100, (elapsed / 204) * 100)

  function skip(delta: number) {
    setTrack((t) => (t + delta + PLAYER_TRACKS.length) % PLAYER_TRACKS.length)
    elapsedRef.current = 0
    setElapsed(0)
    setPlaying(true)
    setPlayGen((g) => g + 1)
  }

  const current = PLAYER_TRACKS[track]!

  return (
    <DemoCard
      show={show}
      className={cn("overflow-hidden p-0!", playing && "playing", className)}
    >
      <Stagger i={0} show={show}>
        <div className="relative h-[96px] overflow-hidden sm:h-[110px]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 70% at 30% 20%, color-mix(in oklab, var(--primary) 55%, transparent), transparent 60%),
                linear-gradient(145deg, var(--chart-1) 0%, color-mix(in oklab, var(--chart-1) 65%, var(--primary)) 100%)
              `,
            }}
          />
          <div className="relative flex h-full items-center justify-center gap-1 px-4 sm:gap-1.5">
            {EQ_BARS.map((bar, i) => (
              <b
                key={i}
                className={cn(
                  "inline-block w-1 max-h-14 origin-center rounded-full bg-white/95 sm:w-1.5 sm:max-h-16",
                  playing &&
                    "animate-[sono-eq_0.85s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
                )}
                style={
                  {
                    height: Math.round(bar.h * 0.72),
                    animationDelay: `${bar.d}s`,
                    opacity: 0.6 + (i % 5) * 0.07,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </Stagger>
      <div className="p-4 pt-3 sm:px-[22px] sm:pb-[22px] sm:pt-3.5">
        <Stagger i={1} show={show}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1 text-start">
              <strong className="block truncate text-[15px] tracking-[-0.02em]">
                {current.title}
              </strong>
              <span className="block truncate text-[12px] text-muted-foreground">
                {current.artist}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => skip(-1)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <SkipBackIcon className="size-3.5" fill="currentColor" />
              </button>
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                onClick={() => {
                  setPlaying((p) => !p)
                }}
                className={cn(
                  "grid size-10 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-[0.96]",
                  playing &&
                    "shadow-[0_0_0_5px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
                )}
              >
                {playing ? (
                  <PauseIcon className="size-4" fill="currentColor" />
                ) : (
                  <PlayIcon className="ms-px size-4" fill="currentColor" />
                )}
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => skip(1)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <SkipForwardIcon className="size-3.5" fill="currentColor" />
              </button>
            </div>
          </div>
        </Stagger>
        <Stagger i={2} show={show}>
          <div className="mt-2.5">
            <div className="relative h-1 overflow-hidden rounded-full bg-muted">
              <i
                className="absolute inset-y-0 start-0 rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[11px] tabular-nums text-muted-foreground">
              <span>
                {mins}:{secs.toString().padStart(2, "0")}
              </span>
              <span>3:24</span>
            </div>
          </div>
        </Stagger>
      </div>
    </DemoCard>
  )
}

const COMMANDS = [
  ["New project", "N"],
  ["Invite teammate", "I"],
  ["Switch theme", "T"],
  ["Open settings", ","],
  ["Deploy to production", "D"],
] as const

export function ShowcasePalettePreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [q, setQ] = React.useState("")
  const [toast, setToast] = React.useState("")
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    setQ("")
    setToast("")
  }, [show])

  const filtered = COMMANDS.filter((c) =>
    c[0].toLowerCase().includes(q.toLowerCase())
  )

  function run(name: string) {
    setToast(`Ran: ${name}`)
    if (name === "Switch theme") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
  }

  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered[0]) run(filtered[0][0])
          }}
          placeholder="Type a command…"
          aria-label="Command"
          className="h-10 w-full rounded-[10px] border border-border/70 bg-background px-3 text-sm outline-none focus-visible:border-primary"
        />
      </Stagger>
      <Stagger i={1} show={show}>
        <ul className="mt-2.5 grid gap-0.5">
          {filtered.length === 0 ? (
            <li>
              <button
                type="button"
                disabled
                className="w-full rounded-lg px-2.5 py-2 text-start text-sm text-muted-foreground"
              >
                No commands found
              </button>
            </li>
          ) : (
            filtered.map((c, i) => (
              <li key={c[0]}>
                <button
                  type="button"
                  onClick={() => run(c[0])}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm hover:bg-muted",
                    i === 0 && "bg-muted"
                  )}
                >
                  {c[0]}
                  <kbd className="font-mono text-xs text-muted-foreground">
                    {c[1]}
                  </kbd>
                </button>
              </li>
            ))
          )}
        </ul>
      </Stagger>
      <Stagger i={2} show={show}>
        <p
          role="status"
          className="mt-2.5 min-h-[18px] text-[13px] text-primary"
        >
          {toast}
        </p>
      </Stagger>
    </DemoCard>
  )
}

const CHART_DATA = [
  { month: "Oct", value: 1820 },
  { month: "Nov", value: 2140 },
  { month: "Dec", value: 1980 },
  { month: "Jan", value: 2460 },
  { month: "Feb", value: 2710 },
  { month: "Mar", value: 2590 },
  { month: "Apr", value: 3120 },
  { month: "May", value: 3480 },
]

export function ShowcaseChartPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const neon = useMarketNeon()
  const color = neon ? MARKET_UP : "var(--chart-1)"
  const glow = neon ? chartNeonGlowProps(color) : null
  const gradId = React.useId().replace(/:/g, "")
  const last = CHART_DATA[CHART_DATA.length - 1]!
  const prev = CHART_DATA[CHART_DATA.length - 2]!
  const deltaPct = ((last.value - prev.value) / prev.value) * 100

  const chartConfig = {
    value: { label: "Users", color },
  } satisfies ChartConfig

  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <div className="mb-4 flex items-start justify-between gap-3 text-start">
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-medium text-muted-foreground">
              Active users
            </p>
            <p
              dir="ltr"
              className="text-[1.75rem] font-semibold tracking-tight tabular-nums"
            >
              {last.value.toLocaleString("en-US")}
            </p>
          </div>
          <span
            dir="ltr"
            className="mt-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums text-[var(--chart-up)]"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--chart-up) 12%, transparent)",
            }}
          >
            +{deltaPct.toFixed(1)}%
          </span>
        </div>
      </Stagger>
      <Stagger i={1} show={show}>
        <ChartContainer
          config={chartConfig}
          className={cn(
            "aspect-auto h-[140px] w-full font-sans sm:h-[160px]",
            neon && chartNeonOverflowClassName
          )}
        >
          <RechartsAreaChart
            accessibilityLayer
            data={CHART_DATA}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                {chartAreaGradientStops(color, {
                  startOpacity: neon ? 0.32 : 0.4,
                  endOpacity: 0,
                }).map((s) => (
                  <stop
                    key={s.offset}
                    offset={s.offset}
                    stopColor={s.stopColor}
                    stopOpacity={s.stopOpacity}
                  />
                ))}
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              name="value"
              stroke={color}
              fill={`url(#${gradId})`}
              fillOpacity={1}
              isAnimationActive={show}
              animationDuration={500}
              animationEasing="ease-out"
              {...(glow ?? {})}
              strokeWidth={neon ? 2.25 : 2}
            />
          </RechartsAreaChart>
        </ChartContainer>
      </Stagger>
    </DemoCard>
  )
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
}: {
  id: ShowcaseDemoId
  show: boolean
}) {
  if (id === "pricing") return <ShowcasePricingPreview show={show} />
  if (id === "player") return <ShowcasePlayerPreview show={show} />
  if (id === "palette") return <ShowcasePalettePreview show={show} />
  if (id === "chart") return <ShowcaseChartPreview show={show} />
  return <ShowcaseLoginPreview show={show} />
}
