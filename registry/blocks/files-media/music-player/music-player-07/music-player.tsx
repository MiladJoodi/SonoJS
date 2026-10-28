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

const LINES = [
  { t: 0, text: "City lights in the rearview glass" },
  { t: 1.2, text: "We chase the bass until the morning" },
  { t: 2.4, text: "Soft neon on the boulevard" },
  { t: 3.6, text: "Sing it louder — don't stop now" },
  { t: 4.8, text: "Heartbeat sync to the downbeat" },
  { t: 6.0, text: "Hold my hand through the chorus" },
  { t: 7.2, text: "Fade the night into gold" },
]

export default function MusicPlayer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const audio = useMusicAudio()
  const active =
    [...LINES].reverse().find((l) => audio.current >= l.t)?.text ?? LINES[0]!.text

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
          <div className="size-12 shrink-0 rounded-md bg-gradient-to-br from-sky-400 to-indigo-700" />
          <div className="min-w-0 flex-1 text-start">
            <p className="truncate text-sm font-semibold">Lyric Motion</p>
            <p className="truncate text-xs text-muted-foreground">Kite & Ember</p>
          </div>
          <Button
            type="button"
            size="icon"
            className="cursor-pointer rounded-full"
            onClick={() => audio.toggle()}
          >
            {audio.playing ? (
              <PauseIcon className="size-4" aria-hidden />
            ) : (
              <PlayIcon className="size-4 ms-0.5" aria-hidden />
            )}
          </Button>
        </div>

        <div className="relative h-56 overflow-hidden px-6 py-8 text-center">
          <ul className="space-y-3">
            {LINES.map((line) => {
              const isActive = line.text === active
              return (
                <li key={line.t}>
                  <button
                    type="button"
                    className={cn(
                      "w-full cursor-pointer text-sm transition-all duration-300",
                      isActive
                        ? "scale-105 font-semibold text-foreground"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    )}
                    onClick={() => {
                      audio.seek(line.t)
                      void audio.play()
                    }}
                  >
                    {line.text}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="border-t border-border/70 px-4 py-3">
          <Slider
            value={[audio.progress]}
            max={100}
            step={0.1}
            className="cursor-pointer"
            onValueChange={(v) =>
              audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
            }
          />
          <div
            className="mt-1 flex justify-between text-[10px] tabular-nums text-muted-foreground"
            dir="ltr"
          >
            <span>{formatTime(audio.current)}</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
