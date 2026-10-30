"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import {
  BrainIcon,
  CircleIcon,
  EyeClosedIcon,
  MegaphoneIcon,
  MicIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { ButtonGroup } from "@sonojs/ui/components/button-group"
import type { PersonaState } from "@sonojs/ui/components/persona"
import { Persona } from "@sonojs/ui/components/persona"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@sonojs/ui/components/tooltip"

const states: {
  state: PersonaState
  icon: LucideIcon
  label: string
}[] = [
  { icon: CircleIcon, label: "Idle", state: "idle" },
  { icon: MicIcon, label: "Listening", state: "listening" },
  { icon: BrainIcon, label: "Thinking", state: "thinking" },
  { icon: MegaphoneIcon, label: "Speaking", state: "speaking" },
  { icon: EyeClosedIcon, label: "Asleep", state: "asleep" },
]

function StateButton({
  state,
  currentState,
  onStateChange,
}: {
  state: (typeof states)[0]
  currentState: PersonaState
  onStateChange: (state: PersonaState) => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          onClick={() => onStateChange(state.state)}
          size="icon-sm"
          variant={currentState === state.state ? "default" : "outline"}
        >
          <state.icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{state.label}</TooltipContent>
    </Tooltip>
  )
}

export function PersonaDefault() {
  const [currentState, setCurrentState] =
    React.useState<PersonaState>("idle")

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-8">
      <Persona className="size-32" state={currentState} variant="obsidian" />

      <ButtonGroup orientation="horizontal">
        {states.map((state) => (
          <StateButton
            key={state.state}
            currentState={currentState}
            onStateChange={setCurrentState}
            state={state}
          />
        ))}
      </ButtonGroup>
    </div>
  )
}
