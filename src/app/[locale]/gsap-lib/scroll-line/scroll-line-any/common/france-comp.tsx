"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import Image from "next/image"
import WritingTextss from "./writing-textss"
import "./style.css"
import ScrollText from "./scroll-text"

export function FranceComponent() {
  const centerRef = useRef<HTMLDivElement>(null)

  const isCenterFullyVisible = useInView(centerRef, {
    amount: 1,
    once: false,
  })

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(/images/France.jpg)",
        }}
      />

      <div ref={centerRef} className="absolute inset-0 flex items-center justify-center">
        <div>
          {"The Eiffel Tower".split("").map((c, i) => (
            <span
              key={i}
              className="char text-white"
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
            <p className="max-w-[900px] mt-10 text-white">
              The Eiffel Tower is a lattice tower located on the Champ de Mars in Paris, France.
              Designed by Gustave Eiffel, it was constructed as the centerpiece of the 1889 World Is
              Fair and has since become a global cultural icon. Standing at 330 meters (1,083 feet)
              tall, it is the tallest structure in Paris and a symbol of modernity. The tower
              received 6.91 million visitors in 2015 and is recognized as a UNESCO World Heritage
              Site
            </p>
          </ScrollText>

          <div className="p-10 card__grid place-items-center place-content-center reveal-image">
            <div className="card--1 bg-white shadow-xl rounded-3xl max-w-xs pt-4 pb-8 px-4">
              <div className="w-full h-64">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-2xl"
                  src="/images/France-1.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div>
                <h2 className="capitalize font-semibold text-xl mt-3 mb-2 text-gray-900">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="Paris"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
                </h2>
                <p className="text-gray-400 flex justify-between items-center">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="Elise Doe"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
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
                  src="/images/France-2.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-lg text-gray-900 font-semibold capitalize">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="Bordeaux"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
                </h2>
                <p className="text-gray-400 mt-1 mb-2">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="Artist"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
                </p>

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
                  src="/images/France-3.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div>
                <h2 className="capitalize font-semibold text-xl mt-3 mb-2 text-gray-900">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="Paris"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
                </h2>
                <p className="text-gray-400 flex justify-between items-center">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="John Doe"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
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
                  src="/images/France-5.jpg"
                  alt="Antelope Canyon"
                />
              </div>

              <div className="ml-4">
                <h2 className="text-lg text-gray-900 font-semibold capitalize">
                  <WritingTextss
                    inView={isCenterFullyVisible}
                    spacing={3}
                    text="Nice"
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: 1,
                      delay: 0.1,
                    }}
                  />
                </h2>
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

function StarIcon({ className = "" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}
