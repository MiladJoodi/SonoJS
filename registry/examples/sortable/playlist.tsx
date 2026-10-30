"use client"

import { useState } from "react"
import {
  GripVerticalIcon,
  ListMusicIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"
import { cn } from "@sonojs/ui/lib/utils"

import blueMonday from "./images/playlist/blue-monday.webp"
import digitalLove from "./images/playlist/digital-love.webp"
import midnightCity from "./images/playlist/midnight-city.webp"
import starlight from "./images/playlist/starlight.webp"
import takeOnMe from "./images/playlist/take-on-me.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

interface PlaylistTrack {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  plays: string
  active?: boolean
  cover: string | { src: string }
}

const defaultTracks: PlaylistTrack[] = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    plays: "1.2B",
    active: true,
    cover: midnightCity,
  },
  {
    id: "2",
    title: "Digital Love",
    artist: "Daft Punk",
    album: "Discovery",
    duration: "4:58",
    plays: "845M",
    cover: digitalLove,
  },
  {
    id: "3",
    title: "Starlight",
    artist: "Muse",
    album: "Black Holes",
    duration: "3:59",
    plays: "720M",
    cover: starlight,
  },
  {
    id: "4",
    title: "Take On Me",
    artist: "a-ha",
    album: "Hunting High and Low",
    duration: "3:48",
    plays: "1.8B",
    cover: takeOnMe,
  },
  {
    id: "5",
    title: "Blue Monday",
    artist: "New Order",
    album: "Power, Corruption",
    duration: "7:29",
    plays: "530M",
    cover: blueMonday,
  },
]

export function SortablePlaylist() {
  const [tracks, setTracks] = useState<PlaylistTrack[]>(defaultTracks)
  const active = tracks.find((t) => t.active)

  return (
    <div className="mx-auto w-full max-w-md px-1 py-2 sm:p-4">
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card">
        <div className="border-b border-border/60 bg-gradient-to-br from-primary/15 via-card to-card px-3 py-3 sm:px-4 sm:py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 text-start">
              <div className="mb-1 flex items-center gap-1.5 text-primary">
                <ListMusicIcon className="size-3.5 shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Up next
                </span>
              </div>
              <p className="truncate text-sm font-semibold tracking-tight">
                {active?.title ?? "Queue"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {active
                  ? `${active.artist} · ${tracks.length} in queue`
                  : `${tracks.length} tracks`}
              </p>
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-10">
              <PauseIcon className="size-4 fill-current" />
            </div>
          </div>
          {active ? (
            <div
              className="mt-3 flex h-1 overflow-hidden rounded-full bg-primary/15"
              dir="ltr"
            >
              <div className="w-[38%] rounded-full bg-primary" />
            </div>
          ) : null}
        </div>

        <Sortable
          value={tracks}
          onValueChange={setTracks}
          getItemValue={(item) => item.id}
          strategy="vertical"
          className="p-1.5"
        >
          {tracks.map((track, index) => (
            <SortableItem key={track.id} value={track.id}>
              <div
                className={cn(
                  "group flex items-center gap-1.5 rounded-lg px-1 py-2 transition-colors hover:bg-accent/60 sm:gap-2.5 sm:px-2",
                  track.active && "bg-primary/8 hover:bg-primary/12"
                )}
              >
                <SortableItemHandle className="cursor-grab! flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground">
                  <GripVerticalIcon className="size-4" />
                </SortableItemHandle>

                <span className="hidden w-4 shrink-0 text-center font-mono text-[10px] tabular-nums text-muted-foreground sm:inline">
                  {track.active ? (
                    <span className="mx-auto flex h-3 items-end justify-center gap-0.5">
                      <span className="h-2 w-0.5 animate-pulse rounded-full bg-primary" />
                      <span className="h-3 w-0.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
                      <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
                    </span>
                  ) : (
                    index + 1
                  )}
                </span>

                <div className="relative size-8 shrink-0 overflow-hidden rounded-md bg-muted sm:size-9">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetSrc(track.cover)}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {!track.active ? (
                    <span className="absolute inset-0 hidden items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                      <PlayIcon className="size-3 fill-white text-white" />
                    </span>
                  ) : null}
                </div>

                <div className="min-w-0 flex-1 text-start">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      track.active && "text-primary"
                    )}
                  >
                    {track.title}
                    {track.active ? (
                      <span className="ms-1.5 inline text-[10px] font-semibold uppercase tracking-wide text-primary sm:hidden">
                        · Live
                      </span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {track.artist}
                  </p>
                </div>

                {track.active ? (
                  <Badge
                    variant="default"
                    className="hidden border-transparent bg-primary/15 text-primary sm:inline-flex"
                  >
                    Playing
                  </Badge>
                ) : (
                  <span className="hidden font-mono text-[11px] tabular-nums text-muted-foreground md:inline">
                    {track.plays}
                  </span>
                )}
                <span className="w-8 shrink-0 text-end font-mono text-[11px] tabular-nums text-muted-foreground sm:w-9">
                  {track.duration}
                </span>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    </div>
  )
}
