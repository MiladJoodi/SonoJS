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
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="flex w-full max-w-md items-center gap-3 rounded-[12px] border border-border/70 bg-card px-4 py-3 shadow-soft">
        <Button
          type="button"
          size="icon"
          className="size-11 shrink-0 cursor-pointer rounded-full"
          aria-label={audio.playing ? "Pause" : "Play"}
          onClick={() => audio.toggle()}
        >
          {audio.playing ? (
            <PauseIcon className="size-4" aria-hidden />
          ) : (
            <PlayIcon className="size-4 ms-0.5" aria-hidden />
          )}
        </Button>
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate text-sm font-semibold">Midnight Drive</p>
          <p className="truncate text-xs text-muted-foreground">Nova Lane</p>
          <div className="mt-2 flex items-center gap-2">
            <Slider
              value={[audio.progress]}
              max={100}
              step={0.1}
              className="flex-1 cursor-pointer"
              aria-label="Seek"
              onValueChange={(v) =>
                audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
              }
            />
            <span
              className="shrink-0 text-[10px] tabular-nums text-muted-foreground"
              dir="ltr"
            >
              {formatTime(audio.current)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
