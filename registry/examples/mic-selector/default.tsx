"use client"

import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
} from "@sonojs/ui/components/mic-selector"

export function MicSelectorDefault() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-8">
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
    </div>
  )
}
