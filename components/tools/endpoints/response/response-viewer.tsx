"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Download, Search, Zap } from "lucide-react";
import { CopyButton } from "@/components/docs/copy-button";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { formatBytes, formatDuration } from "@/components/tools/endpoints/lib/id";
import { methodColorClass } from "@/components/tools/endpoints/lib/http/request";
import { SAMPLE_USERS_URL } from "@/components/tools/endpoints/lib/samples";
import { jsonTextToTypeScript } from "@/components/tools/endpoints/lib/export/json-to-ts";
import { LARGE_RESPONSE_RENDER_BYTES } from "@/components/tools/endpoints/types";
import { Button } from "@/components/tools/endpoints/ui/button";
import { Input } from "@/components/tools/endpoints/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tools/endpoints/ui/tabs";
import { TsTypeView } from "@/components/tools/endpoints/response/ts-type-view";
import { cn } from "@/lib/utils";

const JsonTree = dynamic(
  () => import("@/components/tools/endpoints/response/json-tree").then((m) => m.JsonTree),
  {
    ssr: false,
    loading: () => (
      <p className="text-xs text-muted-foreground">Loading viewer…</p>
    ),
  },
);

function statusTone(status: number): string {
  if (status >= 200 && status < 300)
    return "border-emerald-600/25 bg-emerald-600/10 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300";
  if (status >= 300 && status < 400)
    return "border-amber-600/25 bg-amber-600/10 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300";
  if (status >= 400)
    return "border-rose-600/25 bg-rose-600/10 text-rose-800 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300";
  return "border-border bg-muted text-muted-foreground";
}

function decodeBody(body: string, encoding: "text" | "base64"): string {
  if (encoding === "text") return body;
  try {
    if (typeof atob === "function") return atob(body);
    return Buffer.from(body, "base64").toString("utf8");
  } catch {
    return body;
  }
}

export function ResponseViewer() {
  const {
    response,
    sendError,
    history,
    sendSampleUrl,
    loadHistoryItem,
    sending,
    assertionResults,
  } = useWorkspace();
  const [viewMode, setViewMode] = useState<"pretty" | "raw" | "type">("pretty");
  const [forceRender, setForceRender] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const responseKey = response
    ? `${response.status}:${response.durationMs}:${response.sizeBytes}:${response.body.slice(0, 64)}`
    : "";

  useEffect(() => {
    setViewMode("pretty");
    setForceRender(false);
    setSearch("");
    setShowSearch(false);
  }, [responseKey]);

  const textBody = useMemo(() => {
    if (!response) return "";
    return decodeBody(response.body, response.bodyEncoding);
  }, [response]);

  const typeScriptBody = useMemo(() => {
    if (!textBody) return "";
    return jsonTextToTypeScript(textBody, "Root");
  }, [textBody]);

  const isLarge =
    Boolean(response) &&
    (response?.sizeBytes ?? 0) > LARGE_RESPONSE_RENDER_BYTES &&
    !forceRender;

  const contentType = response?.contentType ?? "";
  const isJson =
    /json/i.test(contentType) ||
    textBody.trim().startsWith("{") ||
    textBody.trim().startsWith("[");
  const isImage = /^image\//i.test(contentType) && !/svg/i.test(contentType);
  const isHtml = /html/i.test(contentType);
  const isBinary = response?.bodyEncoding === "base64" && !isImage;
  const empty = !response && !sendError && !(assertionResults && assertionResults.length > 0);

  const copyTarget = viewMode === "type" ? typeScriptBody : textBody;

  const download = () => {
    if (!response) return;
    const bytes =
      response.bodyEncoding === "base64"
        ? Uint8Array.from(atob(response.body), (c) => c.charCodeAt(0))
        : new TextEncoder().encode(response.body);
    const blob = new Blob([bytes], {
      type: response.contentType ?? "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `response-${response.status}.${isJson ? "json" : "bin"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="flex h-full min-h-[220px] flex-col overflow-hidden bg-background"
      aria-label="Response"
    >
      <header className="ep-chrome flex min-h-10 shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b px-3 py-1.5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
          {response ? (
            <>
              <p
                className={cn(
                  "font-mono inline-flex max-w-full items-center rounded-md border px-2 py-0.5 text-xs font-semibold sm:text-sm",
                  statusTone(response.status),
                )}
              >
                <span className="truncate">
                  {response.status} {response.statusText || ""}
                </span>
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {formatDuration(response.durationMs)}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {formatBytes(response.sizeBytes)}
                {response.truncated ? " (truncated)" : ""}
              </p>
            </>
          ) : (
            <h2 className="text-sm font-medium text-foreground">
              Response
            </h2>
          )}
        </div>

        {response ? (
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:ms-auto">
            <div
              className="inline-flex h-7 items-center rounded-md bg-muted p-0.5"
              role="group"
              aria-label="Response view"
            >
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className={cn(
                  "h-6 shrink-0 px-2 shadow-none",
                  viewMode === "pretty" && "bg-background text-foreground shadow-xs hover:bg-background",
                )}
                onClick={() => setViewMode("pretty")}
              >
                Pretty
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className={cn(
                  "h-6 shrink-0 px-2 shadow-none",
                  viewMode === "raw" && "bg-background text-foreground shadow-xs hover:bg-background",
                )}
                onClick={() => setViewMode("raw")}
              >
                Raw
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("type")}
                disabled={!isJson}
                title={
                  isJson
                    ? "Generate TypeScript types from JSON"
                    : "Only available for JSON"
                }
                className={cn(
                  "h-6 shrink-0 px-2 shadow-none",
                  viewMode === "type" && "bg-background text-foreground shadow-xs hover:bg-background",
                )}
              >
                Type
              </Button>
            </div>
            <div className="ms-auto flex shrink-0 items-center gap-0.5 sm:ms-0">
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Search response"
                onClick={() => setShowSearch((v) => !v)}
              >
                <Search className="size-3.5" />
              </Button>
              <CopyButton
                value={copyTarget}
                className="size-7 text-foreground hover:bg-muted hover:text-foreground"
              />
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Download response"
                onClick={download}
              >
                <Download className="size-3.5" />
              </Button>
            </div>
          </div>
        ) : sending ? (
          <p className="text-xs text-muted-foreground sm:ms-auto" role="status">
            Waiting for response…
          </p>
        ) : null}
      </header>

      {sendError ? (
        <div className="border-b border-border/70 bg-destructive/8 px-3 py-2 text-sm">
          <p className="font-medium text-destructive">{sendError.message}</p>
          {sendError.details ? (
            <details className="mt-1 text-xs text-muted-foreground">
              <summary className="cursor-pointer">Technical details</summary>
              <pre className="font-mono mt-1 whitespace-pre-wrap">{sendError.details}</pre>
            </details>
          ) : null}
        </div>
      ) : null}

      {showSearch && response ? (
        <div className="border-b border-border/70 px-3 py-2">
          <Input
            clearable
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search in response…"
            className="h-8 text-xs"
            aria-label="Search in response"
          />
        </div>
      ) : null}

      {empty ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-4 px-4 py-8 sm:px-5 sm:py-10">
          {history.length > 0 ? (
            <>
              <div>
                <h3 className="text-base font-semibold tracking-tight">No response yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send a request, or reopen one from recent history.
                </p>
              </div>
              <div className="w-full max-w-md">
                <p className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  Recent
                </p>
                <ul className="space-y-1">
                  {history.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="font-mono flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-start text-xs hover:bg-muted"
                        onClick={() => loadHistoryItem(item)}
                      >
                        <span
                          className={cn(
                            "w-14 shrink-0 font-semibold",
                            methodColorClass(item.method),
                          )}
                        >
                          {item.method}
                        </span>
                        <span className="truncate text-muted-foreground">{item.url}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-base font-semibold tracking-tight">No response yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter a URL and click Send.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                className="gap-1.5"
                disabled={sending}
                onClick={() => void sendSampleUrl(SAMPLE_USERS_URL)}
              >
                <Zap className="size-3.5" />
                Try sample request
              </Button>
            </>
          )}
        </div>
      ) : response || (assertionResults && assertionResults.length > 0) ? (
        <Tabs defaultValue={response ? "body" : "tests"} className="flex min-h-0 flex-1 flex-col gap-0!">
          <TabsList variant="line" className="shrink-0">
            {response ? (
              <>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="cookies">Cookies</TabsTrigger>
              </>
            ) : null}
            <TabsTrigger value="tests">
              Tests
              {assertionResults && assertionResults.length > 0
                ? ` (${assertionResults.filter((r) => r.passed).length}/${assertionResults.length})`
                : ""}
            </TabsTrigger>
          </TabsList>

          {response ? (
            <>
          <TabsContent value="body" className="min-h-0 flex-1 overflow-auto p-3">
            {isLarge ? (
              <div className="space-y-3 rounded-md border border-border p-4">
                <p className="text-sm font-medium">
                  Large response: {formatBytes(response.sizeBytes)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Rendering this response may affect performance.
                </p>
                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={() => setForceRender(true)}>
                    View anyway
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={download}>
                    Download
                  </Button>
                </div>
              </div>
            ) : isImage && response.bodyEncoding === "base64" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`data:${contentType};base64,${response.body}`}
                alt="Response preview"
                className="max-h-[480px] max-w-full rounded border border-border"
              />
            ) : isBinary || (!response.body && response.truncated) ? (
              <div className="space-y-2 text-sm">
                <p className="font-medium">
                  {isBinary ? "Binary response" : "Body not cached in history"}
                </p>
                <p className="text-muted-foreground">
                  Content type: {contentType || "unknown"} · {formatBytes(response.sizeBytes)}
                </p>
                {isBinary ? (
                  <Button type="button" size="sm" onClick={download}>
                    Download
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Send the request again to load the full body.
                  </p>
                )}
              </div>
            ) : viewMode === "type" ? (
              <TsTypeView code={typeScriptBody} />
            ) : viewMode === "raw" || !isJson ? (
              <pre className="font-mono whitespace-pre-wrap break-all text-xs leading-relaxed">
                {textBody}
              </pre>
            ) : (
              <JsonTree data={safeParse(textBody)} search={search} />
            )}
          </TabsContent>

          <TabsContent value="headers" className="overflow-auto p-3">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-2 font-medium">Header</th>
                  <th className="pb-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(response.headers).map(([key, value]) => (
                  <tr key={key} className="border-t border-border/60 align-top">
                    <td className="font-mono py-1.5 pe-3 whitespace-nowrap">{key}</td>
                    <td className="font-mono py-1.5 break-all text-muted-foreground">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="cookies" className="overflow-auto p-3">
            {parseCookies(response.headers).length === 0 ? (
              <p className="text-sm text-muted-foreground">No cookies in this response.</p>
            ) : (
              <ul className="space-y-2">
                {parseCookies(response.headers).map((c) => (
                  <li
                    key={c}
                    className="font-mono rounded border border-border/70 px-2 py-1.5 text-xs"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
            </>
          ) : null}

          <TabsContent value="tests" className="overflow-auto p-3">
            {!assertionResults || assertionResults.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No test results. Add tests in the request Tests tab, then send again.
              </p>
            ) : (
              <ul className="space-y-2">
                {assertionResults.map((result) => (
                  <li
                    key={result.id}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm",
                      result.passed
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-rose-500/40 bg-rose-500/5",
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide",
                        result.passed
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-rose-700 dark:text-rose-400",
                      )}
                    >
                      {result.passed ? "Pass" : "Fail"}
                    </p>
                    <p className="mt-1 font-mono text-xs text-foreground/90">
                      {result.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      ) : null}
    </section>
  );
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function parseCookies(headers: Record<string, string>): string[] {
  const cookies: string[] = [];
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === "set-cookie") {
      cookies.push(...value.split(/,(?=\s*[^;]+=)/).map((s) => s.trim()));
    }
  }
  return cookies;
}
