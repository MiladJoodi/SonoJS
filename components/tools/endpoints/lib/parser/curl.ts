import type { HttpMethod, HttpRequest, KeyValuePair } from "@/components/tools/endpoints/types";
import { createEmptyRequest } from "@/components/tools/endpoints/lib/http/request";
import { createPair } from "@/components/tools/endpoints/lib/id";

function stripQuotes(s: string): string {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;
  let escaped = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }
    if (ch === "\\" && quote !== null) {
      escaped = true;
      continue;
    }
    if (quote) {
      if (ch === quote) {
        quote = null;
      } else {
        current += ch;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (/\s/.test(ch)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }
    // line continuation
    if (ch === "\\" && /\s/.test(input[i + 1] ?? "")) {
      continue;
    }
    current += ch;
  }
  if (current) tokens.push(current);
  return tokens;
}

export function parseCurl(curl: string): HttpRequest {
  const cleaned = curl.trim().replace(/\\\r?\n/g, " ");
  if (!cleaned.toLowerCase().startsWith("curl")) {
    throw new Error("Paste a cURL command starting with curl.");
  }

  const tokens = tokenize(cleaned);
  let method: HttpMethod = "GET";
  let url = "";
  const headers: KeyValuePair[] = [];
  let body = "";
  let user: string | undefined;
  let hasData = false;

  for (let i = 1; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "-X" || t === "--request") {
      method = (tokens[++i]?.toUpperCase() ?? "GET") as HttpMethod;
      continue;
    }
    if (t === "-H" || t === "--header") {
      const raw = stripQuotes(tokens[++i] ?? "");
      const idx = raw.indexOf(":");
      if (idx > 0) {
        headers.push(
          createPair(raw.slice(0, idx).trim(), raw.slice(idx + 1).trim(), true),
        );
      }
      continue;
    }
    if (
      t === "-d" ||
      t === "--data" ||
      t === "--data-raw" ||
      t === "--data-binary" ||
      t === "--data-urlencode"
    ) {
      body = stripQuotes(tokens[++i] ?? "");
      hasData = true;
      continue;
    }
    if (t === "-u" || t === "--user") {
      user = stripQuotes(tokens[++i] ?? "");
      continue;
    }
    if (t === "-G" || t === "--get") {
      method = "GET";
      continue;
    }
    if (t.startsWith("-")) {
      // skip unknown flags that take a value when next token isn't a URL-like
      const next = tokens[i + 1];
      if (next && !next.startsWith("-") && !/^https?:\/\//i.test(next)) {
        i += 1;
      }
      continue;
    }
    if (!url) {
      url = stripQuotes(t);
    }
  }

  if (hasData && method === "GET") {
    method = "POST";
  }

  const request = createEmptyRequest({
    method,
    url,
    headers: headers.length ? [...headers, createPair()] : [createPair()],
    name: "Imported from cURL",
  });

  if (user) {
    const [username, ...rest] = user.split(":");
    request.auth = {
      type: "basic",
      basicUsername: username,
      basicPassword: rest.join(":"),
    };
  }

  if (hasData) {
    const contentType = headers.find(
      (h) => h.key.toLowerCase() === "content-type",
    )?.value;
    if (contentType?.includes("application/json") || body.trim().startsWith("{")) {
      request.body = { type: "json", json: body };
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const pairs = body.split("&").map((part) => {
        const [k, ...v] = part.split("=");
        return createPair(
          decodeURIComponent(k || ""),
          decodeURIComponent(v.join("=") || ""),
          true,
        );
      });
      request.body = { type: "urlencoded", urlencoded: pairs };
    } else {
      request.body = { type: "raw", raw: body };
    }
  }

  return request;
}
