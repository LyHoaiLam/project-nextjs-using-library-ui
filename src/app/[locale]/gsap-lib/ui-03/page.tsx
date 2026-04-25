"use client"

import Image from "next/image"
import AnimatedSections from "./common/animated-sections"
import "./common/style.css"

export function Component1() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* background full */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* content overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 className="sectionHeading">
          {/* nếu muốn reveal chars: tự split + class char */}
          {"FULL VIEWPORT BACKGROUND".split("").map((c, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h2>
      </div>
    </div>
  )
}

export function Component2() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* background full */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* content overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 className="sectionHeading">
          {/* nếu muốn reveal chars: tự split + class char */}
          {"FULL VIEWPORT BACKGROUND".split("").map((c, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h2>
      </div>
    </div>
  )
}

export function Component3() {
  return (
    <div className="absolute inset-0">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div>
          {/* text reveal bằng GSAP */}
          {"Mua iPhone 16".split("").map((c, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}

          <p>
            Giới hạn 2 iPhone 17 Pro Max cho mỗi khách hàng. Từ 34.999.000đ hoặc 1.425.000đ/tháng
            trong 24 tháng.
          </p>

          <Image
            className="reveal-image"
            width={1000}
            height={1000}
            src={"/images/bali-indonesia-4.jpg"}
            alt="Non Image"
          />
        </div>
      </div>
    </div>
  )
}
export default function Page() {
  return (
    <AnimatedSections headerLeft="Hoai Lam" headerRight="Hoai Lam2">
      <Component1 />
      <Component2 />
      <Component3 />
    </AnimatedSections>
  )
}
