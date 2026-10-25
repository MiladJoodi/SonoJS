import type { Collection, HttpRequest } from "@/components/tools/endpoints/types";
import {
  applyAuthToUrl,
  buildAuthHeaders,
  collectEnabledHeaders,
  serializeBody,
} from "@/components/tools/endpoints/lib/http/request";

export function requestToCurl(request: HttpRequest): string {
  let url = applyAuthToUrl(request.url, request.auth);
  const headers = {
    ...collectEnabledHeaders(request.headers),
    ...buildAuthHeaders(request.auth),
  };
  const { body, contentType } = serializeBody(request.body);
  if (contentType && !Object.keys(headers).some((k) => k.toLowerCase() === "content-type")) {
    headers["Content-Type"] = contentType;
  }

  const parts = [`curl -X ${request.method}`];
  for (const [k, v] of Object.entries(headers)) {
    parts.push(`  -H ${shellQuote(`${k}: ${v}`)}`);
  }
  if (body) {
    parts.push(`  -d ${shellQuote(body)}`);
  }
  parts.push(`  ${shellQuote(url)}`);
  return parts.join(" \\\n");
}

function shellQuote(value: string): string {
  if (/^[a-zA-Z0-9_/:.\-?&=]+$/.test(value)) return value;
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

export function requestToJson(request: HttpRequest): string {
  return JSON.stringify(request, null, 2);
}

export function collectionToJson(
  collection: Collection,
  requests: HttpRequest[],
): string {
  return JSON.stringify(
    {
      collection,
      requests: requests.filter((r) => r.collectionId === collection.id),
    },
    null,
    2,
  );
}
