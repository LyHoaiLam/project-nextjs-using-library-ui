"use client"

import "./common/style.css"
import { StarIcon } from "@/src/assets"
import Image from "next/image"
export default function ArtistCardGrid() {
  return (
    <div className="p-10 card__grid place-items-center bg-gray-100 place-content-center min-h-screen">
      {/* Card 1 */}
      <div className="card--1 bg-white shadow-xl rounded-3xl max-w-xs pt-4 pb-8 px-4">
        <div className="w-full h-64">
          <Image
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-2xl"
            src="/images/antelope-canyon-lower-canyon-arizona.webp"
            alt="Antelope Canyon"
          />
        </div>

        <div>
          <h2 className="capitalize font-semibold text-xl mt-3 mb-2 text-gray-900">
            antelope canyon paint 1
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

      {/* Card 2 */}
      <div className="card--2 flex items-center bg-white shadow-xl rounded-3xl w-80 p-4">
        <div className="w-20 h-20">
          <Image
            width={500}
            height={500}
            src="/images/pexels-photo-573299.webp"
            alt="Elise Doe"
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-gray-900 font-semibold capitalize">elise doe 2</h2>
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

      {/* Card 3 */}
      <div className="card--3 bg-white shadow-xl rounded-3xl max-w-xs pt-4 pb-8 px-4">
        <div className="w-full h-64">
          <Image
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-2xl"
            src="/images/delicate-arch-night-stars-landscape.jpg"
            alt="Galaxy Abstract Paint"
          />
        </div>

        <div>
          <h2 className="capitalize font-semibold text-xl mt-3 mb-2 text-gray-900">
            galaxy abstract paint 3
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

      {/* Card 4 */}
      <div className="card--4 flex items-center bg-white shadow-xl rounded-3xl w-80 p-4">
        <div className="w-20 h-20">
          <Image
            width={500}
            height={500}
            src="/images/pexels-photo-839011.webp"
            alt="John Doe"
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-gray-900 font-semibold capitalize">john doe 4</h2>
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
  )
}
