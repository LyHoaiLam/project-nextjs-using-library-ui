"use client"

import ScrollText from "./common/scroll-text"
import { motion, useScroll, useSpring } from "motion/react"
import { ParallaxSection } from "./common/scroll-parallax"
import ContentParallax from "./common/content-parallax"
import Zoom from "./common/zoom"
import { useTranslations } from "next-intl"
import ZoomImage from "./common/zoom-images"
export default function Page() {
  const { scrollYProgress } = useScroll()

  const t = useTranslations("Scroll")
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="bg-red-400!">
      <ParallaxSection index={1}>
        <div className="flex flex-col gap-10">
          <ScrollText from="top" duration={2}>
            <p className="text-sm leading-5 text-amber-600">{t("scroll04.textOne")}</p>
          </ScrollText>

          <ScrollText from="left" duration={2}>
            <p className="text-sm leading-5 text-red-600">{t("scroll04.textOne")}</p>
          </ScrollText>

          <ScrollText from="right" duration={2}>
            <p className="text-sm leading-5 text-green-600">{t("scroll04.textOne")}</p>
          </ScrollText>

          <ScrollText from="bottom" duration={2}>
            <p className="text-sm leading-5 text-pink-600">{t("scroll04.textOne")}</p>
          </ScrollText>
        </div>
      </ParallaxSection>

      <ParallaxSection index={2}>
        <ContentParallax />
        <ScrollText from="left" distance={200} duration={1.5}>
          <p className="text-sm leading-5 text-green-600">{t("scroll04.textOne")}</p>
        </ScrollText>
      </ParallaxSection>

      <ParallaxSection index={3}>
        <div className="flex flex-col">
          <div
            style={{
              margin: "20px",
              padding: "60px",
              border: "2px solid green",
            }}
          >
            <motion.img
              className="w-50 h-50 relative z-50"
              src="/images/American-3.jpg"
              style={{
                float: "left",
                shapeOutside: "circle(40%)",
                clipPath: "circle(40%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />

            <ScrollText delay={1.5} from="left" distance={200} duration={2}>
              <p className="pl-20">{t("scroll04.textOne")}</p>
            </ScrollText>
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection index={4}>
        <ZoomImage
          imageProps={{
            src: "/images/American-3.jpg",
            alt: "test",
            width: 1000,
            height: 1000,
          }}
          className=""
          repeatOnScroll={true}
          duration={0.9}
          finalScale={1}
          delay={0.5}
        />
      </ParallaxSection>
      <ParallaxSection index={4}>
        <Zoom />
      </ParallaxSection>
      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  )
}
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
        background: #f5f5f5;
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
