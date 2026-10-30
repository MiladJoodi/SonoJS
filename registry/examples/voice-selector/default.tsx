"use client"

import * as React from "react"
import type { ComponentProps } from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  VoiceSelector,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorContent,
  VoiceSelectorDescription,
  VoiceSelectorEmpty,
  VoiceSelectorGender,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorPreview,
  VoiceSelectorTrigger,
} from "@sonojs/ui/components/voice-selector"
import { voiceSelectorDemoPreviews } from "@sonojs/ui/components/voice-selector/demo-previews"

type VoiceId = "liam" | "adam" | "alice" | "bill" | "jessica" | "lily"

const voices: {
  id: VoiceId
  name: string
  description: string
  gender: ComponentProps<typeof VoiceSelectorGender>["value"]
  accent: ComponentProps<typeof VoiceSelectorAccent>["value"]
  age: string
  previewUrl: string
}[] = [
  {
    accent: "american",
    age: "20-30",
    description: "Energetic, Social Media Creator",
    gender: "male",
    id: "liam",
    name: "Liam",
    previewUrl: voiceSelectorDemoPreviews.liam,
  },
  {
    accent: "american",
    age: "30-40",
    description: "Dominant, Firm",
    gender: "male",
    id: "adam",
    name: "Adam",
    previewUrl: voiceSelectorDemoPreviews.adam,
  },
  {
    accent: "british",
    age: "30-40",
    description: "Clear, Engaging Educator",
    gender: "female",
    id: "alice",
    name: "Alice",
    previewUrl: voiceSelectorDemoPreviews.alice,
  },
  {
    accent: "american",
    age: "50-60",
    description: "Wise, Mature, Balanced",
    gender: "male",
    id: "bill",
    name: "Bill",
    previewUrl: voiceSelectorDemoPreviews.bill,
  },
  {
    accent: "american",
    age: "20-30",
    description: "Playful, Bright, Warm",
    gender: "female",
    id: "jessica",
    name: "Jessica",
    previewUrl: voiceSelectorDemoPreviews.jessica,
  },
  {
    accent: "british",
    age: "30-40",
    description: "Velvety Actress",
    gender: "female",
    id: "lily",
    name: "Lily",
    previewUrl: voiceSelectorDemoPreviews.lily,
  },
]

function VoiceItem({
  voice,
  playingVoice,
  loadingVoice,
  onSelect,
  onPreview,
}: {
  voice: (typeof voices)[0]
  playingVoice: string | null
  loadingVoice: string | null
  onSelect: (id: VoiceId) => void
  onPreview: (id: VoiceId) => void
}) {
  return (
    <VoiceSelectorItem onSelect={() => onSelect(voice.id)} value={voice.id}>
      <VoiceSelectorPreview
        loading={loadingVoice === voice.id}
        onPlay={() => onPreview(voice.id)}
        playing={playingVoice === voice.id}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <VoiceSelectorName>{voice.name}</VoiceSelectorName>
        <VoiceSelectorAttributes>
          <VoiceSelectorDescription>
            {voice.description}
          </VoiceSelectorDescription>
          <VoiceSelectorBullet />
          <VoiceSelectorAccent value={voice.accent} />
          <VoiceSelectorBullet />
          <VoiceSelectorAge>{voice.age}</VoiceSelectorAge>
          <VoiceSelectorBullet />
          <VoiceSelectorGender value={voice.gender} />
        </VoiceSelectorAttributes>
      </div>
    </VoiceSelectorItem>
  )
}

export function VoiceSelectorDefault() {
  const [open, setOpen] = React.useState(false)
  const [selectedVoice, setSelectedVoice] = React.useState<VoiceId | null>(
    null
  )
  const [playingVoice, setPlayingVoice] = React.useState<VoiceId | null>(null)
  const [loadingVoice, setLoadingVoice] = React.useState<VoiceId | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const handleSelect = React.useCallback((voiceId: VoiceId) => {
    setSelectedVoice(voiceId)
    setOpen(false)
  }, [])

  const handlePreview = React.useCallback(
    (voiceId: VoiceId) => {
      const voice = voices.find((v) => v.id === voiceId)
      if (!voice) return

      if (playingVoice === voiceId) {
        audioRef.current?.pause()
        setPlayingVoice(null)
        return
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      setLoadingVoice(voiceId)

      const audio = new Audio(voice.previewUrl)
      audioRef.current = audio

      audio.addEventListener("canplaythrough", () => {
        setLoadingVoice(null)
        setPlayingVoice(voiceId)
        void audio.play()
      })

      audio.addEventListener("ended", () => {
        setPlayingVoice(null)
      })

      audio.addEventListener("error", () => {
        setLoadingVoice(null)
        setPlayingVoice(null)
      })

      audio.load()
    },
    [playingVoice]
  )

  React.useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const selectedVoiceData = voices.find((voice) => voice.id === selectedVoice)

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-8">
      <VoiceSelector onOpenChange={setOpen} open={open}>
        <VoiceSelectorTrigger asChild>
          <Button
            className="w-full max-w-xs min-w-0 justify-between gap-2 overflow-hidden"
            variant="outline"
          >
            {selectedVoiceData ? (
              <>
                <VoiceSelectorName>{selectedVoiceData.name}</VoiceSelectorName>
                <VoiceSelectorAttributes className="ms-auto hidden shrink-0 sm:flex">
                  <VoiceSelectorAccent value={selectedVoiceData.accent} />
                  <VoiceSelectorBullet />
                  <VoiceSelectorAge>{selectedVoiceData.age}</VoiceSelectorAge>
                  <VoiceSelectorBullet />
                  <VoiceSelectorGender value={selectedVoiceData.gender} />
                </VoiceSelectorAttributes>
              </>
            ) : (
              <span className="min-w-0 flex-1 truncate text-start text-sm">
                Select a voice...
              </span>
            )}
          </Button>
        </VoiceSelectorTrigger>
        <VoiceSelectorContent>
          <VoiceSelectorInput placeholder="Search voices..." />
          <VoiceSelectorList>
            <VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
            {voices.map((voice) => (
              <VoiceItem
                key={voice.id}
                loadingVoice={loadingVoice}
                onPreview={handlePreview}
                onSelect={handleSelect}
                playingVoice={playingVoice}
                voice={voice}
              />
            ))}
          </VoiceSelectorList>
        </VoiceSelectorContent>
      </VoiceSelector>
    </div>
  )
}
