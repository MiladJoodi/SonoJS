import "server-only"

import { getGitHubProConfig } from "@/lib/github-pro/config"

export class GitHubProApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "GitHubProApiError"
    this.status = status
  }
}

type GitHubContentFile = {
  type: "file"
  path: string
  name: string
  encoding: string
  content: string
  sha: string
}

function apiBase() {
  const { owner, repo } = getGitHubProConfig()
  return `https://api.github.com/repos/${owner}/${repo}`
}

function authHeaders(): HeadersInit {
  const { token } = getGitHubProConfig()
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "SonoJS-Pro",
  }
}

type GitHubContentFileWithDownload = GitHubContentFile & {
  download_url?: string | null
  size?: number
}

async function fetchRepoContentsJson(
  path: string
): Promise<GitHubContentFileWithDownload> {
  const url = `${apiBase()}/contents/${path.split("/").map(encodeURIComponent).join("/")}`
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 0 },
  })

  if (res.status === 404) {
    throw new GitHubProApiError(`File not found in Pro repo: ${path}`, 404)
  }
  if (res.status === 401 || res.status === 403) {
    throw new GitHubProApiError("GitHub authentication or permission failed", res.status)
  }
  if (!res.ok) {
    throw new GitHubProApiError(`GitHub request failed (${res.status})`, res.status)
  }

  const data = (await res.json()) as Partial<GitHubContentFileWithDownload>
  if (data.type !== "file") {
    throw new GitHubProApiError("Invalid GitHub contents response", 502)
  }
  return data as GitHubContentFileWithDownload
}

/** Fetch a single file from the private Pro repo (raw UTF-8 text). */
export async function fetchRepoFileText(path: string): Promise<string> {
  const data = await fetchRepoContentsJson(path)
  if (typeof data.content !== "string") {
    throw new GitHubProApiError("GitHub file content missing (file may be too large)", 502)
  }
  try {
    return Buffer.from(data.content, "base64").toString("utf8")
  } catch {
    throw new GitHubProApiError("Could not decode GitHub file content", 502)
  }
}

/** Fetch a binary file (e.g. zip) from the private Pro repo. */
export async function fetchRepoFileBytes(path: string): Promise<Buffer> {
  const data = await fetchRepoContentsJson(path)

  if (typeof data.content === "string" && data.encoding === "base64") {
    try {
      return Buffer.from(data.content, "base64")
    } catch {
      throw new GitHubProApiError("Could not decode GitHub binary content", 502)
    }
  }

  // Large files: Contents API omits `content` — use authenticated download_url.
  if (typeof data.download_url === "string" && data.download_url) {
    const res = await fetch(data.download_url, {
      headers: authHeaders(),
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      throw new GitHubProApiError(
        `GitHub download failed (${res.status})`,
        res.status
      )
    }
    return Buffer.from(await res.arrayBuffer())
  }

  throw new GitHubProApiError("GitHub binary content unavailable", 502)
}
