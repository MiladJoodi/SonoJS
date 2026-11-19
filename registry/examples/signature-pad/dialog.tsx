"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sonojs/ui/components/dialog"
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@sonojs/ui/components/signature-pad"

export function SignaturePadDialog() {
  const ref = React.useRef<SignaturePadHandle>(null)
  const [open, setOpen] = React.useState(false)
  const [empty, setEmpty] = React.useState(true)
  const [preview, setPreview] = React.useState<string | null>(null)

  function save() {
    const pad = ref.current
    if (!pad || pad.isEmpty()) return
    setPreview(pad.toDataURL("image/png"))
    setOpen(false)
  }

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Saved signature"
            className="h-14 w-28 rounded-md border border-border/70 bg-background object-contain"
          />
        ) : (
          <div className="flex h-14 w-28 items-center justify-center rounded-md border border-dashed border-border/70 bg-muted text-[11px] text-muted-foreground">
            No signature
          </div>
        )}
        <Dialog
          open={open}
          onOpenChange={(next) => {
            setOpen(next)
            if (next) {
              queueMicrotask(() => ref.current?.clear())
              setEmpty(true)
            }
          }}
        >
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              Sign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add signature</DialogTitle>
              <DialogDescription>
                Sign in the pad, then save. Works with mouse and touch.
              </DialogDescription>
            </DialogHeader>
            <SignaturePad
              ref={ref}
              guide="Sign here"
              className="h-56"
              onEmptyChange={setEmpty}
            />
            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={empty}
                onClick={() => ref.current?.clear()}
              >
                Clear
              </Button>
              <Button type="button" size="sm" disabled={empty} onClick={save}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
