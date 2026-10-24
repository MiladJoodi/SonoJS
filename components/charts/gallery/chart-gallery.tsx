"use client"

import * as React from "react"

import {
  CHART_CATEGORIES,
  CHART_CATEGORY_META,
  getChartCategoryIcon,
  getChartsByCategory,
  type ChartCategory,
} from "@/lib/charts-catalog"

import { ChartExampleCard } from "./example-card"
import {
  CHART_THUMB_EAGER_COUNT,
  CHARTS_GALLERY_ACTIVE_EVENT,
  chartGallerySectionId,
} from "./thumbs"

function publishActiveCategory(id: ChartCategory | null) {
  window.dispatchEvent(
    new CustomEvent(CHARTS_GALLERY_ACTIVE_EVENT, { detail: { id } })
  )
}

/** Near page top → treat as “All charts”, not the first section. */
const GALLERY_TOP_CLEAR_PX = 96

/**
 * Visual chart index — section per category, thumb cards → `/charts/view/[id]`.
 * Same shell as docs/blocks (`container-wrapper`); denser cols for thumbs.
 */
export function ChartGallery({
  categories = CHART_CATEGORIES,
}: {
  /** Limit to one category (category overview pages). */
  categories?: readonly ChartCategory[]
}) {
  const scrollToRef = React.useRef<ChartCategory | null>(null)

  const eagerThumbIds = React.useMemo(() => {
    const ids = new Set<string>()
    for (const category of categories) {
      for (const entry of getChartsByCategory(category)) {
        if (ids.size >= CHART_THUMB_EAGER_COUNT) return ids
        ids.add(entry.id)
      }
    }
    return ids
  }, [categories])

  const scrollSectionIntoView = React.useCallback(
    (id: ChartCategory, behavior: ScrollBehavior = "smooth") => {
      const node = document.getElementById(chartGallerySectionId(id))
      if (!node) return
      node.scrollIntoView({ behavior, block: "start" })
    },
    []
  )

  React.useEffect(() => {
    const hash = window.location.hash.replace(/^#chart-type-/, "")
    if (hash && (categories as readonly string[]).includes(hash)) {
      const id = hash as ChartCategory
      publishActiveCategory(id)
      requestAnimationFrame(() => {
        scrollSectionIntoView(id, "auto")
      })
    }
  }, [categories, scrollSectionIntoView])

  React.useEffect(() => {
    if (categories.length <= 1) return

    const sections = categories
      .map((id) => document.getElementById(chartGallerySectionId(id)))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const clearTopSelection = () => {
      if (window.scrollY > GALLERY_TOP_CLEAR_PX) return false
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
      publishActiveCategory(null)
      return true
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollToRef.current) return
        if (clearTopSelection()) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
        const top = visible[0]
        if (!top?.target.id) return
        const id = top.target.id.replace(/^chart-type-/, "") as ChartCategory
        if (!(categories as readonly string[]).includes(id)) return
        window.history.replaceState(null, "", `#${chartGallerySectionId(id)}`)
        publishActiveCategory(id)
      },
      {
        root: null,
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.25],
      }
    )

    const onScroll = () => {
      if (scrollToRef.current) return
      clearTopSelection()
    }

    for (const section of sections) observer.observe(section)
    window.addEventListener("scroll", onScroll, { passive: true })
    clearTopSelection()
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [categories])

  React.useEffect(() => {
    const onHashClick = (event: Event) => {
      const detail = (event as CustomEvent<{ id: ChartCategory }>).detail
      if (!detail?.id) return
      if (!(categories as readonly string[]).includes(detail.id)) return
      scrollToRef.current = detail.id
      scrollSectionIntoView(detail.id, "smooth")
      window.setTimeout(() => {
        if (scrollToRef.current === detail.id) scrollToRef.current = null
      }, 700)
    }
    window.addEventListener("sonojs:charts-gallery-scroll-to", onHashClick)
    return () =>
      window.removeEventListener("sonojs:charts-gallery-scroll-to", onHashClick)
  }, [categories, scrollSectionIntoView])

  const multi = categories.length > 1

  return (
    <div className="flex w-full min-w-0 flex-col gap-10 md:gap-12">
      {categories.map((category) => {
        const meta = CHART_CATEGORY_META[category]
        const Icon = getChartCategoryIcon(category)
        const entries = getChartsByCategory(category)
        return (
          <section
            key={category}
            id={chartGallerySectionId(category)}
            data-chart-section={category}
            className="scroll-mt-[calc(var(--header-height)+1rem)]"
          >
            {multi ? (
              <div className="mb-3 flex min-w-0 items-center gap-2 border-b border-border/50 pb-2 md:mb-4">
                <Icon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <h2 className="text-sm font-semibold tracking-tight md:text-base">
                  {meta.title}
                </h2>
                <span
                  aria-hidden
                  className="mb-0.5 min-w-4 flex-1 border-b border-dashed border-border/50"
                />
                <span className="shrink-0 text-xs text-muted-foreground/70">
                  {entries.length}
                </span>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {entries.map((entry) => (
                <ChartExampleCard
                  key={entry.id}
                  id={entry.id}
                  title={entry.title}
                  status={entry.status}
                  loading={
                    eagerThumbIds.has(entry.id) ? "eager" : "lazy"
                  }
                />
              ))}
            </div>
          </section>
        )
      })}
      {multi ? (
        <div aria-hidden className="h-[min(35svh,12rem)] shrink-0" />
      ) : null}
    </div>
  )
}
