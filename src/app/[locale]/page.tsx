import { getTranslations } from "next-intl/server"
// import { useTranslations } from "next-intl";

export default async function Home() {
  // const t = useTranslations("journey");

  const t = await getTranslations("Home")

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-base leading-6 font-normal text-red-500">{t("welcome")}</p>
    </div>
  )
}
