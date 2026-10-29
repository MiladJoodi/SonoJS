"use client"

import {
  CitationList,
  CitationStack,
  citationIcons,
  type CitationItem,
} from "@sonojs/ui/components/citations"

const SOURCES: CitationItem[] = [
  {
    id: "wiki",
    title: "Ice cream",
    domain: "wikipedia.org",
    url: "#stack-demo-wiki",
    icon: citationIcons.wiki,
  },
  {
    id: "seriouseats",
    title: "The Science of the Best Chocolate Ice Cream",
    domain: "seriouseats.com",
    url: "#stack-demo-seriouseats",
    icon: citationIcons.seriouseats,
  },
  {
    id: "nyt",
    title: "How to Make Ice Cream Without a Machine",
    domain: "nytimes.com",
    url: "#stack-demo-nyt",
    icon: citationIcons.nyt,
  },
]

export function CitationsStack() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CitationStack citations={SOURCES} />
        <span>3 sources</span>
      </div>
      <CitationList citations={SOURCES} idPrefix="stack-demo" />
    </div>
  )
}
