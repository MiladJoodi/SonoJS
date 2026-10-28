"use client"

import * as React from "react"
import {
  MaximizeIcon,
  PauseIcon,
  PlayIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Progress } from "@sonojs/ui/components/progress"
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
  const [countdown, setCountdown] = React.useState<number | null>(null)
  const [cancelled, setCancelled] = React.useState(false)

  React.useEffect(() => {
    if (!media.ended || cancelled) return
    setCountdown(8)
  }, [media.ended, cancelled])

  React.useEffect(() => {
    if (countdown === null) return
    if (countdown <= 0) {
      media.seek(0)
      void media.play()
      setCountdown(null)
      setCancelled(false)
      return
    }
    const t = window.setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000)
    return () => window.clearTimeout(t)
  }, [countdown, media])

  const showUpNext = countdown !== null

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="media-player-05-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="mb-3 flex items-end justify-between gap-3 text-start">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Streaming · Season 2
            </p>
            <h1
              id="media-player-05-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Episode 5 — Petal hour
            </h1>
          </div>
          <p className="text-sm text-muted-foreground" dir="ltr">
            {formatTime(media.current)} / {formatTime(media.duration)}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[12px] bg-black shadow-soft">
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

          {showUpNext ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6">
              <div className="w-full max-w-sm rounded-[12px] border border-white/15 bg-zinc-900 p-5 text-start text-white shadow-soft">
                <p className="text-xs text-white/60">Up next in {countdown}s</p>
                <h2 className="mt-1 text-lg font-semibold">
                  E6 — Night garden
                </h2>
                <Progress
                  value={((8 - (countdown ?? 0)) / 8) * 100}
                  className="mt-4 h-1.5"
                />
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer flex-1"
                    onClick={() => {
                      setCountdown(null)
                      media.seek(0)
                      void media.play()
                    }}
                  >
                    Play now
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer border-white/20 bg-transparent text-white hover:bg-white/10"
                    onClick={() => {
                      setCancelled(true)
                      setCountdown(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-16">
            <Slider
              value={[media.progress]}
              max={100}
              step={0.1}
              className="mb-3 cursor-pointer"
              onValueChange={(v) =>
                media.seek(((v[0] ?? 0) / 100) * (media.duration || 0))
              }
            />
            <div className="flex items-center gap-2 text-white">
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
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
                className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                onClick={() => media.toggleMute()}
              >
                {media.muted ? (
                  <VolumeXIcon className="size-4" aria-hidden />
                ) : (
                  <Volume2Icon className="size-4" aria-hidden />
                )}
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="ms-auto cursor-pointer text-white hover:bg-white/15 hover:text-white"
                onClick={() => media.toggleFullscreen()}
              >
                <MaximizeIcon className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
