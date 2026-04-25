"use client"
import React, { ReactNode, useLayoutEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import "./style.css"

type AnimatedSectionsProps = {
  headerLeft?: ReactNode
  headerRight?: ReactNode
  children?: ReactNode
}

export default function AnimatedSections({
  headerLeft = "",
  headerRight = "Made ",
  children,
}: AnimatedSectionsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const childArray = useMemo(() => React.Children.toArray(children), [children])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll("section"))
    const outerWrappers = Array.from(root.querySelectorAll(".outer"))
    const innerWrappers = Array.from(root.querySelectorAll(".inner"))

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

      const tl = gsap.timeline({
        paused: true,
        defaults: tlDefaults,
        onComplete: () => {
          listening = true
          current = next
        },
      })

      tl.to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0).add(revealChars(), 0)

      if (current !== undefined) {
        // nếu Ngài muốn “parallax bg” thì child tự animate, ở đây chỉ swap section
        tl.add(
          gsap
            .timeline()
            .set(outerWrappers[current], { yPercent: 100 })
            .set(innerWrappers[current], { yPercent: -100 })
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
        .add(revealChars(), ">-1")
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
  }, [childArray.length])

  return (
    <div ref={rootRef} className="page">
      <header className="header">
        <div>{headerLeft}</div>
        <div>{headerRight}</div>
      </header>

      {childArray.map((child, idx) => (
        <section key={idx} className="section">
          <div className="outer">
            <div className="inner">
              {/* child tự full-viewport background */}
              <div className="sectionFill">{child}</div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
