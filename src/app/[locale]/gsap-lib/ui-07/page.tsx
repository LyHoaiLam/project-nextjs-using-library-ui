"use client"
import React, { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./common/style.css"

export default function Scroll3DCarousel() {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<SVGSVGElement | null>(null)
  const arrowPathRef = useRef<SVGPathElement | null>(null)

  const cardsnew = useMemo(
    () => [
      {
        title: "One",
        des: "Description One",
        src: "/images/France-1.jpg",
      },
      {
        title: "Two",
        des: "Description Two",
        src: "/images/France-2.jpg",
      },
      {
        title: "Three",
        des: "Description Three",
        src: "/images/France-3.jpg",
      },
      {
        title: "Four",
        des: "Description Four",
        src: "/images/Japan-1.jpg",
      },
      {
        title: "Five",
        des: "Description Five",
        src: "/images/Japan-2.jpg",
      },
      {
        title: "Six",
        des: "Description Six",
        src: "/images/Vietnam-2.jpg",
      },
      {
        title: "Seven",
        des: "Description Seven",
        src: "/images/Vietnam-3.jpg",
      },
    ],
    []
  )

  const colors = useMemo(() => ["255,90,80", "125,250,225", "225,150,225"], [])

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".sc3d-card")

      const tl = gsap
        .timeline({ defaults: { duration: 2 } })
        .set(cardEls, {
          backgroundColor: (i) => `rgba(${colors[gsap.utils.wrap(0, colors.length, i)]},0.35)`,
          backgroundImage: (i, t, a) =>
            `${
              i === a.length - 1
                ? "radial-gradient(ellipse at 330px 120px, rgba(0,0,0,0) 30%, rgba(0,0,0,0.9) 150%)"
                : "radial-gradient(ellipse at 2500px -400px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 60%)"
            }, var(--card-bg)`,
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
              "radial-gradient(ellipse at 150px 250px, rgba(0,0,0,0) 80%, rgba(0,0,0,0.9) 300%), var(--card-bg)",
            backgroundBlendMode: "multiply",
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
              "radial-gradient(ellipse at -1000px 500px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 50%), var(--card-bg)",
            backgroundBlendMode: "multiply",
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

      function initST(timeline: gsap.core.Timeline) {
        if (reduceMotion) {
          gsap.set(document.body, { overflow: "auto" })
          return
        }

        gsap.set(document.body, { overflow: "scroll" })

        gsap.to(timeline, {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "0 0",
            end: "100% 100%",
            scrub: true,
            pin: carouselRef.current,
          },
        })

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
      document.body.style.overflow = ""
    }
  }, [colors])

  return (
    <>
      <div ref={mainRef} className="sc3d-main">
        <div ref={carouselRef} className="sc3d-carousel">
          {cardsnew.map((item, index) => (
            <div
              key={index}
              className="sc3d-card"
              style={
                {
                  backgroundImage: `var(--card-overlay), url(${item.src})`,
                  ["--card-bg" as string]: `url(${item.src})`,
                  ["--card-overlay" as string]:
                    "linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,0,0,0.05))",
                } as React.CSSProperties
              }
            >
              <div className="sc3d-card-overlay" />
              <div className="sc3d-card-content">
                <h3 className="sc3d-card-title">{item.title}</h3>
                <p className="sc3d-card-des">{item.des}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <svg ref={arrowRef} className="sc3d-arrow" viewBox="0 0 2 10" aria-hidden="true">
          <path ref={arrowPathRef} stroke="#333" d="M0,0 0,0" />
        </svg> */}
      </div>
    </>
  )
}
