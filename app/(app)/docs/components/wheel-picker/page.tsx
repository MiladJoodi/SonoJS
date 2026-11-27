import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("wheel-picker", "Wheel Picker")

const exampleDefs = [
  {
    name: "wheel-picker-default",
    title: "Basic",
    description: "Pick a single value from a scrollable wheel.",
  },
  {
    name: "wheel-picker-time",
    title: "Time",
    description:
      "Compose hour, minute, and meridiem wheels. Use `infinite` for looping columns.",
  },
  {
    name: "wheel-picker-date",
    title: "Date",
    description:
      "Month, day, and year wheels for a compact date picker (separate from Calendar).",
  },
  {
    name: "wheel-picker-duration",
    title: "Duration",
    description: "Hour and minute columns for timers and media length.",
  },
  {
    name: "wheel-picker-disabled",
    title: "Disabled options",
    description: "Mark options with `disabled` so they cannot be selected.",
  },
]

const usageSource = `"use client"

import * as React from "react"

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/wheel-picker"

const options: WheelPickerOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
]

export function Example() {
  const [value, setValue] = React.useState("react")

  return (
    <WheelPickerWrapper>
      <WheelPicker options={options} value={value} onValueChange={setValue} />
    </WheelPickerWrapper>
  )
}`

const compositionSource = `WheelPickerWrapper
└── WheelPicker`

export default async function WheelPickerDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Wheel Picker"
        pathname="/docs/components/wheel-picker"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An iOS-style scroll wheel for choosing options, times, and dates.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="wheel-picker" />

      <section className="space-y-3">
        <h2 className="text-h3">Composition</h2>
        <ComponentSource
          title="structure"
          lang="tsx"
          code={compositionSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="wheel-picker.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <DocsApiProps
        rows={[
          {
            name: "options",
            type: "WheelPickerOption[]",
            defaultValue: "-",
            description: "Items in the wheel (`label`, `value`, optional `disabled`).",
          },
          {
            name: "value",
            type: "string | number",
            defaultValue: "-",
            description: "Controlled selected value.",
          },
          {
            name: "defaultValue",
            type: "string | number",
            defaultValue: "-",
            description: "Uncontrolled initial value.",
          },
          {
            name: "onValueChange",
            type: "(value: string | number) => void",
            defaultValue: "-",
            description: "Fires when the selection changes.",
          },
          {
            name: "infinite",
            type: "boolean",
            defaultValue: "false",
            description: "Loop the column endlessly.",
          },
          {
            name: "visibleCount",
            type: "number",
            defaultValue: "20",
            description: "Visible rows (must be a multiple of 4).",
          },
          {
            name: "classNames",
            type: "WheelPickerClassNames",
            defaultValue: "-",
            description:
              "Classes for option items, highlight wrapper, and highlight item.",
          },
        ]}
      />
    </article>
  )
}
