"use client"

import * as React from "react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ActivityIcon,
  FlameIcon,
  RadioIcon,
  ZapIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import btcIcon from "./icons/btc.svg"
import ethIcon from "./icons/eth.svg"
import solIcon from "./icons/sol.svg"
import usdcIcon from "./icons/usdc.svg"
import avatarImg from "./images/avatar.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const USER = {
  name: "Sofia Reyes",
  initials: "SR",
  handle: "@sofia.vault",
} as const

type CoinId = "btc" | "eth" | "sol" | "usdc" | "avax" | "link"

type TickerRow = {
  id: CoinId
  symbol: string
  price: number
  change: number
  iconSrc?: string
}

const BASE_TICKER: TickerRow[] = [
  {
    id: "btc",
    symbol: "BTC",
    price: 97240.18,
    change: 1.84,
    iconSrc: assetSrc(btcIcon),
  },
  {
    id: "eth",
    symbol: "ETH",
    price: 3488.42,
    change: -0.62,
    iconSrc: assetSrc(ethIcon),
  },
  {
    id: "sol",
    symbol: "SOL",
    price: 186.74,
    change: 4.21,
    iconSrc: assetSrc(solIcon),
  },
  {
    id: "usdc",
    symbol: "USDC",
    price: 1.0,
    change: 0.01,
    iconSrc: assetSrc(usdcIcon),
  },
  { id: "avax", symbol: "AVAX", price: 42.18, change: 2.05 },
  { id: "link", symbol: "LINK", price: 18.92, change: -1.14 },
]

const HOLDINGS = [
  {
    id: "btc" as const,
    name: "Bitcoin",
    symbol: "BTC",
    amount: 0.842,
    weight: 48,
    iconSrc: assetSrc(btcIcon),
  },
  {
    id: "eth" as const,
    name: "Ethereum",
    symbol: "ETH",
    amount: 6.4,
    weight: 28,
    iconSrc: assetSrc(ethIcon),
  },
  {
    id: "sol" as const,
    name: "Solana",
    symbol: "SOL",
    amount: 210,
    weight: 18,
    iconSrc: assetSrc(solIcon),
  },
  {
    id: "usdc" as const,
    name: "USD Coin",
    symbol: "USDC",
    amount: 4200,
    weight: 6,
    iconSrc: assetSrc(usdcIcon),
  },
]

const FEED_SEED = [
  { side: "buy" as const, pair: "BTC/USDT", size: "0.12", px: "97,210" },
  { side: "sell" as const, pair: "ETH/USDT", size: "1.80", px: "3,491" },
  { side: "buy" as const, pair: "SOL/USDT", size: "42.0", px: "186.4" },
  { side: "buy" as const, pair: "BTC/USDT", size: "0.05", px: "97,188" },
  { side: "sell" as const, pair: "LINK/USDT", size: "120", px: "18.90" },
  { side: "buy" as const, pair: "AVAX/USDT", size: "18.5", px: "42.05" },
]

const SPARK = [42, 48, 45, 52, 58, 55, 62, 70, 66, 74, 80, 78, 86, 92, 88, 96]

function money(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function jitter(price: number, change: number) {
  const delta = price * (0.0004 + Math.random() * 0.0012)
  const up = Math.random() > 0.45
  const next = up ? price + delta : Math.max(price - delta, price * 0.2)
  const nextChange = change + (up ? 0.04 : -0.04) * (0.5 + Math.random())
  return {
    price: next,
    change: Math.max(-9.9, Math.min(9.9, nextChange)),
  }
}

function LiveSpark({ values }: { values: number[] }) {
  const w = 320
  const h = 88
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = Math.max(max - min, 1)
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = h - ((v - min) / span) * (h - 8) - 4
      return `${x},${y}`
    })
    .join(" ")
  const area = `0,${h} ${pts} ${w},${h}`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-24 w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id="cp02-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cp02-spark-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#cp02-spark-fill)" />
      <polyline
        points={pts}
        fill="none"
        stroke="url(#cp02-spark-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cp02-spark-line"
      />
    </svg>
  )
}

function TickerTape({ rows }: { rows: TickerRow[] }) {
  const loop = [...rows, ...rows]
  return (
    <div className="cp02-ticker relative overflow-hidden border-b border-white/8 bg-black/40">
      <div className="cp02-ticker-track flex w-max items-center gap-8 py-2.5 pe-8 ps-4">
        {loop.map((row, i) => {
          const up = row.change >= 0
          return (
            <div
              key={`${row.id}-${i}`}
              className="flex shrink-0 items-center gap-2.5 font-mono text-xs tracking-wide"
            >
              {row.iconSrc ? (
                <img
                  src={row.iconSrc}
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] rounded-full object-contain"
                />
              ) : (
                <span className="flex size-[18px] items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-zinc-300">
                  {row.symbol[0]}
                </span>
              )}
              <span className="font-semibold text-zinc-100">{row.symbol}</span>
              <span className="tabular-nums text-zinc-400">
                ${money(row.price, row.price >= 100 ? 2 : 4)}
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
  )
}

function HoldingCard({
  holding,
  price,
  change,
  flash,
}: {
  holding: (typeof HOLDINGS)[number]
  price: number
  change: number
  flash: "up" | "down" | null
}) {
  const up = change >= 0
  const value = holding.amount * price

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-emerald-400/25 hover:bg-white/[0.05]",
        flash === "up" && "cp02-flash-up",
        flash === "down" && "cp02-flash-down"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -end-6 -top-8 size-24 rounded-full bg-emerald-400/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={holding.iconSrc}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-contain ring-1 ring-white/10"
          />
          <div className="min-w-0 text-start">
            <p className="truncate text-sm font-semibold text-zinc-100">
              {holding.name}
            </p>
            <p className="font-mono text-[11px] text-zinc-500">
              {holding.amount} {holding.symbol}
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "border-0 font-mono text-[10px]",
            up
              ? "bg-emerald-400/15 text-emerald-300"
              : "bg-rose-400/15 text-rose-300"
          )}
        >
          {up ? "+" : ""}
          {change.toFixed(2)}%
        </Badge>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-lg font-semibold tracking-tight text-zinc-50 tabular-nums">
            ${money(value)}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-zinc-500 tabular-nums">
            @ ${money(price, price >= 100 ? 2 : 4)}
          </p>
        </div>
        <div className="w-16 text-end">
          <p className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
            Weight
          </p>
          <p className="font-mono text-sm text-zinc-200 tabular-nums">
            {holding.weight}%
          </p>
        </div>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-400"
          style={{ width: `${holding.weight}%` }}
        />
      </div>
    </article>
  )
}

export default function CryptoPortfolio02({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [ticker, setTicker] = React.useState(BASE_TICKER)
  const [spark, setSpark] = React.useState(SPARK)
  const [equityDelta, setEquityDelta] = React.useState(3.42)
  const [flashes, setFlashes] = React.useState<
    Partial<Record<CoinId, "up" | "down">>
  >({})
  const [feed, setFeed] = React.useState(FEED_SEED)
  const [clock, setClock] = React.useState("00:00:00")

  const priceMap = React.useMemo(() => {
    const map = {} as Record<CoinId, { price: number; change: number }>
    for (const row of ticker) {
      map[row.id] = { price: row.price, change: row.change }
    }
    return map
  }, [ticker])

  const equity = React.useMemo(() => {
    return HOLDINGS.reduce((sum, h) => {
      const px = priceMap[h.id]?.price ?? 0
      return sum + h.amount * px
    }, 0)
  }, [priceMap])

  React.useEffect(() => {
    const tickClock = () => {
      const now = new Date()
      setClock(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    tickClock()
    const id = window.setInterval(tickClock, 1000)
    return () => window.clearInterval(id)
  }, [])

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setTicker((prev) => {
        const nextFlashes: Partial<Record<CoinId, "up" | "down">> = {}
        const next = prev.map((row) => {
          if (row.id === "usdc") return row
          const j = jitter(row.price, row.change)
          nextFlashes[row.id] = j.price >= row.price ? "up" : "down"
          return { ...row, ...j }
        })
        setFlashes(nextFlashes)
        window.setTimeout(() => setFlashes({}), 420)
        return next
      })
      setEquityDelta((d) => {
        const step = (Math.random() - 0.42) * 0.12
        return Math.max(-4, Math.min(8, d + step))
      })
      setSpark((prev) => {
        const last = prev[prev.length - 1] ?? 50
        const next = Math.max(30, Math.min(100, last + (Math.random() - 0.45) * 8))
        return [...prev.slice(1), next]
      })
      setFeed((prev) => {
        const sample = FEED_SEED[Math.floor(Math.random() * FEED_SEED.length)]!
        return [sample, ...prev].slice(0, 6)
      })
    }, 1600)
    return () => window.clearInterval(id)
  }, [])

  const equityUp = equityDelta >= 0

  return (
    <section
      className={cn(
        "cp02 relative isolate w-full min-w-0 overflow-hidden text-zinc-100",
        className
      )}
      aria-labelledby="crypto-portfolio-02-heading"
      {...props}
    >
      <style>{`
        .cp02 {
          --cp02-bg: #05070d;
          --cp02-panel: rgba(12, 16, 28, 0.92);
          background:
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(16, 185, 129, 0.18), transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 10%, rgba(34, 211, 238, 0.12), transparent 50%),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(245, 158, 11, 0.08), transparent 55%),
            var(--cp02-bg);
        }
        .cp02-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent);
        }
        @keyframes cp02-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes cp02-live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.85); }
        }
        @keyframes cp02-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
        @keyframes cp02-flash-up {
          0% { box-shadow: inset 0 0 0 0 rgba(52, 211, 153, 0); }
          35% { box-shadow: inset 0 0 0 1px rgba(52, 211, 153, 0.45); background-color: rgba(52, 211, 153, 0.08); }
          100% { box-shadow: inset 0 0 0 0 rgba(52, 211, 153, 0); }
        }
        @keyframes cp02-flash-down {
          0% { box-shadow: inset 0 0 0 0 rgba(251, 113, 133, 0); }
          35% { box-shadow: inset 0 0 0 1px rgba(251, 113, 133, 0.4); background-color: rgba(251, 113, 133, 0.07); }
          100% { box-shadow: inset 0 0 0 0 rgba(251, 113, 133, 0); }
        }
        @keyframes cp02-draw {
          from { stroke-dashoffset: 420; }
          to { stroke-dashoffset: 0; }
        }
        .cp02-ticker-track {
          animation: cp02-marquee 38s linear infinite;
        }
        .cp02-live-dot {
          animation: cp02-live-pulse 1.4s ease-in-out infinite;
        }
        .cp02-scanline {
          animation: cp02-scan 7s linear infinite;
        }
        .cp02-flash-up {
          animation: cp02-flash-up 420ms ease-out;
        }
        .cp02-flash-down {
          animation: cp02-flash-down 420ms ease-out;
        }
        .cp02-spark-line {
          stroke-dasharray: 420;
          animation: cp02-draw 1.6s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .cp02-ticker-track,
          .cp02-live-dot,
          .cp02-scanline,
          .cp02-flash-up,
          .cp02-flash-down,
          .cp02-spark-line {
            animation: none !important;
          }
        }
      `}</style>

      <div aria-hidden className="cp02-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="cp02-scanline pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-linear-to-b from-emerald-400/10 to-transparent opacity-40"
      />

      <div className="mx-auto max-w-6xl">
        <TickerTape rows={ticker} />

        <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-11 border border-white/10 bg-zinc-900 shadow-[0_0_24px_rgba(52,211,153,0.15)]">
                <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
                <AvatarFallback className="bg-zinc-900 text-sm font-semibold text-zinc-100">
                  {USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    id="crypto-portfolio-02-heading"
                    className="truncate text-lg font-semibold tracking-tight text-zinc-50"
                  >
                    {USER.name}
                  </h1>
                  <Badge className="border border-emerald-400/30 bg-emerald-400/10 font-mono text-[10px] text-emerald-300">
                    <span className="cp02-live-dot me-1.5 inline-block size-1.5 rounded-full bg-emerald-400" />
                    LIVE
                  </Badge>
                </div>
                <p className="font-mono text-xs text-zinc-500">{USER.handle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] text-zinc-400 sm:flex">
                <RadioIcon className="size-3.5 text-emerald-400" aria-hidden />
                UTC {clock}
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

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--cp02-panel)] p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:col-span-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -start-10 top-0 size-48 rounded-full bg-emerald-400/15 blur-3xl"
              />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-zinc-500 uppercase">
                    Net equity
                  </p>
                  <p className="mt-2 font-mono text-4xl font-semibold tracking-tight text-zinc-50 tabular-nums sm:text-5xl">
                    ${money(equity)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs font-medium",
                        equityUp
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-rose-400/15 text-rose-300"
                      )}
                    >
                      {equityUp ? (
                        <ArrowUpRightIcon className="size-3.5" aria-hidden />
                      ) : (
                        <ArrowDownRightIcon className="size-3.5" aria-hidden />
                      )}
                      {equityUp ? "+" : ""}
                      {equityDelta.toFixed(2)}% 24h
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      Streaming marks · demo feed
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-black/30 px-3 py-2">
                  <FlameIcon className="size-4 text-amber-400" aria-hidden />
                  <div className="text-start">
                    <p className="text-[10px] tracking-wider text-zinc-500 uppercase">
                      Heat
                    </p>
                    <p className="font-mono text-sm text-amber-300">High volume</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-6">
                <LiveSpark values={spark} />
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-[var(--cp02-panel)] p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-zinc-100">
                    Allocation
                  </h2>
                  <ActivityIcon className="size-4 text-zinc-500" aria-hidden />
                </div>
                <ul className="flex flex-col gap-3">
                  {HOLDINGS.map((h) => (
                    <li key={h.id}>
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                        <span className="flex items-center gap-2 text-zinc-300">
                          <img
                            src={h.iconSrc}
                            alt=""
                            width={16}
                            height={16}
                            className="size-4 rounded-full object-contain"
                          />
                          {h.symbol}
                        </span>
                        <span className="font-mono text-zinc-400 tabular-nums">
                          {h.weight}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400"
                          style={{ width: `${h.weight}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[var(--cp02-panel)] p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-zinc-100">
                    Tape
                  </h2>
                  <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                    Last prints
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5 font-mono text-xs" aria-live="polite">
                  {feed.map((row, i) => (
                    <li
                      key={`${row.pair}-${row.size}-${i}`}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-2 py-1.5",
                        i === 0 ? "bg-white/[0.04]" : "bg-transparent"
                      )}
                    >
                      <span
                        className={cn(
                          "w-10 font-semibold uppercase",
                          row.side === "buy" ? "text-emerald-400" : "text-rose-400"
                        )}
                      >
                        {row.side}
                      </span>
                      <span className="text-zinc-300">{row.pair}</span>
                      <span className="text-zinc-500 tabular-nums">{row.size}</span>
                      <span className="text-zinc-200 tabular-nums">${row.px}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
                Open positions
              </h2>
              <p className="font-mono text-[11px] text-zinc-500">
                Marks refresh ~1.6s
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {HOLDINGS.map((h) => (
                <HoldingCard
                  key={h.id}
                  holding={h}
                  price={priceMap[h.id]?.price ?? 0}
                  change={priceMap[h.id]?.change ?? 0}
                  flash={flashes[h.id] ?? null}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
