"use client"

import React, { useRef, useState } from "react"
import { tabs } from "./common/data"
import Image from "next/image"
import { useTranslations } from "next-intl"

export type TabItem = {
  id: number
  tabId: string
  panelId: string
  label: string
  eyebrow: string
  title: string
  imageSrc: string
  imageAlt: string
  description: string
  href: string
}

export default function UnconventionalTabs() {
  const [activeTab, setActiveTab] = useState<number>(1)
  const t = useTranslations("Tabs")

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const setActiveAndFocus = (nextId: number) => {
    setActiveTab(nextId)
    const idx = tabs.findIndex((t) => t.id === nextId)
    tabRefs.current[idx]?.focus()
  }

  const onKeyDownTabList = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab)
    if (currentIndex < 0) return

    if (e.key === "ArrowRight") {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveAndFocus(tabs[nextIndex].id)
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
      setActiveAndFocus(tabs[prevIndex].id)
    }

    if (e.key === "Home") {
      e.preventDefault()
      setActiveAndFocus(tabs[0].id)
    }

    if (e.key === "End") {
      e.preventDefault()
      setActiveAndFocus(tabs[tabs.length - 1].id)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        {/* Tabs component */}
        <div>
          {/* Buttons */}
          <div className="flex justify-center">
            <div
              role="tablist"
              className="max-[480px]:max-w-[180px] inline-flex flex-wrap justify-center bg-slate-200 rounded-[20px] p-1 mb-8 min-[480px]:mb-12"
              onKeyDown={onKeyDownTabList}
            >
              {tabs.map((item, idx) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el
                    }}
                    id={item.tabId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={item.panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(item.id)}
                    onFocus={() => setActiveTab(item.id)}
                    className={[
                      "flex-1 text-sm font-medium h-8 px-4 rounded-2xl whitespace-nowrap",
                      "focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300",
                      "transition-colors duration-150 ease-in-out",
                      isActive ? "bg-white text-slate-900" : "text-slate-600 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {t(item.label)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab panels */}
          <div className="max-w-[640px] mx-auto">
            <div className="relative flex flex-col">
              {tabs.map((item) => {
                const isActive = activeTab === item.id

                // Giữ panel luôn mounted để animate show/hide tương tự Alpine x-transition
                // (panel inactive -> absolute + opacity 0 + translate)
                return (
                  <article
                    key={item.id}
                    id={item.panelId}
                    role="tabpanel"
                    aria-labelledby={item.tabId}
                    tabIndex={0}
                    className={[
                      "w-full bg-white rounded-2xl shadow-xl min-[480px]:flex items-stretch",
                      "focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300",
                      "transition-all transform",
                      // Enter/leave feel gần giống bản Alpine
                      isActive
                        ? "relative opacity-100 translate-y-0"
                        : "absolute inset-0 opacity-0 translate-y-12 pointer-events-none",
                      // duration/easing
                      isActive
                        ? "duration-700 ease-[cubic-bezier(0.68,-0.3,0.32,1)]"
                        : "duration-300 ease-[cubic-bezier(0.68,-0.3,0.32,1)]",
                    ].join(" ")}
                  >
                    <figure className="min-[480px]:w-1/2 p-2">
                      {/* Nếu bạn muốn dùng next/image, cần add domain vào next.config.js */}
                      <Image
                        className="w-full min-[480px]:h-full object-cover rounded-lg"
                        width={1000}
                        height={1000}
                        src={item.imageSrc}
                        alt={item.imageAlt}
                      />
                    </figure>

                    <div className="min-[480px]:w-1/2 flex flex-col justify-center p-5 pl-3">
                      <div className="flex justify-between mb-1">
                        <header>
                          <div className="font-caveat text-xl font-medium text-sky-500">
                            {item.eyebrow}
                          </div>
                          <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                        </header>

                        <button
                          type="button"
                          className="shrink-0 h-7.5 w-7.5 border border-slate-200 hover:border-slate-300 rounded-full shadow inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out"
                          aria-label="Like"
                        >
                          <svg
                            className="fill-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="13"
                            viewBox="0 0 14 13"
                          >
                            <path d="M6.985 1.635C5.361.132 2.797.162 1.21 1.7A3.948 3.948 0 0 0 0 4.541a3.948 3.948 0 0 0 1.218 2.836l5.156 4.88a.893.893 0 0 0 1.223 0l5.165-4.886a3.925 3.925 0 0 0 .061-5.663C11.231.126 8.62.094 6.985 1.635Zm4.548 4.53-4.548 4.303-4.54-4.294a2.267 2.267 0 0 1 0-3.275 2.44 2.44 0 0 1 3.376 0c.16.161.293.343.398.541a.915.915 0 0 0 .766.409c.311 0 .6-.154.767-.409.517-.93 1.62-1.401 2.677-1.142 1.057.259 1.797 1.181 1.796 2.238a2.253 2.253 0 0 1-.692 1.63Z" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-slate-500 text-sm line-clamp-3 mb-2">
                        {t(item.description)}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
