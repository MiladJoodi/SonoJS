"use client"

import * as React from "react"
import { SparklesIcon } from "lucide-react"

import {
  PromptInput2,
  type PromptModel,
} from "@sonojs/ui/components/prompt-input-2"

const models: PromptModel[] = [
  {
    value: "sono-fast",
    label: "Sono Fast",
    icon: <SparklesIcon />,
  },
]

export function PromptInput2Loading() {
  const [loading, setLoading] = React.useState(true)

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <PromptInput2
        defaultValue="Summarize the latest vendor notes."
        models={models}
        defaultModel="sono-fast"
        loading={loading}
        onStop={() => setLoading(false)}
        onSubmit={() => setLoading(true)}
      />
      {!loading ? (
        <button
          type="button"
          className="cursor-pointer self-start text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          onClick={() => setLoading(true)}
        >
          Resume loading
        </button>
      ) : null}
    </div>
  )
}
