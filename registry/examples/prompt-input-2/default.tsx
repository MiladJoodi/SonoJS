"use client"

import * as React from "react"
import {
  FileTextIcon,
  ImageIcon,
  PaperclipIcon,
  SparklesIcon,
} from "lucide-react"

import {
  PromptInput2,
  type PromptAction,
  type PromptModel,
} from "@sonojs/ui/components/prompt-input-2"

const models: PromptModel[] = [
  {
    value: "sono-fast",
    label: "Sono Fast",
    icon: <SparklesIcon />,
  },
  {
    value: "sono-pro",
    label: "Sono Pro",
    icon: <SparklesIcon />,
  },
]

const actions: PromptAction[] = [
  {
    value: "attach",
    label: "Attach file",
    description: "Add a document to the prompt",
    icon: <PaperclipIcon />,
  },
  {
    value: "image",
    label: "Add image",
    description: "Include a reference image",
    icon: <ImageIcon />,
  },
  {
    value: "template",
    label: "Use template",
    description: "Start from a saved prompt",
    icon: <FileTextIcon />,
  },
]

export function PromptInput2Default() {
  const [loading, setLoading] = React.useState(false)
  const [last, setLast] = React.useState<string | null>(null)
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <PromptInput2
        models={models}
        defaultModel="sono-fast"
        actions={actions}
        loading={loading}
        onAction={(action) => setLast(`action:${action}`)}
        onSubmit={(value, model) => {
          setLast(`submit:${model}:${value}`)
          setLoading(true)
          if (timerRef.current) window.clearTimeout(timerRef.current)
          timerRef.current = window.setTimeout(() => setLoading(false), 1800)
        }}
        onStop={() => {
          if (timerRef.current) window.clearTimeout(timerRef.current)
          setLoading(false)
          setLast("stopped")
        }}
      />
      {last ? (
        <p className="text-xs text-muted-foreground">{last}</p>
      ) : null}
    </div>
  )
}
