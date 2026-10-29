"use client"

import { PromptInput } from "@sonojs/ui/components/prompt-input"

export function PromptInputDefault() {
  return (
    <div className="mx-auto flex w-full max-w-lg items-end justify-center py-6">
      <PromptInput
        onSubmit={(value, meta) => {
          console.log(value, meta)
        }}
      />
    </div>
  )
}
