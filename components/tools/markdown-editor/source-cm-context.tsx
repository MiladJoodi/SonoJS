"use client"

import * as React from "react"
import type { EditorView } from "@codemirror/view"

type SourceCmContextValue = {
  view: EditorView | null
  setView: (view: EditorView | null) => void
}

const SourceCmContext = React.createContext<SourceCmContextValue | null>(null)

export function SourceCmProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = React.useState<EditorView | null>(null)
  const value = React.useMemo(() => ({ view, setView }), [view])
  return (
    <SourceCmContext.Provider value={value}>{children}</SourceCmContext.Provider>
  )
}

export function useSourceCm(): SourceCmContextValue {
  const ctx = React.useContext(SourceCmContext)
  if (!ctx) {
    throw new Error("useSourceCm must be used within SourceCmProvider")
  }
  return ctx
}
