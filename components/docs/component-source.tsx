import { CopyButton } from "@/components/docs/copy-button"
import { highlightCode, type CodeLang } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"

export async function ComponentSource({
  title = "Source",
  code,
  lang = "tsx",
  className,
}: {
  title?: string
  code: string
  lang?: CodeLang
  className?: string
}) {
  const html = await highlightCode(code, lang)

  return (
    <div className={cn("sono-code-block", className)}>
      <div className="flex min-w-0 items-center gap-1 border-b border-[color:var(--code-border)] px-4 py-2">
        <div className="min-w-0 truncate font-mono text-[14px] font-normal text-[color:var(--code-header-fg)]">
          {title}
        </div>
        <CopyButton value={code} className="shrink-0" />
      </div>
      <div
        className="sono-code-shiki no-scrollbar font-mono text-[14px] leading-[1.65]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
