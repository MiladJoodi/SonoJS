"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadMobile() {
  const ref = React.useRef<SignaturePadHandle>(null)
  const [empty, setEmpty] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <p className="text-xs text-muted-foreground">
        Taller stage for finger signing. Uses the same pointer pipeline as mouse.
      </p>
      <SignaturePad
        ref={ref}
        guide="Sign with finger"
        className="h-64 sm:h-72"
        strokeWidth={3}
        onEmptyChange={setEmpty}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        disabled={empty}
        onClick={() => ref.current?.clear()}
      >
        Clear
      </Button>
    </div>
  )
}
