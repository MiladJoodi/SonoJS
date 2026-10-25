"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

const KEYWORDS = new Set([
  "export",
  "interface",
  "type",
  "extends",
  "readonly",
  "string",
  "number",
  "boolean",
  "null",
  "undefined",
  "any",
  "unknown",
  "never",
  "void",
  "true",
  "false",
]);

type TokenKind =
  | "keyword"
  | "typeName"
  | "property"
  | "punctuation"
  | "operator"
  | "plain";

interface Token {
  kind: TokenKind;
  text: string;
}

function tokenizeTs(source: string): Token[] {
  const tokens: Token[] = [];
  const re =
    /(\/\/[^\n]*)|(\b[A-Za-z_][A-Za-z0-9_]*\b)|([{}[\]();,:])|(=>|\||&|\?|:)|(\s+)|(.)/g;
  let match: RegExpExecArray | null;
  let expectingProperty = false;
  let afterInterface = false;

  while ((match = re.exec(source)) !== null) {
    const [, comment, ident, punct, op, space, other] = match;

    if (comment) {
      tokens.push({ kind: "plain", text: comment });
      continue;
    }
    if (space) {
      tokens.push({ kind: "plain", text: space });
      continue;
    }
    if (punct) {
      if (punct === "{") expectingProperty = true;
      else if (punct === "}") expectingProperty = false;
      else if (punct === ";") expectingProperty = true;
      else if (punct === ":") expectingProperty = false;
      tokens.push({ kind: "punctuation", text: punct });
      continue;
    }
    if (op) {
      tokens.push({ kind: "operator", text: op });
      if (op === ":") expectingProperty = false;
      continue;
    }
    if (ident) {
      if (KEYWORDS.has(ident)) {
        afterInterface = ident === "interface" || ident === "type";
        tokens.push({ kind: "keyword", text: ident });
      } else if (afterInterface) {
        afterInterface = false;
        tokens.push({ kind: "typeName", text: ident });
      } else if (expectingProperty) {
        tokens.push({ kind: "property", text: ident });
        expectingProperty = false;
      } else if (/^[A-Z]/.test(ident)) {
        tokens.push({ kind: "typeName", text: ident });
      } else {
        tokens.push({ kind: "plain", text: ident });
      }
      continue;
    }
    if (other) {
      tokens.push({ kind: "plain", text: other });
    }
  }

  return tokens;
}

const kindClass: Record<TokenKind, string> = {
  keyword: "text-sky-700 dark:text-sky-300",
  typeName: "text-amber-800 dark:text-amber-300",
  property: "text-teal-800 dark:text-teal-300",
  punctuation: "text-muted-foreground",
  operator: "text-rose-700/90 dark:text-rose-300/90",
  plain: "text-foreground/90",
};

interface TsTypeViewProps {
  code: string;
  className?: string;
}

/** Syntax-colored TypeScript type preview for the response Type tab. */
export function TsTypeView({ code, className }: TsTypeViewProps) {
  const tokens = useMemo(() => tokenizeTs(code), [code]);
  const interfaceCount = useMemo(
    () => (code.match(/\bexport interface\b/g) ?? []).length,
    [code],
  );

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border/70 bg-[#f7f5f0] dark:bg-[#161922]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-card/80 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-primary-foreground uppercase">
            New
          </span>
          <span className="text-xs font-medium text-foreground">
            TypeScript types
          </span>
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {interfaceCount} {interfaceCount === 1 ? "interface" : "interfaces"}
        </span>
      </div>
      <pre className="font-mono overflow-auto p-3 text-[12px] leading-6 whitespace-pre-wrap break-words">
        <code>
          {tokens.map((t, i) => (
            <span key={`${i}-${t.text.slice(0, 8)}`} className={kindClass[t.kind]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
