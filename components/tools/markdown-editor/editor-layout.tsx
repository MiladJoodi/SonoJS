"use client"

import * as React from "react"

/** Rich = display only · Source = markdown only · Diff = display | markdown */
export type EditorLayoutMode = "rich-text" | "source" | "diff"

type EditorLayoutContextValue = {
  layout: EditorLayoutMode
  setLayout: (mode: EditorLayoutMode) => void
}

const EditorLayoutContext = React.createContext<EditorLayoutContextValue | null>(
  null
)

export function EditorLayoutProvider({
  layout,
  setLayout,
  children,
}: {
  layout: EditorLayoutMode
  setLayout: (mode: EditorLayoutMode) => void
  children: React.ReactNode
}) {
  const value = React.useMemo(
    () => ({ layout, setLayout }),
    [layout, setLayout]
  )
  return (
    <EditorLayoutContext.Provider value={value}>
      {children}
    </EditorLayoutContext.Provider>
  )
}

export function useEditorLayout(): EditorLayoutContextValue {
  const ctx = React.useContext(EditorLayoutContext)
  if (!ctx) {
    throw new Error("useEditorLayout must be used within EditorLayoutProvider")
  }
  return ctx
}
