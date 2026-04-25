"use client"
import React, { ReactNode, useLayoutEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import "./style.css"

export type SectionItem = {
  key: string
  heading: string
  bgUrl: string
  bgPosition?: string
}

type AnimatedSectionsProps = {
  items?: SectionItem[]
  headerLeft?: ReactNode
  headerRight?: ReactNode

  /* mỗi child = content của 1 section */
  children?: ReactNode
}

export function splitToSpans(text: string) {
  return Array.from(text).map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      className="char"
      style={{ display: "inline-block" }}
      aria-hidden="true"
    >
      {ch === " " ? "\u00A0" : ch}
    </span>
  ))
}

const DEFAULT_ITEMS: SectionItem[] = [
  {
    key: "first",
    heading: "Scroll down",
    bgUrl:
      "https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    key: "second",
    heading: "Animated with GSAP",
    bgUrl:
      "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    key: "third",
    heading: "GreenSock",
    bgUrl:
      "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    key: "fourth",
    heading: "Animation platform",
    bgUrl:
      "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    key: "fifth",
    heading: "Keep scrolling",
    bgUrl:
      "https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75&w=1920",
    bgPosition: "50% 45%",
  },
]

export default function AnimatedSections({
  items,
  headerLeft = "Animated Sections",
  headerRight = "Made By Brian",
  children,
}: AnimatedSectionsProps) {
  const data = useMemo(() => items ?? DEFAULT_ITEMS, [items])

  // normalize children -> array
  const childArray = useMemo(() => React.Children.toArray(children), [children])

  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll("section"))
    const images = Array.from(root.querySelectorAll(".bg"))
    const outerWrappers = Array.from(root.querySelectorAll(".outer"))
    const innerWrappers = Array.from(root.querySelectorAll(".inner"))

    // animate bất kỳ element nào có class .char trong section hiện tại
    const getCharsOfSection = (index: number) =>
      Array.from(sections[index].querySelectorAll(".char")) as HTMLElement[]

    let listening = false
    let direction: "up" | "down" = "down"
    let current: number | undefined = undefined
    let next = 0

    const touch = { startX: 0, startY: 0, dx: 0, dy: 0 }

    const tlDefaults: gsap.TweenVars = {
      ease: "slow.inOut",
      duration: 1.25,
    }

    function revealChars() {
      const chars = getCharsOfSection(next)
      if (!chars.length) return gsap.timeline()

      gsap.set(chars, { autoAlpha: 0, yPercent: 100 })
      return gsap.to(chars, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
        stagger: { each: 0.02, from: "random" },
      })
    }

    gsap.set(outerWrappers, { yPercent: 100 })
    gsap.set(innerWrappers, { yPercent: -100 })

    function slideIn() {
      if (current !== undefined) gsap.set(sections[current], { zIndex: 0 })

      gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 })
      gsap.set(images[next], { yPercent: 0 })

      const tl = gsap.timeline({
        paused: true,
        defaults: tlDefaults,
        onComplete: () => {
          listening = true
          current = next
        },
      })

      tl.to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0)
        .from(images[next], { yPercent: 15 }, 0)
        .add(revealChars(), 0)

      if (current !== undefined) {
        tl.add(gsap.to(images[current], { yPercent: -15, ...tlDefaults }), 0).add(
          gsap
            .timeline()
            .set(outerWrappers[current], { yPercent: 100 })
            .set(innerWrappers[current], { yPercent: -100 })
            .set(images[current], { yPercent: 0 })
            .set(sections[current], { autoAlpha: 0 })
        )
      }

      tl.play(0)
    }

    function slideOut() {
      if (current === undefined) return

      gsap.set(sections[current], { zIndex: 1 })
      gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 })
      gsap.set([outerWrappers[next], innerWrappers[next]], { yPercent: 0 })
      gsap.set(images[next], { yPercent: 0 })

      gsap
        .timeline({
          defaults: tlDefaults,
          onComplete: () => {
            listening = true
            current = next
          },
        })
        .to(outerWrappers[current], { yPercent: 100 }, 0)
        .to(innerWrappers[current], { yPercent: -100 }, 0)
        .to(images[current], { yPercent: 15 }, 0)
        .from(images[next], { yPercent: -15 }, 0)
        .add(revealChars(), ">-1")
        .set(images[current], { yPercent: 0 })
    }

    function handleDirection() {
      listening = false

      if (direction === "down") {
        next = (current ?? -1) + 1
        if (next >= sections.length) next = 0
        slideIn()
      } else {
        next = (current ?? 0) - 1
        if (next < 0) next = sections.length - 1
        slideOut()
      }
    }

    function onWheel(e: WheelEvent) {
      if (!listening) return
      const delta = (e as any).wheelDeltaY ?? -e.deltaY
      direction = delta < 0 ? "down" : "up"
      handleDirection()
    }

    function onTouchStart(e: TouchEvent) {
      if (!listening) return
      const t = e.changedTouches[0]
      touch.startX = t.pageX
      touch.startY = t.pageY
    }

    function onTouchMove(e: TouchEvent) {
      if (!listening) return
      e.preventDefault()
    }

    function onTouchEnd(e: TouchEvent) {
      if (!listening) return
      const t = e.changedTouches[0]
      touch.dx = t.pageX - touch.startX
      touch.dy = t.pageY - touch.startY

      if (touch.dy > 10) direction = "up"
      if (touch.dy < -10) direction = "down"
      handleDirection()
    }

    listening = true
    slideIn()

    document.addEventListener("wheel", onWheel, { passive: true })
    document.addEventListener("touchstart", onTouchStart, { passive: true })
    document.addEventListener("touchmove", onTouchMove, { passive: false })
    document.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("wheel", onWheel as any)
      document.removeEventListener("touchstart", onTouchStart as any)
      document.removeEventListener("touchmove", onTouchMove as any)
      document.removeEventListener("touchend", onTouchEnd as any)
      gsap.globalTimeline.clear()
    }
  }, [data, childArray.length])

  return (
    <div ref={rootRef} className="page">
      <header className="header">
        <div>{headerLeft}</div>
        <div>{headerRight}</div>
      </header>

      {data.map((it, idx) => {
        const child = childArray[idx] // child idx tương ứng section idx

        return (
          <section key={it.key ?? idx} className="section">
            <div className="outer">
              <div className="inner">
                <div
                  className="bg"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${it.bgUrl})`,
                    backgroundPosition: it.bgPosition ?? "center",
                  }}
                >
                  {/* nếu có child thì render child, không thì fallback heading */}
                  {child ? (
                    child
                  ) : (
                    <h2 className="sectionHeading" aria-label={it.heading}>
                      {splitToSpans(it.heading)}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
