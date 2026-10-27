"use client"

import * as React from "react"
import { PlayIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import flowerMp4 from "./media/flower.mp4"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function MediaPlayer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [error, setError] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-12 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="media-player-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-xl text-start">
          <p className="text-sm font-medium text-primary">Field notes / Film</p>
          <h1
            id="media-player-01-heading"
            className="mt-3 text-h1 font-semibold tracking-tight text-foreground"
          >
            A closer look.
          </h1>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-[12px] border border-border/70 bg-zinc-950 shadow-soft">
              <video
                ref={videoRef}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label="A bee visits flowers in a garden. Silent nature film."
                className="aspect-video w-full bg-zinc-950"
                onError={() => setError(true)}
              >
                <source src={assetSrc(flowerMp4)} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              Silent nature study. Sample film from{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video"
                className="text-primary underline underline-offset-4"
                rel="noreferrer"
                target="_blank"
              >
                MDN Web Docs
              </a>
              .
            </figcaption>
            {error ? (
              <p role="alert" className="mt-3 text-sm text-destructive">
                The film couldn&apos;t load. Check your connection and try
                again.
              </p>
            ) : null}
          </figure>

          <div className="text-start">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Small moments, carefully observed.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              A short study of movement and color in a garden. Step away from
              the pace of the day and take a closer look at the details.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-5 border-y border-border/70 py-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Collection</dt>
                <dd className="mt-2 font-medium text-foreground">
                  The natural world
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Format</dt>
                <dd className="mt-2 font-medium text-foreground">
                  Short film · Silent
                </dd>
              </div>
            </dl>
            <Button
              type="button"
              className="mt-7"
              onClick={() => {
                const el = videoRef.current
                if (!el) return
                el.focus()
                el.play().catch(() => setError(true))
              }}
            >
              <PlayIcon className="size-4" aria-hidden />
              Watch the film
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
