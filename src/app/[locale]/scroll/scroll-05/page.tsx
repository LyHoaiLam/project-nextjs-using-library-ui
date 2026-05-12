"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import "./common/style.css"
import Splitting from "splitting"
import Observer from "gsap/dist/Observer"

gsap.registerPlugin(Observer)

// Register plugin (client component)

export type SlideData = {
  title: string
  text: string
  imgUrl: string
}

// --------------------- Utils ---------------------
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

const getCursorPos = (ev: MouseEvent) => ({ x: ev.clientX, y: ev.clientY })

import imagesLoaded from "imagesloaded"
import { SLIDES } from "./common/data"

export async function preloadImages(
  scope: ParentNode,
  selector = ".slide__img-inner"
): Promise<void> {
  const elements = scope.querySelectorAll(selector)

  await new Promise<void>((resolve) => {
    imagesLoaded(elements, { background: true }, () => resolve())
  })
}

class CursorText {
  private el: HTMLElement
  private text: HTMLElement | null
  private bounds: DOMRect
  private rafId: number | null = null

  private cursor = { x: 0, y: 0 }
  private onMouseMove = (ev: MouseEvent) => {
    this.cursor = getCursorPos(ev)
  }

  private renderedStyles = {
    tx: { previous: 0, current: 0, amt: 0.15 },
    ty: { previous: 0, current: 0, amt: 0.15 },
  }

  constructor(el: HTMLElement) {
    this.el = el
    this.text = this.el.querySelector<HTMLElement>(".cursor__text")
    this.el.style.opacity = "0"
    this.bounds = this.el.getBoundingClientRect()

    // allow data-amt override
    const amtStr = this.el.dataset.amt
    if (amtStr) {
      const amt = Number(amtStr)
      if (!Number.isNaN(amt)) {
        this.renderedStyles.tx.amt = amt
        this.renderedStyles.ty.amt = amt
      }
    }

    window.addEventListener("mousemove", this.onMouseMove)

    // Show on first mouse move, then start RAF loop
    const onFirstMove = (ev: MouseEvent) => {
      this.cursor = getCursorPos(ev)

      this.renderedStyles.tx.previous = this.renderedStyles.tx.current = this.cursor.x + 20
      this.renderedStyles.ty.previous = this.renderedStyles.ty.current =
        this.cursor.y - this.bounds.height / 2

      this.el.style.opacity = "1"
      this.rafId = requestAnimationFrame(() => this.render())

      window.removeEventListener("mousemove", onFirstMove)
    }

    window.addEventListener("mousemove", onFirstMove)
  }

  private render() {
    this.renderedStyles.tx.current = this.cursor.x + 20
    this.renderedStyles.ty.current = this.cursor.y - this.bounds.height / 2

    this.renderedStyles.tx.previous = lerp(
      this.renderedStyles.tx.previous,
      this.renderedStyles.tx.current,
      this.renderedStyles.tx.amt
    )
    this.renderedStyles.ty.previous = lerp(
      this.renderedStyles.ty.previous,
      this.renderedStyles.ty.current,
      this.renderedStyles.ty.amt
    )

    this.el.style.transform = `translateX(${this.renderedStyles.tx.previous}px) translateY(${this.renderedStyles.ty.previous}px)`

    this.rafId = requestAnimationFrame(() => this.render())
  }

  destroy() {
    window.removeEventListener("mousemove", this.onMouseMove)
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.rafId = null
  }
}

// --------------------- Slide ---------------------
class Slide {
  DOM: {
    el: HTMLElement
    inner: HTMLElement
    img: HTMLElement
    imgInner: HTMLElement
    content: HTMLElement
    contentImg: HTMLElement
    contentTexts: HTMLElement[]
  }

  isOpen = false

  constructor(el: HTMLElement) {
    const inner = el.querySelector<HTMLElement>(".slide__inner")
    const img = el.querySelector<HTMLElement>(".slide__img")
    const imgInner = el.querySelector<HTMLElement>(".slide__img-inner")
    const content = el.querySelector<HTMLElement>(".slide__content")
    const contentImg = content?.querySelector<HTMLElement>(".slide__content-img")

    if (!inner || !img || !imgInner || !content || !contentImg) {
      throw new Error("Slide DOM structure missing required elements.")
    }

    const contentChildren = Array.from(content.children) as HTMLElement[]
    const contentTexts = contentChildren.filter((item) => item !== contentImg)

    this.DOM = {
      el,
      inner,
      img,
      imgInner,
      content,
      contentImg,
      contentTexts,
    }
  }
}

// --------------------- Component ---------------------
export default function FullscreenScrollingSlideshow() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // scope query cho component
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".slide"))
    const cursor = root.querySelector<HTMLElement>(".cursor")
    const backCtrl = root.querySelector<HTMLElement>(".frame__back")
    const navigationItems = Array.from(
      root.querySelectorAll<HTMLButtonElement>(".frame__nav > .frame__nav-button")
    )

    if (!slides.length || !cursor || !backCtrl || !navigationItems.length) return

    // Splitting transforms [data-splitting] → chars spans
    Splitting()

    const cursorChars = cursor.querySelectorAll<HTMLElement>(".word > .char, .whitespace")
    const backChars = backCtrl.querySelectorAll<HTMLElement>(".word > .char, .whitespace")

    const totalSlides = slides.length
    const slidesArr = slides.map((el) => new Slide(el))

    let current = -1
    let isAnimating = false

    const setCurrentSlide = (position: number) => {
      if (current !== -1) {
        slidesArr[current].DOM.el.classList.remove("slide--current")
        navigationItems[current]?.classList.remove("frame__nav-button--current")
      }
      current = position
      slidesArr[current].DOM.el.classList.add("slide--current")
      navigationItems[current]?.classList.add("frame__nav-button--current")
    }

    const toggleCursorBackTexts = (isContent?: "content") => {
      return gsap
        .timeline({
          onStart: () => {
            gsap.set(backChars, { opacity: isContent ? 0 : 1 })
            if (isContent) backCtrl.classList.add("frame__back--show")
          },
          onComplete: () => {
            backCtrl.classList[isContent ? "add" : "remove"]("frame__back--show")
            if (!isContent) backCtrl.classList.remove("frame__back--show")
          },
        })
        .to(cursorChars, {
          duration: 0.1,
          ease: "expo",
          opacity: isContent ? 0 : 1,
          stagger: { amount: 0.5, grid: "auto", from: "random" },
        })
        .to(
          backChars,
          {
            duration: 0.1,
            ease: "expo",
            opacity: isContent ? 1 : 0,
            stagger: { amount: 0.5, grid: "auto", from: "random" },
          },
          0
        )
    }

    const hideContent = (slide: Slide, animate = false) => {
      isAnimating = true

      const complete = () => {
        slide.isOpen = false
        isAnimating = false
      }

      if (animate) {
        gsap
          .timeline({
            defaults: { duration: 1.6, ease: "power3.inOut" },
            onComplete: complete,
          })
          .addLabel("start", 0)
          .to(slide.DOM.img, { yPercent: 0 }, "start")
          .to(slide.DOM.imgInner, { yPercent: 0, scaleY: 1 }, "start")
      } else {
        gsap.set(slide.DOM.img, { yPercent: 0 })
        gsap.set(slide.DOM.imgInner, { yPercent: 0, scaleY: 1 })
        complete()
      }
    }

    const showContent = (position: number) => {
      if (isAnimating) return
      isAnimating = true

      const slide = slidesArr[position]
      slide.isOpen = true

      gsap
        .timeline({
          defaults: { duration: 1.6, ease: "power3.inOut" },
          onComplete: () => {
            isAnimating = false
          },
        })
        .addLabel("start", 0)
        // .add(() => toggleCursorBackTexts("content"), "start")
        .add(toggleCursorBackTexts("content"), "start")

        .to(slide.DOM.img, { yPercent: -100 }, "start")
        .set(slide.DOM.imgInner, { transformOrigin: "50% 100%" }, "start")
        .to(slide.DOM.imgInner, { yPercent: 100, scaleY: 2 }, "start")
        .to(
          slide.DOM.contentImg,
          {
            startAt: { transformOrigin: "50% 0%", scaleY: 1.5 },
            scaleY: 1,
          },
          "start"
        )
    }

    const navigate = (newPosition: number) => {
      if (isAnimating) return
      isAnimating = true

      navigationItems[current]?.classList.remove("frame__nav-button--current")
      navigationItems[newPosition]?.classList.add("frame__nav-button--current")

      const direction =
        current < newPosition
          ? current === 0 && newPosition === totalSlides - 1
            ? "prev"
            : "next"
          : current === totalSlides - 1 && newPosition === 0
            ? "next"
            : "prev"

      const currentSlide = slidesArr[current]
      current = newPosition
      const upcomingSlide = slidesArr[current]

      gsap
        .timeline({
          defaults: { duration: 1.6, ease: "power3.inOut" },
          onComplete: () => {
            currentSlide.DOM.el.classList.remove("slide--current")
            if (currentSlide.isOpen) hideContent(currentSlide)
            isAnimating = false
          },
        })
        .addLabel("start", 0)
        .set([currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner], {
          transformOrigin: direction === "next" ? "50% 0%" : "50% 100%",
        })
        .set(upcomingSlide.DOM.el, { yPercent: direction === "next" ? 100 : -100 }, "start")
        .set(upcomingSlide.DOM.inner, { yPercent: direction === "next" ? -100 : 100 }, "start")
        .add(() => {
          upcomingSlide.DOM.el.classList.add("slide--current")
        }, "start")
        .add(() => {
          if (currentSlide.isOpen) toggleCursorBackTexts()
        }, "start")
        .to(currentSlide.DOM.el, { yPercent: direction === "next" ? -100 : 100 }, "start")
        .to(currentSlide.DOM.imgInner, { scaleY: 2 }, "start")
        .to([upcomingSlide.DOM.el, upcomingSlide.DOM.inner], { yPercent: 0 }, "start")
        .to(
          upcomingSlide.DOM.imgInner,
          { ease: "power2.inOut", startAt: { scaleY: 2 }, scaleY: 1 },
          "start"
        )
    }

    const next = () => navigate(current < totalSlides - 1 ? current + 1 : 0)
    const prev = () => navigate(current > 0 ? current - 1 : totalSlides - 1)

    // Init cursor
    const cursorInstance = new CursorText(cursor)

    // Navigation click handlers
    const navHandlers = navigationItems.map((btn, position) => {
      const handler = () => {
        if (current === position || isAnimating) return
        navigate(position)
      }
      btn.addEventListener("click", handler)
      return { btn, handler }
    })

    // Back click handler
    const onBackClick = () => {
      if (isAnimating) return
      isAnimating = true
      toggleCursorBackTexts()
      hideContent(slidesArr[current], true)
    }
    backCtrl.addEventListener("click", onBackClick)

    // Img click -> show content
    const imgHandlers = slidesArr.map((slide, position) => {
      const handler = () => showContent(position)
      slide.DOM.img.addEventListener("click", handler)
      return { el: slide.DOM.img, handler }
    })

    // GSAP Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      onDown: () => !isAnimating && prev(),
      onUp: () => !isAnimating && next(),
      wheelSpeed: -1,
      tolerance: 10,
    })

    // Set current slide
    setCurrentSlide(0)

    // preload images and remove loading class
    document.body.classList.add("loading")
    preloadImages(root, ".slide__img-inner")
      .then(() => document.body.classList.remove("loading"))
      .catch(() => document.body.classList.remove("loading"))

    return () => {
      // cleanup
      observer?.kill()
      cursorInstance.destroy()

      backCtrl.removeEventListener("click", onBackClick)
      navHandlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler))
      imgHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler))

      gsap.killTweensOf("*")
    }
  }, [])

  return (
    <div ref={rootRef}>
      <main>
        <div className="frame">
          <div className="frame__title">
            <a
              className="frame__title-prev"
              href="https://tympanus.net/Development/ImageToContent/"
            >
              Previous demo
            </a>
            <h1 className="frame__title-main">Fullscreen Scrolling Slideshow</h1>
            <a
              aria-label="Back to the article"
              className="frame__title-back"
              href="https://tympanus.net/codrops/?p=64521"
            >
              <span>&rarr;</span>
            </a>
          </div>

          <nav className="frame__nav">
            {SLIDES.map((s, i) => (
              <button key={i} className="frame__nav-button unbutton">
                {s.title}
              </button>
            ))}
          </nav>

          <button className="frame__back unbutton">
            <span data-splitting>&larr; Go back</span>
          </button>

          <span className="frame__info">&darr; Scroll or drag &darr;</span>
        </div>

        <div className="slides">
          {SLIDES.map((s, i) => {
            const reverse = i % 2 === 1 // giống demo: slide 2/4/.. đảo vị trí img/content
            return (
              <div className="slide" key={i}>
                <div className="slide__inner">
                  {!reverse && (
                    <div className="slide__img">
                      <div
                        className="slide__img-inner"
                        style={{ backgroundImage: `url(${s.imgUrl})` }}
                      />
                    </div>
                  )}

                  <div className="slide__content">
                    <div
                      className="slide__content-img"
                      style={{ backgroundImage: `url(${s.imgUrl})` }}
                    />
                    <h2>{s.title}</h2>
                    <p>{s.text}</p>
                  </div>

                  {reverse && (
                    <div className="slide__img">
                      <div
                        className="slide__img-inner"
                        style={{ backgroundImage: `url(${s.imgUrl})` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="cursor" data-amt="0.15">
          <span className="cursor__text" data-splitting>
            + Discover more
          </span>
        </div>
      </main>
    </div>
  )
}
