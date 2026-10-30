"use client"

import { ArrowUpRightIcon } from "lucide-react"

import { ElectroBorder } from "@sonojs/ui/components/electro-border"
import { Button } from "@sonojs/ui/components/button"

export function ElectroBorderColor() {
  return (
    <div className="flex w-full justify-center py-4">
      <ElectroBorder
        borderColor="#ff9900"
        radius="12px"
        animationSpeed={1}
        distortion={1.1}
        className="w-full max-w-[340px]"
      >
        <div className="flex h-[420px] flex-col justify-between p-8 select-none">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-foreground/90 uppercase backdrop-blur-md">
              Solar
            </div>
            <div className="space-y-2 pt-10">
              <h3 className="text-3xl font-semibold tracking-tight text-foreground">
                Amber pulse
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Custom `borderColor` with a touch more `distortion` for
                high-impact CTAs.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border/70 pt-6">
            <span className="font-mono text-xs text-amber-700 dark:text-amber-300">
              #ff9900
            </span>
            <Button
              size="sm"
              className="h-10 gap-1.5 rounded-[12px] bg-amber-400 text-black hover:bg-amber-300"
            >
              Get started
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      </ElectroBorder>
    </div>
  )
}
