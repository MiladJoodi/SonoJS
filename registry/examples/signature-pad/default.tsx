"use client"

import { SignaturePad } from "@sonojs/ui/components/signature-pad"

export function SignaturePadDefault() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <SignaturePad guide="Sign here" />
    </div>
  )
}
