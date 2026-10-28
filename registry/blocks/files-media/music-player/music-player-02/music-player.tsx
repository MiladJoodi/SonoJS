"use client"

import * as React from "react"
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import demoWav from "./media/demo.wav"
import {
  assetSrc,
  formatTime,
  useMusicAudio,
} from "../_lib/use-music-audio"

export default function MusicPlayer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const audio = useMusicAudio()

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-sm overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400">
          <span className="text-5xl font-semibold text-white/90">NL</span>
        </div>
        <div className="space-y-4 px-5 py-5 text-start">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Soft Neon Nights
            </h1>
            <p className="text-sm text-muted-foreground">Nova Lane · Echo EP</p>
          </div>
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="cursor-pointer"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div className="flex justify-between text-xs tabular-nums text-muted-foreground" dir="ltr">
            <span>{formatTime(audio.current)}</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              aria-label="Previous"
              onClick={() => audio.seek(0)}
            >
              <SkipBackIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-12 cursor-pointer rounded-full"
              onClick={() => audio.toggle()}
            >
              {audio.playing ? (
                <PauseIcon className="size-5" aria-hidden />
              ) : (
                <PlayIcon className="size-5 ms-0.5" aria-hidden />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              aria-label="Next"
              onClick={() => audio.seek(audio.duration)}
            >
              <SkipForwardIcon className="size-5" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
