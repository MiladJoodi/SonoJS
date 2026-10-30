"use client"

import { ElectroBorder } from "@sonojs/ui/components/electro-border"

export function ElectroBorderBorderOnly() {
  return (
    <div className="flex w-full justify-center py-4">
      <ElectroBorder
        borderColor="#00fffc"
        radius="12px"
        effects={false}
        className="w-full max-w-[340px]"
      >
        <div className="space-y-2 p-8">
          <p className="text-sm font-semibold text-foreground">Border only</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            `effects={false}` keeps the turbulent stroke without glow, aura, or
            overlay.
          </p>
        </div>
      </ElectroBorder>
    </div>
  )
}
