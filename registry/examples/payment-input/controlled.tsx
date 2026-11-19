"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  CardNumberInput,
  IbanInput,
  isValidIban,
} from "@sonojs/ui/components/payment-input"

export function PaymentInputControlled() {
  const [card, setCard] = React.useState("4242424242424242")
  const [iban, setIban] = React.useState("DE89370400440532013000")

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="space-y-2">
        <CardNumberInput
          value={card}
          onValueChange={setCard}
          aria-label="Card number"
        />
        <p className="text-xs text-muted-foreground">
          Raw: {card || "—"}
        </p>
      </div>
      <div className="space-y-2">
        <IbanInput value={iban} onValueChange={setIban} aria-label="IBAN" />
        <p className="text-xs text-muted-foreground">
          {iban || "—"} · {isValidIban(iban) ? "valid" : "invalid"}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => {
          setCard("")
          setIban("")
        }}
      >
        Clear
      </Button>
    </div>
  )
}
