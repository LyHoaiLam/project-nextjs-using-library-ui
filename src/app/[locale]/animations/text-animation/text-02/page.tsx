import { getTranslations } from "next-intl/server"
import SplittingText from "./common/splitting-text"
import TypingText from "./common/typing-text"
import WritingText from "./common/writing-text"

export default async function Page() {
  const t = await getTranslations("TextAnimation")
  return (
    <div>
      <div>
        <p className="text-4xl leading-tight font-bold text-center">SplittingText</p>

        <div className="bg-amber-100 p-20">
          <p className="text-xl leading-8 font-bold text-center">Char</p>
          <div>
            <SplittingText
              type="chars"
              className="text-2xl leading-6"
              text={t("title")}
              inViewOnce={false}
              delay={0}
            />
          </div>

          <div>
            <SplittingText
              type="chars"
              className="text-2xl leading-6"
              text={t("description")}
              inViewOnce={false}
              delay={0}
            />
          </div>

          <div>
            <SplittingText
              type="chars"
              className="text-2xl leading-6"
              text={t("title")}
              inViewOnce={false}
              delay={0}
            />
          </div>
        </div>

        <div className="bg-red-200 p-20">
          <p className="text-xl leading-8 font-bold text-center">Line</p>

          <div>
            <SplittingText
              type="lines"
              className="text-2xl leading-6"
              text={[t("title"), t("title")]}
              inViewOnce={false}
              delay={0}
            />
          </div>
        </div>
        <div className="bg-green-200 p-20">
          <p className="text-xl leading-8 font-bold text-center">Word</p>
          <div>
            <SplittingText
              type="words"
              className="text-2xl leading-6"
              text={t("title")}
              inViewOnce={false}
              delay={0}
            />
            <SplittingText
              type="words"
              className="text-2xl leading-6"
              text={t("description")}
              inViewOnce={false}
              delay={0}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-4xl leading-tight font-bold text-center">SplittingText</p>

        <div>
          <TypingText
            cursorCharacter="|"
            text="Free Tailwind CSS FAQ Component"
            className="text-2xl leading-6 text-red-800"
          />
        </div>
        <div>
          <TypingText
            text={[t("title"), t("description"), t("title")]}
            className="text-2xl leading-6"
            textColors={["text-red-500", "text-green-500", "text-yellow-500"]}
          />
        </div>
      </div>

      <div>
        <p className="text-4xl leading-tight font-bold text-center">WritingText</p>

        <WritingText
          spacing={3}
          text={t("title")}
          className="text-2xl leading-normal"
          transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  )
}
