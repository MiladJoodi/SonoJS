import { CodeBlockHeader } from "@/components/docs/code-block-header"
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
      <CodeBlockHeader title={title}>
        <CopyButton value={code} className="size-6 shrink-0 [&_svg]:size-3" />
      </CodeBlockHeader>
      <div
        className="sono-code-shiki no-scrollbar max-h-36 overflow-auto font-mono text-[14px] leading-[1.65]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
