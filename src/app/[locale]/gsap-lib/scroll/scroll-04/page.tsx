"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { sectionsData } from "./common/data"
import "./common/style.css"

declare global {
  interface Window {
    __gsapGotoById?: (id: string, dir: 1 | -1) => void
  }
}

export type SectionData = {
  id: string
  navLabel: string
  title: string
  className: string
  bgUrl: string
}

function SplitTitle({ text }: { text: string }) {
  // tách chữ để stagger đẹp như demo GSAP
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ display: "inline-block", willChange: "transform" }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  )
}

function Section({ id, title, className, bgUrl }: Omit<SectionData, "navLabel">) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <div className="background" style={{ "--bg": `url(${bgUrl})` } as React.CSSProperties}>
            <h2 className="section-title">
              <SplitTitle text={title} />
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function GsapSections() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const initRef = useRef(false)
  const currentIndexRef = useRef(-1)
  const animatingRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const root = rootRef.current
    if (!root) return
    const sections = Array.from(root.querySelectorAll<HTMLElement>(".section"))
    const images = Array.from(root.querySelectorAll<HTMLElement>(".background"))
    const headings = Array.from(root.querySelectorAll<HTMLElement>(".section-title"))
    const outerWrappers = Array.from(root.querySelectorAll<HTMLElement>(".wrapper-outer"))
    const innerWrappers = Array.from(root.querySelectorAll<HTMLElement>(".wrapper-inner"))
    const wrap = (index: number, max: number) => (index + max) % max

    gsap.set(outerWrappers, { yPercent: 100 })
    gsap.set(innerWrappers, { yPercent: -100 })

    const gotoSection = (index: number, direction: 1 | -1) => {
      index = wrap(index, sections.length)
      animatingRef.current = true

      const currentIndex = currentIndexRef.current
      const fromTop = direction === -1
      const dFactor = fromTop ? -1 : 1

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },

        onComplete: () => {
          animatingRef.current = false
        },
      })

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 })
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(sections[currentIndex], {
          autoAlpha: 0,
        })
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 })

      const headingChars = Array.from(headings[index].querySelectorAll<HTMLElement>("span"))

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          headingChars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          },
          0.2
        )

      currentIndexRef.current = index
    }

    // wheel (chặn scroll trang)
    const onWheel = (event: WheelEvent) => {
      if (animatingRef.current) return
      event.preventDefault()
      if (event.deltaY < 0) gotoSection(currentIndexRef.current - 1, -1)
      else if (event.deltaY > 0) gotoSection(currentIndexRef.current + 1, 1)
    }

    // double tap
    let lastTap = 0
    const onTouchEnd = (event: TouchEvent) => {
      const now = Date.now()
      const tapLength = now - lastTap
      if (tapLength < 500 && tapLength > 0) {
        gotoSection(currentIndexRef.current + 1, 1)
        event.preventDefault()
      }
      lastTap = now
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    document.addEventListener("touchend", onTouchEnd, { passive: false })

    // init first section
    gotoSection(0, 1)

    return () => {
      window.removeEventListener("wheel", onWheel)
      document.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (
    <div ref={rootRef} className="gsap-sections-root">
      <header className="gsap-header">
        <nav className="gsap-nav">
          {sectionsData.map((s, idx) => (
            <a
              key={idx}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                // điều hướng theo id (tự tính hướng)
                const root = rootRef.current
                if (!root) return
                const sections = Array.from(root.querySelectorAll<HTMLElement>(".section"))
                const targetIndex = sections.findIndex((x) => x.id === s.id)
                const cur = currentIndexRef.current
                if (targetIndex === -1 || targetIndex === cur) return

                window.location.hash = s.id

                // chạy animate ngay bằng cách emit wheel direction (hack nhẹ)
                const dir = (targetIndex > cur ? 1 : -1) as 1 | -1
                window.__gsapGotoById?.(s.id, dir)

                // fallback: nếu không có helper, vẫn đổi hash
              }}
            >
              {s.navLabel}
            </a>
          ))}
        </nav>
      </header>

      {/* Sections */}
      {sectionsData.map((s) => (
        <Section key={s.id} id={s.id} title={s.title} className={s.className} bgUrl={s.bgUrl} />
      ))}
    </div>
  )
}
