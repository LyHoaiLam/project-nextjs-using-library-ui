"use client"

import AnimatedSections, { splitToSpans } from "./common/animated-sections"

function Component1() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="sectionHeading">{splitToSpans("Component 1")}</h2>
      <p className="char" style={{ display: "inline-block", marginTop: 16 }}>
        This paragraph also animates
      </p>
    </div>
  )
}

function Component2() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="sectionHeading">{splitToSpans("Component 2")}</h2>
    </div>
  )
}

function Component3() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="sectionHeading">{splitToSpans("Component 3")}</h2>
    </div>
  )
}

export default function Page() {
  return (
    <AnimatedSections headerLeft="Lý Hoài Lâm" headerRight="Hồng Thái">
      <Component1 />
      <Component2 />
      <Component3 />
    </AnimatedSections>
  )
}
