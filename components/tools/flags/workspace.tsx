"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CopyButton } from "@/components/docs/copy-button"
import { cn } from "@/lib/utils"

import { FlagCard } from "./flag-card"
import { FlagDetailDialog } from "./flag-detail-dialog"
import { countriesToJson, countriesToMarkdown } from "./lib/export"
import { FLAG_COUNTRIES, findCountry, type FlagCountry } from "./lib/countries"
import { filterAndSortCountries } from "./lib/filter-sort"
import { FlagsToolbar } from "./toolbar"

export function Workspace() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchRef = React.useRef<HTMLInputElement>(null)

  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<FlagCountry | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  /** Blocks card clicks while the dialog exit animation finishes (mobile ghost tap). */
  const [blockCardPointer, setBlockCardPointer] = React.useState(false)
  const clearSelectedTimerRef = React.useRef<number | null>(null)

  const visible = React.useMemo(
    () => filterAndSortCountries(FLAG_COUNTRIES, query),
    [query]
  )

  React.useEffect(() => {
    return () => {
      if (clearSelectedTimerRef.current != null) {
        window.clearTimeout(clearSelectedTimerRef.current)
      }
    }
  }, [])

  // Deep-link ?c=US — only open when a code is present (never fight close).
  React.useEffect(() => {
    const code = searchParams.get("c")
    if (!code) return
    const match = findCountry(code)
    if (!match) return
    if (clearSelectedTimerRef.current != null) {
      window.clearTimeout(clearSelectedTimerRef.current)
      clearSelectedTimerRef.current = null
    }
    setSelected(match)
    setDialogOpen(true)
    setBlockCardPointer(false)
  }, [searchParams])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/") return
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }
      if (dialogOpen) return
      event.preventDefault()
      searchRef.current?.focus()
      searchRef.current?.select()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [dialogOpen])

  function setUrlCode(code: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (code) params.set("c", code.toUpperCase())
    else params.delete("c")
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  function openCountry(country: FlagCountry) {
    if (blockCardPointer) return
    if (clearSelectedTimerRef.current != null) {
      window.clearTimeout(clearSelectedTimerRef.current)
      clearSelectedTimerRef.current = null
    }
    setSelected(country)
    setDialogOpen(true)
    setBlockCardPointer(false)
    setUrlCode(country.code)
  }

  function onDialogOpenChange(open: boolean) {
    if (open) {
      setDialogOpen(true)
      return
    }
    setDialogOpen(false)
    setUrlCode(null)
    setBlockCardPointer(true)
    // Keep country mounted through the exit animation; ignore ghost taps under overlay.
    if (clearSelectedTimerRef.current != null) {
      window.clearTimeout(clearSelectedTimerRef.current)
    }
    clearSelectedTimerRef.current = window.setTimeout(() => {
      setSelected(null)
      setBlockCardPointer(false)
      clearSelectedTimerRef.current = null
    }, 220)
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-canvas">
      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto",
          blockCardPointer && "pointer-events-none"
        )}
      >
        <div className="mx-auto w-full max-w-[1200px] space-y-4 px-4 py-6 sm:px-6 sm:py-8">
          <header className="space-y-1">
            <h1 className="text-h3 tracking-tight text-foreground">Flags</h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {visible.length === FLAG_COUNTRIES.length
                ? `Browse ${FLAG_COUNTRIES.length} flags and copy CDN URLs.`
                : `Showing ${visible.length} of ${FLAG_COUNTRIES.length} flags — copy CDN URLs.`}{" "}
              Also on npm as{" "}
              <a
                href="https://www.npmjs.com/package/@sonojs/flags"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="font-medium text-foreground underline underline-offset-3 hover:text-primary"
              >
                @sonojs/flags
              </a>
              .
            </p>
          </header>

          <FlagsToolbar
            query={query}
            onQueryChange={setQuery}
            inputRef={searchRef}
          />

          {visible.length === 0 ? (
            <div className="rounded-[12px] border border-dashed border-border/70 px-4 py-12 text-center text-sm text-muted-foreground">
              No countries match. Try another search.
            </div>
          ) : (
            <div
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              aria-live="polite"
            >
              {visible.map((country) => (
                <FlagCard
                  key={country.code}
                  country={country}
                  selected={dialogOpen && selected?.code === country.code}
                  onSelect={openCountry}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-t border-border/60 pt-4">
            <ExportAction
              label="Copy visible countries as JSON"
              value={countriesToJson(visible)}
            />
            <ExportAction
              label="Copy visible countries as Markdown"
              value={countriesToMarkdown(visible)}
            />
          </div>
        </div>
      </div>

      <FlagDetailDialog
        country={selected}
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
      />
    </div>
  )
}

function ExportAction({ label, value }: { label: string; value: string }) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-[12px] border border-border/70 bg-card px-2.5 py-2 text-sm font-medium text-foreground",
        "hover:border-primary/40"
      )}
    >
      <span className="min-w-0 leading-snug">{label}</span>
      <CopyButton value={value} tone="chrome" className="shrink-0" />
    </div>
  )
}
