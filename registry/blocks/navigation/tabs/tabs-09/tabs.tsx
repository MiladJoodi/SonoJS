"use client"

import * as React from "react"
import {
  GiftIcon,
  PercentIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

import lampImage from "./images/lamp.webp"
import mugsImage from "./images/mugs.webp"
import throwImage from "./images/throw.webp"
import tableImage from "./images/table.webp"
import bowlImage from "./images/bowl.webp"
import cushionImage from "./images/cushion.webp"
import trayImage from "./images/tray.webp"
import toteImage from "./images/tote.webp"
import candlesImage from "./images/candles.webp"
import bundleImage from "./images/bundle.webp"
import careKitImage from "./images/care-kit.webp"
import giftCardImage from "./images/gift-card.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Product = {
  name: string
  price: string
  image: string | { src: string }
  tag?: string
  was?: string
}

const catalog = {
  new: [
    {
      name: "Aura Desk Lamp",
      price: "$89",
      tag: "Just in",
      image: lampImage,
    },
    {
      name: "Clay Mug Set",
      price: "$42",
      tag: "Just in",
      image: mugsImage,
    },
    {
      name: "Linen Throw",
      price: "$68",
      tag: "Just in",
      image: throwImage,
    },
  ],
  popular: [
    {
      name: "Oak Side Table",
      price: "$210",
      tag: "Best seller",
      image: tableImage,
    },
    {
      name: "Stoneware Bowl",
      price: "$28",
      tag: "Popular",
      image: bowlImage,
    },
    {
      name: "Wool Cushion",
      price: "$36",
      tag: "Popular",
      image: cushionImage,
    },
  ],
  sale: [
    {
      name: "Brass Tray",
      price: "$54",
      was: "$72",
      tag: "25% off",
      image: trayImage,
    },
    {
      name: "Canvas Tote",
      price: "$24",
      was: "$38",
      tag: "37% off",
      image: toteImage,
    },
    {
      name: "Candle Trio",
      price: "$32",
      was: "$48",
      tag: "33% off",
      image: candlesImage,
    },
  ],
  gift: [
    {
      name: "Starter Bundle",
      price: "$120",
      tag: "Gift set",
      image: bundleImage,
    },
    {
      name: "Care Kit",
      price: "$45",
      tag: "Gift set",
      image: careKitImage,
    },
    {
      name: "Gift Card",
      price: "$50+",
      tag: "Digital",
      image: giftCardImage,
    },
  ],
} as const satisfies Record<string, readonly Product[]>

const filters = [
  { value: "new", label: "New", icon: SparklesIcon, items: catalog.new },
  {
    value: "popular",
    label: "Popular",
    icon: TrendingUpIcon,
    items: catalog.popular,
  },
  { value: "sale", label: "Sale", icon: PercentIcon, items: catalog.sale },
  { value: "gift", label: "Gift", icon: GiftIcon, items: catalog.gift },
] as const

type ShopFilter = (typeof filters)[number]["value"]

const triggerClass = cn(
  "relative top-px h-auto min-h-11 flex-none flex-col gap-0.5 rounded-none border-0 border-b-2 border-transparent",
  "bg-transparent px-3 py-2.5 text-muted-foreground shadow-none after:hidden after:opacity-0",
  "hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:bg-transparent",
  "data-[state=active]:text-foreground data-[state=active]:shadow-none"
)

function ProductGrid({ items }: { items: readonly Product[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.name}
          className="group flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        >
          <div className="relative aspect-[4/3] bg-muted/40">
            <img
              src={assetSrc(item.image)}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            {item.tag ? (
              <span className="absolute start-2.5 top-2.5 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-foreground shadow-xs backdrop-blur-sm">
                {item.tag}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5 p-3.5">
            <h4 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {item.name}
            </h4>
            <p className="flex items-baseline gap-1.5 text-sm tabular-nums">
              <span className="font-semibold text-foreground">{item.price}</span>
              {item.was ? (
                <span className="text-xs text-muted-foreground line-through">
                  {item.was}
                </span>
              ) : null}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [filter, setFilter] = React.useState<ShopFilter>("popular")
  const active = filters.find((f) => f.value === filter) ?? filters[1]

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-3xl rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      {...props}
    >
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as ShopFilter)}
        className="w-full gap-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <h3 className="text-h4 text-foreground">Shop the collection</h3>
            <p className="text-sm text-muted-foreground">
              Curated home goods for spring · {active.items.length} pieces
            </p>
          </div>
          <Button variant="outline" className="h-10 rounded-[12px]">
            View all
          </Button>
        </div>

        <TabsList
          aria-label="Product categories"
          className="no-scrollbar h-auto w-full min-w-0 justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-none border-b border-border/70 bg-transparent p-0"
        >
          {filters.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={triggerClass}
            >
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <item.icon aria-hidden className="size-3.5 opacity-70" />
                {item.label}
              </span>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  filter === item.value
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.items.length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sizer = Popular grid height so category switches don’t jump. */}
        <div className="relative">
          <div className="invisible" aria-hidden>
            <ProductGrid items={catalog.popular} />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <ProductGrid items={active.items} />
          </div>
        </div>
      </Tabs>
    </div>
  )
}
