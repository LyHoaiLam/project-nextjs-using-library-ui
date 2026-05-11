"use client"

import { motion, MotionValue, useScroll, useSpring, useTransform } from "motion/react"
import { useRef, ReactNode } from "react"

import Zoom from "./zoom"
import ContentParallax from "./content-parallax"

/* ===== parallax helper ===== */
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

interface ParallaxSectionProps {
  index: number
  children: ReactNode
}

export function ParallaxSection({ index, children }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="section-container">
      <div ref={ref} className="section-inner">
        {children}
      </div>

      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{ y }}
      >
        {`#00${index}`}
      </motion.h2>
    </section>
  )
}

/* ===== MAIN ===== */
export default function Parallax() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div id="example">
      <ParallaxSection index={1}>
        <div className="box bg-red">Section 1</div>
      </ParallaxSection>

      <ParallaxSection index={2}>
        <ContentParallax />
      </ParallaxSection>

      <ParallaxSection index={3}>
        <Zoom />
      </ParallaxSection>

      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  )
}

/* ===== STYLES ===== */
function StyleSheet() {
  return (
    <style>{`
      html {
        scroll-snap-type: y mandatory;
      }

      .section-container {

        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .section-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
        color: white;
      }

      .bg-red { background: #ef4444; }
      .bg-blue { background: #3b82f6; }
      .bg-green { background: #22c55e; }

      .section-container h2 {
        color: #8df0cc;
        margin: 0;
        font-family: monospace;
        font-size: 48px;
        font-weight: 700;
        position: absolute;
        top: 50%;
        left: calc(50% + 180px);
        transform: translateY(-50%);
      }

      .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 5px;
        background: #8df0cc;
        bottom: 40px;
        transform-origin: 0%;
      }
    `}</style>
  )
}
