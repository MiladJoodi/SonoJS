"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import defaultImage from "./images/01.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export type PerspectiveCardProps = {
  /** Background image URL. Defaults to the bundled demo photo. */
  image?: string
  /** Card width (CSS length). Default `300px`. */
  width?: string
  /** Card height (CSS length). Default `350px`. */
  height?: string
  className?: string
}

export function PerspectiveCard({
  image,
  width = "300px",
  height = "350px",
  className,
}: PerspectiveCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const shineRef = React.useRef<HTMLDivElement>(null)
  const shadowRef = React.useRef<HTMLDivElement>(null)

  const src = image ?? assetSrc(defaultImage)

  React.useEffect(() => {
    const card = cardRef.current
    const shine = shineRef.current
    const shadow = shadowRef.current
    if (!card || !shine || !shadow) return

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduce) return

    const handleMouseMove = (event: MouseEvent) => {
      const wHeight = window.innerHeight || 1
      const wWidth = window.innerWidth || 1

      const currentMousePos = { x: event.pageX, y: event.pageY }
      const mouseFromCenter = {
        x: currentMousePos.x - wWidth / 2,
        y: currentMousePos.y - wHeight / 2,
      }

      const maxRotation = 10
      const mouseXRatio = (currentMousePos.x / wWidth) * 2 - 1
      const mouseYRatio = (currentMousePos.y / wHeight) * 2 - 1

      const rotateXDeg = -1 * (mouseYRatio * maxRotation)
      const rotateYDeg = mouseXRatio * maxRotation

      const maxTranslate = 20
      const transX = mouseXRatio * maxTranslate
      const transY = mouseYRatio * maxTranslate

      const dy = event.pageY - wHeight / 2
      const dx = event.pageX - wWidth / 2
      const theta = Math.atan2(dy, dx)
      const angle = (theta * 180) / Math.PI - 90

      const backgroundPositionX = (currentMousePos.x / wWidth) * 100
      const backgroundPositionY = (currentMousePos.y / wHeight) * 50

      shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${
        (currentMousePos.y / wHeight) * 0.7
      }) 0%, rgba(255,255,255, 0) 80%)`

      card.style.transform = `translate3d(${transX}px, ${transY}px, 0) scale(1) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`
      card.style.backgroundPosition = `${backgroundPositionX}% ${backgroundPositionY}%`

      shadow.style.transform = `scale(0.9, 0.9) translateX(${
        mouseFromCenter.x * -0.02 + 12
      }px) translateY(${
        mouseFromCenter.y * -0.02 + 12
      }px) rotateY(${
        (mouseFromCenter.x / 25) * 0.5
      }deg) rotateX(${mouseFromCenter.y / -25}deg)`
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center px-10 py-10",
        className
      )}
    >
      <div
        className="relative"
        style={{
          width,
          height,
          perspective: "1000px",
        }}
      >
        <div
          ref={shadowRef}
          aria-hidden
          className="absolute inset-0 z-1 rounded-[10px] bg-black/50 opacity-80 blur-[25px] transition-transform duration-150 ease-out will-change-transform"
          style={{
            transform: "scale(0.9) translateY(10px)",
          }}
        />
        <div
          ref={cardRef}
          className="absolute inset-0 z-2 rounded-[10px] bg-center transition-[transform,background-position] duration-150 ease-out will-change-[transform,background-position]"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${src})`,
            backgroundSize: "450%",
            backgroundPosition: "50% 50%",
          }}
        >
          <div className="relative size-full rounded-[10px] border border-white/20 bg-black/10">
            <div
              ref={shineRef}
              aria-hidden
              className="absolute inset-0 z-10 rounded-[10px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerspectiveCard
