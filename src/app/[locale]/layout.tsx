import type { Metadata } from "next"
import path from "path"
import { cookies } from "next/headers"
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google"
import { getMessages } from "next-intl/server"
import { promises as fs } from "fs"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { routing } from "@/src/i18n/routing"
import "./globals.css"
import { SEO } from "@/src/interfaces"
import { isSupportedLocale } from "@/src/utils/constants"
import { ELanguage } from "@/src/utils/enums"
import { ThemeProvider } from "@/src/components/theme-provider"
import { ModeToggle } from "@/src/components/custom/mode-toggle"
import Header from "@/src/components/layouts/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
})

type AppLocale = (typeof routing.locales)[number]
function isLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value)
}

function fallbackSEO(): SEO {
  return {
    title: "Bantianyao – Nhà Hàng Cá Tươi | Hải Sản & Món Cá Đặc Sắc",
    description:
      "Bantianyao là nhà hàng cá chuyên các món cá tươi và hải sản chọn lọc. Thực đơn đa dạng, chế biến chuẩn vị, không gian ấm cúng – phù hợp gia đình, bạn bè và tiếp khách.",
    ogTitle: "Bantianyao – Nhà Hàng Cá Tươi & Hải Sản Chọn Lọc",
    ogDescription:
      "Khám phá Bantianyao: món cá tươi, hải sản chất lượng, chế biến chuẩn vị. Không gian đẹp, phục vụ tận tâm, đặt bàn nhanh chóng.",
    keywords: [
      "Bantianyao",
      "nhà hàng cá",
      "nhà hàng hải sản",
      "cá tươi",
      "món cá đặc sản",
      "hải sản tươi sống",
      "quán cá ngon",
      "đặt bàn nhà hàng",
      "ẩm thực hải sản",
      "nhà hàng gia đình",
    ],
  }
}

const SUPPORTED_LOCALES = new Set(["en", "vi", "jp", "ko"])

async function loadSeo(locale: string): Promise<SEO> {
  const safeLocale = isSupportedLocale(locale) ? locale : ELanguage.EN
  const filePath = path.join(process.cwd(), "messages", `${safeLocale}.json`)
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const json = JSON.parse(raw)
    const seo: SEO | undefined = json?.seo

    if (!seo?.title || !seo?.description) return fallbackSEO()
    return seo
  } catch (error) {
    console.error("loadSEO error:", error)
    return fallbackSEO()
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const cookieStore = await cookies()
  const cookieLang = cookieStore.get("NEXT_LOCALE")?.value
  const lang = cookieLang && SUPPORTED_LOCALES.has(cookieLang) ? cookieLang : locale

  const seo = await loadSeo(lang)
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      type: "website",
    },
  }
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  // const cookieStore = await cookies()
  // const sessionToken = cookieStore.get("sessionToken")

  if (!isLocale(locale)) notFound()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
