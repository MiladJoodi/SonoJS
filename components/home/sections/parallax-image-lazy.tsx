"use client"

import { LazyWhenVisible } from "@/components/home/lazy-when-visible"

function loadHomeParallaxImage() {
  return import("./parallax-image")
}

type HomeParallaxImageLazyProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
}

/**
 * Client island: owns the dynamic import so RSC only passes serializable props.
 */
export function HomeParallaxImageLazy({
  src,
  alt,
  width,
  height,
  className,
  sizes,
}: HomeParallaxImageLazyProps) {
  return (
    <LazyWhenVisible
      loader={loadHomeParallaxImage}
      exportName="HomeParallaxImage"
      componentProps={{ src, alt, width, height, className, sizes }}
      className="relative w-full"
      placeholder={
        <div
          aria-hidden
          className="mx-auto aspect-[1672/940] max-h-[14rem] w-full sm:max-h-none"
        />
      }
    />
  )
}
