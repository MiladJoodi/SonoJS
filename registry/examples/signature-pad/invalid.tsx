"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadInvalid() {
  const ref = React.useRef<SignaturePadHandle>(null)
  const [empty, setEmpty] = React.useState(true)
  const [invalid, setInvalid] = React.useState(false)

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <SignaturePad
        ref={ref}
        guide="Sign here"
        invalid={invalid}
        onEmptyChange={(next) => {
          setEmpty(next)
          if (!next) setInvalid(false)
        }}
      />
      {invalid ? (
        <p className="text-xs text-destructive">Please add a signature.</p>
      ) : null}
      <Button
        type="button"
        size="sm"
        className="self-start"
        onClick={() => {
          if (empty) setInvalid(true)
          else setInvalid(false)
        }}
      >
        Validate
      </Button>
    </div>
  )
}
