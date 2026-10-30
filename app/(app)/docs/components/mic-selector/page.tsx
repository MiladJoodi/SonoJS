import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("mic-selector", "Mic Selector")

const exampleDefs = [
  {
    name: "mic-selector-default",
    title: "Default",
    description:
      "Popover list of audio inputs. Opening requests mic permission so device names resolve.",
    requires: ["button", "command", "popover"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
} from "@/components/sonojs/mic-selector"

export function Example() {
  return (
    <MicSelector>
      <MicSelectorTrigger className="w-full max-w-sm">
        <MicSelectorValue />
      </MicSelectorTrigger>
      <MicSelectorContent>
        <MicSelectorInput />
        <MicSelectorEmpty />
        <MicSelectorList>
          {(devices) =>
            devices.map((device) => (
              <MicSelectorItem key={device.deviceId} value={device.deviceId}>
                <MicSelectorLabel device={device} />
              </MicSelectorItem>
            ))
          }
        </MicSelectorList>
      </MicSelectorContent>
    </MicSelector>
  )
}`

export default async function MicSelectorDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Mic Selector"
        pathname="/docs/components/mic-selector"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A searchable popover for picking an audio input — permission-aware
            labels, live device updates, and width-matched content.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="mic-selector" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="mic-selector.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value / defaultValue",
              type: "string",
              description: "Selected device ID (controlled or uncontrolled).",
            },
            {
              name: "onValueChange",
              type: "(deviceId?: string) => void",
              description: "Fires when the selected microphone changes.",
            },
            {
              name: "open / onOpenChange",
              type: "boolean / (open: boolean) => void",
              description:
                "Popover open state. Opening without permission requests mic access.",
            },
            {
              name: "MicSelectorList children",
              type: "(devices: MediaDeviceInfo[]) => ReactNode",
              description: "Render prop with the current audioinput devices.",
            },
            {
              name: "MicSelectorLabel device",
              type: "MediaDeviceInfo",
              description:
                "Splits hardware IDs like `(1a2b:3c4d)` into muted suffix text.",
            },
            {
              name: "useAudioDevices()",
              type: "hook",
              description:
                "Standalone hook: `devices`, `loading`, `error`, `hasPermission`, `loadDevices`.",
            },
          ]}
        />
      </section>
    </article>
  )
}
