"use client"

import * as React from "react"

export function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const s = Math.floor(seconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, "0")}`
}

export type Track = {
  id: string
  title: string
  artist: string
  album?: string
  cover?: string
  durationHint?: string
}

export function useMusicAudio() {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = React.useState(false)
  const [current, setCurrent] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [muted, setMuted] = React.useState(false)
  const [volume, setVolume] = React.useState(0.85)
  const [ended, setEnded] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [shuffle, setShuffle] = React.useState(false)
  const [repeat, setRepeat] = React.useState<"off" | "one" | "all">("off")

  const sync = React.useCallback(() => {
    const a = audioRef.current
    if (!a) return
    setCurrent(a.currentTime)
    setDuration(Number.isFinite(a.duration) ? a.duration : 0)
    setPlaying(!a.paused && !a.ended)
    setEnded(a.ended)
  }, [])

  React.useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.muted = muted
    a.volume = muted ? 0 : volume
  }, [muted, volume])

  React.useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => sync()
    const onMeta = () => sync()
    const onPlay = () => {
      setPlaying(true)
      setEnded(false)
    }
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setEnded(true)
      if (repeat === "one") {
        a.currentTime = 0
        void a.play()
      }
    }
    const onErr = () => setError(true)
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onMeta)
    a.addEventListener("durationchange", onMeta)
    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    a.addEventListener("ended", onEnded)
    a.addEventListener("error", onErr)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onMeta)
      a.removeEventListener("durationchange", onMeta)
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
      a.removeEventListener("ended", onEnded)
      a.removeEventListener("error", onErr)
    }
  }, [sync, repeat])

  const play = React.useCallback(async () => {
    try {
      await audioRef.current?.play()
    } catch {
      /* autoplay */
    }
  }, [])

  const pause = React.useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = React.useCallback(() => {
    if (audioRef.current?.paused) void play()
    else pause()
  }, [play, pause])

  const seek = React.useCallback((time: number) => {
    const a = audioRef.current
    if (!a) return
    const d = Number.isFinite(a.duration) ? a.duration : 0
    a.currentTime = Math.min(Math.max(0, time), d || time)
    setCurrent(a.currentTime)
    setEnded(false)
  }, [])

  const skip = React.useCallback(
    (delta: number) => seek((audioRef.current?.currentTime ?? 0) + delta),
    [seek]
  )

  const toggleMute = React.useCallback(() => {
    setMuted((m) => !m)
  }, [])

  const setVolumeLevel = React.useCallback((level: number) => {
    const next = Math.min(1, Math.max(0, level))
    setVolume(next)
    setMuted(next === 0)
  }, [])

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return {
    audioRef,
    playing,
    current,
    duration,
    progress,
    muted,
    volume,
    ended,
    error,
    shuffle,
    repeat,
    setShuffle,
    setRepeat,
    setError,
    play,
    pause,
    toggle,
    seek,
    skip,
    toggleMute,
    setVolumeLevel,
    formatTime,
  }
}

/** Fake equalizer / SoundCloud bar heights (0–1), animated while playing */
export function useBarVisualizer(playing: boolean, bars = 32) {
  const [levels, setLevels] = React.useState(() =>
    Array.from({ length: bars }, () => 0.2)
  )

  React.useEffect(() => {
    if (!playing) {
      setLevels((prev) => prev.map(() => 0.12))
      return
    }
    const id = window.setInterval(() => {
      setLevels(
        Array.from({ length: bars }, (_, i) => {
          const wave = 0.35 + 0.35 * Math.sin(Date.now() / 180 + i * 0.45)
          const noise = Math.random() * 0.45
          return Math.min(1, Math.max(0.08, wave * 0.6 + noise))
        })
      )
    }, 80)
    return () => window.clearInterval(id)
  }, [playing, bars])

  return levels
}
