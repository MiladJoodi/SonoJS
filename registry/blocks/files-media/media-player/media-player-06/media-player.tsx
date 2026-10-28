"use client"

import * as React from "react"
import {
  InfoIcon,
  PauseIcon,
  PlayIcon,
  UsersIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"
import {
  assetSrc,
  formatTime,
  useMediaVideo,
} from "../_lib/use-media-video"

const CHAPTERS = [
  { t: 0, title: "Opening wide" },
  { t: 8, title: "First landing" },
  { t: 18, title: "Pollen detail" },
  { t: 28, title: "Lift off" },
]

const CAST = [
  { name: "A. Rivera", role: "Cinematography" },
  { name: "M. Chen", role: "Field guide" },
]

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const media = useMediaVideo()
  const [panel, setPanel] = React.useState(true)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="media-player-06-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1
            id="media-player-06-heading"
            className="text-start text-lg font-semibold tracking-tight"
          >
            Info panel player
          </h1>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
            onClick={() => setPanel((p) => !p)}
          >
            <InfoIcon className="size-3.5" aria-hidden />
            {panel ? "Hide info" : "Show info"}
          </Button>
        </div>

        <div
          className={cn(
            "grid gap-4",
            panel ? "lg:grid-cols-[16rem_1fr]" : "grid-cols-1"
          )}
        >
          {panel ? (
            <aside className="order-2 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:order-1">
              <div className="border-b border-border/70 px-4 py-3 text-start">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <UsersIcon className="size-4" aria-hidden />
                  Credits & chapters
                </p>
              </div>
              <div className="space-y-4 px-4 py-4 text-start">
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Cast
                  </p>
                  <ul className="space-y-2">
                    {CAST.map((c) => (
                      <li key={c.name} className="text-sm">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          · {c.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Trivia
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Shot on a macro prime at golden hour. No stock B-roll.
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Chapters
                  </p>
                  <ul className="space-y-1">
                    {CHAPTERS.map((ch) => (
                      <li key={ch.t}>
                        <button
                          type="button"
                          className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-start text-sm hover:bg-muted/60"
                          onClick={() => {
                            media.seek(ch.t)
                            void media.play()
                          }}
                        >
                          <span>{ch.title}</span>
                          <Badge variant="outline" className="font-mono text-[10px]" dir="ltr">
                            {formatTime(ch.t)}
                          </Badge>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          ) : null}

          <div className="order-1 overflow-hidden rounded-[12px] border border-border/70 bg-zinc-950 shadow-soft lg:order-2">
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
            <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5 text-white">
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
              <Slider
                value={[media.progress]}
                max={100}
                step={0.1}
                className="flex-1 cursor-pointer"
                onValueChange={(v) =>
                  media.seek(((v[0] ?? 0) / 100) * (media.duration || 0))
                }
              />
              <span className="text-xs tabular-nums text-white/70" dir="ltr">
                {formatTime(media.current)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
