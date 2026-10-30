"use client"

import * as React from "react"
import type { RiveParameters } from "@rive-app/react-webgl2"
import {
  useRive,
  useStateMachineInput,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
} from "@rive-app/react-webgl2"

import { cn } from "@sonojs/ui/lib/utils"

/**
 * Delay Rive init by one frame so React Strict Mode's throwaway mount
 * never creates a WebGL2 context.
 */
function useStrictModeSafeInit() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => {
      cancelAnimationFrame(id)
      setReady(false)
    }
  }, [])

  return ready
}

export type PersonaState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "asleep"

export type PersonaVariant = keyof typeof sources

export type PersonaProps = {
  state?: PersonaState
  onLoad?: RiveParameters["onLoad"]
  onLoadError?: RiveParameters["onLoadError"]
  onReady?: () => void
  onPause?: RiveParameters["onPause"]
  onPlay?: RiveParameters["onPlay"]
  onStop?: RiveParameters["onStop"]
  className?: string
  variant?: PersonaVariant
}

const stateMachine = "default"

const sources = {
  command: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/command-2.0.riv",
  },
  glint: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/glint-2.0.riv",
  },
  halo: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/halo-2.0.riv",
  },
  mana: {
    dynamicColor: false,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/mana-2.0.riv",
  },
  obsidian: {
    dynamicColor: true,
    hasModel: true,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv",
  },
  opal: {
    dynamicColor: false,
    hasModel: false,
    source:
      "https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/orb-1.2.riv",
  },
} as const

function getCurrentTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  // Class-based theme (e.g. next-themes): `.dark` on, otherwise light.
  // Do not fall back to prefers-color-scheme — that paints the orb dark while
  // the forced site theme is still light.
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function useTheme(enabled: boolean) {
  const [theme, setTheme] = React.useState<"light" | "dark">(getCurrentTheme)

  React.useEffect(() => {
    if (!enabled) return

    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme())
    })

    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [enabled])

  return theme
}

type PersonaSource = (typeof sources)[PersonaVariant]

type PersonaWithModelProps = {
  rive: ReturnType<typeof useRive>["rive"]
  source: PersonaSource
  children: React.ReactNode
}

const PersonaWithModel = React.memo(function PersonaWithModel({
  rive,
  source,
  children,
}: PersonaWithModelProps) {
  const theme = useTheme(source.dynamicColor)
  const viewModel = useViewModel(rive, { useDefault: true })
  const viewModelInstance = useViewModelInstance(viewModel, {
    rive,
    useDefault: true,
  })
  const viewModelInstanceColor = useViewModelInstanceColor(
    "color",
    viewModelInstance
  )

  React.useEffect(() => {
    if (!(viewModelInstanceColor && source.dynamicColor)) return

    const [r, g, b] = theme === "dark" ? [255, 255, 255] : [0, 0, 0]
    viewModelInstanceColor.setRgb(r, g, b)
  }, [viewModelInstanceColor, theme, source.dynamicColor])

  return children
})

/** Animated AI visual (Rive WebGL2) for idle / listening / thinking / speaking / asleep. */
const Persona = React.memo(function Persona({
  variant = "obsidian",
  state = "idle",
  onLoad,
  onLoadError,
  onReady,
  onPause,
  onPlay,
  onStop,
  className,
}: PersonaProps) {
  const source = sources[variant]

  const callbacksRef = React.useRef({
    onLoad,
    onLoadError,
    onPause,
    onPlay,
    onReady,
    onStop,
  })

  React.useEffect(() => {
    callbacksRef.current = {
      onLoad,
      onLoadError,
      onPause,
      onPlay,
      onReady,
      onStop,
    }
  }, [onLoad, onLoadError, onPause, onPlay, onReady, onStop])

  const stableCallbacks = React.useMemo(
    () => ({
      onLoad: ((loadedRive) =>
        callbacksRef.current.onLoad?.(loadedRive)) as RiveParameters["onLoad"],
      onLoadError: ((err) =>
        callbacksRef.current.onLoadError?.(
          err
        )) as RiveParameters["onLoadError"],
      onPause: ((event) =>
        callbacksRef.current.onPause?.(event)) as RiveParameters["onPause"],
      onPlay: ((event) =>
        callbacksRef.current.onPlay?.(event)) as RiveParameters["onPlay"],
      onReady: () => callbacksRef.current.onReady?.(),
      onStop: ((event) =>
        callbacksRef.current.onStop?.(event)) as RiveParameters["onStop"],
    }),
    []
  )

  const ready = useStrictModeSafeInit()

  const { rive, RiveComponent } = useRive(
    ready
      ? {
          autoplay: true,
          onLoad: stableCallbacks.onLoad,
          onLoadError: stableCallbacks.onLoadError,
          onPause: stableCallbacks.onPause,
          onPlay: stableCallbacks.onPlay,
          onRiveReady: stableCallbacks.onReady,
          onStop: stableCallbacks.onStop,
          src: source.source,
          stateMachines: stateMachine,
        }
      : null
  )

  const listeningInput = useStateMachineInput(
    rive,
    stateMachine,
    "listening"
  )
  const thinkingInput = useStateMachineInput(rive, stateMachine, "thinking")
  const speakingInput = useStateMachineInput(rive, stateMachine, "speaking")
  const asleepInput = useStateMachineInput(rive, stateMachine, "asleep")

  React.useEffect(() => {
    if (listeningInput) listeningInput.value = state === "listening"
    if (thinkingInput) thinkingInput.value = state === "thinking"
    if (speakingInput) speakingInput.value = state === "speaking"
    if (asleepInput) asleepInput.value = state === "asleep"
  }, [state, listeningInput, thinkingInput, speakingInput, asleepInput])

  const canvas = (
    <RiveComponent
      data-slot="persona"
      className={cn("size-16 shrink-0", className)}
    />
  )

  if (source.hasModel) {
    return (
      <PersonaWithModel rive={rive} source={source}>
        {canvas}
      </PersonaWithModel>
    )
  }

  return canvas
})

Persona.displayName = "Persona"

export { Persona }
