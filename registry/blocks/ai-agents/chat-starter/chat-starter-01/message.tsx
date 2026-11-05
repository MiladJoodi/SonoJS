"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type ChatStarterMessageProps = {
  role: string
  text: string
  streaming?: boolean
  at?: number
}

export function ChatStarterMessage({
  role,
  text,
  streaming = false,
  at,
}: ChatStarterMessageProps) {
  if (!text) return null

  if (role === "user") {
    return (
      <p className="ms-auto flex w-fit max-w-[75%] flex-col rounded-2xl bg-card px-3 py-[11px] text-start text-sm leading-relaxed break-words whitespace-pre-wrap text-foreground shadow-xs">
        {text}
      </p>
    )
  }

  return (
    <div className="group/message flex flex-col gap-1 px-1">
      <StreamedText text={text} />
      <MessageActions text={text} at={at} hidden={streaming} />
    </div>
  )
}

export function StreamedText({
  text,
  paragraphs = false,
}: {
  text: string
  paragraphs?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const lines = React.useMemo(
    () =>
      text
        .split(paragraphs ? /\n\s*\n/ : "\n")
        .filter((line) => line.trim() !== ""),
    [text, paragraphs]
  )

  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, index) => (
        <Line key={index} text={line} animate={!reduceMotion} />
      ))}
    </div>
  )
}

const LINE_HIDDEN = { opacity: 0, filter: "blur(5px)", y: 4 }
const LINE_SHOWN = { opacity: 1, filter: "blur(0px)", y: 0 }
const LINE_TRANSITION = { duration: 0.42, ease: [0.22, 0.61, 0.36, 1] } as const

const Line = React.memo(function Line({
  text,
  animate,
}: {
  text: string
  animate: boolean
}) {
  return (
    <motion.p
      initial={animate ? LINE_HIDDEN : false}
      animate={LINE_SHOWN}
      transition={LINE_TRANSITION}
      className="text-sm leading-relaxed break-words text-foreground"
    >
      {text}
    </motion.p>
  )
})

function MessageActions({
  text,
  at,
  hidden,
}: {
  text: string
  at?: number
  hidden: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const [speaking, setSpeaking] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  React.useEffect(() => {
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel()
    }
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard may be refused.
    }
  }

  const toggleSpeech = () => {
    const synth = typeof window === "undefined" ? undefined : window.speechSynthesis
    if (!synth) return
    if (speaking) {
      synth.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    synth.cancel()
    synth.speak(utterance)
    setSpeaking(true)
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 transition-opacity duration-150",
        hidden
          ? "pointer-events-none opacity-0"
          : "opacity-0 group-hover/message:opacity-100 focus-within:opacity-100"
      )}
    >
      <ActionButton label={copied ? "Copied" : "Copy message"} onClick={copy}>
        {copied ? (
          <CheckIcon className="size-4" aria-hidden />
        ) : (
          <CopyIcon className="size-4" aria-hidden />
        )}
      </ActionButton>

      <ActionButton
        label={speaking ? "Stop reading aloud" : "Read aloud"}
        onClick={toggleSpeech}
      >
        {speaking ? (
          <VolumeXIcon className="size-4" aria-hidden />
        ) : (
          <Volume2Icon className="size-4" aria-hidden />
        )}
      </ActionButton>

      {at ? (
        <time
          dateTime={new Date(at).toISOString()}
          className="ms-1 text-[11px] text-muted-foreground"
        >
          {formatAgo(at)}
        </time>
      ) : null}
    </div>
  )
}

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {children}
    </button>
  )
}

function formatAgo(at: number) {
  const seconds = Math.max(0, Math.round((Date.now() - at) / 1000))
  if (seconds < 45) return "just now"
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? "" : "s"} ago`
}
