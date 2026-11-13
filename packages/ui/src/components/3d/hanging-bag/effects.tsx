"use client"

import { EffectComposer, Vignette } from "@react-three/postprocessing"

/** Vignette only — Bloom was compositing bright card pixels over the chrome rail */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <Vignette offset={0.28} darkness={0.3} />
    </EffectComposer>
  )
}
