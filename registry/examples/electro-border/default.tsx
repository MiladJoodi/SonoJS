"use client"

import { ArrowUpRightIcon } from "lucide-react"

import { ElectroBorder } from "@sonojs/ui/components/electro-border"
import { Button } from "@sonojs/ui/components/button"

export function ElectroBorderDefault() {
  return (
    <div className="flex w-full justify-center py-4">
      <ElectroBorder
        borderColor="#00fffc"
        radius="12px"
        animationSpeed={1}
        distortion={1}
        className="w-full max-w-[min(340px,100%)]"
      >
        <div className="flex min-h-[360px] flex-col justify-between p-5 select-none sm:min-h-[420px] sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:gap-6">
            <div className="inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-4 py-1.5 text-xs font-semibold tracking-wider text-foreground/90 uppercase backdrop-blur-md">
              SonoJS
            </div>
            <div className="space-y-2 pt-6 sm:pt-10">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Electric Border
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Emphasize a hero, offer, or feature with a charged frame that
                stays theme-aware.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-5 sm:pt-6">
            <span className="font-mono text-xs text-cyan-700 dark:text-cyan-300">
              #00fffc
            </span>
            <Button
              size="sm"
              className="h-10 shrink-0 gap-1.5 rounded-[12px] bg-cyan-400 text-black hover:bg-cyan-300"
            >
              Explore
              <ArrowUpRightIcon className="icon-dir size-3.5" />
            </Button>
          </div>
        </div>
      </ElectroBorder>
    </div>
  )
}
