"use client"

import { ModelViewer } from "@sonojs/ui/components/3d/model-viewer"

export function ModelViewerDefault() {
  return (
    <div className="h-[min(70vh,520px)] w-full min-h-[420px]">
      <ModelViewer
        className="h-full w-full"
        autoRotate
        autoRotateSpeed={1}
        environmentPreset="studio"
        defaultZoom={1.35}
      />
    </div>
  )
}
