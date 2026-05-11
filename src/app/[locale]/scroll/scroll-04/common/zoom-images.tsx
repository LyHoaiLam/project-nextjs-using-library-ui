"use client"

import { cn } from "@/src/lib/utils"
import { motion } from "motion/react"
import Image, { ImageProps } from "next/image"

type ZoomProps = {
  className?: string
  imageProps: ImageProps
  zoomType?: "in" | "out"
  initialScale?: number
  finalScale?: number
  duration?: number
  delay?: number
  repeatOnScroll?: boolean
  amount?: number
  fade?: boolean
  ease?: [number, number, number, number]
}

export default function ZoomImage({
  imageProps,
  className = "",
  zoomType = "in",
  initialScale,
  finalScale,
  duration = 0.8,
  delay = 0.3,
  repeatOnScroll = true, // scroll ra → vào lại thì chạy lại
  amount = 0.6, // 60% visible mới trigger
  fade = true,
  ease = [0, 0.1, 0.2, 1.1],
}: ZoomProps) {
  const startScale = initialScale ?? (zoomType === "in" ? 0.5 : 1.2)

  const endScale = finalScale ?? 1

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      style={{ transformOrigin: "center center" }}
      initial={{ opacity: fade ? 0 : 1, scale: startScale }}
      whileInView={{ opacity: 1, scale: endScale }}
      viewport={{ once: !repeatOnScroll, amount }}
      transition={{ duration, delay, ease }}
    >
      <Image
        {...imageProps}
        className={`w-50 h-50 rounded-full object-cover ${imageProps.className || ""}`}
      />
    </motion.div>
  )
}
