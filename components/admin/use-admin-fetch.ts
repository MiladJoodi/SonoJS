"use client"

import * as React from "react"

/** Fresh window for tab switches — show cache instantly, revalidate after. */
const STALE_MS = 60_000

type CacheEntry = {
  data: unknown
  error: string | null
  at: number
}

const cache = new Map<string, CacheEntry>()
const inflight = new Map<string, Promise<unknown>>()

export function invalidateAdminCache(match?: string) {
  if (!match) {
    cache.clear()
    inflight.clear()
    return
  }
  for (const key of [...cache.keys()]) {
    if (key.includes(match)) cache.delete(key)
  }
  for (const key of [...inflight.keys()]) {
    if (key.includes(match)) inflight.delete(key)
  }
}

export function useAdminFetch<T>(
  url: string | null,
  fetcher: (url: string) => Promise<T>
): {
  data: T | null
  error: string | null
  /** True only when there is no cached data yet. */
  loading: boolean
  refreshing: boolean
  refresh: () => void
} {
  const fetcherRef = React.useRef(fetcher)
  fetcherRef.current = fetcher

  const initial = url ? cache.get(url) : undefined
  const [data, setData] = React.useState<T | null>(
    () => (initial?.data as T | undefined) ?? null
  )
  const [error, setError] = React.useState<string | null>(
    () => initial?.error ?? null
  )
  const [loading, setLoading] = React.useState(() => initial?.data == null)
  const [refreshing, setRefreshing] = React.useState(false)

  const run = React.useCallback(
    async (force: boolean) => {
      if (!url) {
        setData(null)
        setError(null)
        setLoading(false)
        setRefreshing(false)
        return
      }

      const hit = cache.get(url)
      const isFresh =
        !force &&
        hit != null &&
        hit.data != null &&
        Date.now() - hit.at < STALE_MS

      if (isFresh) {
        setData(hit.data as T)
        setError(hit.error)
        setLoading(false)
        setRefreshing(false)
        return
      }

      const hasCachedData = hit?.data != null
      if (hasCachedData) {
        setData(hit.data as T)
        setError(hit.error)
        setLoading(false)
        setRefreshing(true)
      } else {
        // URL changed or cold miss — don't flash previous key's rows
        setData(null)
        setError(null)
        setLoading(true)
      }

      try {
        let pending = inflight.get(url) as Promise<T> | undefined
        if (!pending || force) {
          pending = fetcherRef.current(url)
          inflight.set(url, pending)
        }
        const next = await pending
        cache.set(url, { data: next, error: null, at: Date.now() })
        setData(next)
        setError(null)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Request failed"
        cache.set(url, {
          data: hit?.data ?? null,
          error: message,
          at: Date.now(),
        })
        setError(message)
        if (hit?.data != null) setData(hit.data as T)
      } finally {
        inflight.delete(url)
        setLoading(false)
        setRefreshing(false)
      }
    },
    [url]
  )

  React.useEffect(() => {
    void run(false)
  }, [run])

  return {
    data,
    error,
    loading,
    refreshing,
    refresh: () => void run(true),
  }
}

export async function adminFetchJson<T>(
  url: string,
  pick: (json: Record<string, unknown>, res: Response) => T,
  fallbackError: string
): Promise<T> {
  const res = await fetch(url)
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>
  if (!res.ok) {
    throw new Error(
      typeof json.error === "string" ? json.error : fallbackError
    )
  }
  return pick(json, res)
}
