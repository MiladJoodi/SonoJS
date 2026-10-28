"use client"

import * as React from "react"
import {
  CaptionsIcon,
  MaximizeIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  SettingsIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
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
  const [quality, setQuality] = React.useState("1080p")
  const hideTimer = React.useRef<number | null>(null)

  const bumpChrome = React.useCallback(() => {
    setChrome(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    if (media.playing) {
      hideTimer.current = window.setTimeout(() => setChrome(false), 2800)
    }
  }, [media.playing])

  React.useEffect(() => {
    if (!media.playing) setChrome(true)
    else bumpChrome()
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
    }
  }, [media.playing, bumpChrome])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === " " || e.key === "k") {
        e.preventDefault()
        media.toggle()
      } else if (e.key === "ArrowLeft") media.skip(-10)
      else if (e.key === "ArrowRight") media.skip(10)
      else if (e.key === "m") media.toggleMute()
      else if (e.key === "f") media.toggleFullscreen()
      else if (e.key === "c") media.setShowCc((v) => !v)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [media])

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="media-player-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="mb-4 text-start">
          <div className="flex flex-wrap items-center gap-2">
            <h1
              id="media-player-01-heading"
              className="text-lg font-semibold tracking-tight sm:text-xl"
            >
              Field notes: pollinators up close
            </h1>
            <Badge variant="secondary">HD</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            SonoJS Labs · 1.2M views · Feature-dense watch controls
          </p>
        </div>

        <div
          className="group relative overflow-hidden rounded-[12px] border border-border/70 bg-zinc-950 shadow-soft"
          onMouseMove={bumpChrome}
          onMouseLeave={() => media.playing && setChrome(false)}
        >
          <video
            ref={media.videoRef}
            muted={media.muted}
            playsInline
            preload="metadata"
            className="aspect-video w-full cursor-pointer bg-zinc-950"
            onClick={() => media.toggle()}
            aria-label="Nature film"
          >
            <source src={assetSrc(flowerMp4)} type="video/mp4" />
          </video>

          {media.showCc ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-4">
              <p className="rounded bg-black/75 px-3 py-1 text-center text-sm text-white">
                A bee visits wildflowers in late spring light.
              </p>
            </div>
          ) : null}

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 pt-16 transition-opacity",
              chrome ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <Slider
              value={[media.progress]}
              max={100}
              step={0.1}
              className="mb-3 cursor-pointer"
              aria-label="Seek"
              onValueChange={(v) => {
                const pct = v[0] ?? 0
                media.seek((pct / 100) * (media.duration || 0))
              }}
            />
            <div className="flex items-center gap-1.5 text-white">
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
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                aria-label="Back 10 seconds"
                onClick={() => media.skip(-10)}
              >
                <RotateCcwIcon className="size-3.5" aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                aria-label="Forward 10 seconds"
                onClick={() => media.skip(10)}
              >
                <RotateCcwIcon className="size-3.5 scale-x-[-1]" aria-hidden />
              </Button>
              <span className="ms-1 text-xs tabular-nums" dir="ltr">
                {formatTime(media.current)} / {formatTime(media.duration)}
              </span>
              <div className="ms-2 flex items-center gap-1">
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                  aria-label={media.muted ? "Unmute" : "Mute"}
                  onClick={() => media.toggleMute()}
                >
                  {media.muted || media.volume === 0 ? (
                    <VolumeXIcon className="size-4" aria-hidden />
                  ) : (
                    <Volume2Icon className="size-4" aria-hidden />
                  )}
                </Button>
                <Slider
                  value={[media.muted ? 0 : media.volume * 100]}
                  max={100}
                  step={1}
                  className="w-20 cursor-pointer"
                  aria-label="Volume"
                  onValueChange={(v) =>
                    media.setVolumeLevel((v[0] ?? 0) / 100)
                  }
                />
              </div>
              <div className="ms-auto flex items-center gap-1">
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className={cn(
                    "cursor-pointer text-white hover:bg-white/15 hover:text-white",
                    media.showCc && "bg-white/20"
                  )}
                  aria-label="Captions"
                  aria-pressed={media.showCc}
                  onClick={() => media.setShowCc((v) => !v)}
                >
                  <CaptionsIcon className="size-4" aria-hidden />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="ghost"
                      className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                      aria-label="Settings"
                    >
                      <SettingsIcon className="size-4" aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>Playback speed</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={String(media.rate)}
                      onValueChange={(v) => media.setRate(Number(v))}
                    >
                      {["0.75", "1", "1.25", "1.5", "2"].map((r) => (
                        <DropdownMenuRadioItem key={r} value={r}>
                          {r}×
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Quality</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={quality}
                      onValueChange={setQuality}
                    >
                      {["Auto", "1080p", "720p", "480p"].map((q) => (
                        <DropdownMenuRadioItem key={q} value={q}>
                          {q}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                  aria-label="Fullscreen"
                  onClick={() => media.toggleFullscreen()}
                >
                  <MaximizeIcon className="size-4" aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {media.error ? (
          <p role="alert" className="mt-3 text-sm text-destructive">
            Video couldn&apos;t load.
          </p>
        ) : null}
      </div>
    </section>
  )
}
