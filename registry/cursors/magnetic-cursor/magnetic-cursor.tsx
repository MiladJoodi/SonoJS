"use client"

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export interface MagneticProps {
  magneticDistance?: number
  strength?: number
  stiffness?: number
  damping?: number
  /** Max tilt in degrees when pointer is close. */
  tilt?: number
  children: ReactNode | ((isHovering: boolean) => ReactNode)
  className?: string
}

/**
 * Pulls children toward the pointer with a soft 3D tilt + glow.
 */
export function Magnetic({
  magneticDistance = 180,
  strength = 0.55,
  stiffness = 120,
  damping = 14,
  tilt = 10,
  children,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 })
  const [isHovering, setIsHovering] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || !ref.current) {
        x.set(0)
        y.set(0)
        rotateX.set(0)
        rotateY.set(0)
        setIsHovering(false)
        return
      }
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < magneticDistance) {
        const pull = Math.pow(1 - dist / magneticDistance, 0.55)
        x.set(dx * pull * strength)
        y.set(dy * pull * strength)
        rotateY.set((dx / rect.width) * tilt * pull)
        rotateX.set((-dy / rect.height) * tilt * pull)
        setIsHovering(true)
      } else {
        x.set(0)
        y.set(0)
        rotateX.set(0)
        rotateY.set(0)
        setIsHovering(false)
      }
    },
    [x, y, rotateX, rotateY, magneticDistance, strength, tilt, reducedMotion]
  )

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [onMouseMove])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 600,
        display: "inline-block",
      }}
    >
      {typeof children === "function" ? children(isHovering) : children}
    </motion.div>
  )
}

export interface MagneticCursorProps extends MagneticProps {}

/** Alias for {@link Magnetic} — installable cursor slug name. */
export function MagneticCursor(props: MagneticCursorProps) {
  return <Magnetic {...props} />
}
