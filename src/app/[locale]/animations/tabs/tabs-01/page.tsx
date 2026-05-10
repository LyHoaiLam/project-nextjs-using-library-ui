"use client"

import SharedLayoutAnimation from "./common/tab"

function Tomato() {
  return <div style={{ fontSize: 96 }}>🍅</div>
}

function Lettuce() {
  return <div style={{ fontSize: 96 }}>🥬</div>
}

function Cheese() {
  return <div style={{ fontSize: 96 }}>🧀</div>
}

export default function Page() {
  return (
    <div>
      <SharedLayoutAnimation
        tabs={[
          {
            label: "Tomato",
            content: <Tomato />,
          },
          {
            label: "Lettuce",
            content: <Lettuce />,
          },
          {
            label: "Cheese",
            content: <Cheese />,
          },
        ]}
      />
    </div>
  )
}
