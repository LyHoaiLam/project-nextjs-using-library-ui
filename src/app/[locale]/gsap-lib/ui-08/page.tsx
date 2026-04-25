"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import "./common/style.css"
import { dataTestFour } from "./common/mocks"
import CardContent from "./common/card-content"
import { IconNext, IconPrevious } from "@/src/assets"

type TriggerWithWrap = ScrollTrigger & { wrapping?: boolean }

export default function InfiniteCardGallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<(HTMLLIElement | null)[]>([])
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const prevRef = useRef<HTMLButtonElement | null>(null)

  const whooshRef = useRef<HTMLAudioElement | null>(null)
  const triggerRef = useRef<TriggerWithWrap | null>(null)
  const audioUnlockedRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (reduceMotion) return

    // Audio
    const audio = new Audio("/audios/whoosh-two.mp3")
    audio.volume = 0.5
    audio.preload = "auto"
    whooshRef.current = audio

    const unlockAudio = async () => {
      const a = whooshRef.current
      if (!a || audioUnlockedRef.current) return

      try {
        a.muted = true
        a.currentTime = 0

        const playPromise = a.play()
        if (playPromise) {
          await playPromise
        }

        a.pause()
        a.currentTime = 0
        a.muted = false
        audioUnlockedRef.current = true
      } catch {
        // Browser vẫn chưa cho phép thì bỏ qua, chờ click sau
      }
    }

    const playWhoosh = () => {
      const a = whooshRef.current
      if (!a || !audioUnlockedRef.current) return

      a.pause()
      a.currentTime = 0

      a.play().catch(() => {
        // tránh unhandledRejection
      })
    }

    const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]
    const SPACING = 0.2
    const CARD_SNAP = gsap.utils.snap(SPACING)

    const BUILD_LOOP = (CARDS: HTMLElement[], spacing: number) => {
      const OVERLAP = Math.ceil(1 / spacing)
      const START = CARDS.length * spacing + 0.5
      const LOOP_TIME = (CARDS.length + OVERLAP) * spacing + 1

      const RAW = gsap.timeline({ paused: true })
      const LOOP = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat(this: gsap.core.Timeline & { _time: number; _dur: number; _tTime: number }) {
          if (this._time === this._dur) {
            this._tTime += this._dur - 0.01
          }
        },
      })

      const L = CARDS.length + OVERLAP * 2

      gsap.set(CARDS, { xPercent: 5000, opacity: 0, scale: 0 })

      for (let i = 0; i < L; i++) {
        const index = i % CARDS.length
        const item = CARDS[index]
        const time = i * spacing

        RAW.fromTo(
          item,
          { opacity: 0 },
          {
            opacity: 1,
            delay: 0.25,
            duration: 0.25,
            yoyo: true,
            ease: "none",
            repeat: 1,
            immediateRender: false,
          },
          time
        )
          .fromTo(
            item,
            { scale: 0 },
            {
              scale: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "none",
              immediateRender: false,
              onStart: playWhoosh,
            },
            time
          )
          .fromTo(
            item,
            { xPercent: 250 },
            {
              xPercent: -250,
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            time
          )

        if (i <= CARDS.length) {
          LOOP.add("label" + i, time)
        }
      }

      RAW.time(START)

      LOOP.to(RAW, {
        time: LOOP_TIME,
        duration: LOOP_TIME - START,
        ease: "none",
      }).fromTo(
        RAW,
        { time: OVERLAP * spacing + 1 },
        {
          time: START,
          duration: START - (OVERLAP * spacing + 1),
          immediateRender: false,
          ease: "none",
        }
      )

      return LOOP
    }

    let iteration = 0
    const LOOP = BUILD_LOOP(cards, SPACING)

    const SCRUB = gsap.to(LOOP, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
    })

    const wrapForward = () => {
      const TRIGGER = triggerRef.current
      if (!TRIGGER) return
      iteration++
      TRIGGER.wrapping = true
      TRIGGER.scroll(TRIGGER.start + 1)
    }

    const wrapBackward = () => {
      const TRIGGER = triggerRef.current
      if (!TRIGGER) return
      iteration--
      if (iteration < 0) {
        iteration = 9
        LOOP.totalTime(LOOP.totalTime() + LOOP.duration() * 10)
      }
      TRIGGER.wrapping = true
      TRIGGER.scroll(TRIGGER.end - 1)
    }

    const SCRUB_TO = (totalTime: number) => {
      const TRIGGER = triggerRef.current
      if (!TRIGGER) return

      const PROGRESS = (totalTime - LOOP.duration() * iteration) / LOOP.duration()
      if (PROGRESS > 1) {
        wrapForward()
      } else if (PROGRESS < 0) {
        wrapBackward()
      } else {
        TRIGGER.scroll(TRIGGER.start + PROGRESS * (TRIGGER.end - TRIGGER.start))
      }
    }

    const TRIGGER = ScrollTrigger.create({
      start: 0,
      end: "+=3000",
      pin: galleryRef.current,
      onUpdate: (self) => {
        const t = self as TriggerWithWrap
        if (t.progress === 1 && t.direction > 0 && !t.wrapping) {
          wrapForward()
        } else if (t.progress < 1e-5 && t.direction < 0 && !t.wrapping) {
          wrapBackward()
        } else {
          SCRUB.vars.totalTime = CARD_SNAP((iteration + t.progress) * LOOP.duration())
          SCRUB.invalidate().restart()
          t.wrapping = false
        }
      },
    }) as TriggerWithWrap

    TRIGGER.wrapping = false
    triggerRef.current = TRIGGER

    const onNext = async () => {
      await unlockAudio()
      SCRUB_TO((SCRUB.vars.totalTime as number) + SPACING)
    }

    const onPrev = async () => {
      await unlockAudio()
      SCRUB_TO((SCRUB.vars.totalTime as number) - SPACING)
    }

    const onFirstPointerDown = () => {
      void unlockAudio()
    }

    nextRef.current?.addEventListener("click", onNext)
    prevRef.current?.addEventListener("click", onPrev)
    window.addEventListener("pointerdown", onFirstPointerDown, { once: true })

    ScrollTrigger.refresh()

    return () => {
      nextRef.current?.removeEventListener("click", onNext)
      prevRef.current?.removeEventListener("click", onPrev)
      window.removeEventListener("pointerdown", onFirstPointerDown)

      triggerRef.current?.kill()
      triggerRef.current = null

      SCRUB.kill()
      LOOP.kill()

      whooshRef.current?.pause()
      whooshRef.current = null
      audioUnlockedRef.current = false
    }
  }, [])

  return (
    <div className="gallery" ref={galleryRef}>
      <ul className="gallery__content">
        {dataTestFour.map((item, idx) => (
          <li
            key={idx}
            className="gallery__card card"
            ref={(el) => {
              cardsRef.current[idx] = el
            }}
          >
            <div className="card__card">
              <CardContent
                idx={idx}
                reflection={false}
                PICS={item.image}
                TITLES={item.title}
                TYPE={item.type}
              />
            </div>

            <div className="card__reflection" aria-hidden="true">
              <CardContent
                idx={idx}
                reflection={true}
                PICS={item.image}
                TITLES={item.title}
                TYPE={item.type}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="gallery__actions">
        <button ref={prevRef} className="gallery__prev" type="button" aria-label="Previous">
          <span className="sr-only">Prev</span>
          <IconPrevious />
        </button>

        <button ref={nextRef} className="gallery__next" type="button" aria-label="Next">
          <span className="sr-only">Next</span>
          <IconNext />
        </button>
      </div>
    </div>
  )
}
