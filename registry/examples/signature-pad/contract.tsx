"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadContract() {
  const ref = React.useRef<SignaturePadHandle>(null)
  const [agreed, setAgreed] = React.useState(false)
  const [empty, setEmpty] = React.useState(true)
  const [submitted, setSubmitted] = React.useState(false)
  const [invalid, setInvalid] = React.useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed || empty) {
      setInvalid(true)
      return
    }
    setInvalid(false)
    setSubmitted(true)
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">
          Delivery confirmation
        </h3>
        <p className="text-xs text-muted-foreground">
          Confirm receipt, then sign. Submit stays blocked until both are done.
        </p>
      </div>
      <Field orientation="horizontal">
        <Checkbox
          id="sig-agree"
          checked={agreed}
          onCheckedChange={(v) => {
            setAgreed(v === true)
            setSubmitted(false)
          }}
        />
        <FieldLabel htmlFor="sig-agree" className="font-normal">
          I received the package in good condition
        </FieldLabel>
      </Field>
      <Field data-invalid={invalid && empty ? "" : undefined}>
        <FieldLabel>Signature</FieldLabel>
        <SignaturePad
          ref={ref}
          guide="Sign here"
          invalid={invalid && empty}
          onEmptyChange={(next) => {
            setEmpty(next)
            if (!next) setInvalid(false)
            setSubmitted(false)
          }}
        />
        {invalid && empty ? (
          <FieldDescription className="text-destructive">
            A signature is required.
          </FieldDescription>
        ) : null}
      </Field>
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={!agreed}>
          Confirm delivery
        </Button>
        {submitted ? (
          <span className="text-xs text-muted-foreground">Saved locally.</span>
        ) : null}
      </div>
    </form>
  )
}
