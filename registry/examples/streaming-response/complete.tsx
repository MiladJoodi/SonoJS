"use client"

import { citationIcons } from "@sonojs/ui/components/citations"
import { StreamingResponse } from "@sonojs/ui/components/streaming-response"

const COPY =
  "Stable sorts keep equal elements in order when the comparator returns zero. Prefer a stable algorithm for multi-key ranking."

export function StreamingResponseComplete() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <StreamingResponse
        status="complete"
        copyText={COPY}
        defaultSourcesOpen
        sources={[
          {
            id: "mdn",
            title: "Array.prototype.sort()",
            domain: "developer.mozilla.org",
            url: "#response-source-mdn",
            icon: citationIcons.mdn,
          },
          {
            id: "tc39",
            title: "ECMAScript Language Specification",
            domain: "tc39.es",
            url: "#response-source-tc39",
            icon: citationIcons.tc39,
          },
        ]}
      >
        <p>{COPY}</p>
      </StreamingResponse>
    </div>
  )
}
