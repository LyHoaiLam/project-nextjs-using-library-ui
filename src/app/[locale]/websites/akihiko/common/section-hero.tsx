import Image from "next/image"
import "./style.css"

export default function SectionHero() {
  return (
    <div className="bg-black py-5">
      <div className="relative">
        <div className="px-5 py-20 hero-copy">
          <h3 className="hero-line text-[49px] leading-[50.6px] font-medium text-white italic">
            Pattern Demensions
          </h3>
          <h3 className="hero-line text-[49px] leading-[50.6px] font-medium text-white italic">
            and Moments that
          </h3>
          <h3 className="hero-line text-[49px] leading-[50.6px] font-medium text-white italic">
            Connect and Leave a
          </h3>
          <h3 className="hero-line text-[49px] leading-[50.6px] font-medium text-white italic">
            Bold イメージ.
          </h3>
        </div>

        <div className="w-full px-5 flex justify-between items-center bg-white">
          <p className="text-base leading-6 font-semibold text-black">Direction</p>
          <p className="text-base leading-6 font-semibold text-black">Branch</p>
          <p className="text-base leading-6 font-semibold text-black">Design</p>
        </div>

        <div className="mt-20 w-full h-px bg-white"></div>
        <div className="py-10">
          <div className="px-5">
            <p className="hero-title text-[270px] leading-none">
              <span className="hero-title-gray">
                Akihiko
                <span className="align-super text-[150px]">TM</span>
              </span>

              <span className="hero-title-white">
                Akihiko
                <span className="align-super text-[150px]">TM</span>
              </span>
            </p>
          </div>
        </div>

        <div className="absolute top-35 right-5 hero-video-wrap">
          <video className="block ml-auto w-[45%] rounded-xl" autoPlay loop muted playsInline>
            <source src="/videos/screen-recording-2026-03-06-103839.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-white"></div>

      <div className="py-10">
        <div className="px-5">
          <div className="w-full px-5 flex justify-between items-center">
            <p className="text-base leading-6 font-normal text-white">
              © Curated Interfaces ビジュアル
            </p>
            <p className="text-base leading-6 font-normal text-white">(WDX® — 02)</p>
            <p className="text-base leading-6 font-normal text-white">Digital Designer</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-white"></div>

      <div className="relative py-20 mt-6">
        <div className="w-[55%] pl-6 ml-auto">
          <p className="text-white text-[49px] leading-[50.6px]">
            13+ years™ of digital form, sharp interactions, and relentless creative discipline and
            effort.
          </p>

          <button className="text-white text-2xl leading-12 px-5 border rounded-3xl mt-7 cursor-pointer">
            CONTACT
          </button>
        </div>

        <div className="w-full px-5 flex justify-between items-center bg-white">
          <p className="text-base leading-6 font-semibold text-black">Direction</p>
          <p className="text-base leading-6 font-semibold text-black">Branch</p>
          <p className="text-base leading-6 font-semibold text-black">Design</p>
        </div>

        <div className="w-[55%] pl-6 ml-auto">
          <div className="grid grid-cols-5 h-125 pt-6">
            {/* Cairo */}
            <div className="col-span-1 row-span-1 border border-gray-700 rounded-t-xl flex items-center justify-center text-white text-xl">
              Cairo
            </div>

            {/* Oslo */}
            <div className="col-span-1 row-span-1 col-start-3 border border-gray-700 rounded-t-xl flex items-center justify-center text-white text-xl">
              oslo.
            </div>

            {/* Chain */}
            <div className="col-span-1 row-span-1 col-start-5 border border-gray-700 rounded-t-xl flex items-center justify-center text-white text-xl">
              Chain
            </div>

            {/* Manila */}
            <div className="col-span-1 row-span-1 col-start-2 row-start-2 border border-gray-700 rounded-b-xl flex items-center justify-center text-white text-xl">
              Manila.
            </div>

            {/* Theo */}
            <div className="col-span-1 row-span-1 col-start-4 row-start-2 border border-gray-700 rounded-b-xl flex items-center justify-center text-white text-xl">
              theo
            </div>
          </div>
        </div>

        <div className="absolute w-[45%] top-0 rounded-2xl">
          <Image
            src={"/images/akihiko.avif"}
            height={2000}
            width={2000}
            quality={100}
            alt=""
            className="object-cover h-220 rounded-2xl"
          />
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="w-full px-5 flex justify-between items-center">
          <p className="text-base leading-6 font-normal text-white">
            © Curated Interfaces ビジュアル
          </p>
          <p className="text-base leading-6 font-normal text-white">(WDX® — 02)</p>
          <p className="text-base leading-6 font-normal text-white">Digital Designer</p>
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-white"></div>

      <div className="overflow-hidden w-full">
        <div className="marquee">
          <p className="text-white text-[200px] whitespace-nowrap">Featured Works©</p>
          <p className="text-white text-[200px] whitespace-nowrap">Featured Works©</p>
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-white" />
      <div className="px-5 py-15">
        <p className="w-1/2 text-white font-base leading-6">
          Every project is a chance to blend design and development, shaping bold interactive ideas
          into <span className="text-lg leading-7 font-bold">sleek digital realities — built</span>{" "}
          with intent, speed, and visual clarity that attracts lot of peoples.
        </p>

        <div className="border border-white p-3 text-white w-fit rounded-3xl mt-5">SEE WORKS</div>

        <div>
          <div className="w-full flex px-5">
            <div className="mt-15 relative w-1/2 h-175">
              <Image
                width={1000}
                height={1000}
                src="/images/section-two.avif"
                className="w-full h-full object-cover rounded-lg"
                alt="Not Found"
              />

              <div className="group absolute top-1/2 left-1/2 w-75 h-75 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    width={1000}
                    height={1000}
                    src="/images/section-two-on.avif"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-125"
                    alt="Not Found"
                  />

                  <div className="absolute inset-0 z-10 rounded-lg bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="absolute left-1/2 top-1/2 z-20 w-60 -translate-x-1/2 translate-y-4 rounded-xl bg-white px-4 py-3 shadow-xl opacity-0 transition-all duration-500 ease-out group-hover:translate-y-10 group-hover:opacity-100">
                  <h3 className="text-sm font-semibold text-black">Tiêu đề nội dung</h3>
                  <p className="mt-1 text-xs leading-5 text-gray-700">
                    Nội dung này sẽ hiện ra khi hover vào ảnh. Phần nền trắng sẽ dài hơn ảnh nhỏ và
                    tràn xuống dưới.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/2 flex justify-end">
              <div className="group relative w-[70%] h-75">
                <Image
                  width={1000}
                  height={1000}
                  src="/images/section-two-right.avif"
                  className="w-full h-full object-cover rounded-lg"
                  alt="Not Found"
                />
                <div className="absolute inset-0 z-10 rounded-lg bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="group absolute top-1/2 left-1/2 w-45 h-45 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg">
                  <div className=" overflow-hidden rounded-lg ">
                    <Image
                      width={1000}
                      height={1000}
                      src="/images/section-two-right-on.avif"
                      className="w-full h-full object-cover rounded-lg transition-transform duration-500 transform group-hover:scale-125"
                      alt="Not Found"
                    />
                  </div>

                  <div className="absolute left-1/2 top-1/2 z-10 w-60 -translate-x-1/2 translate-y-4 rounded-xl bg-white px-4 py-3 shadow-xl opacity-0 transition-all duration-500 ease-out group-hover:translate-y-10 group-hover:opacity-100">
                    <h3 className="text-sm font-semibold text-black">Tiêu đề nội dung</h3>
                    <p className="mt-1 text-xs leading-5 text-gray-700">
                      Nội dung này sẽ hiện ra khi hover vào ảnh. Phần nền trắng sẽ dài hơn ảnh nhỏ
                      và tràn xuống dưới.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mt-15 relative w-1/3 h-175">
          <Image
            width={1000}
            height={1000}
            src="/images/section-three.avif"
            className="w-full h-full object-cover rounded-lg"
            alt="Not Found"
          />

          <div className="group absolute top-1/2 left-1/2 w-75 h-75 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-lg">
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                width={1000}
                height={1000}
                src="/images/section-three-on.avif"
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-125"
                alt="Not Found"
              />

              <div className="absolute inset-0 z-10 rounded-lg bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="absolute left-1/2 top-1/2 z-20 w-60 -translate-x-1/2 translate-y-4 rounded-xl bg-white px-4 py-3 shadow-xl opacity-0 transition-all duration-500 ease-out group-hover:translate-y-10 group-hover:opacity-100">
              <h3 className="text-sm font-semibold text-black">Tiêu đề nội dung</h3>
              <p className="mt-1 text-xs leading-5 text-gray-700">
                Nội dung này sẽ hiện ra khi hover vào ảnh. Phần nền trắng sẽ dài hơn ảnh nhỏ và tràn
                xuống dưới.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
