"use client"

import { CodeBlockHeader } from "@/components/docs/code-block-header"
import { CopyButton } from "@/components/docs/copy-button"
import { cn } from "@/lib/utils"

/** Client panel for already-highlighted shiki HTML (server → props). */
export function CodePanel({
  title = "example.tsx",
  code,
  html,
  className,
  copyTooltip = true,
}: {
  title?: string
  code: string
  html: string
  className?: string
  copyTooltip?: boolean
}) {
  return (
    <div className={cn("sono-code-block rounded-none border-0", className)}>
      <CodeBlockHeader title={title}>
        <CopyButton
          value={code}
          tooltip={copyTooltip}
          className="size-6 shrink-0 [&_svg]:size-3"
        />
      </CodeBlockHeader>
      <div
        className="sono-code-shiki no-scrollbar max-h-36 overflow-auto font-mono text-[14px] leading-[1.65]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
