"use client"

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInScira,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from "@sonojs/ui/components/open-in-chat"

const sampleQuery = "How can I implement authentication in Next.js?"

export function OpenInChatDefault() {
  return (
    <div className="flex w-full justify-center py-6">
      <OpenIn query={sampleQuery}>
        <OpenInTrigger />
        <OpenInContent>
          <OpenInChatGPT />
          <OpenInClaude />
          <OpenInCursor />
          <OpenInT3 />
          <OpenInScira />
          <OpenInv0 />
        </OpenInContent>
      </OpenIn>
    </div>
  )
}
