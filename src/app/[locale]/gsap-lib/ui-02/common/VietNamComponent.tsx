import Image from "next/image"
import { StarIcon } from "@/src/assets"
import ScrollText from "./ScrollText"
import { getTranslations } from "next-intl/server"
import "./style.css"

export async function VietnamComponent() {
  const t = await getTranslations("GsapLib-ui02")

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(/images/Vietnam-4.jpg)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div>
          {"Mù Cang Chải".split("").map((c, i) => (
            <span
              key={i}
              className="char"
              style={{
                display: "inline-block",
                fontSize: "45px",
                lineHeight: "45px",
              }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          <ScrollText duration={2} from={"left"} distance={200}>
            <p className="max-w-225 mt-10 text-white">{t("descriptionMuCangChai")}</p>
          </ScrollText>
          <div className="p-10 card__grid place-items-center place-content-center reveal-image">
            <div className="card--1 bg-white shadow-xl rounded-3xl max-w-xs pt-4 pb-8 px-4">
              <div className="w-full h-64">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-2xl"
                  src="/images/Vietnam-1.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div>
                <h2 className="capitalize font-semibold text-xl mt-3 mb-2 text-gray-900">
                  Quảng Bình
                </h2>
                <p className="text-gray-400 flex justify-between items-center">
                  Elise Doe{" "}
                  <span className="flex items-center">
                    <StarIcon className="w-5 h-5 mr-1 text-yellow-400" />
                    5.0
                  </span>
                </p>
              </div>
            </div>

            <div className="card--2 flex items-center bg-white shadow-xl rounded-3xl w-80 p-4">
              <div className="w-20 h-20">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-2xl"
                  src="/images/Vietnam-6.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-lg text-gray-900 font-semibold capitalize">Thủ đô Hà Nội</h2>
                <p className="text-gray-400 mt-1 mb-2">Artist</p>
                <ul className="flex">
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                </ul>
              </div>
            </div>

            <div className="card--3 bg-white shadow-xl rounded-3xl max-w-xs pt-4 pb-8 px-4">
              <div className="w-full h-64">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-2xl"
                  src="/images/Vietnam-4.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div>
                <h2 className="capitalize font-semibold text-xl mt-3 mb-2 text-gray-900">
                  Mù Căng Hải - Hà Giang
                </h2>
                <p className="text-gray-400 flex justify-between items-center">
                  John Doe{" "}
                  <span className="flex items-center">
                    <StarIcon className="w-5 h-5 mr-1 text-yellow-400" />
                    5.0
                  </span>
                </p>
              </div>
            </div>

            <div className="card--4 flex items-center bg-white shadow-xl rounded-3xl w-80 p-4">
              <div className="w-20 h-20">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-2xl"
                  src="/images/Vietnam-5.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-lg text-gray-900 font-semibold capitalize">Hồ Chí Minh city</h2>
                <p className="text-gray-400 mt-1 mb-2">Artist</p>
                <ul className="flex">
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                  <li>
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
