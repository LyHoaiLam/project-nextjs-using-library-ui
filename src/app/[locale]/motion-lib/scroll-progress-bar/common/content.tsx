import { getTranslations } from "next-intl/server"

export default async function Content() {
  const t = await getTranslations("scroll-progress-bar")
  const listItems = t.raw("ai_impact_page.section_1_evolution.list_items")
  const subSections = t.raw("ai_impact_page.section_2_technical.sub_sections")
  const listItems2 = t.raw("ai_impact_page.section_3_future.closing_list")

  return (
    <>
      <article style={{ maxWidth: 500, padding: "150px 20px" }}>
        <p>{t("ai_impact_page.header.title")}</p>
        <p>{t("ai_impact_page.header.subtitle")}</p>
        <p>{t("ai_impact_page.section_1_evolution.title")}</p>
        <p>{t("ai_impact_page.section_1_evolution.content_p1")}</p>

        <ul>
          {listItems.map((item: string, index: number) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>

        <p>{t("ai_impact_page.section_2_technical.title")}</p>
        <ul>
          {subSections.map((section: any, index: number) => (
            <div key={index} className="my-6">
              <h3 className="font-bold text-xl">{section.heading}</h3>
              <p className="text-gray-600">{section.detail}</p>
            </div>
          ))}
        </ul>

        <p>{t("ai_impact_page.section_3_future.title")}</p>
        <p>{t("ai_impact_page.section_3_future.content")}</p>

        {listItems.map((item: string, index: number) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </article>
    </>
  )
}
