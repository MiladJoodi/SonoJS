import type { ReactNode } from "react"

const tok = {
  tag: "text-[color:var(--code-syntax-type)]",
  attr: "text-[color:var(--code-syntax-variable)]",
  str: "text-[color:var(--code-syntax-string)]",
  punc: "text-[color:var(--code-header-fg)]",
} as const

/** Highlight a bare CDN URL (string token). */
export function highlightUrl(url: string): ReactNode {
  return <span className={tok.str}>{url}</span>
}

/** Highlight a simple `<img … />` snippet like the flags gallery. */
export function highlightImgSnippet(url: string, name: string): ReactNode {
  return (
    <>
      <span className={tok.punc}>{"<"}</span>
      <span className={tok.tag}>img</span>
      {" "}
      <span className={tok.attr}>src</span>
      <span className={tok.punc}>=</span>
      <span className={tok.str}>{`"${url}"`}</span>
      {" "}
      <span className={tok.attr}>alt</span>
      <span className={tok.punc}>=</span>
      <span className={tok.str}>{`"${name}"`}</span>
      {" "}
      <span className={tok.attr}>width</span>
      <span className={tok.punc}>=</span>
      <span className={tok.str}>{`"20"`}</span>
      {" "}
      <span className={tok.attr}>height</span>
      <span className={tok.punc}>=</span>
      <span className={tok.str}>{`"20"`}</span>
      {" "}
      <span className={tok.punc}>{"/>"}</span>
    </>
  )
}
