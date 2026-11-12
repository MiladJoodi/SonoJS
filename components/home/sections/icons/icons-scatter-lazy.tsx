"use client"

import { LazyWhenVisible } from "@/components/home/lazy-when-visible"

function loadIconsScatter() {
  return import("./icons-scatter")
}

/** Client island: owns the dynamic import so RSC never passes a function prop. */
export function IconsScatterLazy() {
  return (
    <LazyWhenVisible
      loader={loadIconsScatter}
      exportName="IconsScatter"
      className="relative mx-auto aspect-[2.35/1] w-full max-w-[40rem] lg:max-w-none"
      placeholder={<div aria-hidden className="size-full" />}
    />
  )
}
