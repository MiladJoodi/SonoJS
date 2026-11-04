"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "./icons"

export type OrbitConfig = {
  id: number
  /** Orbit diameter as a factor of `size` (can exceed 1). */
  radiusFactor: number
  /** Seconds per full rotation. */
  speed: number
  icon: React.ReactNode
  iconSize: number
  orbitColor?: string
  orbitThickness?: number
}

export type BeamCircleProps = {
  /** Overall stage diameter in px. Default 300. */
  size?: number
  orbits?: OrbitConfig[]
  /** Node in the center hub. Defaults to the Next.js mark. */
  centerIcon?: React.ReactNode
  className?: string
}

export {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
  type TechIconProps,
} from "./icons"

const DEFAULT_ORBITS: OrbitConfig[] = [
  {
    id: 1,
    radiusFactor: 0.15,
    speed: 7,
    icon: <ReactIcon />,
    iconSize: 22,
    orbitColor: "color-mix(in oklab, var(--primary) 35%, transparent)",
    orbitThickness: 1.5,
  },
  {
    id: 2,
    radiusFactor: 0.35,
    speed: 12,
    icon: <TypescriptIcon />,
    iconSize: 26,
    orbitThickness: 1.5,
  },
  {
    id: 3,
    radiusFactor: 0.55,
    speed: 9,
    icon: <TailwindIcon />,
    iconSize: 28,
    orbitColor: "rgba(14, 215, 181, 0.4)",
    orbitThickness: 2,
  },
  {
    id: 4,
    radiusFactor: 0.75,
    speed: 15,
    icon: <NextjsIcon />,
    iconSize: 32,
    orbitThickness: 1,
  },
]

function rotationTransition(
  duration: number,
  reduceMotion: boolean | null
): Transition {
  if (reduceMotion) {
    return { duration: 0 }
  }
  return {
    repeat: Infinity,
    duration,
    ease: "linear",
  }
}

export function BeamCircle({
  size = 300,
  orbits: customOrbits,
  centerIcon,
  className,
}: BeamCircleProps) {
  const reduceMotion = useReducedMotion()
  const orbitsData = customOrbits ?? DEFAULT_ORBITS
  const halfSize = size / 2
  const hubSize = halfSize * 0.2

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-transparent",
        className
      )}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {orbitsData.map((orbit) => {
          const orbitDiameter = size * orbit.radiusFactor
          const orbitRadius = orbitDiameter / 2

          return (
            <React.Fragment key={orbit.id}>
              <div
                aria-hidden
                className={cn(
                  "absolute rounded-full border border-dashed",
                  !orbit.orbitColor && "border-foreground/30"
                )}
                style={{
                  width: orbitDiameter,
                  height: orbitDiameter,
                  top: halfSize - orbitRadius,
                  left: halfSize - orbitRadius,
                  borderColor: orbit.orbitColor,
                  borderWidth: orbit.orbitThickness ?? 1,
                }}
              />

              <motion.div
                className="absolute inset-0"
                style={{ width: size, height: size }}
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={rotationTransition(orbit.speed, reduceMotion)}
              >
                <div
                  className="absolute"
                  style={{
                    top: halfSize,
                    left: halfSize + orbitRadius,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="grid place-content-center rounded-full border border-border/70 bg-card shadow-soft"
                    style={{
                      width: orbit.iconSize,
                      height: orbit.iconSize,
                    }}
                    animate={reduceMotion ? undefined : { rotate: -360 }}
                    transition={rotationTransition(orbit.speed, reduceMotion)}
                  >
                    {React.isValidElement(orbit.icon)
                      ? React.cloneElement(
                          orbit.icon as React.ReactElement<{ size?: number }>,
                          { size: orbit.iconSize * 0.7 }
                        )
                      : orbit.icon}
                  </motion.div>
                </div>
              </motion.div>
            </React.Fragment>
          )
        })}

        <div className="absolute inset-0 z-10 grid place-content-center">
          <motion.div
            className="grid place-content-center rounded-full border border-border/70 bg-card shadow-soft"
            style={{ width: hubSize, height: hubSize }}
            animate={
              reduceMotion ? undefined : { scale: [1, 1.1, 1] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
          >
            {centerIcon ?? (
              <NextjsIcon size={Math.max(14, halfSize * 0.1)} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BeamCircle
