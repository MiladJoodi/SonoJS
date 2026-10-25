"use client";

import { useRef, type ReactNode } from "react";
import { Loader2, Send, Square, Zap } from "lucide-react";
import { HTTP_METHODS, type HttpMethod } from "@/components/tools/endpoints/types";
import { useWorkspace } from "@/components/tools/endpoints/workspace/workspace-provider";
import { methodColorClass, syncParamsFromUrl } from "@/components/tools/endpoints/lib/http/request";
import { SAMPLE_USERS_URL } from "@/components/tools/endpoints/lib/samples";
import { Button } from "@/components/tools/endpoints/ui/button";
import { Input } from "@/components/tools/endpoints/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tools/endpoints/ui/select";
import { cn } from "@/lib/utils";

const URL_HOST = "text-sky-700 dark:text-sky-300";
const URL_MUTED = "text-muted-foreground";
const URL_VALUE = "text-emerald-700 dark:text-emerald-400";
const URL_VAR = "text-amber-700 dark:text-amber-400";

function paintUrl(text: string, className: string) {
  const nodes: ReactNode[] = [];
  const pattern = /\{\{[^{}]*\}\}/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > cursor) {
      nodes.push(
        <span key={key++} className={className}>
          {text.slice(cursor, match.index)}
        </span>,
      );
    }
    nodes.push(
      <span key={key++} className={URL_VAR}>
        {match[0]}
      </span>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) {
    nodes.push(
      <span key={key++} className={className}>
        {text.slice(cursor)}
      </span>,
    );
  }
  return nodes;
}

function paintQuery(query: string) {
  const nodes: ReactNode[] = [];
  const pieces = query.split(/([?&#=])/);
  pieces.forEach((piece, index) => {
    if (!piece) return;
    const mark = piece === "?" || piece === "&" || piece === "#" || piece === "=";
    const value = index > 0 && pieces[index - 1] === "=";
    nodes.push(
      <span key={index} className="contents">
        {paintUrl(piece, mark ? URL_MUTED : value ? URL_VALUE : URL_MUTED)}
      </span>,
    );
  });
  return nodes;
}

function UrlHighlight({ url }: { url: string }) {
  const scheme = url.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//);
  let rest = url;
  const nodes: ReactNode[] = [];

  if (scheme) {
    nodes.push(
      <span key="scheme" className={URL_MUTED}>
        {scheme[0]}
      </span>,
    );
    rest = url.slice(scheme[0].length);
  }

  const splitAt = rest.search(/[/?#]/);
  const host = splitAt === -1 ? rest : rest.slice(0, splitAt);
  const tail = splitAt === -1 ? "" : rest.slice(splitAt);
  const hostLooksNamed = scheme || host.includes(".");

  if (host) {
    nodes.push(
      <span key="host" className="contents">
        {paintUrl(host, hostLooksNamed ? URL_HOST : "text-foreground")}
      </span>,
    );
  }

  if (tail) {
    const queryAt = tail.search(/[?#]/);
    const path = queryAt === -1 ? tail : tail.slice(0, queryAt);
    const query = queryAt === -1 ? "" : tail.slice(queryAt);
    if (path) {
      nodes.push(
        <span key="path" className="contents">
          {paintUrl(path, "text-foreground")}
        </span>,
      );
    }
    if (query) nodes.push(<span key="query">{paintQuery(query)}</span>);
  }

  return nodes;
}

export function RequestBar() {
  const {
    request,
    setRequest,
    sendRequest,
    sendSampleUrl,
    cancelRequest,
    sending,
    unresolvedVars,
  } = useWorkspace();

  const showSample = !request.url.trim() && !sending;
  const urlMirror = useRef<HTMLDivElement>(null);
  const urlPad = sending ? "pe-9" : request.url ? "pe-8" : "";

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="ep-field flex h-8 min-w-0 items-stretch overflow-hidden rounded-md shadow-xs focus-within:border-ring">
        <Select
          value={request.method}
          items={Object.fromEntries(HTTP_METHODS.map((m) => [m, m]))}
          onValueChange={(value) => {
            if (!value) return;
            setRequest((prev) => ({ ...prev, method: value as HttpMethod }));
          }}
        >
          <SelectTrigger
            className={cn(
              "font-mono h-full shrink-0 px-2 font-semibold focus-visible:ring-0",
              methodColorClass(request.method),
            )}
            aria-label="HTTP method"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="min-w-[9rem]">
            {HTTP_METHODS.map((m) => (
              <SelectItem
                key={m}
                value={m}
                className={cn("font-mono font-semibold", methodColorClass(m))}
              >
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex h-full min-w-0 flex-1 items-stretch">
          {request.url ? (
            <div
              ref={urlMirror}
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center overflow-hidden px-2.5 font-mono text-sm whitespace-nowrap",
                urlPad,
              )}
            >
              <UrlHighlight url={request.url} />
            </div>
          ) : null}
          <Input
            clearable={!sending && !showSample}
            value={request.url}
            onChange={(e) => {
              const url = e.target.value;
              setRequest((prev) => ({
                ...prev,
                url,
                params: syncParamsFromUrl(url, prev.params),
              }));
            }}
            onClear={() => {
              setRequest((prev) => ({
                ...prev,
                url: "",
                params: syncParamsFromUrl("", prev.params),
              }));
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
              e.preventDefault();
              if (!sending) void sendRequest();
            }}
            onScroll={(e) => {
              if (urlMirror.current) {
                urlMirror.current.scrollLeft = e.currentTarget.scrollLeft;
              }
            }}
            placeholder="Enter URL"
            className={cn(
              "font-mono h-full w-full min-w-0 text-sm focus-visible:ring-0 placeholder:text-muted-foreground/50",
              request.url && "caret-foreground",
              urlPad,
            )}
            style={
              request.url
                ? { color: "transparent", caretColor: "var(--foreground)" }
                : undefined
            }
            aria-label="Request URL"
            spellCheck={false}
            autoComplete="off"
            disabled={sending}
          />
          {sending ? (
            <Loader2
              className="pointer-events-none absolute top-1/2 end-2.5 size-4 -translate-y-1/2 animate-spin text-primary"
              aria-hidden
            />
          ) : showSample ? (
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="absolute top-1/2 end-1.5 size-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Try sample request"
              title="Try sample request"
              onClick={() => void sendSampleUrl(SAMPLE_USERS_URL)}
            >
              <Zap className="size-3.5" />
            </Button>
          ) : null}
        </div>

        {sending ? (
          <Button
            type="button"
            variant="outline"
            className="h-full shrink-0 border-s border-border bg-background px-3 text-foreground"
            onClick={cancelRequest}
          >
            <Square className="size-3 fill-current" />
            Cancel
          </Button>
        ) : (
          <Button
            type="button"
            className="h-full shrink-0 px-3"
            onClick={() => void sendRequest()}
          >
            <Send className="size-3.5" />
            Send
          </Button>
        )}
      </div>

      {sending ? (
        <div className="h-0.5 overflow-hidden rounded-full bg-primary/15" aria-hidden>
          <div className="request-progress h-full w-1/3 rounded-full bg-primary" />
        </div>
      ) : null}

      <span className="sr-only" role="status" aria-live="polite">
        {sending ? "Sending request…" : ""}
      </span>

      {unresolvedVars.length > 0 ? (
        <p className="text-xs text-amber-800 dark:text-amber-400" role="status">
          Unresolved variables:{" "}
          {unresolvedVars.map((v) => (
            <code key={v} className="font-mono mx-0.5 rounded bg-muted px-1">
              {`{{${v}}}`}
            </code>
          ))}
        </p>
      ) : null}
    </div>
  );
}
