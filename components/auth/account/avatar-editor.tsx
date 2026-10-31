"use client"

import * as React from "react"
import { ImagePlusIcon, Trash2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Spinner } from "@sonojs/ui/components/spinner"

function initials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
  }
  return email?.[0]?.toUpperCase() ?? "?"
}

/**
 * Avatar with Change / Remove on hover (desktop).
 * On touch: tap photo to open the same overlay; tap outside to close.
 */
export function AccountAvatarEditor({
  imageUrl,
  name,
  email,
  busy,
  onPickFile,
  onRemove,
  className,
  showHint = false,
}: {
  imageUrl?: string | null
  name: string
  email?: string | null
  busy?: boolean
  onPickFile: (file: File) => void
  onRemove: () => void
  className?: string
  showHint?: boolean
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [menuOpen])

  const openPicker = () => {
    fileRef.current?.click()
    setMenuOpen(false)
  }

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onPickFile(file)
          event.target.value = ""
        }}
      />

      <div
        className={cn(
          "group relative size-20 overflow-hidden rounded-full sm:size-24",
          "ring-1 ring-border/60",
          busy && "pointer-events-none opacity-70"
        )}
      >
        <Avatar className="size-full rounded-full">
          <AvatarImage src={imageUrl ?? undefined} alt="" />
          <AvatarFallback className="bg-muted text-xl font-medium tracking-tight sm:text-2xl">
            {initials(name, email)}
          </AvatarFallback>
        </Avatar>

        <button
          type="button"
          className="absolute inset-0 z-10 cursor-pointer rounded-full bg-transparent md:hidden"
          aria-label={menuOpen ? "Close avatar actions" : "Edit avatar"}
          aria-expanded={menuOpen}
          disabled={busy}
          onClick={() => setMenuOpen((open) => !open)}
        />

        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 rounded-full",
            "bg-foreground/55 text-background backdrop-blur-[2px] transition-opacity duration-150",
            "pointer-events-none opacity-0",
            menuOpen && "pointer-events-auto opacity-100",
            "md:group-hover:pointer-events-auto md:group-hover:opacity-100"
          )}
        >
          {busy ? (
            <Spinner className="size-5 text-background" />
          ) : (
            <>
              <button
                type="button"
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full hover:bg-background/20"
                aria-label="Change avatar"
                onClick={openPicker}
              >
                <ImagePlusIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-red-200 hover:bg-background/20 hover:text-red-100"
                aria-label="Remove avatar"
                onClick={() => {
                  setMenuOpen(false)
                  onRemove()
                }}
              >
                <Trash2Icon className="size-4" aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>

      {showHint ? (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="md:hidden">Tap photo to edit. </span>
          <span className="hidden md:inline">Hover photo to edit. </span>
          JPG, PNG, or WebP.
        </p>
      ) : null}
    </div>
  )
}
