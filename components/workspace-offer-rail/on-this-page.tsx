"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"

type TocItem = {
  id: string
  title: string
  level: 2 | 3
}

const SCROLL_MT_CLASS = "scroll-mt-[calc(var(--header-height)+1.25rem)]"

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function headerOffsetPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim()
  const header = raw.endsWith("rem")
    ? Number.parseFloat(raw) * 16
    : Number.parseFloat(raw) || 56
  // Extra gap so the section title sits clearly below the sticky header.
  return header + 20
}

function ensureId(el: HTMLElement, fallback: string) {
  if (!el.id) {
    const base = slugify(el.textContent || fallback) || fallback
    let id = base
    let n = 2
    while (document.getElementById(id)) {
      id = `${base}-${n}`
      n += 1
    }
    el.id = id
  }
  el.classList.add(SCROLL_MT_CLASS)
  return el.id
}

function collectToc(root: HTMLElement): TocItem[] {
  const items: TocItem[] = []
  const seen = new Set<string>()

  const previewMarked = root.querySelector<HTMLElement>(
    "[data-sono-toc='preview']"
  )
  const previewFallback = root.querySelector<HTMLElement>(
    "[data-sono-capture-root]"
  )
  const previewHost =
    previewMarked ??
    previewFallback?.closest<HTMLElement>("section") ??
    previewFallback

  if (previewHost) {
    if (!previewHost.id) previewHost.id = "preview"
    previewHost.classList.add(SCROLL_MT_CLASS)
    if (!seen.has(previewHost.id)) {
      seen.add(previewHost.id)
      items.push({ id: previewHost.id, title: "Preview", level: 2 })
    }
  }

  for (const node of root.querySelectorAll("[data-sono-toc-item]")) {
    if (!(node instanceof HTMLElement)) continue
    if (node === previewHost) continue
    const title = (
      node.getAttribute("data-sono-toc-item") ||
      node.textContent ||
      ""
    ).trim()
    if (!title) continue
    const id = ensureId(node, title)
    if (seen.has(id)) continue
    seen.add(id)
    items.push({ id, title, level: 2 })
  }

  for (const node of root.querySelectorAll("h2")) {
    if (!(node instanceof HTMLElement)) continue
    if (node.closest("[data-sono-toc='preview']")) continue
    if (node.closest("[data-sono-toc-item]")) continue
    const title = (node.textContent || "").trim()
    if (!title) continue
    const id = ensureId(node, title)
    if (seen.has(id)) continue
    seen.add(id)
    items.push({ id, title, level: 2 })
  }

  return items
}

function activeFromScroll(items: TocItem[]) {
  if (items.length === 0) return null

  const offset = headerOffsetPx()
  const scrollY = window.scrollY
  const viewH = window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  const maxScroll = Math.max(0, docHeight - viewH)

  // Last section often can't reach the offset line — pin when at / near EOF.
  if (scrollY >= maxScroll - 8 || scrollY + viewH >= docHeight - 64) {
    return items[items.length - 1]!.id
  }

  let current: string | null = items[0]!.id
  for (const item of items) {
    const el = document.getElementById(item.id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= offset + 8) {
      current = item.id
    }
  }
  return current
}

/**
 * In-page TOC for the desktop offer rail — mirrors main content headings.
 */
export function WorkspaceOnThisPage({ className }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(true)
  const [items, setItems] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const clickLockRef = React.useRef<string | null>(null)
  const unlockTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-workspace-main]")
    if (!root) {
      setItems([])
      return
    }

    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next = collectToc(root)
        setItems((prev) => {
          if (
            prev.length === next.length &&
            prev.every(
              (item, i) =>
                item.id === next[i]?.id &&
                item.title === next[i]?.title &&
                item.level === next[i]?.level
            )
          ) {
            return prev
          }
          return next
        })
      })
    }
    refresh()

    const mo = new MutationObserver(() => refresh())
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
    }
  }, [pathname])

  React.useEffect(() => {
    if (items.length === 0) {
      setActiveId(null)
      return
    }

    const onScroll = () => {
      if (clickLockRef.current) return
      const next = activeFromScroll(items)
      setActiveId((prev) => (prev === next ? prev : next))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [items])

  React.useEffect(() => {
    return () => {
      if (unlockTimerRef.current != null) {
        window.clearTimeout(unlockTimerRef.current)
      }
    }
  }, [])

  if (items.length === 0) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <nav
        className={cn(
          "mt-5 w-full max-w-[300px] border-t border-border/50 pt-4",
          className
        )}
        aria-label="On this page"
      >
        <CollapsibleTrigger className="mb-1.5 flex h-7 w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 text-start outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring">
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground/80 uppercase">
            On this page
          </span>
          <ChevronDownIcon
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
              open ? "rotate-180" : "rotate-0"
            )}
            aria-hidden
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ul className="flex flex-col gap-0.5">
            {items.map((item) => {
              const active = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "flex min-h-8 w-full min-w-0 cursor-pointer items-center rounded-md px-2 py-1.5 text-start text-[12.5px] font-medium leading-snug outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    onClick={(e) => {
                      const el = document.getElementById(item.id)
                      if (!el) return
                      e.preventDefault()

                      clickLockRef.current = item.id
                      setActiveId(item.id)
                      if (unlockTimerRef.current != null) {
                        window.clearTimeout(unlockTimerRef.current)
                      }

                      const top =
                        window.scrollY +
                        el.getBoundingClientRect().top -
                        headerOffsetPx()
                      window.scrollTo({
                        top: Math.max(0, top),
                        behavior: "smooth",
                      })
                      history.replaceState(null, "", `#${item.id}`)

                      // Keep the clicked item after smooth-scroll. Scroll handler
                      // takes over on the next user scroll (lock blocks mid-flight).
                      unlockTimerRef.current = window.setTimeout(() => {
                        const locked = clickLockRef.current
                        clickLockRef.current = null
                        if (locked) {
                          setActiveId(locked)
                          return
                        }
                        setActiveId(activeFromScroll(items))
                      }, 900)
                    }}
                  >
                    <span className="min-w-0 truncate">{item.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </CollapsibleContent>
      </nav>
    </Collapsible>
  )
}
