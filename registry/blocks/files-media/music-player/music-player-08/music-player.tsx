"use client"

import * as React from "react"
import {
  HeartIcon,
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
  const [liked, setLiked] = React.useState(false)

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-sm overflow-hidden rounded-[24px] border border-pink-200/80 bg-gradient-to-b from-pink-50 via-rose-50 to-violet-50 shadow-soft dark:border-pink-500/20 dark:from-pink-950/40 dark:via-rose-950/30 dark:to-violet-950/40">
        <div className="px-6 pt-8 text-center">
          <div className="mx-auto size-40 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-pink-200 dark:border-pink-900 dark:ring-pink-500/30">
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-pink-300 via-rose-400 to-violet-400 text-3xl font-semibold text-white">
              ♡
            </div>
          </div>
          <h1 className="mt-5 text-lg font-semibold tracking-tight text-pink-950 dark:text-pink-50">
            Cotton Candy Sky
          </h1>
          <p className="mt-1 text-sm text-pink-700/70 dark:text-pink-200/70">
            Lila Bloom
          </p>
        </div>
        <div className="space-y-3 px-6 py-6">
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="cursor-pointer **:data-[slot=slider-range]:bg-pink-400 **:data-[slot=slider-thumb]:border-pink-400"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div
            className="flex justify-between text-[11px] tabular-nums text-pink-700/60 dark:text-pink-200/50"
            dir="ltr"
          >
            <span>{formatTime(audio.current)}</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="cursor-pointer text-pink-600 hover:bg-pink-100 hover:text-pink-700 dark:text-pink-300 dark:hover:bg-pink-500/20"
                onClick={() => audio.seek(0)}
              >
                <SkipBackIcon className="size-5" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon"
                className="size-14 cursor-pointer rounded-full bg-pink-400 !text-white hover:bg-pink-500"
                onClick={() => audio.toggle()}
              >
                {audio.playing ? (
                  <PauseIcon className="size-6 !text-white" aria-hidden />
                ) : (
                  <PlayIcon
                    className="size-6 ms-0.5 !text-white"
                    aria-hidden
                  />
                )}
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="cursor-pointer text-pink-600 hover:bg-pink-100 hover:text-pink-700 dark:text-pink-300 dark:hover:bg-pink-500/20"
                onClick={() => audio.seek(audio.duration)}
              >
                <SkipForwardIcon className="size-5" aria-hidden />
              </Button>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={cn(
                "absolute end-0 cursor-pointer text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-500/20",
                liked && "text-rose-500"
              )}
              aria-label="Like"
              onClick={() => setLiked((v) => !v)}
            >
              <HeartIcon
                className={cn("size-5", liked && "fill-current")}
                aria-hidden
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
