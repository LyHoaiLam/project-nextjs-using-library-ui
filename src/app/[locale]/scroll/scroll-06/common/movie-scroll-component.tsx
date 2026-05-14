"use client"
import { useEffect, useState } from "react"
import MovieDisplay from "./movie-display"
import ScrollWrapper from "./scroll-wrapper"
import "./style.css"

const MovieScrollComponent = () => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const winTop = window.scrollY
      const winMid = window.innerHeight / 2 + winTop
      const winBot = window.innerHeight + winTop

      const lis = document.querySelectorAll(".scroll-wrap li")

      lis.forEach((li, index) => {
        const liRect = li.getBoundingClientRect()
        const liTop = liRect.top + window.scrollY
        const liBot = liTop + (li as HTMLElement).offsetHeight

        if (liBot <= winMid || liTop >= winBot) {
          li.classList.remove("inView")
        } else if (liTop <= winMid) {
          li.classList.add("inView")
        }
      })

      const inViewElements = document.querySelectorAll(".scroll-wrap li.inView")
      const inViewEq =
        inViewElements.length > 0
          ? Array.from(document.querySelectorAll(".scroll-wrap li")).indexOf(inViewElements[0]) + 1
          : 0

      setCurrentStep(inViewEq)

      // Check scroll direction
      if (winTop > lastScrollTop) {
        // scrolling down
      } else {
        // scrolling up
      }
      lastScrollTop = winTop
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <MovieDisplay currentStep={currentStep} />
      <ScrollWrapper />
    </>
  )
}

export default MovieScrollComponent
