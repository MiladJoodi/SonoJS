"use client"

import * as React from "react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ZapIcon,
} from "lucide-react"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { ChartContainer } from "@sonojs/ui/components/chart"
import { cn } from "@/lib/utils"

import btcIcon from "./icons/btc.svg"
import ethIcon from "./icons/eth.svg"
import solIcon from "./icons/sol.svg"
import usdcIcon from "./icons/usdc.svg"
import avatarImg from "./images/avatar.avif"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const USER = {
  name: "Sofia Reyes",
  initials: "SR",
  handle: "@sofia.vault",
} as const

const RANGES = ["1H", "24H", "7D"] as const
type Range = (typeof RANGES)[number]

type CoinId = "btc" | "eth" | "sol" | "usdc"

type Holding = {
  id: CoinId
  name: string
  symbol: string
  amount: number
  color: string
  iconSrc: string
  seed: number
}

const HOLDINGS: Holding[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    amount: 0.842,
    color: "#F39321",
    iconSrc: assetSrc(btcIcon),
    seed: 97240,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    amount: 6.4,
    color: "#A78BFA",
    iconSrc: assetSrc(ethIcon),
    seed: 3488,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    amount: 210,
    color: "#34D399",
    iconSrc: assetSrc(solIcon),
    seed: 186.7,
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    amount: 4200,
    color: "#38BDF8",
    iconSrc: assetSrc(usdcIcon),
    seed: 1,
  },
]

const TICKER_EXTRA = [
  { symbol: "AVAX", price: 42.18, change: 2.05 },
  { symbol: "LINK", price: 18.92, change: -1.14 },
  { symbol: "DOGE", price: 0.184, change: 3.42 },
  { symbol: "ARB", price: 1.12, change: -0.88 },
]

type Point = { i: number; v: number }

function money(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function buildSeries(seed: number, len: number, volatility: number): Point[] {
  const out: Point[] = []
  let v = seed
  for (let i = 0; i < len; i++) {
    v = Math.max(seed * 0.82, v * (1 + (Math.random() - 0.48) * volatility))
    out.push({ i, v })
  }
  return out
}

function seriesChange(series: Point[]) {
  if (series.length < 2) return 0
  const a = series[0]!.v
  const b = series[series.length - 1]!.v
  return ((b - a) / a) * 100
}

function pushPoint(series: Point[], volatility: number, stable = false): Point[] {
  const last = series[series.length - 1] ?? { i: 0, v: 1 }
  const nextV = stable
    ? last.v
    : Math.max(
        last.v * 0.5,
        last.v * (1 + (Math.random() - 0.48) * volatility)
      )
  return [...series.slice(1), { i: last.i + 1, v: nextV }]
}

function LiveArea({
  data,
  color,
  heightClass,
  showAxis = false,
  gradientId,
}: {
  data: Point[]
  color: string
  heightClass: string
  showAxis?: boolean
  gradientId: string
}) {
  const domain = React.useMemo(() => {
    const vals = data.map((d) => d.v)
    const min = Math.min(...vals)
    const max = Math.max(...vals)
    const pad = Math.max((max - min) * 0.12, max * 0.004)
    return [min - pad, max + pad] as [number, number]
  }, [data])

  return (
    <ChartContainer
      className={cn("w-full", heightClass)}
      config={{
        v: { label: "Value", color },
      }}
    >
      <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.42} />
            <stop offset="55%" stopColor={color} stopOpacity={0.12} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showAxis ? (
          <YAxis
            domain={domain}
            width={44}
            tickLine={false}
            axisLine={false}
            tickMargin={6}
            tick={{ fontSize: 11, fill: "#71717a" }}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(0)
            }
            className="tabular-nums"
          />
        ) : null}
        <XAxis dataKey="i" hide />
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={showAxis ? 2.25 : 1.75}
          fill={`url(#${gradientId})`}
          fillOpacity={1}
          isAnimationActive={false}
          dot={false}
          activeDot={
            showAxis
              ? {
                  r: 4,
                  strokeWidth: 2,
                  stroke: "#05070d",
                  fill: color,
                }
              : false
          }
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default function CryptoPortfolio03({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [range, setRange] = React.useState<Range>("24H")
  const len = range === "1H" ? 28 : range === "24H" ? 40 : 52

  const [equitySeries, setEquitySeries] = React.useState(() =>
    buildSeries(146800, 40, 0.006)
  )
  const [coinSeries, setCoinSeries] = React.useState(() =>
    Object.fromEntries(
      HOLDINGS.map((h) => [
        h.id,
        buildSeries(h.seed, 32, h.id === "usdc" ? 0.0001 : 0.01),
      ])
    ) as Record<CoinId, Point[]>
  )
  const [tickerExtra, setTickerExtra] = React.useState(TICKER_EXTRA)

  React.useEffect(() => {
    setEquitySeries(buildSeries(146800, len, range === "1H" ? 0.003 : 0.008))
    setCoinSeries(
      Object.fromEntries(
        HOLDINGS.map((h) => [
          h.id,
          buildSeries(
            h.seed,
            Math.max(24, Math.floor(len * 0.75)),
            h.id === "usdc" ? 0.0001 : range === "1H" ? 0.004 : 0.012
          ),
        ])
      ) as Record<CoinId, Point[]>
    )
  }, [range, len])

  React.useEffect(() => {
    const id = window.setInterval(() => {
      const vol = range === "1H" ? 0.0028 : range === "24H" ? 0.0045 : 0.007
      setEquitySeries((s) => pushPoint(s, vol))
      setCoinSeries((prev) => {
        const next = { ...prev }
        for (const h of HOLDINGS) {
          next[h.id] = pushPoint(
            prev[h.id] ?? [],
            h.id === "usdc" ? 0 : vol * 1.4,
            h.id === "usdc"
          )
        }
        return next
      })
      setTickerExtra((rows) =>
        rows.map((r) => {
          const delta = r.price * (0.001 + Math.random() * 0.002)
          const up = Math.random() > 0.45
          const price = up ? r.price + delta : Math.max(r.price - delta, 0.001)
          const change = r.change + (up ? 0.05 : -0.05)
          return {
            ...r,
            price,
            change: Math.max(-8, Math.min(8, change)),
          }
        })
      )
    }, 1400)
    return () => window.clearInterval(id)
  }, [range])

  const equity = equitySeries[equitySeries.length - 1]?.v ?? 0
  const equityChange = seriesChange(equitySeries)
  const equityUp = equityChange >= 0

  const tape = React.useMemo(() => {
    const coins = HOLDINGS.map((h) => {
      const series = coinSeries[h.id] ?? []
      const price = series[series.length - 1]?.v ?? h.seed
      const change = seriesChange(series)
      return {
        symbol: h.symbol,
        price,
        change,
        iconSrc: h.iconSrc,
      }
    })
    return [...coins, ...tickerExtra]
  }, [coinSeries, tickerExtra])

  const loopTape = [...tape, ...tape]

  return (
    <section
      className={cn(
        "cp03 relative isolate w-full min-w-0 overflow-hidden text-zinc-100",
        className
      )}
      aria-labelledby="crypto-portfolio-03-heading"
      {...props}
    >
      <style>{`
        .cp03 {
          background:
            radial-gradient(ellipse 70% 45% at 15% 0%, rgba(52, 211, 153, 0.14), transparent 55%),
            radial-gradient(ellipse 50% 35% at 100% 20%, rgba(56, 189, 248, 0.1), transparent 50%),
            #05070d;
        }
        @keyframes cp03-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes cp03-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .cp03-track {
          animation: cp03-marquee 32s linear infinite;
        }
        .cp03-live {
          animation: cp03-pulse 1.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cp03-track,
          .cp03-live { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Ticker — no border, just tone shift */}
        <div className="overflow-hidden bg-black/35" dir="ltr">
          <div className="cp03-track flex w-max items-center gap-7 py-2.5 pe-8 ps-4">
            {loopTape.map((row, i) => {
              const up = row.change >= 0
              return (
                <div
                  key={`${row.symbol}-${i}`}
                  className="flex shrink-0 items-center gap-2 font-mono text-xs"
                >
                  {"iconSrc" in row && row.iconSrc ? (
                    <img
                      src={row.iconSrc}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 rounded-full object-contain"
                    />
                  ) : null}
                  <span className="font-semibold text-zinc-200">{row.symbol}</span>
                  <span className="tabular-nums text-zinc-500">
                    $
                    {money(
                      row.price,
                      row.price >= 100 ? 2 : row.price >= 1 ? 3 : 4
                    )}
                  </span>
                  <span
                    className={cn(
                      "tabular-nums",
                      up ? "text-emerald-400" : "text-rose-400"
                    )}
                  >
                    {up ? "+" : ""}
                    {row.change.toFixed(2)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-11 bg-zinc-900">
                <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
                <AvatarFallback className="bg-zinc-900 text-sm font-semibold">
                  {USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    id="crypto-portfolio-03-heading"
                    className="truncate text-lg font-semibold tracking-tight"
                  >
                    {USER.name}
                  </h1>
                  <Badge className="gap-1.5 border-0 bg-emerald-400/12 font-mono text-[10px] text-emerald-300">
                    <span className="cp03-live size-1.5 rounded-full bg-emerald-400" />
                    LIVE
                  </Badge>
                </div>
                <p className="font-mono text-xs text-zinc-500">{USER.handle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className="flex rounded-full bg-zinc-900/80 p-1"
                role="tablist"
                aria-label="Chart range"
              >
                {RANGES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="tab"
                    aria-selected={range === r}
                    onClick={() => setRange(r)}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-1.5 font-mono text-[11px] font-medium transition-colors",
                      range === r
                        ? "bg-zinc-100 text-zinc-950"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <Button
                type="button"
                className="h-10 cursor-pointer rounded-full bg-emerald-400 px-5 font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                <ZapIcon className="size-4" aria-hidden />
                Trade
              </Button>
            </div>
          </header>

          {/* Hero equity + area chart */}
          <div className="rounded-3xl bg-zinc-900/55 p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                  Net equity
                </p>
                <p className="mt-1.5 font-mono text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  ${money(equity)}
                </p>
                <p
                  className={cn(
                    "mt-2 inline-flex items-center gap-1 font-mono text-sm",
                    equityUp ? "text-emerald-400" : "text-rose-400"
                  )}
                >
                  {equityUp ? (
                    <ArrowUpRightIcon className="size-4" aria-hidden />
                  ) : (
                    <ArrowDownRightIcon className="size-4" aria-hidden />
                  )}
                  {equityUp ? "+" : ""}
                  {equityChange.toFixed(2)}% · {range}
                </p>
              </div>
              <p className="max-w-xs text-end text-xs text-zinc-500">
                Streaming portfolio mark — demo area series updates every ~1.4s
              </p>
            </div>

            <div className="-mx-1">
              <LiveArea
                data={equitySeries}
                color="#34D399"
                heightClass="h-52 sm:h-64"
                showAxis
                gradientId="cp03-equity-fill"
              />
            </div>
          </div>

          {/* Asset cards with mini areas */}
          <div>
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="text-sm font-semibold text-zinc-200">
                Markets
              </h2>
              <p className="font-mono text-[11px] text-zinc-500">
                Live area · {range}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {HOLDINGS.map((h) => {
                const series = coinSeries[h.id] ?? []
                const price = series[series.length - 1]?.v ?? h.seed
                const change = seriesChange(series)
                const up = change >= 0
                const value = h.amount * price

                return (
                  <article
                    key={h.id}
                    className="rounded-2xl bg-zinc-900/55 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <img
                          src={h.iconSrc}
                          alt=""
                          width={32}
                          height={32}
                          className="size-8 rounded-full object-contain"
                        />
                        <div className="min-w-0 text-start">
                          <p className="truncate text-sm font-semibold">
                            {h.symbol}
                          </p>
                          <p className="truncate text-[11px] text-zinc-500">
                            {h.name}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[11px] font-medium tabular-nums",
                          up ? "text-emerald-400" : "text-rose-400"
                        )}
                      >
                        {up ? "+" : ""}
                        {change.toFixed(2)}%
                      </span>
                    </div>

                    <p className="font-mono text-lg font-semibold tabular-nums tracking-tight">
                      $
                      {money(
                        price,
                        price >= 100 ? 2 : price >= 1 ? 3 : 4
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-zinc-500 tabular-nums">
                      {h.amount} {h.symbol} · ${money(value)}
                    </p>

                    <div className="mt-3 -mx-1">
                      <LiveArea
                        data={series}
                        color={h.color}
                        heightClass="h-20"
                        gradientId={`cp03-${h.id}-fill`}
                      />
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Stacked portfolio area strip */}
          <div className="rounded-3xl bg-zinc-900/55 p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">
                  Stacked exposure
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  BTC · ETH · SOL areas on one timeline
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {HOLDINGS.filter((h) => h.id !== "usdc").map((h) => (
                  <span
                    key={h.id}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: h.color }}
                      aria-hidden
                    />
                    {h.symbol}
                  </span>
                ))}
              </div>
            </div>

            <StackedAreas coinSeries={coinSeries} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StackedAreas({
  coinSeries,
}: {
  coinSeries: Record<CoinId, Point[]>
}) {
  const data = React.useMemo(() => {
    const btc = coinSeries.btc ?? []
    const eth = coinSeries.eth ?? []
    const sol = coinSeries.sol ?? []
    const n = Math.min(btc.length, eth.length, sol.length)
    const out: Array<{ i: number; btc: number; eth: number; sol: number }> = []
    for (let idx = 0; idx < n; idx++) {
      // Normalize each series to % of its own mean so they share a visual scale
      const b = btc[idx]!.v
      const e = eth[idx]!.v
      const s = sol[idx]!.v
      out.push({
        i: idx,
        btc: (b / (btc[0]?.v || 1)) * 100,
        eth: (e / (eth[0]?.v || 1)) * 100,
        sol: (s / (sol[0]?.v || 1)) * 100,
      })
    }
    return out
  }, [coinSeries])

  return (
    <ChartContainer
      className="h-48 w-full sm:h-56"
      config={{
        btc: { label: "BTC", color: "#F39321" },
        eth: { label: "ETH", color: "#A78BFA" },
        sol: { label: "SOL", color: "#34D399" },
      }}
    >
      <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
        <defs>
          <linearGradient id="cp03-stack-btc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F39321" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#F39321" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="cp03-stack-eth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="cp03-stack-sol" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="i" hide />
        <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
        <Area
          type="monotone"
          dataKey="btc"
          stroke="#F39321"
          strokeWidth={2}
          fill="url(#cp03-stack-btc)"
          isAnimationActive={false}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="eth"
          stroke="#A78BFA"
          strokeWidth={2}
          fill="url(#cp03-stack-eth)"
          isAnimationActive={false}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="sol"
          stroke="#34D399"
          strokeWidth={2}
          fill="url(#cp03-stack-sol)"
          isAnimationActive={false}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}
