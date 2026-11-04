"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@sonojs/ui/lib/utils"

import image01 from "./images/01.jpg"
import image02 from "./images/02.jpg"
import image03 from "./images/03.jpg"
import image04 from "./images/04.jpg"
import image05 from "./images/05.jpg"
import image06 from "./images/06.jpg"
import image07 from "./images/07.jpg"
import image08 from "./images/08.jpg"
import image09 from "./images/09.jpg"
import image10 from "./images/10.jpg"
import image11 from "./images/11.jpg"
import image12 from "./images/12.jpg"
import image13 from "./images/13.jpg"
import image14 from "./images/14.jpg"
import image15 from "./images/15.jpg"
import image16 from "./images/16.jpg"
import image17 from "./images/17.jpg"
import image18 from "./images/18.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export type MarqueeImage = {
  src: string
  alt: string
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
}

export type MarqueeProps = {
  /** Gallery tiles. Defaults to the bundled demo set. */
  images?: MarqueeImage[]
  className?: string
  /** Column count from `sm` and up (2–6). Mobile stays 2. */
  cols?: number
  onImageClick?: (image: MarqueeImage, index: number) => void
}

const BUNDLED = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
].map((asset, index): MarqueeImage => ({
  src: assetSrc(asset),
  alt: `Image marquee frame ${index + 1}`,
}))

const COL_CLASS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
}

function clampCols(cols: number) {
  return Math.min(6, Math.max(2, Math.round(cols)))
}

export function ImageMarquee({
  images,
  className,
  cols = 4,
  onImageClick,
}: MarqueeProps) {
  const reduceMotion = useReducedMotion()
  const columnCount = clampCols(cols)

  const tiles = React.useMemo(() => {
    const source = images && images.length > 0 ? images : BUNDLED
    return [...source, ...source]
  }, [images])

  const groupSize = Math.ceil(tiles.length / columnCount)
  const imageGroups = React.useMemo(
    () =>
      Array.from({ length: columnCount }, (_, index) =>
        tiles.slice(index * groupSize, (index + 1) * groupSize)
      ),
    [columnCount, groupSize, tiles]
  )

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex)
      return
    }
    if (!image.href) return
    const target = image.target ?? "_self"
    if (target === "_blank") {
      window.open(image.href, "_blank", "noopener,noreferrer")
      return
    }
    window.open(image.href, target)
  }

  return (
    <section
      className={cn(
        "mx-auto block h-[400px] overflow-hidden rounded-[12px] bg-background sm:h-[600px]",
        className
      )}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          perspective: "1200px",
          transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-full scale-90 overflow-hidden sm:scale-100">
          <div
            className={cn(
              "relative grid h-full w-full origin-center grid-cols-2 gap-4",
              COL_CLASS[columnCount] ?? COL_CLASS[4]
            )}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={`column-${idx}`}
                animate={
                  reduceMotion
                    ? { y: 0 }
                    : { y: idx % 2 === 0 ? 100 : -100 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: idx % 2 === 0 ? 10 : 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }
                }
                className="relative flex flex-col items-center gap-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-0.5 bg-border"
                />
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx
                  const isClickable = Boolean(image.href || onImageClick)

                  return (
                    <div
                      key={`${image.src}-${imgIdx}`}
                      className="relative"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 bg-border"
                      />
                      <motion.img
                        whileHover={
                          reduceMotion || !isClickable
                            ? undefined
                            : { y: -10 }
                        }
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        src={image.src}
                        alt={image.alt}
                        width={970}
                        height={700}
                        className={cn(
                          "aspect-[970/700] w-full max-w-[200px] rounded-lg object-cover shadow-xl ring ring-border/40 transition-shadow duration-300 hover:shadow-2xl",
                          isClickable && "cursor-pointer"
                        )}
                        onClick={
                          isClickable
                            ? () => handleImageClick(image, globalIndex)
                            : undefined
                        }
                        role={isClickable ? "button" : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                        onKeyDown={
                          isClickable
                            ? (event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault()
                                  handleImageClick(image, globalIndex)
                                }
                              }
                            : undefined
                        }
                      />
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** @deprecated Prefer `ImageMarquee`. */
export const Marquee = ImageMarquee

export default ImageMarquee
