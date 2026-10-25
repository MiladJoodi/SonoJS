"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonTreeProps {
  data: unknown;
  search?: string;
}

export function JsonTree({ data, search = "" }: JsonTreeProps) {
  return (
    <div className="font-mono text-xs leading-relaxed">
      <JsonNode value={data} name={null} depth={0} search={search.toLowerCase()} />
    </div>
  );
}

function JsonNode({
  value,
  name,
  depth,
  search,
}: {
  value: unknown;
  name: string | null;
  depth: number;
  search: string;
}) {
  const [open, setOpen] = useState(depth < 2);
  const isObject = value !== null && typeof value === "object";
  const entries = isObject
    ? Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>)
    : [];

  if (!isObject) {
    return (
      <div className="flex gap-1" style={{ paddingInlineStart: depth * 12 }}>
        {name !== null ? (
          <span className="text-sky-700 dark:text-sky-300">{renderMatch(`"${name}"`, search)}:</span>
        ) : null}
        <span className={valueClass(value)}>{renderPrimitive(value, search)}</span>
      </div>
    );
  }

  const label = Array.isArray(value) ? `[${entries.length}]` : `{${entries.length}}`;

  return (
    <div>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-0.5 rounded px-0.5 hover:bg-muted/70"
        style={{ paddingInlineStart: depth * 12 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="size-3 text-muted-foreground" />
        ) : (
          <ChevronRight className="icon-dir size-3 text-muted-foreground" />
        )}
        {name !== null ? (
          <span className="text-sky-700 dark:text-sky-300">{renderMatch(`"${name}"`, search)}:</span>
        ) : null}
        <span className="text-muted-foreground">{open ? (Array.isArray(value) ? "[" : "{") : label}</span>
        {!open ? <span className="text-muted-foreground">{Array.isArray(value) ? "]" : "}"}</span> : null}
      </button>
      {open ? (
        <>
          {entries.map(([k, v]) => (
            <JsonNode key={k} name={k} value={v} depth={depth + 1} search={search} />
          ))}
          <div className="text-muted-foreground" style={{ paddingInlineStart: depth * 12 }}>
            {Array.isArray(value) ? "]" : "}"}
          </div>
        </>
      ) : null}
    </div>
  );
}

function valueClass(value: unknown): string {
  if (typeof value === "string") return "text-emerald-700 dark:text-emerald-300";
  if (typeof value === "number") return "text-amber-700 dark:text-amber-300";
  if (typeof value === "boolean") return "text-violet-700 dark:text-violet-300";
  if (value === null) return "text-rose-600 dark:text-rose-300";
  return "";
}

function renderPrimitive(value: unknown, search: string): ReactNode {
  if (typeof value === "string") return renderMatch(JSON.stringify(value), search);
  if (value === null) return renderMatch("null", search);
  return renderMatch(String(value), search);
}

function renderMatch(text: string, search: string): ReactNode {
  if (!search || !text.toLowerCase().includes(search)) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(search);
  return (
    <>
      {text.slice(0, idx)}
      <mark className={cn("rounded bg-primary/25 px-0.5 text-foreground")}>
        {text.slice(idx, idx + search.length)}
      </mark>
      {text.slice(idx + search.length)}
    </>
  );
}
