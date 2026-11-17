"use client"

import * as React from "react"
import { CheckIcon, DownloadIcon } from "lucide-react"

import type { BackgroundsCatalogEntry } from "@/lib/backgrounds-catalog"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

/** Unlocked member download - minimal CTA. Locked state uses AccessLocked. */
export function BackgroundHtmlDownload({
  entry,
  className,
}: {
  entry: BackgroundsCatalogEntry
  className?: string
}) {
  const filename = `${entry.id}.html`
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!done) return
    const id = window.setTimeout(() => setDone(false), 2000)
    return () => window.clearTimeout(id)
  }, [done])

  function handleDownload() {
    const a = document.createElement("a")
    a.href = entry.htmlPath
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setDone(true)
  }

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleDownload}
      className={cn("h-[46px] w-full cursor-pointer gap-2 sm:w-auto", className)}
    >
      {done ? (
        <CheckIcon className="size-4" aria-hidden />
      ) : (
        <DownloadIcon className="size-4" aria-hidden />
      )}
      {done ? "Downloaded" : "Download HTML"}
    </Button>
  )
}
