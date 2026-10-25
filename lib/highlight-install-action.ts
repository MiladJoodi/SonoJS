"use server"

import { highlightCode, type CodeLang } from "@/lib/highlight-code"

export type HighlightInstallSnippet = {
  code: string
  lang: CodeLang
}

/** Dark+ HTML for drawer install snippets. Runs only when a drawer opens. */
export async function highlightInstallSnippets(
  snippets: HighlightInstallSnippet[]
): Promise<string[]> {
  return Promise.all(snippets.map((snippet) => highlightCode(snippet.code, snippet.lang)))
}
