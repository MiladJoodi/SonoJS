"use client"

import * as React from "react"
import {
  HeartIcon,
  MessageCircleIcon,
  PauseIcon,
  PlayIcon,
  Share2Icon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"
import { assetSrc, useMediaVideo } from "../_lib/use-media-video"

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const media = useMediaVideo()
  const [liked, setLiked] = React.useState(false)

  return (
    <section
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="media-player-09-heading"
      {...props}
    >
      <div className="w-full max-w-sm text-center">
        <h1 id="media-player-09-heading" className="sr-only">
          Vertical short
        </h1>
        <div className="relative mx-auto overflow-hidden rounded-[16px] border border-border/70 bg-zinc-950 shadow-soft">
          <video
            ref={media.videoRef}
            muted={media.muted}
            playsInline
            loop
            preload="metadata"
            className="aspect-[9/16] max-h-[min(36rem,78svh)] w-full cursor-pointer object-cover"
            onClick={() => media.toggle()}
          >
            <source src={assetSrc(flowerMp4)} type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent px-3 py-3 text-start">
            <p className="text-xs font-medium text-white/90">@sonojs · Original</p>
          </div>

          <div className="absolute end-3 bottom-28 flex flex-col items-center gap-3">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className={cn(
                "size-11 cursor-pointer rounded-full border-0 bg-black/45 text-white hover:bg-black/60",
                liked && "text-rose-400"
              )}
              aria-label="Like"
              onClick={() => setLiked((v) => !v)}
            >
              <HeartIcon
                className={cn("size-5", liked && "fill-current")}
                aria-hidden
              />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="size-11 cursor-pointer rounded-full border-0 bg-black/45 text-white hover:bg-black/60"
              aria-label="Comment"
            >
              <MessageCircleIcon className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="size-11 cursor-pointer rounded-full border-0 bg-black/45 text-white hover:bg-black/60"
              aria-label="Share"
            >
              <Share2Icon className="size-5" aria-hidden />
            </Button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-5 pt-16 text-start text-white">
            <p className="text-sm font-semibold">Bee cam · 0:42</p>
            <p className="mt-1 text-xs text-white/80">
              Swipe up for next short · tap to{" "}
              {media.playing ? "pause" : "play"}
            </p>
            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full bg-white"
                style={{ width: `${media.progress}%` }}
              />
            </div>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute start-3 top-3 cursor-pointer text-white hover:bg-white/15 hover:text-white"
            aria-label={media.playing ? "Pause" : "Play"}
            onClick={() => media.toggle()}
          >
            {media.playing ? (
              <PauseIcon className="size-5" aria-hidden />
            ) : (
              <PlayIcon className="size-5" aria-hidden />
            )}
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Vertical short — side actions + caption overlay
        </p>
      </div>
    </section>
  )
}
