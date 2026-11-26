import { CodeBlockHeader } from "@/components/docs/code-block-header"
import { CopyButton } from "@/components/docs/copy-button"
import { highlightCode, type CodeLang } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"

/** Docs `ComponentSource` chrome with a capped, scrollable body for long snippets. */
export async function GuideCode({
  title = "Source",
  code,
  lang = "tsx",
}: {
  title?: string
  code: string
  lang?: CodeLang
}) {
  const html = await highlightCode(code, lang)

  return (
    <div className="sono-code-block w-full max-w-2xl">
      <CodeBlockHeader title={title}>
        <CopyButton value={code} className="size-6 shrink-0 [&_svg]:size-3" />
      </CodeBlockHeader>
      <div
        className={cn(
          "sono-code-shiki scrollbar-soft max-h-36 overflow-auto font-mono text-[14px] leading-[1.65]"
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}