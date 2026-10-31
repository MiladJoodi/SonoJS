const STORAGE_KEY = "sonojs:auth-return"

/**
 * Path to stay on after sign-in / sign-out.
 * Auth routes themselves fall back to `/` (no loop on /sign-in).
 */
export function getAuthReturnPath(): string {
  if (typeof window === "undefined") return "/"
  const path = `${window.location.pathname}${window.location.search}`
  if (
    path.startsWith("/sign-in") ||
    path.startsWith("/sign-up") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/sso-callback")
  ) {
    return "/"
  }
  return path || "/"
}

/** Persist before OAuth redirect so `/sso-callback` can return here. */
export function rememberAuthReturnPath(): string {
  const path = getAuthReturnPath()
  try {
    sessionStorage.setItem(STORAGE_KEY, path)
  } catch {
    /* private mode / quota */
  }
  return path
}

/** Read + clear path saved before OAuth. */
export function takeAuthReturnPath(): string {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    if (stored && stored.startsWith("/") && !stored.startsWith("//")) {
      return stored
    }
  } catch {
    /* ignore */
  }
  return "/"
}
