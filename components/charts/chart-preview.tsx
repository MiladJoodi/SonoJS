"use client"

import * as React from "react"
import { Code2Icon, EyeIcon } from "lucide-react"

import { CodePanel } from "@/components/docs/code-panel"
import { CopyButton } from "@/components/docs/copy-button"
import { SoftButton, SoftGroup } from "@/components/docs/soft-toolbar"
import {
  DirectionProvider,
  DirectionToggle,
} from "@/components/direction"
import type { Direction } from "@/lib/direction"
import { cn } from "@/lib/utils"

type ViewMode = "preview" | "code"

/**
 * Charts player - same Soft toolbar chrome as VariantPreview / BlockExample.
 * LTR/RTL · Preview/Code · CLI. No viewport / fullscreen / variant tabs.
 */
export function ChartPreview({
  children,
  fullWidth = false,
  title,
  name,
  code,
  codeHtml,
  className,
}: {
  children: React.ReactNode
  fullWidth?: boolean
  /** Mono label in the toolbar (defaults to `name`). */
  title?: string
  /** Registry item id - enables CLI copy. */
  name?: string
  /** Ported demo source for the Code tab. */
  code?: string
  /** Pre-highlighted HTML from `highlightCode` on the server. */
  codeHtml?: string
  className?: string
}) {
  const [dir, setDir] = React.useState<Direction>("ltr")
  const [view, setView] = React.useState<ViewMode>("preview")
  const hasCode = Boolean(code && codeHtml)
  const effectiveView: ViewMode = hasCode ? view : "preview"
  const isPreview = effectiveView === "preview"
  const displayTitle = title ?? name
  const command = name ? `npx @sonojs/ui@latest add ${name}` : null

  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-[12px] border border-border/70 bg-card",
        className
      )}
    >
      <div className="flex flex-col gap-2 rounded-t-[12px] border-b border-border/80 bg-muted/30 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {displayTitle ? (
            <span className="min-w-0 max-w-40 shrink truncate rounded-md px-2 py-1.5 font-mono text-[12.5px] text-muted-foreground sm:max-w-64">
              {displayTitle}
            </span>
          ) : null}

          {isPreview ? (
            <DirectionToggle value={dir} onValueChange={setDir} />
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          {hasCode ? (
            <SoftGroup label="View mode">
              <SoftButton
                label="Preview"
                pressed={isPreview}
                onClick={() => setView("preview")}
              >
                <EyeIcon className="size-3.5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Preview</span>
              </SoftButton>
              <SoftButton
                label="Code"
                pressed={effectiveView === "code"}
                onClick={() => setView("code")}
              >
                <Code2Icon className="size-3.5 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Code</span>
              </SoftButton>
            </SoftGroup>
          ) : null}

          {command ? (
            <CopyButton
              value={command}
              tone="chrome"
              tooltipSide="top"
              tooltipIdle="Copy install command"
              tooltipCopied="Copied - paste in your terminal"
              className="h-8 rounded-md"
            >
              CLI
            </CopyButton>
          ) : null}
        </div>
      </div>

      {isPreview ? (
        <DirectionProvider
          dir={dir}
          className={cn(
            "flex w-full min-w-0 max-w-none justify-center bg-card p-4 md:p-6",
            fullWidth && "md:p-8"
          )}
        >
          <div className="w-full min-w-0">{children}</div>
        </DirectionProvider>
      ) : code && codeHtml ? (
        <CodePanel
          title={`${name ?? "chart"}.tsx`}
          code={code}
          html={codeHtml}
        />
      ) : null}
    </div>
  )
}
