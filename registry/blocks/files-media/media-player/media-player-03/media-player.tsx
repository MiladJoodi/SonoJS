"use client"

import * as React from "react"
import { MaximizeIcon, PauseIcon, PlayIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
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
  const media = useMediaVideo({ muted: true })
  const [hover, setHover] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-16",
        className
      )}
      aria-labelledby="media-player-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[12px] bg-zinc-950 shadow-soft"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <video
            ref={media.videoRef}
            muted
            playsInline
            preload="metadata"
            className="aspect-video w-full cursor-pointer"
            onClick={() => media.toggle()}
          >
            <source src={assetSrc(flowerMp4)} type="video/mp4" />
          </video>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-end gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-16 transition-opacity",
              hover || !media.playing ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
              aria-label={media.playing ? "Pause" : "Play"}
              onClick={() => media.toggle()}
            >
              {media.playing ? (
                <PauseIcon className="size-4" aria-hidden />
              ) : (
                <PlayIcon className="size-4" aria-hidden />
              )}
            </Button>
            <div className="min-w-0 flex-1 pb-1.5">
              <div className="h-0.5 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full bg-white transition-[width]"
                  style={{ width: `${media.progress}%` }}
                />
              </div>
            </div>
            <span className="pb-0.5 text-[11px] tabular-nums text-white/80" dir="ltr">
              {formatTime(media.current)}
            </span>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
              aria-label="Fullscreen"
              onClick={() => media.toggleFullscreen()}
            >
              <MaximizeIcon className="size-3.5" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="mt-6 max-w-xl text-start">
          <h1
            id="media-player-03-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Quiet frames
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A clean embed player — play, progress, fullscreen. Nothing else on
            the glass.
          </p>
        </div>
      </div>
    </section>
  )
}
