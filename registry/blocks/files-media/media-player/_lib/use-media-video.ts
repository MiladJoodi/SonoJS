"use client"

import * as React from "react"

export function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const s = Math.floor(seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = s % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`
  }
  return `${m}:${String(r).padStart(2, "0")}`
}

export type UseMediaVideoOptions = {
  /** Start muted (default true for autoplay-friendly demos) */
  muted?: boolean
}

export function useMediaVideo(options: UseMediaVideoOptions = {}) {
  const { muted: initialMuted = true } = options
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(false)
  const [muted, setMuted] = React.useState(initialMuted)
  const [volume, setVolume] = React.useState(initialMuted ? 0 : 0.85)
  const [current, setCurrent] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [ended, setEnded] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [rate, setRate] = React.useState(1)
  const [showCc, setShowCc] = React.useState(false)

  const sync = React.useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setCurrent(v.currentTime)
    setDuration(Number.isFinite(v.duration) ? v.duration : 0)
    setPlaying(!v.paused && !v.ended)
    setEnded(v.ended)
  }, [])

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    v.volume = muted ? 0 : volume
  }, [muted, volume])

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = rate
  }, [rate])

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
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
    }
    const onErr = () => setError(true)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("loadedmetadata", onMeta)
    v.addEventListener("durationchange", onMeta)
    v.addEventListener("play", onPlay)
    v.addEventListener("pause", onPause)
    v.addEventListener("ended", onEnded)
    v.addEventListener("error", onErr)
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("loadedmetadata", onMeta)
      v.removeEventListener("durationchange", onMeta)
      v.removeEventListener("play", onPlay)
      v.removeEventListener("pause", onPause)
      v.removeEventListener("ended", onEnded)
      v.removeEventListener("error", onErr)
    }
  }, [sync])

  const play = React.useCallback(async () => {
    const v = videoRef.current
    if (!v) return
    try {
      await v.play()
    } catch {
      /* autoplay policies */
    }
  }, [])

  const pause = React.useCallback(() => {
    videoRef.current?.pause()
  }, [])

  const toggle = React.useCallback(() => {
    if (videoRef.current?.paused) void play()
    else pause()
  }, [play, pause])

  const seek = React.useCallback((time: number) => {
    const v = videoRef.current
    if (!v) return
    const d = Number.isFinite(v.duration) ? v.duration : 0
    v.currentTime = Math.min(Math.max(0, time), d || time)
    setCurrent(v.currentTime)
    setEnded(false)
  }, [])

  const skip = React.useCallback(
    (delta: number) => {
      seek((videoRef.current?.currentTime ?? 0) + delta)
    },
    [seek]
  )

  const toggleMute = React.useCallback(() => {
    setMuted((m) => {
      if (m) {
        setVolume((vol) => (vol <= 0 ? 0.85 : vol))
        return false
      }
      return true
    })
  }, [])

  const setVolumeLevel = React.useCallback((level: number) => {
    const next = Math.min(1, Math.max(0, level))
    setVolume(next)
    setMuted(next === 0)
  }, [])

  const toggleFullscreen = React.useCallback(() => {
    const el = videoRef.current?.parentElement ?? videoRef.current
    if (!el) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void el.requestFullscreen?.()
    }
  }, [])

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return {
    videoRef,
    playing,
    muted,
    volume,
    current,
    duration,
    progress,
    ended,
    error,
    rate,
    showCc,
    setShowCc,
    setRate,
    setError,
    play,
    pause,
    toggle,
    seek,
    skip,
    toggleMute,
    setVolumeLevel,
    toggleFullscreen,
    formatTime,
  }
}
