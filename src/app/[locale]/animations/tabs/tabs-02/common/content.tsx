import ScrollText from "@/src/app/[locale]/scroll/scroll-04/common/scroll-text"
import Image from "next/image"
import { motion, useScroll, useSpring } from "motion/react"

interface ContentProps {
  src: string
  alt: string
  title: string
  name: string
  des: string
  icon?: React.ReactNode
}
export default function Content({ src, alt, title, name, des, icon }: ContentProps) {
  return (
    <div className="flex items-center gap-5">
      {/* <Image
        className="w-45 h-full object-cover rounded-lg"
        width={1000}
        height={1000}
        src={src}
        alt={alt}
      /> */}

      <motion.img
        className="w-45 h-full"
        src={src}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      />

      <div>
        <div className="flex items-center justify-between">
          <header>
            <ScrollText from="left" duration={1} delay={0.3} distance={0}>
              <p className="font-caveat text-xl font-medium text-sky-500">{title}</p>
            </ScrollText>
            <ScrollText from="left" duration={1.2} delay={0.5} distance={0}>
              <p className="text-xl font-bold text-slate-900">{name}</p>
            </ScrollText>
          </header>

          {icon && (
            <button
              type="button"
              className="cursor-pointer shrink-0 h-7.5 w-7.5 border border-slate-200 hover:border-red-600 rounded-full shadow inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out"
            >
              {icon}
            </button>
          )}
        </div>
        <ScrollText duration={1.5} delay={0.7}>
          <p className="text-slate-500 text-sm line-clamp-3 mb-2">{des}</p>
        </ScrollText>
      </div>
    </div>
  )
}
