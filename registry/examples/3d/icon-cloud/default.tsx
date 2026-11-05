"use client"

import {
  defaultIconCloudImages,
  IconCloud,
} from "@sonojs/ui/components/3d/icon-cloud"

/** Same component users get from `sonojs add icon-cloud`. */
export function IconCloudDefault() {
  return (
    <div className="relative flex size-full min-h-[420px] w-full items-center justify-center overflow-hidden rounded-[12px]">
      <IconCloud images={defaultIconCloudImages} />
    </div>
  )
}
