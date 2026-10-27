import { siteConfig } from "@/lib/config"

/** Live stargazer count for the public repo. Cached ~24h; null on failure. */
export async function getGithubStars(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${siteConfig.githubRepo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "SonoJS-docs",
        },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return null
    const data = (await res.json()) as { stargazers_count?: unknown }
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null
  } catch {
    return null
  }
}

export function formatGithubStars(count: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count)
}
