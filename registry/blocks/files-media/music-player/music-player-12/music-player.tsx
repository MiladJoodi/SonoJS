"use client"

import * as React from "react"
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import demoWav from "./media/demo.wav"
import {
  assetSrc,
  formatTime,
  useMusicAudio,
  type Track,
} from "../_lib/use-music-audio"

const QUEUE: Track[] = [
  {
    id: "1",
    title: "Queue Starter",
    artist: "Mono Rail",
    durationHint: "3:12",
  },
  {
    id: "2",
    title: "Late Checkout",
    artist: "Suite 9",
    durationHint: "2:48",
  },
  {
    id: "3",
    title: "Glass Elevator",
    artist: "North Wing",
    durationHint: "4:01",
  },
  {
    id: "4",
    title: "Rooftop Static",
    artist: "AM Broadcast",
    durationHint: "3:33",
  },
]

export default function MusicPlayer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const audio = useMusicAudio()
  const [activeId, setActiveId] = React.useState(QUEUE[0]!.id)
  const active = QUEUE.find((t) => t.id === activeId) ?? QUEUE[0]!

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <audio ref={audio.audioRef} src={assetSrc(demoWav)} preload="metadata" />
      <div className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-4">
          <div className="size-14 shrink-0 rounded-md bg-gradient-to-br from-lime-400 to-emerald-700" />
          <div className="min-w-0 flex-1 text-start">
            <Badge variant="secondary" className="mb-1">
              Playing
            </Badge>
            <p className="truncate text-sm font-semibold">{active.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {active.artist}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="cursor-pointer"
              onClick={() => {
                const i = QUEUE.findIndex((t) => t.id === activeId)
                setActiveId(QUEUE[Math.max(0, i - 1)]!.id)
                audio.seek(0)
              }}
            >
              <SkipBackIcon className="size-4" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-10 cursor-pointer rounded-full"
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
              onClick={() => {
                const i = QUEUE.findIndex((t) => t.id === activeId)
                setActiveId(QUEUE[Math.min(QUEUE.length - 1, i + 1)]!.id)
                audio.seek(0)
              }}
            >
              <SkipForwardIcon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
        <div className="px-4 py-3">
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
        <Separator />
        <div className="px-2 py-2">
          <p className="px-2 py-1.5 text-start text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Up next
          </p>
          <ul>
            {QUEUE.map((track) => {
              const isActive = track.id === activeId
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 text-start text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/60"
                    )}
                    onClick={() => {
                      setActiveId(track.id)
                      audio.seek(0)
                      void audio.play()
                    }}
                  >
                    <span className="size-9 shrink-0 rounded bg-muted" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">
                        {track.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {track.artist}
                      </span>
                    </span>
                    <span
                      className="text-xs tabular-nums text-muted-foreground"
                      dir="ltr"
                    >
                      {track.durationHint}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
