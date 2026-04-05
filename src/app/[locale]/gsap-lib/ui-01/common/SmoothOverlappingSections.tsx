"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollSmoother from "gsap/ScrollSmoother"
import Image from "next/image"
import { IconPlay } from "@/src/assets"
import "./style.css"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function SmoothOverlappingSections() {
  const t = useTranslations("GsapLib")

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
    // gsap.config({ trialWarn: false })

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (reduceMotion) return

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 3,
      effects: true,
    })

    ScrollTrigger.refresh()

    return () => {
      smoother?.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      gsap.globalTimeline.clear()
    }
  }, [])

  return (
    <>
      <div className="h-full bg-white dark:bg-[#0c141d]">
        <div className="smooth-wrapper" ref={wrapperRef}>
          <div className="smooth-content" ref={contentRef}>
            {/* SECTION 1 */}
            <section className="wrapper">
              <article>
                <header className="overlapping" data-speed="1.25">
                  <h2 className="text-black dark:text-white font-dancing-script">
                    {t("titleOne")}
                    <br />
                    {t("titleOne2")}
                  </h2>
                  <p className="text-black dark:text-white font-dancing-script">
                    {t("titleConentOne")}
                  </p>
                </header>

                <div className="video-bg overlapping-video-bg">
                  <div className="image-parent">
                    <div className="image-child">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia-1.webp"
                        loading="eager"
                        className="img"
                        alt=""
                      />
                    </div>
                  </div>
                  <IconPlay className="w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>

            {/* SECTION 2 */}
            <section className="wrapper">
              <article>
                <header className="reverse-overlapping" data-speed="1.25">
                  <h2 className="text-black dark:text-white font-dancing-script">
                    {t("titleTwo")}
                  </h2>
                </header>

                <div className="video-bg reverse-overlapping-video-bg">
                  <div className="image-parent">
                    <div className="image-child">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia-3.jpg"
                        className="img"
                        loading="eager"
                        alt=""
                      />
                    </div>
                  </div>
                  <IconPlay className="w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>

            {/* SECTION 3 */}
            <section className="wrapper">
              <article>
                <header className="overlapping" data-speed="1.25">
                  <h2 className="text-black dark:text-white font-dancing-script">
                    {t("titleThree")}
                  </h2>
                  <p className="text-black dark:text-white font-dancing-script">
                    {t("titleContentThree")}
                  </p>
                </header>

                <div className="video-bg overlapping-video-bg">
                  <div className="image-parent">
                    <div className="image-child">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia.jpg"
                        className="img"
                        loading="eager"
                        alt=""
                      />
                    </div>
                  </div>

                  <IconPlay className="w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>

            {/* SECTION 4 */}
            <section className="wrapper">
              <article>
                <header className="reverse-overlapping" data-speed="1.25">
                  <h2 className="text-black dark:text-white font-dancing-script">
                    {t("titleFour")}
                  </h2>
                  <p className="text-black dark:text-white font-dancing-script">
                    {t("titleContentFour")}
                  </p>
                </header>

                <div className="video-bg reverse-overlapping-video-bg">
                  <div className="image-parent">
                    <div className="image-child">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia-4.jpg"
                        className="img"
                        loading="eager"
                        alt=""
                      />
                    </div>
                  </div>

                  <IconPlay className="w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
