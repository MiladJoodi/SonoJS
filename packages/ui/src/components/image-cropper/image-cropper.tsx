"use client"

import * as React from "react"
import Cropper, {
  type Area,
  type Point,
} from "react-easy-crop"

import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@sonojs/ui/lib/utils"

export type ImageCropperProps = {
  /** Image URL or object URL. */
  src: string
  /** Crop aspect ratio. Default `1` (square). Pass `undefined` for free aspect via cropSize. */
  aspect?: number
  cropShape?: "rect" | "round"
  showGrid?: boolean
  zoom?: number
  defaultZoom?: number
  onZoomChange?: (zoom: number) => void
  minZoom?: number
  maxZoom?: number
  rotation?: number
  defaultRotation?: number
  onRotationChange?: (rotation: number) => void
  /** Fires with percent + pixel crop areas when the user finishes a gesture. */
  onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void
  /** Also fires while dragging (more frequent). */
  onCropAreaChange?: (croppedArea: Area, croppedAreaPixels: Area) => void
  showZoomSlider?: boolean
  className?: string
  /** Height of the crop stage. Default `h-72`. */
  stageClassName?: string
  disabled?: boolean
}

function ImageCropper({
  src,
  aspect = 1,
  cropShape = "rect",
  showGrid = true,
  zoom: zoomProp,
  defaultZoom = 1,
  onZoomChange,
  minZoom = 1,
  maxZoom = 3,
  rotation: rotationProp,
  defaultRotation = 0,
  onRotationChange,
  onCropComplete,
  onCropAreaChange,
  showZoomSlider = true,
  className,
  stageClassName,
  disabled = false,
}: ImageCropperProps) {
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 })
  const [uncontrolledZoom, setUncontrolledZoom] = React.useState(defaultZoom)
  const [uncontrolledRotation, setUncontrolledRotation] =
    React.useState(defaultRotation)

  const zoom = zoomProp ?? uncontrolledZoom
  const rotation = rotationProp ?? uncontrolledRotation

  const setZoom = (next: number) => {
    if (zoomProp === undefined) setUncontrolledZoom(next)
    onZoomChange?.(next)
  }

  const setRotation = (next: number) => {
    if (rotationProp === undefined) setUncontrolledRotation(next)
    onRotationChange?.(next)
  }

  return (
    <div
      data-slot="image-cropper"
      data-disabled={disabled ? "" : undefined}
      className={cn("flex w-full flex-col gap-3", className)}
    >
      <div
        className={cn(
          "relative h-72 w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted",
          disabled && "pointer-events-none opacity-50",
          stageClassName
        )}
      >
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          minZoom={minZoom}
          maxZoom={maxZoom}
          cropShape={cropShape}
          showGrid={showGrid}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onCropAreaChange={onCropAreaChange}
          style={{
            containerStyle: { borderRadius: 12 },
          }}
        />
      </div>
      {showZoomSlider ? (
        <div className="flex items-center gap-3 px-0.5">
          <span className="w-10 shrink-0 text-xs text-muted-foreground">
            Zoom
          </span>
          <Slider
            value={[zoom]}
            min={minZoom}
            max={maxZoom}
            step={0.05}
            disabled={disabled}
            onValueChange={(v) => setZoom(v[0] ?? minZoom)}
            aria-label="Zoom"
            className="flex-1"
          />
        </div>
      ) : null}
    </div>
  )
}

export { ImageCropper }
export type { Area, Point }
