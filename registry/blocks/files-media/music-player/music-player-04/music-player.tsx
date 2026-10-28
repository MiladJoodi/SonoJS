"use client"

import * as React from "react"
import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  Share2Icon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import demoWav from "./media/demo.wav"
import {
  assetSrc,
  formatTime,
  useBarVisualizer,
  useMusicAudio,
} from "../_lib/use-music-audio"

const BAR_COUNT = 48

export default function MusicPlayer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const audio = useMusicAudio()
  const levels = useBarVisualizer(audio.playing, BAR_COUNT)
  const waveRef = React.useRef<HTMLDivElement>(null)

  const seekFromClientX = (clientX: number) => {
    const el = waveRef.current
    if (!el || !audio.duration) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    audio.seek(pct * audio.duration)
  }

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex gap-4 border-b border-border/70 p-4 sm:p-5">
          <div className="size-16 shrink-0 rounded-md bg-gradient-to-br from-orange-500 to-amber-700 sm:size-20" />
          <div className="min-w-0 flex-1 text-start">
            <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
              Track
            </p>
            <h1 className="truncate text-base font-semibold">
              Waveform City
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              Harbor Beats
            </p>
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                size="icon-xs"
                className="size-9 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => audio.toggle()}
              >
                {audio.playing ? (
                  <PauseIcon className="size-3.5" aria-hidden />
                ) : (
                  <PlayIcon className="size-3.5 ms-px" aria-hidden />
                )}
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
              >
                <HeartIcon className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
              >
                <RepeatIcon className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
              >
                <Share2Icon className="size-4" aria-hidden />
              </Button>
              <span
                className="ms-auto self-center text-xs tabular-nums text-muted-foreground"
                dir="ltr"
              >
                {formatTime(audio.current)} / {formatTime(audio.duration)}
              </span>
            </div>
          </div>
        </div>

        <div
          ref={waveRef}
          role="slider"
          tabIndex={0}
          aria-label="Waveform scrubber"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(audio.progress)}
          className="flex h-24 cursor-pointer items-end gap-px bg-muted/40 px-3 py-3"
          onClick={(e) => seekFromClientX(e.clientX)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") audio.skip(-2)
            if (e.key === "ArrowRight") audio.skip(2)
          }}
        >
          {levels.map((level, i) => {
            const played = (i / BAR_COUNT) * 100 <= audio.progress
            return (
              <span
                key={i}
                className={cn(
                  "min-w-0 flex-1 rounded-sm transition-[height,background-color] duration-75",
                  played
                    ? "bg-orange-500"
                    : "bg-orange-500/25 dark:bg-orange-400/20"
                )}
                style={{ height: `${Math.max(8, level * 100)}%` }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
