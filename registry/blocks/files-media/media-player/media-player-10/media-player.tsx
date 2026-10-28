"use client"

import * as React from "react"
import {
  Maximize2Icon,
  Minimize2Icon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"
import {
  assetSrc,
  formatTime,
  useMediaVideo,
} from "../_lib/use-media-video"

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const media = useMediaVideo()
  const [open, setOpen] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  return (
    <section
      className={cn(
        "relative min-h-[28rem] w-full bg-white py-10 text-foreground dark:bg-background sm:min-h-[32rem] sm:py-14",
        className
      )}
      aria-labelledby="media-player-10-heading"
      {...props}
    >
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <h1
          id="media-player-10-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Mini dock player
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          PiP-style floating card — closed by default. Open, scrub, expand.
        </p>
        <Button
          type="button"
          className="mt-6 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Open mini player
        </Button>
      </div>

      {open ? (
        <div
          className={cn(
            "fixed z-50 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
            "end-4 bottom-4 sm:end-6 sm:bottom-6",
            expanded ? "w-[min(100%-2rem,28rem)]" : "w-[min(100%-2rem,20rem)]"
          )}
        >
          <div className="relative bg-zinc-950">
            <video
              ref={media.videoRef}
              muted={media.muted}
              playsInline
              preload="metadata"
              className={cn(
                "w-full cursor-pointer object-cover",
                expanded ? "aspect-video" : "aspect-video max-h-36"
              )}
              onClick={() => media.toggle()}
            >
              <source src={assetSrc(flowerMp4)} type="video/mp4" />
            </video>
            <div className="absolute end-2 top-2 flex gap-1">
              <Button
                type="button"
                size="icon-xs"
                variant="secondary"
                className="size-7 cursor-pointer"
                aria-label={expanded ? "Collapse" : "Expand"}
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? (
                  <Minimize2Icon className="size-3.5" aria-hidden />
                ) : (
                  <Maximize2Icon className="size-3.5" aria-hidden />
                )}
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="secondary"
                className="size-7 cursor-pointer"
                aria-label="Close"
                onClick={() => {
                  media.pause()
                  setOpen(false)
                }}
              >
                <XIcon className="size-3.5" aria-hidden />
              </Button>
            </div>
          </div>

          <div className="space-y-2 border-t border-border/70 px-3 py-2.5">
            <p className="truncate text-start text-xs font-medium">
              Field notes · Now playing
            </p>
            <Slider
              value={[media.progress]}
              max={100}
              step={0.1}
              className="cursor-pointer"
              onValueChange={(v) =>
                media.seek(((v[0] ?? 0) / 100) * (media.duration || 0))
              }
            />
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                aria-label="Previous"
                onClick={() => media.seek(0)}
              >
                <SkipBackIcon className="size-3.5" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                aria-label={media.playing ? "Pause" : "Play"}
                onClick={() => media.toggle()}
              >
                {media.playing ? (
                  <PauseIcon className="size-4" aria-hidden />
                ) : (
                  <PlayIcon className="size-4" aria-hidden />
                )}
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                aria-label="Next"
                onClick={() => media.seek(media.duration)}
              >
                <SkipForwardIcon className="size-3.5" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer"
                onClick={() => media.toggleMute()}
              >
                {media.muted ? (
                  <VolumeXIcon className="size-3.5" aria-hidden />
                ) : (
                  <Volume2Icon className="size-3.5" aria-hidden />
                )}
              </Button>
              <span
                className="ms-auto text-[10px] tabular-nums text-muted-foreground"
                dir="ltr"
              >
                {formatTime(media.current)}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
