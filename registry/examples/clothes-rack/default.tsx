"use client"

import { ClothesRack } from "@sonojs/ui/components/clothes-rack"
import fleeceNormal from "@sonojs/ui/components/clothes-rack/textures/fleece-normal.webp"
import fleeceRoughness from "@sonojs/ui/components/clothes-rack/textures/fleece-roughness.webp"
import heatherGrain from "@sonojs/ui/components/clothes-rack/textures/heather-grain.webp"
import jerseyNormal from "@sonojs/ui/components/clothes-rack/textures/jersey-normal.webp"
import jerseyRoughness from "@sonojs/ui/components/clothes-rack/textures/jersey-roughness.webp"
import studio from "@sonojs/ui/components/clothes-rack/textures/studio-small-09.hdr"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const TEXTURES = {
  jerseyNormal: assetSrc(jerseyNormal),
  jerseyRoughness: assetSrc(jerseyRoughness),
  fleeceNormal: assetSrc(fleeceNormal),
  fleeceRoughness: assetSrc(fleeceRoughness),
  heatherGrain: assetSrc(heatherGrain),
  studio: assetSrc(studio),
}

export function ClothesRackDefault() {
  return (
    <div className="h-[min(70vh,560px)] w-full min-h-[420px]">
      <ClothesRack gap={6} textures={TEXTURES} className="h-full w-full" />
    </div>
  )
}
