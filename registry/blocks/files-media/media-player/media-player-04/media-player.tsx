"use client"

import * as React from "react"
import {
  MaximizeIcon,
  PauseIcon,
  PlayIcon,
  RadioIcon,
  SendIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"
import {
  assetSrc,
  formatTime,
  useMediaVideo,
} from "../_lib/use-media-video"

const CHAT = [
  { user: "maya", text: "that lighting is unreal" },
  { user: "jon", text: "what lens is this?" },
  { user: "ops", text: "Welcome! Be kind in chat." },
  { user: "rita", text: "rewinding the landing 🔥" },
  { user: "kai", text: "live edge when?" },
  { user: "sam", text: "DVR is clutch" },
]

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const media = useMediaVideo()
  const [draft, setDraft] = React.useState("")
  const [messages, setMessages] = React.useState(CHAT)
  const nearLive =
    media.duration > 0 && media.duration - media.current < 2.5

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="media-player-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-start">
          <h1
            id="media-player-04-heading"
            className="text-lg font-semibold tracking-tight"
          >
            SonoJS Live · Field stream
          </h1>
          <Badge className="gap-1 bg-red-600 text-white hover:bg-red-600">
            <RadioIcon className="size-3" aria-hidden />
            LIVE
          </Badge>
          <span className="text-sm text-muted-foreground" dir="ltr">
            12.4K watching
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
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
            <div className="space-y-2 border-t border-white/10 bg-zinc-950 px-3 py-3 text-white">
              <Slider
                value={[media.progress]}
                max={100}
                step={0.1}
                className="cursor-pointer"
                aria-label="DVR scrubber"
                onValueChange={(v) =>
                  media.seek(((v[0] ?? 0) / 100) * (media.duration || 0))
                }
              />
              <div className="flex items-center gap-2">
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
                <span className="text-xs tabular-nums text-white/70" dir="ltr">
                  {formatTime(media.current)}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant={nearLive ? "secondary" : "default"}
                  className="ms-auto h-8 cursor-pointer text-xs"
                  disabled={nearLive}
                  onClick={() => media.seek(media.duration)}
                >
                  {nearLive ? "At live edge" : "Go to live"}
                </Button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="cursor-pointer text-white hover:bg-white/15 hover:text-white"
                  onClick={() => media.toggleFullscreen()}
                >
                  <MaximizeIcon className="size-4" aria-hidden />
                </Button>
              </div>
            </div>
          </div>

          <aside className="flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="border-b border-border/70 px-3 py-2.5 text-start text-sm font-semibold">
              Stream chat
            </div>
            <ScrollArea className="flex-1 px-3 py-2">
              <ul className="space-y-2 text-start text-sm">
                {messages.map((m, i) => (
                  <li key={`${m.user}-${i}`}>
                    <span className="font-semibold text-primary">{m.user}</span>
                    <span className="text-muted-foreground">: </span>
                    <span>{m.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <form
              className="flex gap-2 border-t border-border/70 p-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (!draft.trim()) return
                setMessages((prev) => [
                  ...prev,
                  { user: "you", text: draft.trim() },
                ])
                setDraft("")
              }}
            >
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Send a message"
                className="h-10"
              />
              <Button
                type="submit"
                size="icon"
                className="size-10 shrink-0 cursor-pointer"
                aria-label="Send"
              >
                <SendIcon className="size-4" aria-hidden />
              </Button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  )
}
