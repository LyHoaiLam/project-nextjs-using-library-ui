"use client"
import React from "react"
import { cards } from "./data"
import "./style.css"

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ")
}

const HoverCardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative h-126.25 w-lg overflow-hidden rounded-2xl bg-white shadow-lg">
        {cards.map((item, index) => (
          <div
            key={index}
            className={cx(
              "group absolute z-1 flex items-center justify-center overflow-hidden bg-center bg-cover text-white shadow-md transition-all duration-500 ease-in-out",
              item.className,
              item.hoverMode === "tl" ? "hoverCardTL" : "hoverCardBR"
            )}
            style={{ backgroundImage: `url('${item.imageUrl}')` }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 transition-all duration-300 ease-in-out group-hover:pb-10">
              <div className="mb-2 text-xl font-bold">{item.title}</div>
              <div className="max-h-0 overflow-hidden text-sm opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-25 group-hover:opacity-100">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HoverCardLayout
