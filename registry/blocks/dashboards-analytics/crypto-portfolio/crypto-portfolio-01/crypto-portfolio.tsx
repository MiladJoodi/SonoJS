"use client"

import * as React from "react"
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  EyeIcon,
  EyeOffIcon,
  HistoryIcon,
  RefreshCcwIcon,
  SearchIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Input } from "@sonojs/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
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
  /** Deterministic spark points (relative index → price walk) */
  spark: number[]
}

const ASSETS: Asset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.4521,
    price: 64230.5,
    change: 2.4,
    color: "#F39321",
    iconSrc: assetSrc(btcIcon),
    spark: [61.2, 61.8, 60.9, 62.1, 63.4, 62.8, 63.9, 64.1, 63.7, 64.23],
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: 4.2,
    price: 3450.2,
    change: -1.2,
    color: "#8B5CF6",
    iconSrc: assetSrc(ethIcon),
    spark: [3.52, 3.49, 3.51, 3.48, 3.46, 3.47, 3.44, 3.45, 3.43, 3.45],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    balance: 145.5,
    price: 142.6,
    change: 5.8,
    color: "#10B981",
    iconSrc: assetSrc(solIcon),
    spark: [128, 131, 129, 134, 136, 133, 138, 140, 139, 142.6],
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    balance: 2450.0,
    price: 1.0,
    change: 0.01,
    color: "#0EA5E9",
    iconSrc: assetSrc(usdcIcon),
    spark: [1, 1.001, 0.999, 1, 1.002, 0.999, 1, 1.001, 1, 1],
  },
]

const ACTIONS = [
  { label: "Swap", icon: RefreshCcwIcon },
  { label: "Buy", icon: WalletIcon },
  { label: "History", icon: HistoryIcon },
  { label: "Earn", icon: TrendingUpIcon },
] as const

const ACTIVITY = [
  {
    id: 1,
    type: "Received",
    detail: "0.05 BTC from cold wallet",
    time: "2h ago",
    amount: "+$3,211.53",
    tone: "pos" as const,
  },
  {
    id: 2,
    type: "Swapped",
    detail: "120 SOL → USDC",
    time: "Yesterday",
    amount: "$17,112.00",
    tone: "neutral" as const,
  },
  {
    id: 3,
    type: "Sent",
    detail: "0.8 ETH to exchange",
    time: "Mar 12",
    amount: "-$2,760.16",
    tone: "neg" as const,
  },
]

function money(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function AssetMark({ asset }: { asset: Asset }) {
  return (
    <img
      src={asset.iconSrc}
      alt=""
      width={40}
      height={40}
      className="size-10 rounded-full object-contain"
    />
  )
}

/** Fixed SVG spark — avoids ResponsiveContainer 0×0 in table cells. */
function MiniArea({
  values,
  color,
  up,
  id,
}: {
  values: number[]
  color: string
  up: boolean
  id: string
}) {
  const w = 96
  const h = 40
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(max - min, max * 0.004, 0.0001)
  const stroke = up ? color : "#F43F5E"
  const coords = values.map((v, i) => {
    const x = (i / Math.max(values.length - 1, 1)) * w
    const y = h - ((v - min) / span) * (h - 6) - 3
    return [x, y] as const
  })
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="block overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CryptoPortfolio({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [query, setQuery] = React.useState("")
  const [hidden, setHidden] = React.useState(false)
  const [updatedAt, setUpdatedAt] = React.useState("—")

  React.useEffect(() => {
    const tick = () => {
      setUpdatedAt(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const rows = React.useMemo(() => {
    const enriched = ASSETS.map((asset) => {
      const value = asset.balance * asset.price
      return { ...asset, value }
    })
    const total = enriched.reduce((s, a) => s + a.value, 0) || 1
    return enriched.map((a) => ({
      ...a,
      weight: (a.value / total) * 100,
      dayPnl: a.value * (a.change / 100),
    }))
  }, [])

  const totalBalance = rows.reduce((s, a) => s + a.value, 0)
  const dayPnl = rows.reduce((s, a) => s + a.dayPnl, 0)
  const dayPct = totalBalance ? (dayPnl / (totalBalance - dayPnl)) * 100 : 0
  const dayUp = dayPnl >= 0

  const filtered = rows.filter((a) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q)
    )
  })

  const mask = (value: string) => (hidden ? "••••••" : value)

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-canvas py-8 text-foreground sm:px-6 lg:px-8",
        className
      )}
      aria-labelledby="crypto-portfolio-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-0">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border border-border/70 bg-card shadow-soft">
              <AvatarImage src={assetSrc(avatarImg)} alt={USER.name} />
              <AvatarFallback className="bg-card text-sm font-semibold">
                {USER.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <h1
                id="crypto-portfolio-01-heading"
                className="truncate text-lg font-semibold tracking-tight"
              >
                {USER.name}
              </h1>
              <p className="text-xs text-muted-foreground">{USER.handle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">
              Updated {updatedAt}
            </p>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label={hidden ? "Show balances" : "Hide balances"}
              aria-pressed={hidden}
              onClick={() => setHidden((v) => !v)}
              className="cursor-pointer text-muted-foreground"
            >
              {hidden ? (
                <EyeOffIcon className="size-5" aria-hidden />
              ) : (
                <EyeIcon className="size-5" aria-hidden />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Notifications"
              className="relative cursor-pointer text-muted-foreground"
            >
              <BellIcon className="size-5" aria-hidden />
              <span className="absolute end-2.5 top-2.5 size-1.5 rounded-full bg-primary" />
            </Button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="border-border/70 shadow-soft lg:col-span-7">
            <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
              <div className="text-start">
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Total balance
                </p>
                <p
                  dir="ltr"
                  className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
                >
                  {mask(`$${money(totalBalance)}`)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-transparent font-medium",
                      dayUp
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    )}
                  >
                    {dayUp ? (
                      <TrendingUpIcon className="size-3.5" aria-hidden />
                    ) : (
                      <TrendingDownIcon className="size-3.5" aria-hidden />
                    )}
                    <span dir="ltr">
                      {mask(
                        `${dayUp ? "+" : ""}$${money(Math.abs(dayPnl))} (${dayUp ? "+" : ""}${dayPct.toFixed(2)}%)`
                      )}
                    </span>
                  </Badge>
                  <span className="text-sm text-muted-foreground">24h</span>
                </div>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <Button
                  type="button"
                  className="h-[46px] flex-1 cursor-pointer rounded-full px-5 sm:flex-none"
                >
                  <ArrowDownLeftIcon className="size-4" aria-hidden />
                  Receive
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-[46px] flex-1 cursor-pointer rounded-full px-5 sm:flex-none"
                >
                  <ArrowUpRightIcon className="size-4" aria-hidden />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-soft lg:col-span-5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
              {rows.map((asset) => (
                <div key={asset.id}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <img
                        src={asset.iconSrc}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 rounded-full object-contain"
                      />
                      {asset.symbol}
                    </span>
                    <span className="font-mono text-muted-foreground tabular-nums">
                      {mask(`${asset.weight.toFixed(1)}%`)}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${asset.weight}%`,
                        backgroundColor: asset.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ACTIONS.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              className="h-[46px] cursor-pointer justify-start gap-2.5 rounded-[12px] border-border/70 bg-card px-4 shadow-soft"
            >
              <Icon className="size-4 opacity-70" aria-hidden />
              <span className="font-medium">{label}</span>
            </Button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold tracking-tight">
                Your assets
              </h2>
              <div className="relative w-full max-w-xs">
                <SearchIcon
                  className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search asset"
                  aria-label="Search assets"
                  className="h-[46px] ps-9"
                />
              </div>
            </div>

            <Card className="overflow-hidden border-border/70 shadow-soft">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-11 ps-5 text-xs tracking-wider uppercase">
                      Asset
                    </TableHead>
                    <TableHead className="h-11 text-end text-xs tracking-wider uppercase">
                      Price
                    </TableHead>
                    <TableHead className="h-11 text-end text-xs tracking-wider uppercase">
                      24h
                    </TableHead>
                    <TableHead className="hidden h-11 text-end text-xs tracking-wider uppercase md:table-cell">
                      Chart
                    </TableHead>
                    <TableHead className="hidden h-11 text-end text-xs tracking-wider uppercase sm:table-cell">
                      Alloc
                    </TableHead>
                    <TableHead className="h-11 pe-5 text-end text-xs tracking-wider uppercase">
                      Value
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((asset) => {
                    const up = asset.change >= 0
                    return (
                      <TableRow key={asset.id} className="group">
                        <TableCell className="py-3.5 ps-5">
                          <div className="flex items-center gap-3">
                            <AssetMark asset={asset} />
                            <div className="min-w-0 text-start">
                              <p className="font-semibold">{asset.name}</p>
                              <p
                                dir="ltr"
                                className="text-sm text-muted-foreground"
                              >
                                {mask(`${asset.balance} ${asset.symbol}`)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-end">
                          <span
                            dir="ltr"
                            className="text-muted-foreground tabular-nums"
                          >
                            ${money(asset.price, asset.price < 2 ? 4 : 2)}
                          </span>
                        </TableCell>
                        <TableCell className="py-3.5 text-end">
                          <span
                            dir="ltr"
                            className={cn(
                              "inline-flex items-center justify-end gap-1 font-medium tabular-nums",
                              up
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400"
                            )}
                          >
                            {up ? (
                              <TrendingUpIcon className="size-3.5" aria-hidden />
                            ) : (
                              <TrendingDownIcon
                                className="size-3.5"
                                aria-hidden
                              />
                            )}
                            {Math.abs(asset.change)}%
                          </span>
                        </TableCell>
                        <TableCell className="hidden py-3.5 text-end md:table-cell">
                          <div className="ms-auto flex justify-end" dir="ltr">
                            <MiniArea
                              values={asset.spark}
                              color={asset.color}
                              up={up}
                              id={`cp01-${asset.id}`}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="hidden py-3.5 text-end sm:table-cell">
                          <span className="font-mono text-sm text-muted-foreground tabular-nums">
                            {mask(`${asset.weight.toFixed(1)}%`)}
                          </span>
                        </TableCell>
                        <TableCell className="py-3.5 pe-5 text-end">
                          <p
                            dir="ltr"
                            className="font-semibold tabular-nums"
                          >
                            {mask(`$${money(asset.value)}`)}
                          </p>
                          <p
                            dir="ltr"
                            className={cn(
                              "text-xs font-medium tabular-nums",
                              asset.dayPnl >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400"
                            )}
                          >
                            {mask(
                              `${asset.dayPnl >= 0 ? "+" : ""}$${money(Math.abs(asset.dayPnl))}`
                            )}
                          </p>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        No assets match “{query}”.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </Card>
          </div>

          <Card className="border-border/70 shadow-soft lg:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Recent activity
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 pt-0">
              {ACTIVITY.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-[12px] px-2 py-3 hover:bg-muted/50"
                >
                  <div className="min-w-0 text-start">
                    <p className="text-sm font-semibold">{item.type}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {item.time}
                    </p>
                  </div>
                  <p
                    dir="ltr"
                    className={cn(
                      "shrink-0 font-mono text-sm font-medium tabular-nums",
                      item.tone === "pos" &&
                        "text-emerald-600 dark:text-emerald-400",
                      item.tone === "neg" &&
                        "text-rose-600 dark:text-rose-400",
                      item.tone === "neutral" && "text-foreground"
                    )}
                  >
                    {mask(item.amount)}
                  </p>
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                className="mt-1 h-10 w-full cursor-pointer text-muted-foreground"
              >
                View all activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
