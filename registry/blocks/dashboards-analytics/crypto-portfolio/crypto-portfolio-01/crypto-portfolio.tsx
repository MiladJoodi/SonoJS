"use client"

import * as React from "react"
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  HistoryIcon,
  RefreshCcwIcon,
  SearchIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

/**
 * Coin icons — drop files in `./icons/` then import here:
 *
 *   icons/btc.svg  → Bitcoin   (id: "btc")
 *   icons/eth.svg  → Ethereum  (id: "eth")
 *   icons/sol.svg  → Solana    (id: "sol")
 *   icons/usdc.svg → USD Coin  (id: "usdc")
 *
 * Example after you add the files:
 *
 *   import btcIcon from "./icons/btc.svg"
 *   … then set iconSrc: assetSrc(btcIcon) on that asset.
 *
 * See `./icons/README.md` for the full map.
 */
function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Asset = {
  id: "btc" | "eth" | "sol" | "usdc"
  name: string
  symbol: string
  balance: number
  price: number
  change: number
  /** Set after dropping `./icons/{id}.svg` (or webp/png) */
  iconSrc?: string
  accent: string
  well: string
}

const ASSETS: Asset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.4521,
    price: 64230.5,
    change: 2.4,
    // iconSrc: assetSrc(btcIcon),
    accent: "text-amber-600 dark:text-amber-400",
    well: "bg-amber-500/15 ring-amber-500/25",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: 4.2,
    price: 3450.2,
    change: -1.2,
    // iconSrc: assetSrc(ethIcon),
    accent: "text-violet-600 dark:text-violet-300",
    well: "bg-violet-500/15 ring-violet-500/25",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    balance: 145.5,
    price: 142.6,
    change: 5.8,
    // iconSrc: assetSrc(solIcon),
    accent: "text-emerald-700 dark:text-emerald-300",
    well: "bg-emerald-500/15 ring-emerald-500/25",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    balance: 2450.0,
    price: 1.0,
    change: 0.01,
    // iconSrc: assetSrc(usdcIcon),
    accent: "text-sky-700 dark:text-sky-300",
    well: "bg-sky-500/15 ring-sky-500/25",
  },
]

const ACTIONS = [
  { label: "Swap", icon: RefreshCcwIcon },
  { label: "Buy", icon: WalletIcon },
  { label: "History", icon: HistoryIcon },
  { label: "Earn", icon: TrendingUpIcon },
] as const

function money(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function AssetMark({ asset }: { asset: Asset }) {
  if (asset.iconSrc) {
    return (
      <img
        src={asset.iconSrc}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full object-cover"
      />
    )
  }

  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-full text-sm font-bold ring-1",
        asset.well,
        asset.accent
      )}
      aria-hidden
    >
      {asset.symbol[0]}
    </span>
  )
}

/** Tiny decorative spark bars (visual only — not live chart data). */
function Spark({ up }: { up: boolean }) {
  const heights = up ? [28, 42, 36, 58, 48, 72, 64] : [64, 52, 60, 40, 48, 32, 38]
  return (
    <div
      className="flex h-8 items-end gap-0.5"
      aria-hidden
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-full",
            up ? "bg-emerald-500/70" : "bg-rose-500/70"
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

export default function CryptoPortfolio({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const totalBalance = ASSETS.reduce(
    (sum, asset) => sum + asset.balance * asset.price,
    0
  )

  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-canvas py-8 text-foreground sm:px-6 lg:px-8",
        className
      )}
      aria-labelledby="crypto-portfolio-01-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[28rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute end-[-8%] top-[40%] size-[18rem] rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-0">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-12 border border-border/70 bg-card shadow-soft">
              <AvatarFallback className="bg-card text-sm font-semibold">
                AJ
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Portfolio
              </p>
              <h1
                id="crypto-portfolio-01-heading"
                className="truncate text-xl font-semibold tracking-tight text-foreground"
              >
                Alex Johnson
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Search"
              className="text-muted-foreground"
            >
              <SearchIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Notifications"
              className="relative text-muted-foreground"
            >
              <BellIcon className="size-5" aria-hidden />
              <span className="absolute end-2.5 top-2.5 size-1.5 rounded-full bg-primary" />
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Balance */}
          <Card className="relative overflow-hidden border-border/70 lg:col-span-2">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-amber-400 to-emerald-400"
            />
            <CardContent className="flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-10">
              <div className="text-start">
                <p className="mb-3 text-sm font-medium tracking-wide text-muted-foreground">
                  Total Balance
                </p>
                <p
                  dir="ltr"
                  className="text-4xl font-light tracking-tighter text-foreground tabular-nums sm:text-5xl"
                >
                  ${money(totalBalance)}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-transparent bg-emerald-500/10 font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    <TrendingUpIcon className="size-3.5" aria-hidden />
                    <span dir="ltr">+$1,245.50</span>
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">
                    Past 24 hours
                  </span>
                </div>
              </div>

              <div className="flex w-full gap-3 md:w-auto">
                <Button
                  type="button"
                  className="h-12 flex-1 rounded-full px-6 md:flex-none"
                >
                  <ArrowDownLeftIcon className="size-4" aria-hidden />
                  Receive
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 flex-1 rounded-full px-6 md:flex-none"
                >
                  <ArrowUpRightIcon className="size-4" aria-hidden />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-0">
              {ACTIONS.map(({ label, icon: Icon }) => (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  className="h-24 flex-col gap-2.5 rounded-[12px] border border-transparent bg-muted/40 text-foreground hover:border-border/70 hover:bg-muted"
                >
                  <Icon className="size-5 opacity-70" aria-hidden />
                  <span className="font-medium">{label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Assets */}
        <div>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Your Assets
            </h2>
            <p className="text-xs text-muted-foreground">
              Icons: drop files in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                icons/btc|eth|sol|usdc
              </code>
            </p>
          </div>

          <Card className="overflow-hidden border-border/70">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-12 ps-6 text-xs tracking-wider uppercase">
                    Asset
                  </TableHead>
                  <TableHead className="h-12 text-end text-xs tracking-wider uppercase">
                    Price
                  </TableHead>
                  <TableHead className="h-12 text-end text-xs tracking-wider uppercase">
                    24h
                  </TableHead>
                  <TableHead className="hidden h-12 text-end text-xs tracking-wider uppercase sm:table-cell">
                    Trend
                  </TableHead>
                  <TableHead className="h-12 pe-6 text-end text-xs tracking-wider uppercase">
                    Balance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ASSETS.map((asset) => {
                  const up = asset.change >= 0
                  const value = asset.balance * asset.price
                  return (
                    <TableRow
                      key={asset.id}
                      className="group cursor-pointer"
                    >
                      <TableCell className="py-4 ps-6">
                        <div className="flex items-center gap-3">
                          <span className="transition-transform duration-300 group-hover:scale-105">
                            <AssetMark asset={asset} />
                          </span>
                          <div className="min-w-0 text-start">
                            <p className="font-semibold text-foreground">
                              {asset.name}
                            </p>
                            <p
                              dir="ltr"
                              className="text-sm font-medium text-muted-foreground"
                            >
                              {asset.symbol}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-end">
                        <span
                          dir="ltr"
                          className="font-medium text-muted-foreground tabular-nums"
                        >
                          ${money(asset.price)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-end">
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
                            <TrendingUpIcon
                              className="size-4"
                              aria-hidden
                            />
                          ) : (
                            <TrendingDownIcon
                              className="size-4"
                              aria-hidden
                            />
                          )}
                          {Math.abs(asset.change)}%
                        </span>
                      </TableCell>
                      <TableCell className="hidden py-4 text-end sm:table-cell">
                        <div className="ms-auto flex justify-end">
                          <Spark up={up} />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 pe-6 text-end">
                        <div className="text-end">
                          <p
                            dir="ltr"
                            className="font-semibold text-foreground tabular-nums"
                          >
                            ${money(value)}
                          </p>
                          <p
                            dir="ltr"
                            className="text-sm font-medium text-muted-foreground tabular-nums"
                          >
                            {asset.balance} {asset.symbol}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </section>
  )
}
