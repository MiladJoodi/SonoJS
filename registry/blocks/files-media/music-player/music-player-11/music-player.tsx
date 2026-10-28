"use client"

import * as React from "react"
import {
  MoreHorizontalIcon,
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
        "flex w-full justify-center bg-white px-4 py-10 dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-sm overflow-hidden rounded-[28px] border border-border/70 bg-zinc-100 text-zinc-900 shadow-soft dark:bg-zinc-900 dark:text-zinc-50">
        <div className="flex items-center justify-between px-5 pt-5">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            One UI Player
          </p>
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            className="cursor-pointer"
          >
            <MoreHorizontalIcon className="size-4" aria-hidden />
          </Button>
        </div>
        <div className="px-5 pt-4">
          <div className="aspect-square overflow-hidden rounded-[22px] bg-gradient-to-br from-blue-400 via-indigo-500 to-slate-800 shadow-md" />
        </div>
        <div className="space-y-3 px-5 py-5 text-start">
          <div>
            <h1 className="text-lg font-semibold">Galaxy Drift</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Pixel Pulse
            </p>
          </div>
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="cursor-pointer **:data-[slot=slider-range]:bg-blue-500 **:data-[slot=slider-thumb]:border-blue-500 **:data-[slot=slider-thumb]:size-4"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div
            className="flex justify-between text-[11px] tabular-nums text-zinc-500"
            dir="ltr"
          >
            <span>{formatTime(audio.current)}</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
          <div className="flex items-center justify-center gap-5 pt-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => audio.seek(0)}
            >
              <SkipBackIcon className="size-6" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-14 cursor-pointer rounded-full bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => audio.toggle()}
            >
              {audio.playing ? (
                <PauseIcon className="size-6" aria-hidden />
              ) : (
                <PlayIcon className="size-6 ms-0.5" aria-hidden />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => audio.seek(audio.duration)}
            >
              <SkipForwardIcon className="size-6" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
