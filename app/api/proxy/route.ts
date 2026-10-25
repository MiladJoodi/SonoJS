import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";
import type { HttpMethod, ProxyErrorPayload, ProxyResponsePayload } from "@/components/tools/endpoints/types";
import {
  sanitizeOutgoingHeaders,
  validateResolvedAddresses,
  validateUrlScheme,
} from "@/components/tools/endpoints/lib/security/ssrf";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 2 * 1024 * 1024; // 2 MB request body to proxy
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_HEADER_BYTES = 32 * 1024;
const MAX_REDIRECTS = 5;
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_TIMEOUT_MS = 120_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;

const METHODS = new Set<HttpMethod>([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
]);

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

function errorResponse(
  status: number,
  error: ProxyErrorPayload,
  extra?: Partial<ProxyResponsePayload>,
): NextResponse {
  const payload: ProxyResponsePayload = {
    ok: false,
    status: 0,
    statusText: "",
    headers: {},
    body: "",
    bodyEncoding: "text",
    contentType: null,
    durationMs: 0,
    sizeBytes: 0,
    error,
    ...extra,
  };
  return NextResponse.json(payload, { status });
}

async function resolveAndValidate(hostname: string): Promise<ProxyErrorPayload | null> {
  const schemeCheck = validateUrlScheme(`https://${hostname}/`);
  if (!schemeCheck.allowed) {
    return { code: "ssrf_blocked", message: schemeCheck.reason };
  }

  // Literal IP host
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname) || hostname.includes(":")) {
    const ipCheck = validateResolvedAddresses([hostname.replace(/^\[|\]$/g, "")]);
    if (!ipCheck.allowed) {
      return { code: "ssrf_blocked", message: ipCheck.reason };
    }
    return null;
  }

  try {
    const results = await dns.lookup(hostname, { all: true, verbatim: true });
    const addresses = results.map((r) => r.address);
    if (addresses.length === 0) {
      return {
        code: "network_error",
        message: "Couldn't connect to the server.",
        details: "DNS lookup returned no addresses.",
      };
    }
    const ipCheck = validateResolvedAddresses(addresses);
    if (!ipCheck.allowed) {
      return { code: "ssrf_blocked", message: ipCheck.reason };
    }
    return null;
  } catch (e) {
    return {
      code: "network_error",
      message: "Couldn't connect to the server.",
      details: e instanceof Error ? e.message : "DNS resolution failed",
    };
  }
}

function headersByteSize(headers: Headers): number {
  let size = 0;
  headers.forEach((value, key) => {
    size += key.length + value.length + 4;
  });
  return size;
}

function headersToRecord(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((value, key) => {
    // Avoid duplicating set-cookie messily
    if (out[key]) {
      out[key] = `${out[key]}, ${value}`;
    } else {
      out[key] = value;
    }
  });
  return out;
}

function isRedirect(status: number): boolean {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

interface ProxyBody {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: string | null;
  timeoutMs?: number;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (!checkRateLimit(ip)) {
    return errorResponse(429, {
      code: "rate_limited",
      message: "Too many requests. Please wait a moment and try again.",
    });
  }

  let json: ProxyBody;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return errorResponse(413, {
        code: "body_too_large",
        message: "The request body is too large.",
      });
    }
    json = JSON.parse(raw) as ProxyBody;
  } catch {
    return errorResponse(400, {
      code: "invalid_url",
      message: "The request payload is invalid.",
    });
  }

  const method = (json.method ?? "GET").toUpperCase() as HttpMethod;
  if (!METHODS.has(method)) {
    return errorResponse(400, {
      code: "invalid_url",
      message: "Unsupported HTTP method.",
    });
  }

  const url = typeof json.url === "string" ? json.url.trim() : "";
  const schemeCheck = validateUrlScheme(url);
  if (!schemeCheck.allowed) {
    const code =
      schemeCheck.reason.includes("http and https")
        ? "unsupported_scheme"
        : schemeCheck.reason.includes("invalid")
          ? "invalid_url"
          : "ssrf_blocked";
    const status = code === "ssrf_blocked" || code === "unsupported_scheme" ? 403 : 400;
    return errorResponse(status, { code, message: schemeCheck.reason });
  }

  const timeoutMs = Math.min(
    Math.max(Number(json.timeoutMs) || DEFAULT_TIMEOUT_MS, 1_000),
    MAX_TIMEOUT_MS,
  );

  const outgoingHeaders = sanitizeOutgoingHeaders(json.headers ?? {});
  const headerSize = Object.entries(outgoingHeaders).reduce(
    (n, [k, v]) => n + k.length + v.length,
    0,
  );
  if (headerSize > MAX_HEADER_BYTES) {
    return errorResponse(400, {
      code: "body_too_large",
      message: "Request headers are too large.",
    });
  }

  const body =
    method === "GET" || method === "HEAD" ? undefined : (json.body ?? undefined);

  const started = Date.now();
  let currentUrl = url;
  let redirects = 0;

  try {
    while (true) {
      const parsed = new URL(currentUrl);
      const blocked = await resolveAndValidate(parsed.hostname);
      if (blocked) {
        return errorResponse(403, blocked, { durationMs: Date.now() - started });
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const upstream = await fetch(currentUrl, {
          method,
          headers: outgoingHeaders,
          body: redirects === 0 ? body : method === "GET" || method === "HEAD" ? undefined : body,
          redirect: "manual",
          signal: controller.signal,
          // @ts-expect-error undici option available in Node
          duplex: body ? "half" : undefined,
        });

        if (isRedirect(upstream.status)) {
          const location = upstream.headers.get("location");
          if (!location) {
            return errorResponse(502, {
              code: "network_error",
              message: "Couldn't connect to the server.",
              details: "Redirect without Location header.",
            });
          }
          redirects += 1;
          if (redirects > MAX_REDIRECTS) {
            return errorResponse(400, {
              code: "redirect_blocked",
              message: "Too many redirects.",
            });
          }
          const nextUrl = new URL(location, currentUrl).toString();
          const nextCheck = validateUrlScheme(nextUrl);
          if (!nextCheck.allowed) {
            return errorResponse(403, {
              code: "redirect_blocked",
              message: "This destination isn't allowed for security reasons.",
              details: nextCheck.reason,
            });
          }
          currentUrl = nextUrl;
          clearTimeout(timer);
          continue;
        }

        if (headersByteSize(upstream.headers) > MAX_HEADER_BYTES) {
          clearTimeout(timer);
          return errorResponse(502, {
            code: "response_too_large",
            message: "The response headers are too large.",
          });
        }

        const contentLength = upstream.headers.get("content-length");
        if (contentLength && Number(contentLength) > MAX_RESPONSE_BYTES) {
          clearTimeout(timer);
          return errorResponse(413, {
            code: "response_too_large",
            message: "The response is too large.",
            details: `Content-Length ${contentLength} exceeds limit.`,
          });
        }

        const buffer = Buffer.from(await upstream.arrayBuffer());
        clearTimeout(timer);

        let truncated = false;
        let payload = buffer;
        if (payload.byteLength > MAX_RESPONSE_BYTES) {
          payload = payload.subarray(0, MAX_RESPONSE_BYTES);
          truncated = true;
        }

        const contentType = upstream.headers.get("content-type");
        const isTextish =
          !contentType ||
          /^(text\/|application\/(json|xml|javascript|x-www-form-urlencoded)|image\/svg)/i.test(
            contentType,
          );

        const responsePayload: ProxyResponsePayload = {
          ok: upstream.ok,
          status: upstream.status,
          statusText: upstream.statusText,
          headers: headersToRecord(upstream.headers),
          body: isTextish ? payload.toString("utf8") : payload.toString("base64"),
          bodyEncoding: isTextish ? "text" : "base64",
          contentType,
          durationMs: Date.now() - started,
          sizeBytes: buffer.byteLength,
          truncated,
        };

        return NextResponse.json(responsePayload);
      } catch (e) {
        clearTimeout(timer);
        if (e instanceof Error && e.name === "AbortError") {
          return errorResponse(504, {
            code: "timeout",
            message: "The request timed out.",
            details: `Exceeded ${timeoutMs} ms`,
          });
        }
        throw e;
      }
    }
  } catch (e) {
    return errorResponse(502, {
      code: "network_error",
      message: "Couldn't connect to the server.",
      details: e instanceof Error ? e.message : "Unknown network error",
    });
  }
}
