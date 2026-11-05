"use client"

import * as React from "react"
import { Settings2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import planArt from "./images/plan-art.webp"
import { SettingsModal } from "./settings-modal"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/**
 * Account settings modal — multi-page shell (General / Profile / Tools /
 * Storage) with an animated WebGL plan card on General.
 */
export default function AccountSettings({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [open, setOpen] = React.useState(false)

  return (
    <main
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center bg-canvas px-4 py-8 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <Button type="button" onClick={() => setOpen(true)} className="gap-2">
        <Settings2Icon className="size-4" />
        Open settings
      </Button>

      <SettingsModal
        open={open}
        onOpenChange={setOpen}
        defaultPage="general"
        planArtSrc={assetSrc(planArt)}
      />
    </main>
  )
}
