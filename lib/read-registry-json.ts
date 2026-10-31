import { readFile } from "node:fs/promises"
import path from "node:path"

import { siteConfig } from "@/lib/config"

const NAME_RE = /^[a-z0-9][a-z0-9-]*$/i

/**
 * Base URL for `public/r/*.json` as static assets (CDN / Next public).
 * Prefer this over bundling the whole registry into every serverless function.
 */
function registryAssetOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, "")
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    return vercel.startsWith("http") ? vercel.replace(/\/$/, "") : `https://${vercel}`
  }
  return siteConfig.url.replace(/\/$/, "")
}

/**
 * Load one registry item JSON without requiring NFT to ship all of `public/r`
 * (~120MB) into each docs/lambda.
 *
 * Order: disk (local / included files) → HTTP fetch of the static asset.
 */
export async function readRegistryJsonText(
  name: string
): Promise<string | null> {
  if (!NAME_RE.test(name)) return null

  const diskPath = path.join(process.cwd(), "public", "r", `${name}.json`)
  try {
    return await readFile(diskPath, "utf8")
  } catch {
    // Expected on Vercel when `public/r` is excluded from function tracing.
  }

  try {
    const url = `${registryAssetOrigin()}/r/${encodeURIComponent(name)}.json`
    const res = await fetch(url, {
      // Registry payloads change only on deploy
      cache: "force-cache",
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export async function readRegistryJson<T = unknown>(
  name: string
): Promise<T | null> {
  const raw = await readRegistryJsonText(name)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}
