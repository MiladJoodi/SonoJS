"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { ColorPicker } from "@sonojs/ui/components/color-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"

export function ColorPickerPopoverExample() {
  const [accent, setAccent] = React.useState("#2563EB")

  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
        <Input id="workspace-name" defaultValue="Acme Inc" />
      </Field>
      <Field>
        <FieldLabel>Accent color</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex h-[46px] w-full cursor-pointer items-center gap-2 rounded-md border border-border/70 bg-card px-3 text-sm"
            >
              <span
                className="size-5 shrink-0 rounded-sm border border-border/70"
                style={{ backgroundColor: accent }}
              />
              <span className="font-mono text-muted-foreground">{accent}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto border-0 bg-transparent p-0 shadow-none"
          >
            <ColorPicker
              compact
              value={accent}
              onValueChange={setAccent}
              showCopy
            />
          </PopoverContent>
        </Popover>
        <FieldDescription>
          Used for buttons and highlights in this workspace.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
