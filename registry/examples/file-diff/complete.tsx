"use client"

import { FileDiff } from "@sonojs/ui/components/file-diff"

export function FileDiffComplete() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <FileDiff
        file="package.json"
        status="complete"
        collapseOnComplete={false}
        language="json"
        copyText={`-  "name": "app"\n+  "name": "sonojs"`}
        lines={[
          {
            id: "1",
            type: "context",
            oldLine: 1,
            newLine: 1,
            content: "{",
          },
          {
            id: "2",
            type: "removed",
            oldLine: 2,
            content: '  "name": "app",',
          },
          {
            id: "3",
            type: "added",
            newLine: 2,
            content: '  "name": "sonojs",',
          },
          {
            id: "4",
            type: "context",
            oldLine: 3,
            newLine: 3,
            content: '  "private": true',
          },
          {
            id: "5",
            type: "context",
            oldLine: 4,
            newLine: 4,
            content: "}",
          },
        ]}
      />
    </div>
  )
}
