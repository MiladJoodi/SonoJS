"use client"

import * as React from "react"
import { PauseIcon, PlayIcon } from "lucide-react"

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
      <div className="relative w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 shadow-soft">
        <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-900 via-red-950 to-amber-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6">
            <div className="w-full text-start text-white">
              <p className="text-xs font-medium tracking-wide text-white/60 uppercase">
                Now playing
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Velvet Frequency
              </h1>
              <p className="mt-1 text-sm text-white/70">Cassian Vale</p>
              <Slider
                value={[audio.progress]}
                max={100}
                step={0.1}
                className="mt-5 cursor-pointer **:data-[slot=slider-track]:bg-white/25 **:data-[slot=slider-range]:bg-white"
                onValueChange={(v) =>
                  audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
                }
              />
              <div
                className="mt-1 flex justify-between text-[11px] tabular-nums text-white/55"
                dir="ltr"
              >
                <span>{formatTime(audio.current)}</span>
                <span>{formatTime(audio.duration)}</span>
              </div>
              <Button
                type="button"
                size="lg"
                className="mt-4 w-full cursor-pointer gap-2 rounded-full bg-white !text-zinc-950 hover:bg-white/90"
                onClick={() => audio.toggle()}
              >
                {audio.playing ? (
                  <>
                    <PauseIcon
                      className="size-5 !text-zinc-950"
                      aria-hidden
                    />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayIcon
                      className="size-5 !text-zinc-950"
                      aria-hidden
                    />
                    Play
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
