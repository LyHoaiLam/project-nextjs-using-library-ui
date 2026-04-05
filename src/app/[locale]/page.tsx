import { Link } from "@/src/i18n/routing"
import { getTranslations } from "next-intl/server"

export default async function Home() {
  const t = await getTranslations("Home")

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-base leading-6 font-normal text-red-500">{t("welcome")}</p>

      <Link href="/gsap-lib/ui-01" className="text-sm leading-5 font-medium text-red-500!">
        Website du lịch
      </Link>
    </div>
  )
}
