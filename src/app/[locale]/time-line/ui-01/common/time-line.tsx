"use client"
import { IconCirkleTimeLine } from "@/src/assets"
import React from "react"
import { useTranslations } from "next-intl"

type TimelineItem = {
  date: string
  content: string
}

type TimelineProps = {
  title?: any
  items: TimelineItem[]
}

const Timeline: React.FC<TimelineProps> = ({ title = "Recent Updates", items }) => {
  const t = useTranslations("TimeLine")

  return (
    <section className="flex min-h-screen justify-center bg-gray-100 pt-20">
      <div className="w-80">
        <h2 className="mb-7 text-xl text-gray-700">{t("title")}</h2>

        <ul>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="relative flex gap-6 pb-5">
                {/* vertical line */}
                {!isLast && (
                  <span className="absolute left-[5.5px] top-3 h-full w-px bg-gray-400" />
                )}

                {/* dot */}
                <div className="relative z-10">
                  <IconCirkleTimeLine />
                </div>

                {/* content */}
                <div>
                  <p className="text-sm text-gray-600">{t(item.date)}</p>
                  <p className="mt-2 text-sm text-gray-600">{t(item.content)}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Timeline
