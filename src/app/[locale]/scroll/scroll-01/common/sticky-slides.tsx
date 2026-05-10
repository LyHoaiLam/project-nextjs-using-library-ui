"use client"

import React from "react"

type SnapSlidesProps = {
  children: React.ReactNode
}

export default function SnapSlides({ children }: SnapSlidesProps) {
  const slides = React.Children.toArray(children)

  return (
    <div
      className="w-full h-svh overflow-y-scroll"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {slides.map((child, i) => (
        <section
          key={i}
          className="h-svh w-full flex items-center justify-center"
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          {child}
        </section>
      ))}
    </div>
  )
}
