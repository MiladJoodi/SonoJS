"use client"

import {
  Terminal,
  TerminalActions,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalTitle,
} from "@sonojs/ui/components/terminal"

const OUTPUT = `$ npm run build

✓ Compiled successfully in 1.2s
✓ Generated static pages (3/3)
✓ Build completed successfully!
`

export function TerminalComplete() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Terminal output={OUTPUT} isStreaming={false}>
        <TerminalHeader>
          <TerminalTitle>Build Output</TerminalTitle>
          <TerminalActions>
            <TerminalCopyButton />
          </TerminalActions>
        </TerminalHeader>
        <TerminalContent />
      </Terminal>
    </div>
  )
}
