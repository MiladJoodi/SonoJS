"use client"

import * as React from "react"
import {
  ListMusicIcon,
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
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-border/70 shadow-soft">
        <div
          className="absolute inset-0 bg-gradient-to-b from-rose-500/90 via-fuchsia-700/85 to-zinc-950"
          aria-hidden
        />
        <div className="absolute inset-0 backdrop-blur-3xl" aria-hidden />
        <div className="relative flex flex-col px-6 pb-8 pt-10 text-white">
          <div className="mx-auto size-56 overflow-hidden rounded-[18px] shadow-2xl ring-1 ring-white/20">
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-rose-300 to-violet-700 text-5xl font-semibold">
              AM
            </div>
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-xl font-semibold tracking-tight">
              Blurred Horizons
            </h1>
            <p className="mt-1 text-sm text-white/70">Aria Moon</p>
          </div>
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="mt-6 cursor-pointer **:data-[slot=slider-track]:bg-white/25 **:data-[slot=slider-range]:bg-white **:data-[slot=slider-thumb]:border-white"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div
            className="mt-1 flex justify-between text-[11px] tabular-nums text-white/60"
            dir="ltr"
          >
            <span>{formatTime(audio.current)}</span>
            <span>-{formatTime(Math.max(0, audio.duration - audio.current))}</span>
          </div>
          <div className="mt-5 flex items-center justify-center gap-6">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
              onClick={() => audio.seek(0)}
            >
              <SkipBackIcon className="size-6 fill-current" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-16 cursor-pointer rounded-full bg-white !text-zinc-950 hover:bg-white/90"
              onClick={() => audio.toggle()}
            >
              {audio.playing ? (
                <PauseIcon
                  className="size-7 fill-current !text-zinc-950"
                  aria-hidden
                />
              ) : (
                <PlayIcon
                  className="size-7 fill-current ms-0.5 !text-zinc-950"
                  aria-hidden
                />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
              onClick={() => audio.seek(audio.duration)}
            >
              <SkipForwardIcon className="size-6 fill-current" aria-hidden />
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mx-auto mt-4 cursor-pointer gap-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <ListMusicIcon className="size-4" aria-hidden />
            Playing Next
          </Button>
        </div>
      </div>
    </div>
  )
}
