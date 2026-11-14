import {
  type ContentAccess,
  type Viewer,
} from "@/lib/access"

/**
 * Paid catalog items need a product entitlement row.
 * Pro subscription alone does not unlock them.
 */
export function projectRequiresPurchase(project: {
  priceCents?: number | null
}): boolean {
  return (project.priceCents ?? 0) > 0
}

export type DownloadAccessDenied = {
  ok: false
  status: 401 | 403
  code: "auth_required" | "pro_required" | "purchase_required"
  error: string
}

export type DownloadAccessAllowed = { ok: true }

export type DownloadAccessResult =
  | DownloadAccessAllowed
  | DownloadAccessDenied

/**
 * Pure download gate for catalog products (templates + websites + future).
 * `ownsProduct` must come from server-side entitlement lookup for the same slug.
 */
export function canDownloadCatalogProject(input: {
  viewer: Viewer
  access: ContentAccess
  requiresPurchase: boolean
  ownsProduct: boolean
}): DownloadAccessResult {
  const { viewer, access, requiresPurchase, ownsProduct } = input

  if (requiresPurchase) {
    if (viewer.kind === "guest") {
      return {
        ok: false,
        status: 401,
        code: "auth_required",
        error: "Sign in required to download.",
      }
    }
    if (!ownsProduct) {
      return {
        ok: false,
        status: 403,
        code: "purchase_required",
        error: "Purchase required to download this product.",
      }
    }
    return { ok: true }
  }

  if (access === "public") return { ok: true }

  if (viewer.kind === "guest") {
    return {
      ok: false,
      status: 401,
      code: "auth_required",
      error: "Sign in required to download.",
    }
  }

  if (access === "member") return { ok: true }

  if (viewer.kind === "pro") return { ok: true }

  return {
    ok: false,
    status: 403,
    code: "pro_required",
    error: "Pro plan required.",
  }
}
