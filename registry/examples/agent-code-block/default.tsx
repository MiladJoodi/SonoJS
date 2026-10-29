"use client"

import { AgentCodeBlock } from "@sonojs/ui/components/agent-code-block"

const SAMPLE = `export function greet(name: string) {
  return \`Hello, \${name}!\`
}

greet("Sono")
`

export function AgentCodeBlockDefault() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <AgentCodeBlock
        filename="greet.ts"
        language="typescript"
        code={SAMPLE}
        highlightLines={[1, 2]}
      />
    </div>
  )
}
