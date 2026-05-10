"use client"

import React from "react"

export default function ScrollSlides() {
  const slides = [
    {
      title: "The First slide",
      description: "Scroll Down for next slide",
      gradient: "from-green-200 to-blue-200",
      textColor: "text-black",
    },
    {
      title: "The Second slide",
      description: "Scroll Down for next slide",
      gradient: "from-indigo-800 to-purple-800",
      textColor: "text-white",
    },
    {
      title: "The Third slide",
      description: "Scroll Down",
      gradient: "from-purple-800 to-pink-800",
      textColor: "text-white",
    },
    {
      title: "The Fourth slide",
      description: "",
      gradient: "from-blue-200 to-indigo-100",
      textColor: "text-black",
    },
  ]

  return (
    <div className="relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b ${slide.gradient} ${slide.textColor}`}
        >
          <h2 className="text-4xl font-bold">{slide.title}</h2>
          {slide.description && <p className="mt-2">{slide.description}</p>}
        </div>
      ))}
    </div>
  )
}
