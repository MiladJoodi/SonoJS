"use client"

import * as React from "react"
import {
  CheckIcon,
  LinkIcon,
  PauseIcon,
  PlayIcon,
  Share2Icon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"
import {
  assetSrc,
  formatTime,
  useMediaVideo,
} from "../_lib/use-media-video"

const CHAPTERS = [
  { t: 0, label: "Intro" },
  { t: 10, label: "Approach" },
  { t: 20, label: "Detail" },
  { t: 30, label: "Wrap" },
]

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const media = useMediaVideo()
  const [copied, setCopied] = React.useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://sonojs.dev/share/demo-field-notes"
      )
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <section
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="media-player-08-heading"
      {...props}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="relative bg-zinc-950">
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
            className="absolute inset-0 flex cursor-pointer items-center justify-center"
            aria-label={media.playing ? "Pause" : "Play"}
            onClick={() => media.toggle()}
          >
            {!media.playing ? (
              <span className="flex size-12 items-center justify-center rounded-full bg-black/60 text-white">
                <PlayIcon className="size-5 ms-0.5" aria-hidden />
              </span>
            ) : null}
          </button>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
            <div
              className="h-full bg-primary transition-[width]"
              style={{ width: `${media.progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 px-5 py-5 text-start">
          <div>
            <h1
              id="media-player-08-heading"
              className="text-base font-semibold tracking-tight"
            >
              Product walkthrough · Field camera
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Shareable demo embed with chapter chips.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.t}
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  media.seek(ch.t)
                  void media.play()
                }}
              >
                <Badge variant="secondary" className="gap-1">
                  <span dir="ltr">{formatTime(ch.t)}</span>
                  {ch.label}
                </Badge>
              </button>
            ))}
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer gap-1.5"
              onClick={() => void copyLink()}
            >
              {copied ? (
                <CheckIcon className="size-3.5" aria-hidden />
              ) : (
                <LinkIcon className="size-3.5" aria-hidden />
              )}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer gap-1.5"
            >
              <Share2Icon className="size-3.5" aria-hidden />
              Share
            </Button>
            <Button
              type="button"
              size="sm"
              className="ms-auto cursor-pointer gap-1.5"
              onClick={() => {
                media.seek(0)
                void media.play()
              }}
            >
              {media.playing ? (
                <PauseIcon className="size-3.5" aria-hidden />
              ) : (
                <PlayIcon className="size-3.5" aria-hidden />
              )}
              Watch again
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
