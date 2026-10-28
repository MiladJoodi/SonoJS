"use client"

import * as React from "react"
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  HistoryIcon,
  RefreshCcwIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import btcIcon from "./icons/btc.svg"
import ethIcon from "./icons/eth.svg"
import solIcon from "./icons/sol.svg"
import usdcIcon from "./icons/usdc.svg"
import avatarImg from "./images/avatar.avif"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Bitcoin orange accent — light cream shell + dark coffee shell via CSS vars. */
const BTC_ORANGE = "#F39321"
const BTC_AMBER = "#E07A12"

const USER = {
  name: "Sofia Reyes",
  initials: "SR",
  handle: "@sofia.vault",
} as const

type CoinId = "btc" | "eth" | "sol" | "usdc"

type Asset = {
  id: CoinId
  name: string
  symbol: string
  balance: number
  price: number
  change: number
  color: string
  iconSrc: string
  spark: number[]
}

const ASSETS: Asset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.842,
    price: 97240.18,
    change: 2.14,
    color: BTC_ORANGE,
    iconSrc: assetSrc(btcIcon),
    spark: [92.1, 93.4, 91.8, 94.2, 95.6, 94.9, 96.1, 97.0, 96.4, 97.24],
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: 6.4,
    price: 3488.42,
    change: -0.82,
    color: "#A67C52",
    iconSrc: assetSrc(ethIcon),
    spark: [3.55, 3.52, 3.54, 3.5, 3.48, 3.49, 3.47, 3.5, 3.46, 3.488],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    balance: 210,
    price: 186.74,
    change: 4.05,
    color: "#C47A28",
    iconSrc: assetSrc(solIcon),
    spark: [168, 172, 170, 176, 179, 177, 182, 184, 183, 186.7],
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    balance: 4200,
    price: 1,
    change: 0.01,
    color: "#8B7355",
    iconSrc: assetSrc(usdcIcon),
    spark: [1, 1.001, 0.999, 1, 1.002, 0.999, 1, 1.001, 1, 1],
  },
]

const ACTIONS = [
  { label: "Receive", icon: ArrowDownLeftIcon },
  { label: "Send", icon: ArrowUpRightIcon },
  { label: "Swap", icon: RefreshCcwIcon },
  { label: "Buy", icon: WalletIcon },
  { label: "History", icon: HistoryIcon },
] as const

function money(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function MiniArea({
  values,
  color,
  up,
  id,
  heightClass = "h-12",
  width = 320,
  height = 56,
}: {
  values: number[]
  color: string
  up: boolean
  id: string
  heightClass?: string
  width?: number
  height?: number
}) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(max - min, max * 0.004, 0.0001)
  const stroke = up ? color : "#F87171"
  const coords = values.map((v, i) => {
    const x = (i / Math.max(values.length - 1, 1)) * width
    const y = height - ((v - min) / span) * (height - 8) - 4
    return [x, y] as const
  })
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ")
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <div className={cn("w-full overflow-hidden", heightClass)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="size-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity={0.4} />
            <stop offset="100%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${id})`} />
        <path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

export default function CryptoPortfolio04({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const rows = React.useMemo(() => {
    const enriched = ASSETS.map((a) => ({
      ...a,
      value: a.balance * a.price,
    }))
    const total = enriched.reduce((s, a) => s + a.value, 0) || 1
    return enriched.map((a) => ({
      ...a,
      weight: (a.value / total) * 100,
      dayPnl: a.value * (a.change / 100),
    }))
  }, [])

  const total = rows.reduce((s, a) => s + a.value, 0)
  const dayPnl = rows.reduce((s, a) => s + a.dayPnl, 0)
  const dayPct = total ? (dayPnl / (total - dayPnl)) * 100 : 0
  const dayUp = dayPnl >= 0
  const btc = rows.find((r) => r.id === "btc")!

  return (
    <section
      className={cn(
        "cp04 relative isolate w-full min-w-0 overflow-hidden py-8",
        className
      )}
      aria-labelledby="crypto-portfolio-04-heading"
      {...props}
    >
      <style>{`
        .cp04 {
          --cp04-orange: ${BTC_ORANGE};
          --cp04-amber: ${BTC_AMBER};
          --cp04-ink: #3d2a1c;
          --cp04-muted: #6b4a2e;
          --cp04-cream: #f7f0e6;
          --cp04-paper: #fffbf5;
          --cp04-sand: #ede3d4;
          --cp04-line: #d4c4ae;
          --cp04-glow: rgba(243, 147, 33, 0.22);
          --cp04-loss: #c2410c;
          background:
            radial-gradient(ellipse 70% 50% at 12% -10%, var(--cp04-glow), transparent 55%),
            radial-gradient(ellipse 50% 40% at 100% 30%, rgba(107, 74, 46, 0.08), transparent 50%),
            var(--cp04-cream);
          color: var(--cp04-ink);
        }
        .dark .cp04 {
          --cp04-ink: #f7f0e6;
          --cp04-muted: #c4a484;
          --cp04-cream: #120c09;
          --cp04-paper: #1c1410;
          --cp04-sand: #2a1e16;
          --cp04-line: #3d2c20;
          --cp04-glow: rgba(243, 147, 33, 0.18);
          --cp04-loss: #fb7185;
          background:
            radial-gradient(ellipse 70% 50% at 12% -10%, var(--cp04-glow), transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(243, 147, 33, 0.08), transparent 50%),
            var(--cp04-cream);
          color: var(--cp04-ink);
        }
      `}</style>

      <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar
              className="size-11"
              style={{ boxShadow: "0 0 0 2px color-mix(in oklab, var(--cp04-orange) 40%, transparent)" }}
            >
              <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
              <AvatarFallback
                className="text-sm font-semibold"
                style={{
                  background: "var(--cp04-sand)",
                  color: "var(--cp04-ink)",
                }}
              >
                {USER.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <h1
                id="crypto-portfolio-04-heading"
                className="truncate text-lg font-semibold tracking-tight"
              >
                {USER.name}
              </h1>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--cp04-muted)" }}
              >
                {USER.handle} · Bitcoin desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className="border-0 font-mono text-[10px] font-semibold"
              style={{
                background: "color-mix(in oklab, var(--cp04-orange) 18%, transparent)",
                color: "var(--cp04-amber)",
              }}
            >
              BTC {dayUp ? "+" : ""}
              {btc.change.toFixed(2)}%
            </Badge>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Notifications"
              className="cursor-pointer"
              style={{ color: "var(--cp04-muted)" }}
            >
              <BellIcon className="size-5" aria-hidden />
            </Button>
          </div>
        </header>

        <div
          className="overflow-hidden rounded-[20px] p-px"
          style={{
            background: `linear-gradient(135deg, var(--cp04-orange), var(--cp04-amber) 45%, var(--cp04-muted))`,
          }}
        >
          <div
            className="rounded-[19px] p-5 sm:p-6"
            style={{ background: "var(--cp04-paper)" }}
          >
            <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p
                  className="text-[11px] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--cp04-muted)" }}
                >
                  Portfolio value
                </p>
                <p
                  dir="ltr"
                  className="mt-1.5 font-mono text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
                >
                  ${money(total)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
                    style={{
                      background: dayUp
                        ? "color-mix(in oklab, var(--cp04-orange) 18%, transparent)"
                        : "color-mix(in oklab, var(--cp04-loss) 14%, transparent)",
                      color: dayUp ? "var(--cp04-amber)" : "var(--cp04-loss)",
                    }}
                  >
                    {dayUp ? (
                      <TrendingUpIcon className="size-3.5" aria-hidden />
                    ) : (
                      <TrendingDownIcon className="size-3.5" aria-hidden />
                    )}
                    {dayUp ? "+" : "-"}${money(Math.abs(dayPnl))} (
                    {dayUp ? "+" : ""}
                    {dayPct.toFixed(2)}%)
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--cp04-muted)" }}
                  >
                    Last 24h
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="h-[46px] cursor-pointer rounded-full px-5 font-semibold text-white hover:opacity-95"
                    style={{ background: "var(--cp04-orange)" }}
                  >
                    <WalletIcon className="size-4" aria-hidden />
                    Trade BTC
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-[46px] cursor-pointer rounded-full px-5 hover:bg-transparent"
                    style={{
                      borderColor: "var(--cp04-line)",
                      color: "var(--cp04-ink)",
                      background: "transparent",
                    }}
                  >
                    Deposit
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--cp04-muted)" }}
                  >
                    Equity · 10 marks
                  </p>
                  <span
                    className="font-mono text-[11px] tabular-nums"
                    style={{ color: "var(--cp04-amber)" }}
                  >
                    BTC led
                  </span>
                </div>
                <MiniArea
                  values={[
                    138, 140, 139, 142, 144, 143, 146, 148, 147, total / 1000,
                  ]}
                  color={BTC_ORANGE}
                  up={dayUp}
                  id="cp04-equity"
                  heightClass="h-28 sm:h-32"
                  height={128}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {ACTIONS.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              className="h-10 cursor-pointer gap-2 rounded-full px-4 hover:bg-transparent"
              style={{
                borderColor: "var(--cp04-line)",
                background: "var(--cp04-paper)",
                color: "var(--cp04-ink)",
              }}
            >
              <Icon className="size-4 opacity-80" aria-hidden />
              {label}
            </Button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {rows.map((asset) => {
            const up = asset.change >= 0
            return (
              <article
                key={asset.id}
                className="rounded-2xl p-4"
                style={{
                  background: "var(--cp04-paper)",
                  boxShadow:
                    asset.id === "btc"
                      ? "0 0 0 1px color-mix(in oklab, var(--cp04-orange) 40%, transparent)"
                      : "0 0 0 1px var(--cp04-line)",
                }}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <img
                      src={asset.iconSrc}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-contain"
                    />
                    <div className="min-w-0 text-start">
                      <p className="truncate text-sm font-semibold">
                        {asset.symbol}
                      </p>
                      <p
                        className="truncate text-[11px]"
                        style={{ color: "var(--cp04-muted)" }}
                      >
                        {asset.name}
                      </p>
                    </div>
                  </div>
                  <span
                    className="font-mono text-[11px] font-semibold tabular-nums"
                    style={{
                      color: up ? "var(--cp04-amber)" : "var(--cp04-loss)",
                    }}
                  >
                    {up ? "+" : ""}
                    {asset.change.toFixed(2)}%
                  </span>
                </div>

                <p
                  dir="ltr"
                  className="font-mono text-lg font-semibold tabular-nums"
                >
                  $
                  {money(
                    asset.price,
                    asset.price >= 100 ? 2 : asset.price >= 1 ? 3 : 4
                  )}
                </p>
                <p
                  dir="ltr"
                  className="mt-0.5 font-mono text-[11px] tabular-nums"
                  style={{ color: "var(--cp04-muted)" }}
                >
                  {asset.balance} {asset.symbol} · ${money(asset.value)}
                </p>
                <p
                  className="mt-1 font-mono text-[11px] tabular-nums"
                  style={{ color: "var(--cp04-muted)" }}
                >
                  {asset.weight.toFixed(1)}% of book
                </p>

                <div className="mt-3">
                  <MiniArea
                    values={asset.spark}
                    color={asset.color}
                    up={up}
                    id={`cp04-${asset.id}`}
                    heightClass="h-14"
                    height={56}
                  />
                </div>
              </article>
            )
          })}
        </div>

        <div
          className="rounded-2xl p-4 sm:p-5"
          style={{
            background: "var(--cp04-paper)",
            boxShadow: "0 0 0 1px var(--cp04-line)",
          }}
        >
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Allocation</h2>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--cp04-muted)" }}
              >
                Warm book mix — BTC weighted
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2.5">
            {rows.map((asset) => (
              <li key={asset.id}>
                <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-2 font-medium">
                    <img
                      src={asset.iconSrc}
                      alt=""
                      width={14}
                      height={14}
                      className="size-3.5 rounded-full object-contain"
                    />
                    {asset.symbol}
                  </span>
                  <span
                    className="font-mono tabular-nums"
                    style={{ color: "var(--cp04-muted)" }}
                  >
                    {asset.weight.toFixed(1)}%
                  </span>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full"
                  style={{ background: "var(--cp04-sand)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${asset.weight}%`,
                      background:
                        asset.id === "btc"
                          ? "linear-gradient(90deg, var(--cp04-orange), var(--cp04-amber))"
                          : asset.color,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
