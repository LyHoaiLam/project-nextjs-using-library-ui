"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollSmoother from "gsap/ScrollSmoother"
import { IconPlay } from "@/src/assets"
import "./style.css"

export default function SmoothOverlappingSections() {
  const t = useTranslations("GsapLib")

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

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
        <div className="mt-9 fixed inset-0 overflow-hidden" ref={wrapperRef}>
          <div className="smooth-content" ref={contentRef}>
            {/* SECTION 1 */}
            <section className="max-w-5xl px-[2em] py-[8em] m-auto">
              <article className="grid">
                <header className="overlapping" data-speed="1.25">
                  <p className="text-black dark:text-white text-[clamp(2em,5vw,6em)] tracking-[0.5rem] leading-none mt-0 font-dancing-script">
                    {t("titleOne")}
                    <br />
                    {t("titleOne2")}
                  </p>
                  <p className="text-black dark:text-white font-dancing-script">
                    {t("titleConentOne")}
                  </p>
                </header>

                <div className="relative flex justify-center items-center overlapping-video-bg">
                  <div className="h-full overflow-hidden">
                    <div className="h-[120%]">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia-1.webp"
                        loading="eager"
                        className="block max-w-full opacity-[0.8]"
                        alt=""
                      />
                    </div>
                  </div>
                  <IconPlay className="absolute w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>

            {/* SECTION 2 */}
            <section className="max-w-5xl px-[2em] py-[8em] m-auto">
              <article className="grid">
                <header className="reverse-overlapping z-20" data-speed="1.25">
                  <p className="text-black dark:text-white text-[clamp(2em,5vw,6em)] tracking-[0.5rem] leading-none mt-0 font-dancing-script">
                    {t("titleTwo")}
                  </p>
                </header>

                <div className="relative flex justify-center items-center reverse-overlapping-video-bg">
                  <div className="h-full overflow-hidden">
                    <div className="h-[120%]">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia-3.jpg"
                        className="block max-w-full opacity-[0.8]"
                        loading="eager"
                        alt=""
                      />
                    </div>
                  </div>
                  <IconPlay className="absolute w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>

            {/* SECTION 3 */}
            <section className="max-w-5xl px-[2em] py-[8em] m-auto">
              <article className="grid">
                <header className="overlapping" data-speed="1.25">
                  <p className="text-black dark:text-white text-[clamp(2em,5vw,6em)] tracking-[0.5rem] leading-none mt-0 font-dancing-script">
                    {t("titleThree")}
                  </p>
                  <p className="text-black dark:text-white font-dancing-script">
                    {t("titleContentThree")}
                  </p>
                </header>

                <div className="relative flex justify-center items-center overlapping-video-bg">
                  <div className="h-full overflow-hidden">
                    <div className="h-[120%]">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia.jpg"
                        className="block max-w-full opacity-[0.8]"
                        loading="eager"
                        alt=""
                      />
                    </div>
                  </div>

                  <IconPlay className="absolute w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>

            {/* SECTION 4 */}
            <section className="max-w-5xl px-[2em] py-[8em] m-auto">
              <article className="grid">
                <header className="reverse-overlapping z-20" data-speed="1.25">
                  <p className="text-black dark:text-white text-[clamp(2em,5vw,6em)] tracking-[0.5rem] leading-none mt-0 font-dancing-script">
                    {t("titleFour")}
                  </p>
                  <p className="text-black dark:text-white font-dancing-script">
                    {t("titleContentFour")}
                  </p>
                </header>

                <div className="relative flex justify-center items-center reverse-overlapping-video-bg">
                  <div className="h-full overflow-hidden">
                    <div className="image-child">
                      <Image
                        width={1000}
                        height={1000}
                        data-speed="auto"
                        src="/images/bali-indonesia-4.jpg"
                        className="block max-w-full opacity-[0.8]"
                        loading="eager"
                        alt=""
                      />
                    </div>
                  </div>

                  <IconPlay className="absolute w-26 h-26 text-black dark:text-white" />
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
