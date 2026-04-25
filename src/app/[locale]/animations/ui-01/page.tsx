"use client"
import { useEffect, useRef } from "react"
import { cards } from "./common/data"
import "./common/style.css"

export default function BentoGridReveal() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const elements = root.querySelectorAll<HTMLElement>(".card:not(.hero)")

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("reveal"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add("reveal")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,

        rootMargin: "0px 0px -50% 0px", //cho scroll lên 50% thì mới bắt đầu reveal, giúp hiệu ứng mượt hơn
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bento-section">
      <div className="container" ref={rootRef}>
        <header>
          <h2>Latest Stories</h2>
        </header>

        <div className="bento-grid">
          <a href="#" className="card hero">
            <div className="visual">
              <picture>
                <source
                  srcSet="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/bento-grid/images/tiger.avif"
                  type="image/avif"
                />
                <img
                  src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/bento-grid/images/tiger.webp"
                  alt="Cute cartoon tiger illustration"
                  width="512"
                  height="512"
                  loading="lazy"
                />
              </picture>
            </div>
            <div className="content">
              <small>FEATURED STORY</small>
              <h1>Embark on Roaring Adventures with A Tiger&apos;s Tale</h1>
              <small>January 8, 2024</small>
            </div>
          </a>

          {cards.map((c) => (
            <a href="#" className="card" key={c.title}>
              <div className="visual">
                <picture>
                  <img src={c.webp} alt={c.alt} width="512" height="512" loading="lazy" />
                </picture>
              </div>
              <div className="content">
                <small>FEATURED STORY</small>
                {c.h === "h3" ? <h3>{c.title}</h3> : <h4>{c.title}</h4>}
                <small>{c.date}</small>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
