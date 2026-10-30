"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import demoMp3 from "./media/demo.mp3"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo audio shipped beside the component (`./media/demo.mp3`). */
export const transcriptionDemoSrc = assetSrc(demoMp3)

/** Word/phrase timing from a transcription pipeline (e.g. AI `transcribe()`). */
export type TranscriptionSegment = {
  text: string
  startSecond: number
  endSecond: number
}

function useControllableState({
  prop,
  defaultProp = 0,
  onChange,
}: {
  prop?: number
  defaultProp?: number
  onChange?: (value: number) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultProp)
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolled

  const setValue = React.useCallback(
    (next: number | ((prev: number) => number)) => {
      const resolved = typeof next === "function" ? next(value) : next
      if (!isControlled) setUncontrolled(resolved)
      onChange?.(resolved)
    },
    [isControlled, onChange, value]
  )

  return [value, setValue] as const
}

type TranscriptionContextValue = {
  segments: TranscriptionSegment[]
  currentTime: number
  onTimeUpdate: (time: number) => void
  onSeek?: (time: number) => void
}

const TranscriptionContext =
  React.createContext<TranscriptionContextValue | null>(null)

function useTranscription() {
  const context = React.useContext(TranscriptionContext)
  if (!context) {
    throw new Error(
      "Transcription components must be used within Transcription"
    )
  }
  return context
}

export type TranscriptionProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  segments: TranscriptionSegment[]
  currentTime?: number
  onSeek?: (time: number) => void
  children: (segment: TranscriptionSegment, index: number) => React.ReactNode
}

function Transcription({
  segments,
  currentTime: externalCurrentTime,
  onSeek,
  className,
  children,
  ...props
}: TranscriptionProps) {
  const [currentTime, setCurrentTime] = useControllableState({
    defaultProp: 0,
    onChange: onSeek,
    prop: externalCurrentTime,
  })

  const contextValue = React.useMemo(
    () => ({
      currentTime,
      onSeek,
      onTimeUpdate: setCurrentTime,
      segments,
    }),
    [currentTime, onSeek, setCurrentTime, segments]
  )

  return (
    <TranscriptionContext.Provider value={contextValue}>
      <div
        data-slot="transcription"
        className={cn(
          "flex flex-wrap gap-1 text-sm leading-relaxed",
          className
        )}
        {...props}
      >
        {segments
          .filter((segment) => segment.text.trim())
          .map((segment, index) => children(segment, index))}
      </div>
    </TranscriptionContext.Provider>
  )
}

export type TranscriptionSegmentProps = React.ComponentProps<"button"> & {
  segment: TranscriptionSegment
  index: number
}

function TranscriptionSegment({
  segment,
  index,
  className,
  onClick,
  ...props
}: TranscriptionSegmentProps) {
  const { currentTime, onSeek } = useTranscription()

  const isActive =
    currentTime >= segment.startSecond && currentTime < segment.endSecond
  const isPast = currentTime >= segment.endSecond

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onSeek?.(segment.startSecond)
      onClick?.(event)
    },
    [onSeek, segment.startSecond, onClick]
  )

  return (
    <button
      type="button"
      data-slot="transcription-segment"
      data-active={isActive || undefined}
      data-index={index}
      className={cn(
        "inline min-h-9 touch-manipulation rounded-sm px-1 py-1.5 text-start outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        isActive && "text-primary",
        isPast && "text-muted-foreground",
        !(isActive || isPast) && "text-muted-foreground/60",
        onSeek
          ? "cursor-pointer hover:text-foreground"
          : "cursor-default",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {segment.text}
    </button>
  )
}

export { Transcription, TranscriptionSegment }
