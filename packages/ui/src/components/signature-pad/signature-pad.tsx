"use client"

import * as React from "react"
import SignaturePadLib, {
  type Options as SignaturePadOptions,
  type PointGroup,
} from "signature_pad"

import { cn } from "@sonojs/ui/lib/utils"

export type SignaturePadHandle = {
  clear: () => void
  undo: () => void
  isEmpty: () => boolean
  toDataURL: (type?: string, quality?: number) => string
  toBlob: (type?: string, quality?: number) => Promise<Blob | null>
  toData: () => PointGroup[]
  fromData: (data: PointGroup[]) => void
  fromDataURL: (dataUrl: string) => Promise<void>
}

export type SignaturePadProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> & {
  penColor?: string
  /** Maps to signature_pad min/max width (pressure stroke). Default `2`. */
  strokeWidth?: number
  backgroundColor?: string
  disabled?: boolean
  /** Shows destructive border when true. */
  invalid?: boolean
  /** Guide caption under a dashed baseline (e.g. Sign here). */
  guide?: string
  onBegin?: () => void
  onEnd?: () => void
  /** Fires after each stroke end or clear/undo. */
  onEmptyChange?: (empty: boolean) => void
}

const SignaturePad = React.forwardRef<SignaturePadHandle, SignaturePadProps>(
  function SignaturePad(
    {
      className,
      penColor = "#0a0a0a",
      strokeWidth = 2,
      backgroundColor = "transparent",
      disabled = false,
      invalid = false,
      guide,
      onBegin,
      onEnd,
      onEmptyChange,
      ...props
    },
    ref
  ) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const padRef = React.useRef<SignaturePadLib | null>(null)
  const [empty, setEmpty] = React.useState(true)

  const onBeginRef = React.useRef(onBegin)
  const onEndRef = React.useRef(onEnd)
  const onEmptyChangeRef = React.useRef(onEmptyChange)

  React.useEffect(() => {
    onBeginRef.current = onBegin
    onEndRef.current = onEnd
    onEmptyChangeRef.current = onEmptyChange
  }, [onBegin, onEnd, onEmptyChange])

  const syncEmpty = React.useCallback(() => {
    const next = padRef.current?.isEmpty() ?? true
    setEmpty((prev) => (prev === next ? prev : next))
  }, [])

  React.useEffect(() => {
    onEmptyChangeRef.current?.(empty)
  }, [empty])

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    const pad = padRef.current
    if (!canvas || !root || !pad) return

    const data = pad.toData()
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    const width = root.clientWidth
    const height = root.clientHeight
    if (width === 0 || height === 0) return

    canvas.width = Math.floor(width * ratio)
    canvas.height = Math.floor(height * ratio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0)

    pad.clear()
    if (data.length) pad.fromData(data)
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const options: SignaturePadOptions = {
      penColor,
      minWidth: Math.max(0.5, strokeWidth * 0.5),
      maxWidth: strokeWidth * 1.5,
      backgroundColor,
    }
    const pad = new SignaturePadLib(canvas, options)
    padRef.current = pad

    const onBeginStroke = () => onBeginRef.current?.()
    const onEndStroke = () => {
      onEndRef.current?.()
      syncEmpty()
    }
    pad.addEventListener("beginStroke", onBeginStroke)
    pad.addEventListener("endStroke", onEndStroke)

    resizeCanvas()
    const root = rootRef.current
    const ro =
      root && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => resizeCanvas())
        : null
    if (root && ro) ro.observe(root)
    syncEmpty()

    return () => {
      pad.removeEventListener("beginStroke", onBeginStroke)
      pad.removeEventListener("endStroke", onEndStroke)
      pad.off()
      ro?.disconnect()
      padRef.current = null
    }
    // Mount once; pen options sync in a separate effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const pad = padRef.current
    if (!pad) return
    pad.penColor = penColor
    pad.minWidth = Math.max(0.5, strokeWidth * 0.5)
    pad.maxWidth = strokeWidth * 1.5
    pad.backgroundColor = backgroundColor
  }, [penColor, strokeWidth, backgroundColor])

  React.useEffect(() => {
    const pad = padRef.current
    if (!pad) return
    if (disabled) pad.off()
    else pad.on()
  }, [disabled])

  React.useImperativeHandle(
    ref,
    (): SignaturePadHandle => ({
      clear() {
        padRef.current?.clear()
        syncEmpty()
      },
      undo() {
        const pad = padRef.current
        if (!pad) return
        const data = pad.toData()
        if (!data.length) return
        data.pop()
        pad.fromData(data)
        syncEmpty()
      },
      isEmpty() {
        return padRef.current?.isEmpty() ?? true
      },
      toDataURL(type = "image/png", quality) {
        return padRef.current?.toDataURL(type, quality) ?? ""
      },
      toBlob(type = "image/png", quality = 0.92) {
        const canvas = canvasRef.current
        if (!canvas || padRef.current?.isEmpty()) {
          return Promise.resolve(null)
        }
        return new Promise((resolve) => {
          canvas.toBlob((blob) => resolve(blob), type, quality)
        })
      },
      toData() {
        return padRef.current?.toData() ?? []
      },
      fromData(data) {
        padRef.current?.fromData(data)
        syncEmpty()
      },
      async fromDataURL(dataUrl) {
        await padRef.current?.fromDataURL(dataUrl)
        syncEmpty()
      },
    }),
    [syncEmpty]
  )

  return (
    <div
      ref={rootRef}
      data-slot="signature-pad"
      data-disabled={disabled ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      data-empty={empty ? "" : undefined}
      className={cn(
        "relative h-48 w-full touch-none overflow-hidden rounded-[12px] border border-border/70 bg-card",
        invalid && "border-destructive",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full cursor-crosshair touch-none"
        aria-label={guide ?? "Signature"}
      />
      {guide ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-5 border-b border-dashed border-border/70"
          />
          <p
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-1.5 text-center text-[11px] text-muted-foreground"
          >
            {guide}
          </p>
        </>
      ) : null}
    </div>
  )
  }
)

SignaturePad.displayName = "SignaturePad"

export { SignaturePad }
export type { PointGroup }
