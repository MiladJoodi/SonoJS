"use client"

import { cursorsCatalog } from "@/lib/cursors-catalog"

import { CursorExampleCard } from "./example-card"

/** Flat card grid — no category folders. */
export function CursorGallery() {
  const entries = [...cursorsCatalog].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "ported" ? -1 : 1
    }
    return a.title.localeCompare(b.title)
  })

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {entries.map((entry) => (
        <CursorExampleCard
          key={entry.id}
          id={entry.id}
          title={entry.title}
          status={entry.status}
        />
      ))}
    </div>
  )
}
