"use client"

import { useTranslations } from "next-intl"
import Content from "./common/content"
import SharedLayoutAnimation from "./common/tab"
import { IconHeart } from "@/src/assets"

export default function Page() {
  const t = useTranslations("Tabs")
  return (
    <div>
      <SharedLayoutAnimation
        tabs={[
          {
            label: "Tomato",
            content: (
              <Content
                src="/images/American-1.jpg"
                alt="Not Found"
                title={t("tab01.title01")}
                name={t("tab01.name01")}
                des={t("tab01.des01")}
                icon={<IconHeart />}
              />
            ),
          },
          {
            label: "Lettuce",
            content: (
              <Content
                src="/images/American-1.jpg"
                alt="Not Found"
                title={t("tab01.title02")}
                name={t("tab01.name02")}
                des={t("tab01.des02")}
                icon={<IconHeart />}
              />
            ),
          },
          {
            label: "Cheese",
            content: (
              <Content
                src="/images/American-1.jpg"
                alt="Not Found"
                title={t("tab01.title03")}
                name={t("tab01.name03")}
                des={t("tab01.des03")}
                icon={<IconHeart />}
              />
            ),
          },
        ]}
      />
    </div>
  )
}
