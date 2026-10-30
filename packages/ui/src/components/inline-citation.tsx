"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import type { CarouselApi } from "@sonojs/ui/components/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@sonojs/ui/components/carousel"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@sonojs/ui/components/hover-card"
import { cn } from "@sonojs/ui/lib/utils"

export type InlineCitationProps = React.ComponentProps<"span">

function InlineCitation({ className, ...props }: InlineCitationProps) {
  return (
    <span
      data-slot="inline-citation"
      className={cn("group inline items-center gap-1", className)}
      {...props}
    />
  )
}

export type InlineCitationTextProps = React.ComponentProps<"span">

function InlineCitationText({ className, ...props }: InlineCitationTextProps) {
  return (
    <span
      data-slot="inline-citation-text"
      className={cn("transition-colors group-hover:bg-accent", className)}
      {...props}
    />
  )
}

export type InlineCitationCardProps = React.ComponentProps<typeof HoverCard>

function InlineCitationCard(props: InlineCitationCardProps) {
  return (
    <HoverCard
      data-slot="inline-citation-card"
      closeDelay={0}
      openDelay={0}
      {...props}
    />
  )
}

export type InlineCitationCardTriggerProps = React.ComponentProps<
  typeof Badge
> & {
  sources: string[]
}

function hostnameFromUrl(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function InlineCitationCardTrigger({
  sources,
  className,
  ...props
}: InlineCitationCardTriggerProps) {
  return (
    <HoverCardTrigger asChild>
      <Badge
        data-slot="inline-citation-card-trigger"
        className={cn("ms-1 cursor-pointer rounded-full", className)}
        variant="secondary"
        {...props}
      >
        {sources[0] ? (
          <>
            {hostnameFromUrl(sources[0])}{" "}
            {sources.length > 1 ? `+${sources.length - 1}` : null}
          </>
        ) : (
          "unknown"
        )}
      </Badge>
    </HoverCardTrigger>
  )
}

export type InlineCitationCardBodyProps = React.ComponentProps<"div">

function InlineCitationCardBody({
  className,
  ...props
}: InlineCitationCardBodyProps) {
  return (
    <HoverCardContent
      data-slot="inline-citation-card-body"
      align="start"
      sideOffset={8}
      collisionPadding={16}
      className={cn(
        "relative w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] overflow-hidden p-0",
        className
      )}
      {...props}
    />
  )
}

const CarouselApiContext = React.createContext<CarouselApi | undefined>(
  undefined
)

function useCarouselApi() {
  return React.useContext(CarouselApiContext)
}

export type InlineCitationCarouselProps = React.ComponentProps<typeof Carousel>

function InlineCitationCarousel({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel
        data-slot="inline-citation-carousel"
        className={cn("w-full", className)}
        setApi={setApi}
        {...props}
      >
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  )
}

export type InlineCitationCarouselContentProps = React.ComponentProps<
  typeof CarouselContent
>

function InlineCitationCarouselContent(
  props: InlineCitationCarouselContentProps
) {
  return (
    <CarouselContent data-slot="inline-citation-carousel-content" {...props} />
  )
}

export type InlineCitationCarouselItemProps = React.ComponentProps<"div">

function InlineCitationCarouselItem({
  className,
  children,
  ...props
}: InlineCitationCarouselItemProps) {
  // Padding lives on an inner wrapper — Embla’s `-ms-4`/`ps-4` gutter would
  // otherwise clip start-edge padding and glue text to the card border.
  return (
    <CarouselItem
      data-slot="inline-citation-carousel-item"
      className={cn("w-full", className)}
      {...props}
    >
      <div className="space-y-2 px-5 py-4">{children}</div>
    </CarouselItem>
  )
}

export type InlineCitationCarouselHeaderProps = React.ComponentProps<"div">

function InlineCitationCarouselHeader({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) {
  return (
    <div
      data-slot="inline-citation-carousel-header"
      className={cn(
        "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
        className
      )}
      {...props}
    />
  )
}

export type InlineCitationCarouselIndexProps = React.ComponentProps<"div">

function InlineCitationCarouselIndex({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) {
  const api = useCarouselApi()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const syncState = React.useCallback(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
  }, [api])

  React.useEffect(() => {
    if (!api) return

    syncState()
    api.on("select", syncState)

    return () => {
      api.off("select", syncState)
    }
  }, [api, syncState])

  return (
    <div
      data-slot="inline-citation-carousel-index"
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  )
}

export type InlineCitationCarouselPrevProps = React.ComponentProps<"button">

function InlineCitationCarouselPrev({
  className,
  ...props
}: InlineCitationCarouselPrevProps) {
  const api = useCarouselApi()

  const handleClick = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  return (
    <button
      type="button"
      aria-label="Previous"
      data-slot="inline-citation-carousel-prev"
      className={cn(
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <ArrowLeftIcon className="icon-dir size-4 text-muted-foreground" />
    </button>
  )
}

export type InlineCitationCarouselNextProps = React.ComponentProps<"button">

function InlineCitationCarouselNext({
  className,
  ...props
}: InlineCitationCarouselNextProps) {
  const api = useCarouselApi()

  const handleClick = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  return (
    <button
      type="button"
      aria-label="Next"
      data-slot="inline-citation-carousel-next"
      className={cn(
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <ArrowRightIcon className="icon-dir size-4 text-muted-foreground" />
    </button>
  )
}

export type InlineCitationSourceProps = React.ComponentProps<"div"> & {
  title?: string
  url?: string
  description?: string
}

function InlineCitationSource({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) {
  return (
    <div
      data-slot="inline-citation-source"
      className={cn("space-y-1", className)}
      {...props}
    >
      {title ? (
        <h4 className="truncate text-sm leading-tight font-medium">{title}</h4>
      ) : null}
      {url ? (
        <p className="line-clamp-2 break-all text-xs text-muted-foreground">
          {url}
        </p>
      ) : null}
      {description ? (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}

export type InlineCitationQuoteProps = React.ComponentProps<"blockquote">

function InlineCitationQuote({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) {
  return (
    <blockquote
      data-slot="inline-citation-quote"
      className={cn(
        "border-s-2 border-muted ps-3 text-sm text-muted-foreground italic",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
}
