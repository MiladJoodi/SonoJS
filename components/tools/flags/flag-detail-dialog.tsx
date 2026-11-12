"use client"

import type * as React from "react"

import { CopyButton } from "@/components/docs/copy-button"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { flagImgSnippet, flagSrc } from "./lib/cdn"
import type { FlagCountry } from "./lib/countries"
import { highlightImgSnippet, highlightUrl } from "./lib/highlight"

function FieldRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-md border border-border/70 bg-muted/30 px-3 py-2">
      <div className="min-w-0 flex-1">
        <div className="text-caption text-muted-foreground">{label}</div>
        <div className="truncate font-mono text-sm text-foreground">{value}</div>
      </div>
      <CopyButton value={value} tone="chrome" className="shrink-0" />
    </div>
  )
}

function CodeSnippet({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children: React.ReactNode
}) {
  return (
    <div className="sono-code-block overflow-hidden rounded-[12px] border border-(--code-border)">
      <div className="flex items-center justify-between gap-2 border-b border-(--code-border) bg-(--code-header-bg) px-3 py-1.5">
        <span className="text-[12px] font-medium text-(--code-header-fg)">
          {label}
        </span>
        <CopyButton
          value={value}
          className="size-6 shrink-0 [&_svg]:size-3"
        />
      </div>
      <pre className="max-h-28 overflow-auto whitespace-pre-wrap break-all bg-(--code-bg) px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-(--code-fg)">
        {children}
      </pre>
    </div>
  )
}

export function FlagDetailDialog({
  country,
  open,
  onOpenChange,
}: {
  country: FlagCountry | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const url = country ? flagSrc(country.code) : ""
  const img = country ? flagImgSnippet(country.code, country.name) : ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-4"
        style={{ maxWidth: "min(28rem, calc(100% - 2rem))" }}
        onCloseAutoFocus={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        {country ? (
          <>
            <DialogHeader className="gap-3 pe-8 sm:text-start">
              <div className="flex items-center gap-3">
                <span className="block aspect-3/2 w-18 shrink-0 overflow-hidden rounded-md border border-border/70 bg-muted/40">
                  {/* eslint-disable-next-line @next/next/no-img-element -- CDN SVG */}
                  <img
                    src={url}
                    alt=""
                    width={72}
                    height={48}
                    className="size-full object-cover object-center"
                  />
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <DialogTitle className="truncate">{country.name}</DialogTitle>
                  <DialogDescription className="font-mono">
                    {country.code} · {country.dial}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-2 sm:grid-cols-2">
              <FieldRow label="ISO" value={country.code} />
              <FieldRow label="Dial" value={country.dial} />
            </div>

            <div className="space-y-2">
              <CodeSnippet label="URL" value={url}>
                {highlightUrl(url)}
              </CodeSnippet>
              <CodeSnippet label="img" value={img}>
                {highlightImgSnippet(url, country.name)}
              </CodeSnippet>
            </div>

            <DialogFooter className="gap-2 sm:justify-between">
              <Button variant="outline" asChild className="cursor-pointer">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Open SVG
                </a>
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
