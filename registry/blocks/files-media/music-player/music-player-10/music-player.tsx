"use client"

import * as React from "react"
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  XIcon,
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
  const [open, setOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "relative min-h-[22rem] w-full bg-white py-10 text-foreground dark:bg-background sm:min-h-[24rem] sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="mx-auto max-w-md px-4 text-center sm:px-6">
        <h1 className="text-lg font-semibold tracking-tight">Mini dock</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bottom bar player — closed until you start listening.
        </p>
        <Button
          type="button"
          className="mt-6 cursor-pointer"
          onClick={() => {
            setOpen(true)
            void audio.play()
          }}
        >
          Start listening
        </Button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-card/95 px-3 py-2.5 shadow-soft backdrop-blur-md sm:px-6">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="size-11 shrink-0 rounded-md bg-gradient-to-br from-sky-500 to-indigo-700" />
            <div className="min-w-0 flex-1 text-start sm:max-w-[10rem]">
              <p className="truncate text-sm font-semibold">Dockside</p>
              <p className="truncate text-xs text-muted-foreground">
                Lo-Fi Pilot
              </p>
            </div>
            <Slider
              value={[audio.progress]}
              max={100}
              step={0.1}
              className="hidden flex-1 cursor-pointer sm:flex"
              onValueChange={(v) =>
                audio.seek(((v[0] ?? 0) / 100) * (audio.duration || 0))
              }
            />
            <span
              className="hidden text-[10px] tabular-nums text-muted-foreground md:inline"
              dir="ltr"
            >
              {formatTime(audio.current)}
            </span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                onClick={() => audio.seek(0)}
              >
                <SkipBackIcon className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon"
                className="size-9 cursor-pointer rounded-full"
                onClick={() => audio.toggle()}
              >
                {audio.playing ? (
                  <PauseIcon className="size-4" aria-hidden />
                ) : (
                  <PlayIcon className="size-4 ms-px" aria-hidden />
                )}
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                onClick={() => audio.seek(audio.duration)}
              >
                <SkipForwardIcon className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                aria-label="Close"
                onClick={() => {
                  audio.pause()
                  setOpen(false)
                }}
              >
                <XIcon className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
