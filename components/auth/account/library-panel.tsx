"use client"

import * as React from "react"
import Link from "next/link"
import { DownloadIcon, PackageIcon } from "lucide-react"

import type { ProductLibraryItem } from "@/lib/product-library-types"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"

function sourceLabel(source: ProductLibraryItem["source"]): string {
  return source === "admin_grant" ? "Granted" : "Purchased"
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

/** Session cache so tab switches do not refetch. */
let libraryCache: ProductLibraryItem[] | null = null
let libraryInflight: Promise<ProductLibraryItem[]> | null = null

async function fetchLibraryItems(): Promise<ProductLibraryItem[]> {
  if (libraryCache) return libraryCache
  if (libraryInflight) return libraryInflight

  libraryInflight = (async () => {
    const res = await fetch("/api/account/library", {
      credentials: "include",
    })
    if (res.status === 401) {
      throw new Error("Sign in to view your library.")
    }
    if (!res.ok) {
      throw new Error("Could not load library")
    }
    const data = (await res.json()) as { items?: ProductLibraryItem[] }
    const items = Array.isArray(data.items) ? data.items : []
    libraryCache = items
    return items
  })()

  try {
    return await libraryInflight
  } finally {
    libraryInflight = null
  }
}

/** Call after purchase/grant so the next Library visit refreshes. */
export function invalidateAccountLibraryCache() {
  libraryCache = null
  libraryInflight = null
}

export function LibraryPanel() {
  const [items, setItems] = React.useState<ProductLibraryItem[] | null>(
    () => libraryCache
  )
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(() => libraryCache === null)

  const load = React.useCallback(async (opts?: { force?: boolean }) => {
    if (opts?.force) invalidateAccountLibraryCache()
    setLoading(libraryCache === null)
    setError(null)
    try {
      const next = await fetchLibraryItems()
      setItems(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load library")
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (libraryCache) {
      setItems(libraryCache)
      setLoading(false)
      return
    }
    void load()
  }, [load])

  return (
    <Card className="gap-0 border-border/60 py-0 shadow-none">
      <CardHeader className="border-b border-border/50 py-6">
        <CardTitle className="flex items-center gap-2">
          <PackageIcon className="size-4" aria-hidden />
          Library
        </CardTitle>
        <CardDescription>
          Websites and products you purchased or were granted. Open a product to
          download.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        {loading ? (
          <div className="flex min-h-32 items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="space-y-3">
            <p className="text-sm text-destructive">{error}</p>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer shadow-none"
              onClick={() => void load({ force: true })}
            >
              Retry
            </Button>
          </div>
        ) : !items || items.length === 0 ? (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>No owned products yet.</p>
            <Button asChild variant="outline" className="cursor-pointer shadow-none">
              <Link href="/websites">Browse websites</Link>
            </Button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.slug}>
                <article className="flex gap-3 overflow-hidden rounded-[12px] border border-border/60 bg-card p-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                    {item.coverSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element -- catalog still under /public
                      <img
                        src={item.coverSrc}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <PackageIcon className="size-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sourceLabel(item.source)} · {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="h-8 shrink-0 cursor-pointer shadow-none"
                    >
                      <Link href={item.href}>
                        <DownloadIcon className="size-3.5" aria-hidden />
                        Open
                      </Link>
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
