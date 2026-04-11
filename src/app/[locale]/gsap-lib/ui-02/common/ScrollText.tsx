"use client"

import { motion } from "motion/react"

type Direction = "left" | "right" | "top" | "bottom"

interface ScrollTextProps {
  children: React.ReactNode
  from?: Direction
  distance?: number
  duration?: number
  delay?: number
}

export default function ScrollText({
  children,
  from = "left",
  distance = 100,
  duration = 0.5,
  delay = 0,
}: ScrollTextProps) {
  const initialPosition = (() => {
    switch (from) {
      case "right":
        return { opacity: 0, x: distance }
      case "top":
        return { opacity: 0, y: -distance }
      case "bottom":
        return { opacity: 0, y: distance }
      case "left":
      default:
        return { opacity: 0, x: -distance }
    }
  })()

  return (
    <motion.div
      initial={initialPosition}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        once: false,
        amount: 0.6,
      }}
      transition={{
        duration,
        delay,
        ease: [0.17, 0.55, 0.55, 1],
      }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  )
}
