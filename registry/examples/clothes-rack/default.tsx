"use client"

import { ClothesRack } from "@sonojs/ui/components/clothes-rack"

const TEXTURES = {
  jerseyNormal: "/media/3d/clothes-rack/jersey-normal.webp",
  jerseyRoughness: "/media/3d/clothes-rack/jersey-roughness.webp",
  fleeceNormal: "/media/3d/clothes-rack/fleece-normal.webp",
  fleeceRoughness: "/media/3d/clothes-rack/fleece-roughness.webp",
  heatherGrain: "/media/3d/clothes-rack/heather-grain.webp",
  studio: "/media/3d/clothes-rack/studio-small-09.hdr",
}

export function ClothesRackDefault() {
  return (
    <div className="h-[min(70vh,560px)] w-full min-h-[420px]">
      <ClothesRack gap={6} textures={TEXTURES} className="h-full w-full" />
    </div>
  )
}
