"use client"

import type * as React from "react"
import { FingerprintIcon, QrCodeIcon, SmartphoneIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

/** Decorative fake QR — SVG so modules never collapse to zero height. */
function FakeQrCode({ className }: { className?: string }) {
  // 21×21 modules; 1 = dark. Classic finder corners + dense middle pattern.
  const modules = [
    "111111101010101111111",
    "100000101110101000001",
    "101110101000101011101",
    "101110100101101011101",
    "101110101110101011101",
    "100000101001101000001",
    "111111101010101111111",
    "000000001101100000000",
    "110101111010111101011",
    "001011001101001011100",
    "110100110010110100111",
    "001011001101001011100",
    "110101111010111101011",
    "000000001010100000000",
    "111111101101101000101",
    "100000101010101110111",
    "101110101111100001010",
    "101110100001011101101",
    "101110101100110010011",
    "100000101011001101100",
    "111111101010110100111",
  ]

  return (
    <div
      className={cn(
        "flex size-40 items-center justify-center rounded-[12px] bg-white p-3 shadow-soft ring-1 ring-border/70",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 21 21"
        className="size-full"
        shapeRendering="crispEdges"
      >
        <rect width="21" height="21" fill="#fff" />
        {modules.map((row, y) =>
          row.split("").map((cell, x) =>
            cell === "1" ? (
              <rect
                key={`${y}-${x}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill="#111"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <aside className="flex flex-col items-center justify-center gap-4 border-b border-border/70 bg-muted/40 p-6 sm:p-8 lg:border-b-0 lg:border-e">
        <FakeQrCode />
        <p className="inline-flex items-center gap-1.5 text-center text-xs text-muted-foreground">
          <QrCodeIcon className="size-3.5" aria-hidden />
          Scan with your phone camera
        </p>
      </aside>

      <div className="flex flex-col justify-center gap-6 p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <span className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <SmartphoneIcon className="size-5" aria-hidden />
          </span>
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Approve on another device
          </h1>
          <p className="text-sm text-muted-foreground">
            Scan the QR code with a phone that already has your passkey, or
            continue on this computer.
          </p>
        </header>

        <div className="flex flex-col gap-2.5">
          <Button type="button" className="w-full cursor-pointer sm:w-auto sm:self-start">
            <FingerprintIcon className="size-4" aria-hidden />
            Use this device instead
          </Button>
          <a
            href="#"
            className="cursor-pointer text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Sign in another way
          </a>
        </div>
      </div>
    </div>
  )
}
