"use client"

import * as React from "react"
import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
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
  const [liked, setLiked] = React.useState(true)

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-md overflow-hidden rounded-[12px] border border-white/10 bg-[#121212] text-white shadow-soft">
        <div className="bg-gradient-to-b from-emerald-900/80 to-[#121212] px-6 pb-6 pt-8">
          <div className="mx-auto aspect-square w-full max-w-[16rem] overflow-hidden rounded-md bg-gradient-to-br from-emerald-400 to-teal-800 shadow-lg">
            <div className="flex size-full items-center justify-center text-6xl font-bold text-black/30">
              SD
            </div>
          </div>
          <div className="mt-6 flex items-start justify-between gap-3 text-start">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold">Greenroom</h1>
              <p className="truncate text-sm text-white/60">Solaris Duo</p>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={cn(
                "cursor-pointer text-white hover:bg-white/10 hover:text-white",
                liked && "text-emerald-400 hover:text-emerald-300"
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
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="mt-4 cursor-pointer **:data-[slot=slider-range]:bg-emerald-500 **:data-[slot=slider-thumb]:border-emerald-500"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div
            className="mt-1 flex justify-between text-[11px] tabular-nums text-white/50"
            dir="ltr"
          >
            <span>{formatTime(audio.current)}</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between px-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={cn(
                "cursor-pointer text-white/70 hover:bg-white/10 hover:text-white",
                audio.shuffle && "text-emerald-400"
              )}
              onClick={() => audio.setShuffle((s) => !s)}
            >
              <ShuffleIcon className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer text-white hover:bg-white/10 hover:text-white"
              onClick={() => audio.seek(0)}
            >
              <SkipBackIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-14 cursor-pointer rounded-full bg-white !text-zinc-950 hover:bg-white/90"
              onClick={() => audio.toggle()}
            >
              {audio.playing ? (
                <PauseIcon
                  className="size-6 fill-current !text-zinc-950"
                  aria-hidden
                />
              ) : (
                <PlayIcon
                  className="size-6 fill-current ms-0.5 !text-zinc-950"
                  aria-hidden
                />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer text-white hover:bg-white/10 hover:text-white"
              onClick={() => audio.seek(audio.duration)}
            >
              <SkipForwardIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={cn(
                "cursor-pointer text-white/70 hover:bg-white/10 hover:text-white",
                audio.repeat !== "off" && "text-emerald-400"
              )}
              onClick={() =>
                audio.setRepeat((r) =>
                  r === "off" ? "all" : r === "all" ? "one" : "off"
                )
              }
            >
              <RepeatIcon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
