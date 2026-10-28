"use client"

import * as React from "react"
import {
  MaximizeIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  Volume2Icon,
  VolumeXIcon,
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
  const [chrome, setChrome] = React.useState(true)
  const [skipIntro, setSkipIntro] = React.useState(true)
  const hideTimer = React.useRef<number | null>(null)

  const showNext = media.ended || media.progress > 92

  const bump = React.useCallback(() => {
    setChrome(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    if (media.playing) {
      hideTimer.current = window.setTimeout(() => setChrome(false), 2200)
    }
  }, [media.playing])

  React.useEffect(() => {
    if (!media.playing) setChrome(true)
  }, [media.playing])

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="media-player-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <p
          id="media-player-02-heading"
          className="mb-3 text-start text-sm text-muted-foreground"
        >
          Immersive cinema · S1 E3 — Garden light
        </p>
        <div
          className="relative overflow-hidden rounded-[12px] bg-black shadow-soft"
          onMouseMove={bump}
        >
          <video
            ref={media.videoRef}
            muted={media.muted}
            playsInline
            preload="metadata"
            className="aspect-video w-full cursor-pointer"
            onClick={() => media.toggle()}
          >
            <source src={assetSrc(flowerMp4)} type="video/mp4" />
          </video>

          <button
            type="button"
            className={cn(
              "absolute inset-0 flex cursor-pointer items-center justify-center transition-opacity",
              media.playing && !chrome ? "opacity-0" : "opacity-100"
            )}
            aria-label={media.playing ? "Pause" : "Play"}
            onClick={() => media.toggle()}
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm sm:size-20">
              {media.playing ? (
                <PauseIcon className="size-8" aria-hidden />
              ) : (
                <PlayIcon className="size-8 ms-1" aria-hidden />
              )}
            </span>
          </button>

          {skipIntro && media.current > 2 && media.current < 12 && !media.ended ? (
            <Button
              type="button"
              variant="secondary"
              className="absolute end-4 bottom-24 cursor-pointer gap-2 border border-white/20 bg-black/70 text-white hover:bg-black/85"
              onClick={() => {
                media.seek(12)
                setSkipIntro(false)
              }}
            >
              Skip intro
              <SkipForwardIcon className="size-4" aria-hidden />
            </Button>
          ) : null}

          {showNext ? (
            <div className="absolute end-4 bottom-24 w-64 overflow-hidden rounded-[12px] border border-white/15 bg-zinc-900/95 p-3 text-start text-white shadow-soft">
              <p className="text-xs text-white/60">Next episode</p>
              <p className="mt-1 text-sm font-semibold">E4 — Morning dew</p>
              <div className="mt-3 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    media.seek(0)
                    void media.play()
                  }}
                >
                  Play next
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10"
                  onClick={() => media.seek(Math.max(0, media.duration - 1))}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 pb-4 pt-20 transition-opacity",
              chrome || !media.playing ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <Slider
              value={[media.progress]}
              max={100}
              step={0.1}
              className="mb-4 h-2 cursor-pointer [&_[data-slot=slider-thumb]]:size-5"
              aria-label="Seek"
              onValueChange={(v) =>
                media.seek(((v[0] ?? 0) / 100) * (media.duration || 0))
              }
            />
            <div className="flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                  onClick={() => media.toggle()}
                >
                  {media.playing ? (
                    <PauseIcon className="size-5" aria-hidden />
                  ) : (
                    <PlayIcon className="size-5" aria-hidden />
                  )}
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                  onClick={() => media.toggleMute()}
                >
                  {media.muted ? (
                    <VolumeXIcon className="size-5" aria-hidden />
                  ) : (
                    <Volume2Icon className="size-5" aria-hidden />
                  )}
                </Button>
                <span className="text-sm tabular-nums" dir="ltr">
                  {formatTime(media.current)} / {formatTime(media.duration)}
                </span>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                aria-label="Fullscreen"
                onClick={() => media.toggleFullscreen()}
              >
                <MaximizeIcon className="size-5" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
