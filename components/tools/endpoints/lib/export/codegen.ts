import type { HttpRequest } from "@/components/tools/endpoints/types";
import {
  applyAuthToUrl,
  buildAuthHeaders,
  collectEnabledHeaders,
  serializeBody,
} from "@/components/tools/endpoints/lib/http/request";

export type CodegenLanguage = "fetch" | "axios" | "go" | "python";

export const CODEGEN_LANGUAGES: { id: CodegenLanguage; label: string }[] = [
  { id: "fetch", label: "JavaScript (fetch)" },
  { id: "axios", label: "JavaScript (axios)" },
  { id: "go", label: "Go (net/http)" },
  { id: "python", label: "Python (requests)" },
];

interface ResolvedRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
}

function resolveRequest(request: HttpRequest): ResolvedRequest {
  const url = applyAuthToUrl(request.url, request.auth);
  const headers: Record<string, string> = {
    ...collectEnabledHeaders(request.headers),
    ...buildAuthHeaders(request.auth),
  };
  const { body, contentType } = serializeBody(request.body);
  if (
    contentType &&
    !Object.keys(headers).some((k) => k.toLowerCase() === "content-type")
  ) {
    headers["Content-Type"] = contentType;
  }
  return { method: request.method, url, headers, body };
}

function jsString(value: string): string {
  return JSON.stringify(value);
}

function generateFetch(req: ResolvedRequest): string {
  const lines: string[] = [];
  lines.push(`const response = await fetch(${jsString(req.url)}, {`);
  lines.push(`  method: ${jsString(req.method)},`);
  const headerEntries = Object.entries(req.headers);
  if (headerEntries.length > 0) {
    lines.push(`  headers: {`);
    for (const [k, v] of headerEntries) {
      lines.push(`    ${jsString(k)}: ${jsString(v)},`);
    }
    lines.push(`  },`);
  }
  if (req.body != null && req.method !== "GET" && req.method !== "HEAD") {
    lines.push(`  body: ${jsString(req.body)},`);
  }
  lines.push(`});`);
  lines.push(``);
  lines.push(`const data = await response.json();`);
  lines.push(`console.log(data);`);
  return lines.join("\n");
}

function generateAxios(req: ResolvedRequest): string {
  const lines: string[] = [];
  lines.push(`import axios from "axios";`);
  lines.push(``);
  lines.push(`const response = await axios({`);
  lines.push(`  method: ${jsString(req.method.toLowerCase())},`);
  lines.push(`  url: ${jsString(req.url)},`);
  const headerEntries = Object.entries(req.headers);
  if (headerEntries.length > 0) {
    lines.push(`  headers: {`);
    for (const [k, v] of headerEntries) {
      lines.push(`    ${jsString(k)}: ${jsString(v)},`);
    }
    lines.push(`  },`);
  }
  if (req.body != null && req.method !== "GET" && req.method !== "HEAD") {
    const looksJson =
      req.headers["Content-Type"]?.includes("json") ||
      (req.body.trim().startsWith("{") || req.body.trim().startsWith("["));
    if (looksJson) {
      try {
        JSON.parse(req.body);
        lines.push(`  data: ${req.body},`);
      } catch {
        lines.push(`  data: ${jsString(req.body)},`);
      }
    } else {
      lines.push(`  data: ${jsString(req.body)},`);
    }
  }
  lines.push(`});`);
  lines.push(``);
  lines.push(`console.log(response.data);`);
  return lines.join("\n");
}

function goString(value: string): string {
  return JSON.stringify(value);
}

function generateGo(req: ResolvedRequest): string {
  const lines: string[] = [];
  lines.push(`package main`);
  lines.push(``);
  lines.push(`import (`);
  lines.push(`\t"fmt"`);
  lines.push(`\t"io"`);
  lines.push(`\t"net/http"`);
  if (req.body != null && req.method !== "GET" && req.method !== "HEAD") {
    lines.push(`\t"strings"`);
  }
  lines.push(`)`);
  lines.push(``);
  lines.push(`func main() {`);
  if (req.body != null && req.method !== "GET" && req.method !== "HEAD") {
    lines.push(`\tbody := strings.NewReader(${goString(req.body)})`);
    lines.push(
      `\treq, err := http.NewRequest(${goString(req.method)}, ${goString(req.url)}, body)`,
    );
  } else {
    lines.push(
      `\treq, err := http.NewRequest(${goString(req.method)}, ${goString(req.url)}, nil)`,
    );
  }
  lines.push(`\tif err != nil {`);
  lines.push(`\t\tpanic(err)`);
  lines.push(`\t}`);
  for (const [k, v] of Object.entries(req.headers)) {
    lines.push(`\treq.Header.Set(${goString(k)}, ${goString(v)})`);
  }
  lines.push(`\tresp, err := http.DefaultClient.Do(req)`);
  lines.push(`\tif err != nil {`);
  lines.push(`\t\tpanic(err)`);
  lines.push(`\t}`);
  lines.push(`\tdefer resp.Body.Close()`);
  lines.push(`\tdata, _ := io.ReadAll(resp.Body)`);
  lines.push(`\tfmt.Println(resp.Status)`);
  lines.push(`\tfmt.Println(string(data))`);
  lines.push(`}`);
  return lines.join("\n");
}

function pyString(value: string): string {
  return JSON.stringify(value);
}

function generatePython(req: ResolvedRequest): string {
  const lines: string[] = [];
  lines.push(`import requests`);
  lines.push(``);
  const headerEntries = Object.entries(req.headers);
  if (headerEntries.length > 0) {
    lines.push(`headers = {`);
    for (const [k, v] of headerEntries) {
      lines.push(`    ${pyString(k)}: ${pyString(v)},`);
    }
    lines.push(`}`);
    lines.push(``);
  }
  const hasBody = req.body != null && req.method !== "GET" && req.method !== "HEAD";
  const method = req.method.toLowerCase();
  const args: string[] = [pyString(req.url)];
  if (headerEntries.length > 0) args.push("headers=headers");
  if (hasBody) {
    const isJson = req.headers["Content-Type"]?.includes("json");
    if (isJson) {
      try {
        JSON.parse(req.body!);
        lines.push(`payload = ${req.body}`);
        lines.push(``);
        args.push("json=payload");
      } catch {
        args.push(`data=${pyString(req.body!)}`);
      }
    } else {
      args.push(`data=${pyString(req.body!)}`);
    }
  }
  lines.push(`response = requests.${method}(${args.join(", ")})`);
  lines.push(`print(response.status_code)`);
  lines.push(`print(response.text)`);
  return lines.join("\n");
}

export function generateCode(
  request: HttpRequest,
  language: CodegenLanguage,
): string {
  const resolved = resolveRequest(request);
  switch (language) {
    case "fetch":
      return generateFetch(resolved);
    case "axios":
      return generateAxios(resolved);
    case "go":
      return generateGo(resolved);
    case "python":
      return generatePython(resolved);
    default:
      return generateFetch(resolved);
  }
}
