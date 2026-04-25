"use client"
import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import "./common/style.css"

export default function ScrollCarousel3D() {
  const mainRef = useRef(null)
  const carouselRef = useRef(null)
  const arrowRef = useRef(null)
  const arrowPathRef = useRef(null)

  const cards = useMemo(() => ["7", "6", "5", "4", "3", "2", "1"], [])
  const colors = useMemo(() => ["255,90,80", "125,250,225", "225,150,225"], [])

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    // Respect reduced motion
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray(".sc3d-card")
      const tl = gsap
        .timeline({ defaults: { duration: 2 } })
        .set(cardEls, {
          backgroundColor: (i) => `rgba(${colors[gsap.utils.wrap(0, colors.length, i)]},0.7)`,
          backgroundImage: (i, t, a) =>
            i === a.length - 1
              ? "radial-gradient(ellipse at 330px 120px, rgba(0,0,0,0) 30%, #000 150%)"
              : "radial-gradient(ellipse at 2500px -400px, rgba(0,0,0,0) 0%, #000 60%)",
          transformOrigin: "50% 999px -100px",
          backdropFilter: "blur(20px)",
          x: "-50%",
          y: "-45%",
          z: -500,
          rotateX: 2,
        })
        .to(
          cardEls,
          {
            z: 10,
            rotateX: -3,
            stagger: -1,
          },
          0
        )
        .to(
          cardEls,
          {
            yPercent: 100,
            stagger: -1,
            ease: "back.in(2)",
          },
          0
        )
        .to(
          cardEls,
          {
            duration: 1,
            backdropFilter: "blur(8px)",
            backgroundImage:
              "radial-gradient(ellipse at 150px 250px, rgba(0,0,0,0) 80%, #000 300%)",
            stagger: -1,
            ease: "power3.in",
          },
          0
        )
        .to(
          cardEls,
          {
            duration: 1,
            backdropFilter: "blur(1px)",
            backgroundImage:
              "radial-gradient(ellipse at -1000px 500px, rgba(0,0,0,0) 0%, #000 50%)",
            stagger: -1,
            ease: "sine.in",
          },
          1
        )
        .to(
          cardEls,
          {
            duration: 0.1,
            autoAlpha: 0,
            stagger: -1,
          },
          1.9
        )
        .pause(1)

      // Intro: fade-in carousel + animate tl progress back a bit then init ST
      const intro = gsap.timeline()
      intro
        .to(carouselRef.current, {
          duration: 0.8,
          opacity: 1,
          ease: "power2.inOut",
        })
        .fromTo(
          tl,
          { progress: 1 },
          {
            duration: 1.5,
            progress: 0.07,
            ease: "expo",
            onComplete: () => initST(tl),
          },
          0
        )

      function initST(timeline) {
        if (reduceMotion) {
          // nếu reduce motion: show carousel luôn, không pin/scrub
          gsap.set(document.body, { overflow: "auto" })
          return
        }

        gsap.set(document.body, { overflow: "scroll" })

        gsap.to(timeline, {
          progress: 1,
          scrollTrigger: {
            trigger: mainRef.current,
            start: "0 0",
            end: "100% 100%",
            scrub: true,
            pin: carouselRef.current,
          },
        })

        // Arrow looping animation
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.5 })
          .to(arrowPathRef.current, {
            attr: { d: "M0,0 0,10" },
            ease: "power3.inOut",
          })
          .to(arrowPathRef.current, {
            attr: { d: "M0,10 0,10" },
            ease: "power3.inOut",
          })

        // Fade arrow out quickly after scroll starts
        gsap.to(arrowRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: mainRef.current,
            start: "0 0",
            end: "9px 0",
            scrub: 1,
          },
        })
      }
    }, mainRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      // (optional) restore overflow
      document.body.style.overflow = ""
    }
  }, [colors])

  return (
    <>
      <main ref={mainRef} className="sc3d-main">
        <div ref={carouselRef} className="sc3d-carousel">
          {cards.map((n) => (
            <div key={n} className="sc3d-card">
              {n}
            </div>
          ))}
        </div>

        <svg ref={arrowRef} className="sc3d-arrow" viewBox="0 0 2 10" aria-hidden="true">
          <path ref={arrowPathRef} stroke="#333" d="M0,0 0,0" />
        </svg>
      </main>
    </>
  )
}
