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
  DEMO_IMAGE,
  ImageCropper,
  getCroppedImgUrl,
  type Area,
} from "@sonojs/ui/components/image-cropper"

export function ImageCropperDialog() {
  const [open, setOpen] = React.useState(false)
  const [pixels, setPixels] = React.useState<Area | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  async function confirm() {
    if (!pixels) return
    const url = await getCroppedImgUrl(DEMO_IMAGE, pixels)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(url)
    setOpen(false)
  }

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Cropped preview"
            className="size-14 rounded-full border border-border/70 object-cover"
          />
        ) : (
          <div className="size-14 rounded-full border border-dashed border-border/70 bg-muted" />
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              Crop photo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crop image</DialogTitle>
              <DialogDescription>
                Adjust the crop, then save. Uses `getCroppedImgUrl`.
              </DialogDescription>
            </DialogHeader>
            <ImageCropper
              src={DEMO_IMAGE}
              aspect={1}
              cropShape="round"
              stageClassName="h-64"
              onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
            />
            <DialogFooter>
              <Button
                type="button"
                disabled={!pixels}
                onClick={() => void confirm()}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-xs text-muted-foreground">
        Pair with `Dialog` for profile photo flows.
      </p>
    </div>
  )
}
