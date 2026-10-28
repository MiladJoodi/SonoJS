"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"
import {
  assetSrc,
  formatTime,
  useMediaVideo,
} from "../_lib/use-media-video"

const LESSONS = [
  { id: "l1", title: "1. Welcome & setup", progress: 100 },
  { id: "l2", title: "2. Framing the subject", progress: 100 },
  { id: "l3", title: "3. Macro focus tricks", progress: 45 },
  { id: "l4", title: "4. Color in the field", progress: 0 },
  { id: "l5", title: "5. Export checklist", progress: 0 },
]

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const media = useMediaVideo()
  const [active, setActive] = React.useState("l3")
  const idx = LESSONS.findIndex((l) => l.id === active)
  const lesson = LESSONS[idx] ?? LESSONS[0]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="media-player-07-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="mb-4 text-start">
          <p className="text-xs font-medium text-muted-foreground">
            Course · Macro storytelling
          </p>
          <h1
            id="media-player-07-heading"
            className="text-lg font-semibold tracking-tight"
          >
            {lesson?.title}
          </h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_17rem]">
          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-zinc-950 shadow-soft">
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
            <div className="space-y-2 border-t border-white/10 px-3 py-3 text-white">
              <Slider
                value={[media.progress]}
                max={100}
                step={0.1}
                className="cursor-pointer"
                onValueChange={(v) =>
                  media.seek(((v[0] ?? 0) / 100) * (media.duration || 0))
                }
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer gap-1 text-white hover:bg-white/15 hover:text-white"
                  disabled={idx <= 0}
                  onClick={() => setActive(LESSONS[idx - 1]!.id)}
                >
                  <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                  Prev
                </Button>
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
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer gap-1 text-white hover:bg-white/15 hover:text-white"
                  disabled={idx >= LESSONS.length - 1}
                  onClick={() => setActive(LESSONS[idx + 1]!.id)}
                >
                  Next
                  <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
                <span className="text-xs tabular-nums text-white/70" dir="ltr">
                  {formatTime(media.current)} / {formatTime(media.duration)}
                </span>
                <Select
                  value={String(media.rate)}
                  onValueChange={(v) => media.setRate(Number(v))}
                >
                  <SelectTrigger className="ms-auto h-8 w-[5.5rem] cursor-pointer border-white/20 bg-transparent text-xs text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["0.75", "1", "1.25", "1.5", "2"].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}× speed
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <aside className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="border-b border-border/70 px-3 py-2.5 text-start text-sm font-semibold">
              Lessons
            </div>
            <ul className="p-2">
              {LESSONS.map((l) => {
                const activeRow = l.id === active
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-2 rounded-md px-2 py-2 text-start text-sm transition-colors",
                        activeRow
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/60"
                      )}
                      onClick={() => {
                        setActive(l.id)
                        media.seek(0)
                      }}
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border/70 text-[10px]">
                        {l.progress === 100 ? (
                          <CheckIcon className="size-3" aria-hidden />
                        ) : (
                          Math.round(l.progress / 20) || "·"
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium leading-snug">
                          {l.title}
                        </span>
                        <Badge variant="secondary" className="mt-1 text-[10px]">
                          {l.progress}%
                        </Badge>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
