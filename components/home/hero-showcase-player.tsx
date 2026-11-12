"use client"

import * as React from "react"
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react"

import {
  DemoCard,
  Stagger,
} from "@/components/home/hero-showcase-chrome"
import { cn } from "@/lib/utils"

const EQ_BARS = Array.from({ length: 13 }, (_, b) => ({
  h: 18 + Math.round(Math.abs(Math.sin(b * 0.95 + 0.4)) * 64),
  d: -(b * 0.08),
}))

const PLAYER_TRACKS = [
  { title: "Low tide", artist: "Sono Sessions" },
  { title: "Night drive", artist: "Sono Sessions" },
  { title: "Glass house", artist: "Sono Sessions" },
] as const

function formatPlayerTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const s = Math.floor(seconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, "0")}`
}

export function ShowcasePlayerPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [playing, setPlaying] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [track, setTrack] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const seekRef = React.useRef<HTMLDivElement>(null)
  const dragRef = React.useRef(false)

  React.useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    a.currentTime = 0
    setPlaying(false)
    setElapsed(0)
    setTrack(0)
    setDragging(false)
    dragRef.current = false
  }, [show])

  React.useEffect(() => {
    const a = audioRef.current
    if (!a) return

    const onTime = () => {
      if (!dragRef.current) setElapsed(a.currentTime)
    }
    const onMeta = () => {
      setDuration(Number.isFinite(a.duration) ? a.duration : 0)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setElapsed(0)
      a.currentTime = 0
    }

    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onMeta)
    a.addEventListener("durationchange", onMeta)
    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    a.addEventListener("ended", onEnded)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onMeta)
      a.removeEventListener("durationchange", onMeta)
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
      a.removeEventListener("ended", onEnded)
    }
  }, [])

  const seekToClientX = React.useCallback((clientX: number) => {
    const a = audioRef.current
    const el = seekRef.current
    if (!a || !el) return
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0) return
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const d = Number.isFinite(a.duration) && a.duration > 0 ? a.duration : 0
    if (d <= 0) return
    a.currentTime = ratio * d
    setElapsed(a.currentTime)
  }, [])

  React.useEffect(() => {
    if (!dragging) return

    const onMove = (e: PointerEvent) => seekToClientX(e.clientX)
    const onUp = () => {
      dragRef.current = false
      setDragging(false)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [dragging, seekToClientX])

  async function togglePlay() {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      try {
        await a.play()
      } catch {
        /* autoplay blocked */
      }
    } else {
      a.pause()
    }
  }

  async function skip(delta: number) {
    const a = audioRef.current
    setTrack((t) => (t + delta + PLAYER_TRACKS.length) % PLAYER_TRACKS.length)
    if (!a) return
    a.currentTime = 0
    setElapsed(0)
    try {
      await a.play()
    } catch {
      /* autoplay */
    }
  }

  const current = PLAYER_TRACKS[track]!
  const pct =
    duration > 0 ? Math.min(100, Math.max(0, (elapsed / duration) * 100)) : 0

  return (
    <DemoCard
      show={show}
      className={cn("overflow-hidden p-0!", playing && "playing", className)}
    >
      <audio
        ref={audioRef}
        src="/media/home-demo.wav"
        preload="metadata"
        playsInline
      />
      <Stagger i={0} show={show}>
        <div className="relative h-[96px] overflow-hidden sm:h-[110px]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 70% at 30% 20%, color-mix(in oklab, var(--primary) 55%, transparent), transparent 60%),
                linear-gradient(145deg, var(--chart-1) 0%, color-mix(in oklab, var(--chart-1) 65%, var(--primary)) 100%)
              `,
            }}
          />
          <div className="relative flex h-full items-center justify-center gap-1 px-4 sm:gap-1.5">
            {EQ_BARS.map((bar, i) => (
              <b
                key={i}
                className={cn(
                  "inline-block w-1 max-h-14 origin-center rounded-full bg-white/95 sm:w-1.5 sm:max-h-16",
                  playing &&
                    "animate-[sono-eq_0.85s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
                )}
                style={
                  {
                    height: Math.round(bar.h * 0.72),
                    animationDelay: `${bar.d}s`,
                    opacity: 0.6 + (i % 5) * 0.07,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </Stagger>
      <div className="p-4 pt-3 sm:px-[22px] sm:pb-[22px] sm:pt-3.5">
        <Stagger i={1} show={show}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1 text-start">
              <strong className="block truncate text-[15px] tracking-[-0.02em]">
                {current.title}
              </strong>
              <span className="block truncate text-[12px] text-muted-foreground">
                {current.artist}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => void skip(-1)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <SkipBackIcon className="size-3.5" fill="currentColor" />
              </button>
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                onClick={() => void togglePlay()}
                className={cn(
                  "grid size-10 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-[0.96]",
                  playing &&
                    "shadow-[0_0_0_5px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
                )}
              >
                {playing ? (
                  <PauseIcon className="size-4" fill="currentColor" />
                ) : (
                  <PlayIcon className="ms-px size-4" fill="currentColor" />
                )}
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => void skip(1)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <SkipForwardIcon className="size-3.5" fill="currentColor" />
              </button>
            </div>
          </div>
        </Stagger>
        <Stagger i={2} show={show}>
          <div className="mt-2.5">
            <div
              ref={seekRef}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration || 0)}
              aria-valuenow={Math.round(elapsed)}
              tabIndex={0}
              className="relative h-3 cursor-pointer touch-none py-1"
              onPointerDown={(e) => {
                e.preventDefault()
                dragRef.current = true
                setDragging(true)
                seekToClientX(e.clientX)
                e.currentTarget.setPointerCapture?.(e.pointerId)
              }}
            >
              <div className="relative h-1 overflow-hidden rounded-full bg-muted">
                <i
                  className={cn(
                    "absolute inset-y-0 start-0 rounded-full bg-primary",
                    !dragging && "transition-[width] duration-150"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[11px] tabular-nums text-muted-foreground">
              <span>{formatPlayerTime(elapsed)}</span>
              <span>{formatPlayerTime(duration || 0)}</span>
            </div>
          </div>
        </Stagger>
      </div>
    </DemoCard>
  )
}

