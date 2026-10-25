/**
 * SSRF protection utilities — shared between proxy route and tests.
 * Pure functions; no Next.js imports.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata.google",
  "instance-data",
]);

const CLOUD_METADATA_IPS = new Set([
  "169.254.169.254",
  "169.254.170.2",
  "fd00:ec2::254",
]);

export type SsrfCheckResult =
  | { allowed: true }
  | { allowed: false; reason: string };

export function isPrivateIpv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
    return false;
  }
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  return false;
}

export function isPrivateIpv6(ip: string): boolean {
  const normalized = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (normalized === "::1" || normalized === "::") return true;
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true; // ULA
  if (normalized.startsWith("fe80")) return true; // link-local
  if (normalized.startsWith("::ffff:")) {
    const v4 = normalized.slice("::ffff:".length);
    return isPrivateIpv4(v4);
  }
  return false;
}

export function isBlockedIp(ip: string): boolean {
  const cleaned = ip.replace(/^\[|\]$/g, "").toLowerCase();
  if (CLOUD_METADATA_IPS.has(cleaned)) return true;
  if (cleaned.includes(":")) return isPrivateIpv6(cleaned);
  return isPrivateIpv4(cleaned);
}

export function isBlockedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (BLOCKED_HOSTNAMES.has(host)) return true;
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  if (host === "metadata" || host.startsWith("metadata.")) return true;
  // Literal IPs in hostname
  if (isBlockedIp(host)) return true;
  return false;
}

export function validateUrlScheme(rawUrl: string): SsrfCheckResult {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { allowed: false, reason: "The URL is invalid." };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      allowed: false,
      reason: "Only http and https URLs are allowed.",
    };
  }
  if (!parsed.hostname) {
    return { allowed: false, reason: "The URL is invalid." };
  }
  if (isBlockedHostname(parsed.hostname)) {
    return {
      allowed: false,
      reason: "This destination isn't allowed for security reasons.",
    };
  }
  return { allowed: true };
}

export function validateResolvedAddresses(addresses: string[]): SsrfCheckResult {
  for (const addr of addresses) {
    if (isBlockedIp(addr)) {
      return {
        allowed: false,
        reason: "This destination isn't allowed for security reasons.",
      };
    }
  }
  return { allowed: true };
}

export const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

export function sanitizeOutgoingHeaders(
  headers: Record<string, string>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) continue;
    if (key.toLowerCase() === "cookie") {
      // Allow forwarding cookies the user set intentionally
      result[key] = value;
      continue;
    }
    result[key] = value;
  }
  return result;
}
