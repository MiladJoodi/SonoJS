"use client"

import * as React from "react"
import { MicIcon, MicOffIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

export type VoiceAiOrbState = "listening" | "reasoning" | "speaking"

export type VoiceAiOrbProps = React.ComponentProps<"div"> & {
  state?: VoiceAiOrbState
  defaultState?: VoiceAiOrbState
  onStateChange?: (state: VoiceAiOrbState) => void
  muted?: boolean
  defaultMuted?: boolean
  onMutedChange?: (muted: boolean) => void
  transcript?: string
  /** Show Listen / Reason / Speak / mute controls. Default true. */
  showControls?: boolean
}

const STATE_CONFIG: Record<
  VoiceAiOrbState,
  {
    color: string
    glow: string
    label: string
    badge: string
  }
> = {
  listening: {
    color: "#7DFFB3",
    glow: "rgba(125, 255, 179, 0.4)",
    label: "Listening to user…",
    badge: "Mic Active",
  },
  reasoning: {
    color: "#FB923C",
    glow: "rgba(251, 146, 60, 0.4)",
    label: "Reasoning over schemas & index profiles…",
    badge: "DeepSeek R1",
  },
  speaking: {
    color: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.4)",
    label: "Streaming neural voice response…",
    badge: "TTS 24kHz",
  },
}

const EQ_HEIGHTS = [40, 75, 100, 60, 85, 45] as const

const EQ_STYLE = `
@keyframes sono-voice-eq-bounce {
  0%, 100% { transform: scaleY(0.45); }
  50% { transform: scaleY(1); }
}
`

function VoiceAiOrb({
  state: stateProp,
  defaultState = "listening",
  onStateChange,
  muted: mutedProp,
  defaultMuted = false,
  onMutedChange,
  transcript = "Can you audit our PostgreSQL query latency and recommend indexing optimizations?",
  showControls = true,
  className,
  ...props
}: VoiceAiOrbProps) {
  const [uncontrolledState, setUncontrolledState] =
    React.useState<VoiceAiOrbState>(defaultState)
  const [uncontrolledMuted, setUncontrolledMuted] = React.useState(defaultMuted)

  const state = stateProp ?? uncontrolledState
  const isMuted = mutedProp ?? uncontrolledMuted
  const current = STATE_CONFIG[state]

  const setState = (next: VoiceAiOrbState) => {
    if (stateProp === undefined) setUncontrolledState(next)
    onStateChange?.(next)
  }

  const setMuted = (next: boolean) => {
    if (mutedProp === undefined) setUncontrolledMuted(next)
    onMutedChange?.(next)
  }

  return (
    <div
      data-slot="voice-ai-orb"
      data-state={state}
      className={cn(
        "flex w-full max-w-md flex-col items-center gap-4 p-2",
        className
      )}
      {...props}
    >
      <style>{EQ_STYLE}</style>

      <div className="relative flex size-44 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-all duration-700"
          style={{
            background: current.glow,
            transform: state === "speaking" ? "scale(1.25)" : "scale(1)",
          }}
        />

        <div
          className={cn(
            "absolute inset-2 rounded-full border border-dashed transition-all duration-1000",
            state === "reasoning" ? "animate-spin" : "animate-pulse"
          )}
          style={{ borderColor: current.color, opacity: 0.35 }}
        />

        <div
          className="absolute inset-5 animate-ping rounded-full border transition-all duration-700"
          style={{
            borderColor: current.color,
            opacity: state === "listening" ? 0.2 : 0.05,
            animationDuration: "3s",
          }}
        />

        <div
          className="relative flex size-24 items-center justify-center rounded-full shadow-2xl transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${current.color} 50%, var(--card) 100%)`,
            boxShadow: `0 0 35px ${current.glow}, inset 0 0 15px rgba(255,255,255,0.6)`,
            transform: state === "speaking" ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div className="flex items-center gap-1">
            {EQ_HEIGHTS.map((height, i) => (
              <span
                key={i}
                className="w-1 origin-center rounded-full bg-card"
                style={{
                  height: isMuted
                    ? "4px"
                    : `${Math.max(6, height * (state === "speaking" ? 0.35 : 0.2))}px`,
                  animation: !isMuted
                    ? `sono-voice-eq-bounce 800ms ease-in-out ${i * 120}ms infinite`
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="absolute -bottom-1 flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-0.5 font-mono text-[10.5px] font-medium shadow-soft"
          style={{ color: current.color }}
        >
          <span
            className="size-1.5 animate-ping rounded-full"
            style={{ background: current.color }}
          />
          {current.badge}
        </div>
      </div>

      <div className="flex w-full flex-col items-center text-center">
        <p className="font-mono text-[11px] text-muted-foreground transition-colors duration-300">
          {current.label}
        </p>
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-foreground">
          “{transcript}”
        </p>
      </div>

      {showControls ? (
        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card p-1 shadow-soft">
          <button
            type="button"
            onClick={() => setState("listening")}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-[11.5px] font-medium transition-all",
              state === "listening"
                ? "bg-primary font-semibold !text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Listen
          </button>
          <button
            type="button"
            onClick={() => setState("reasoning")}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-[11.5px] font-medium transition-all",
              state === "reasoning"
                ? "bg-orange-500 font-semibold text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Reason
          </button>
          <button
            type="button"
            onClick={() => setState("speaking")}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-[11.5px] font-medium transition-all",
              state === "speaking"
                ? "bg-sky-500 font-semibold text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Speak
          </button>
          <div className="mx-0.5 h-4 w-px bg-border" />
          <button
            type="button"
            onClick={() => setMuted(!isMuted)}
            className={cn(
              "flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors",
              isMuted
                ? "bg-destructive text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={isMuted ? "Unmute mic" : "Mute mic"}
            aria-pressed={isMuted}
            aria-label={isMuted ? "Unmute mic" : "Mute mic"}
          >
            {isMuted ? (
              <MicOffIcon className="size-3.5" aria-hidden />
            ) : (
              <MicIcon className="size-3.5" aria-hidden />
            )}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export { VoiceAiOrb }
