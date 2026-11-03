"use client"

import { ClothesRack } from "@sonojs/ui/components/clothes-rack"

const TEXTURES = {
  jerseyNormal: "/media/clothes-rack/jersey-normal.webp",
  jerseyRoughness: "/media/clothes-rack/jersey-roughness.webp",
  fleeceNormal: "/media/clothes-rack/fleece-normal.webp",
  fleeceRoughness: "/media/clothes-rack/fleece-roughness.webp",
  heatherGrain: "/media/clothes-rack/heather-grain.webp",
  studio: "/media/clothes-rack/studio-small-09.hdr",
}

export function ClothesRackDefault() {
  return (
    <div className="h-[min(70vh,560px)] w-full min-h-[420px]">
      <ClothesRack gap={6} textures={TEXTURES} className="h-full w-full" />
    </div>
  )
}
