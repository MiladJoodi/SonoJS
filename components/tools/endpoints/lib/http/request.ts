import type {
  AuthConfig,
  HttpMethod,
  HttpRequest,
  KeyValuePair,
  RequestBody,
} from "@/components/tools/endpoints/types";
import { createId, createPair } from "@/components/tools/endpoints/lib/id";

export function createEmptyRequest(partial?: Partial<HttpRequest>): HttpRequest {
  const now = Date.now();
  return {
    id: createId(),
    name: "Untitled",
    method: "GET",
    url: "",
    params: [createPair()],
    headers: [createPair()],
    auth: { type: "none" },
    body: { type: "none", json: "{\n  \n}", form: [createPair()], urlencoded: [createPair()], raw: "" },
    createdAt: now,
    updatedAt: now,
    ...partial,
  };
}

export function parseQueryFromUrl(url: string): KeyValuePair[] {
  try {
    const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url) || url.startsWith("{{");
    const base = hasScheme && !url.startsWith("{{") ? undefined : "https://placeholder.local";
    const parsed = base ? new URL(url.replace(/^\{\{[^}]+\}\}/, "https://placeholder.local"), base) : new URL(url);
    const pairs: KeyValuePair[] = [];
    parsed.searchParams.forEach((value, key) => {
      pairs.push(createPair(key, value, true));
    });
    return pairs.length > 0 ? pairs : [createPair()];
  } catch {
    return [createPair()];
  }
}

export function syncUrlWithParams(url: string, params: KeyValuePair[]): string {
  const enabled = params.filter((p) => p.enabled && p.key.trim());
  let base = url;
  let hash = "";
  const hashIdx = base.indexOf("#");
  if (hashIdx >= 0) {
    hash = base.slice(hashIdx);
    base = base.slice(0, hashIdx);
  }
  const qIdx = base.indexOf("?");
  const pathPart = qIdx >= 0 ? base.slice(0, qIdx) : base;

  if (enabled.length === 0) {
    return pathPart + hash;
  }

  const search = enabled
    .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
    .join("&");
  return `${pathPart}?${search}${hash}`;
}

export function syncParamsFromUrl(url: string, existing: KeyValuePair[]): KeyValuePair[] {
  const fromUrl = parseQueryFromUrl(url);
  // Preserve disabled rows that aren't in URL
  const disabled = existing.filter((p) => !p.enabled && p.key.trim());
  if (fromUrl.length === 1 && !fromUrl[0].key) {
    return disabled.length ? [...disabled, createPair()] : [createPair()];
  }
  return [...fromUrl, ...disabled];
}

export function buildAuthHeaders(auth: AuthConfig): Record<string, string> {
  const headers: Record<string, string> = {};
  if (auth.type === "bearer" && auth.bearerToken) {
    headers.Authorization = `Bearer ${auth.bearerToken}`;
  } else if (auth.type === "basic") {
    const user = auth.basicUsername ?? "";
    const pass = auth.basicPassword ?? "";
    const token =
      typeof btoa === "function"
        ? btoa(`${user}:${pass}`)
        : Buffer.from(`${user}:${pass}`).toString("base64");
    headers.Authorization = `Basic ${token}`;
  } else if (
    auth.type === "apiKey" &&
    auth.apiKeyLocation === "header" &&
    auth.apiKeyName
  ) {
    headers[auth.apiKeyName] = auth.apiKeyValue ?? "";
  }
  return headers;
}

export function applyAuthToUrl(url: string, auth: AuthConfig): string {
  if (auth.type !== "apiKey" || auth.apiKeyLocation !== "query" || !auth.apiKeyName) {
    return url;
  }
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${encodeURIComponent(auth.apiKeyName)}=${encodeURIComponent(auth.apiKeyValue ?? "")}`;
}

export function serializeBody(body: RequestBody): {
  body: string | null;
  contentType: string | null;
} {
  switch (body.type) {
    case "none":
      return { body: null, contentType: null };
    case "json":
      return { body: body.json ?? "", contentType: "application/json" };
    case "raw":
      return { body: body.raw ?? "", contentType: "text/plain" };
    case "urlencoded": {
      const pairs = (body.urlencoded ?? []).filter((p) => p.enabled && p.key.trim());
      const encoded = pairs
        .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
        .join("&");
      return {
        body: encoded,
        contentType: "application/x-www-form-urlencoded",
      };
    }
    case "form": {
      // Multipart is complex in browser→proxy; send as urlencoded-like JSON for proxy text body
      // For V1 we serialize as multipart-ish text boundary manually when needed.
      const pairs = (body.form ?? []).filter((p) => p.enabled && p.key.trim());
      const boundary = `----EndpointsForm${Date.now()}`;
      const parts = pairs.map((p) => {
        return (
          `--${boundary}\r\n` +
          `Content-Disposition: form-data; name="${p.key}"\r\n\r\n` +
          `${p.value}\r\n`
        );
      });
      parts.push(`--${boundary}--\r\n`);
      return {
        body: parts.join(""),
        contentType: `multipart/form-data; boundary=${boundary}`,
      };
    }
    default:
      return { body: null, contentType: null };
  }
}

export function collectEnabledHeaders(
  headers: KeyValuePair[],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const h of headers) {
    if (!h.enabled || !h.key.trim()) continue;
    result[h.key.trim()] = h.value;
  }
  return result;
}

export function methodColorClass(method: HttpMethod): string {
  switch (method) {
    case "GET":
      return "text-emerald-700 dark:text-emerald-400";
    case "POST":
      return "text-amber-700 dark:text-amber-400";
    case "PUT":
      return "text-blue-700 dark:text-blue-400";
    case "PATCH":
      return "text-teal-700 dark:text-teal-400";
    case "DELETE":
      return "text-red-700 dark:text-red-400";
    default:
      return "text-muted-foreground";
  }
}

export function validateJson(text: string): { ok: true } | { ok: false; message: string; position?: number } {
  try {
    JSON.parse(text);
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    const posMatch = /position\s+(\d+)/i.exec(message);
    return {
      ok: false,
      message,
      position: posMatch ? Number(posMatch[1]) : undefined,
    };
  }
}

export function formatJson(text: string): string {
  const parsed = JSON.parse(text) as unknown;
  return JSON.stringify(parsed, null, 2);
}

export function minifyJson(text: string): string {
  const parsed = JSON.parse(text) as unknown;
  return JSON.stringify(parsed);
}

export const COMMON_HEADERS = [
  "Accept",
  "Accept-Language",
  "Authorization",
  "Cache-Control",
  "Content-Type",
  "Cookie",
  "Origin",
  "Referer",
  "User-Agent",
  "X-Api-Key",
  "X-Request-Id",
];
