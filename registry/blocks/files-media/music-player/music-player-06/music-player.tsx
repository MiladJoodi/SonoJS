"use client"

import * as React from "react"
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import demoWav from "./media/demo.wav"
import {
  assetSrc,
  formatTime,
  useBarVisualizer,
  useMusicAudio,
} from "../_lib/use-music-audio"

export default function MusicPlayer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const audio = useMusicAudio()
  const levels = useBarVisualizer(audio.playing, 20)

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-md overflow-hidden rounded-[12px] border border-fuchsia-500/30 bg-zinc-950 text-white shadow-[0_0_40px_-8px_rgba(232,121,249,0.45)]">
        <div className="border-b border-fuchsia-500/20 bg-gradient-to-r from-fuchsia-600/20 via-cyan-500/10 to-transparent px-5 py-4 text-start">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-fuchsia-300 uppercase">
            Neon EQ
          </p>
          <h1 className="mt-1 text-lg font-semibold">Voltage Bloom</h1>
          <p className="text-sm text-white/50">Cyber Orchid</p>
        </div>

        <div className="flex h-28 items-end justify-center gap-1.5 px-6 py-4">
          {levels.map((level, i) => (
            <span
              key={i}
              className="w-2.5 rounded-full bg-gradient-to-t from-cyan-400 via-fuchsia-500 to-yellow-300 shadow-[0_0_12px_rgba(232,121,249,0.8)] transition-[height] duration-75"
              style={{ height: `${Math.max(12, level * 100)}%` }}
            />
          ))}
        </div>

        <div className="space-y-3 px-5 pb-5">
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="cursor-pointer **:data-[slot=slider-range]:bg-fuchsia-400 **:data-[slot=slider-thumb]:border-fuchsia-400"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div
            className="flex justify-between text-[11px] tabular-nums text-white/45"
            dir="ltr"
          >
            <span>{formatTime(audio.current)}</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer text-fuchsia-200 hover:bg-fuchsia-500/20 hover:text-white"
              onClick={() => audio.seek(0)}
            >
              <SkipBackIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-12 cursor-pointer rounded-full bg-fuchsia-500 text-white shadow-[0_0_24px_rgba(232,121,249,0.7)] hover:bg-fuchsia-400"
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
              className="cursor-pointer text-fuchsia-200 hover:bg-fuchsia-500/20 hover:text-white"
              onClick={() => audio.seek(audio.duration)}
            >
              <SkipForwardIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="cursor-pointer text-cyan-300 hover:bg-cyan-500/20 hover:text-white"
              onClick={() => audio.toggleMute()}
            >
              <Volume2Icon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
