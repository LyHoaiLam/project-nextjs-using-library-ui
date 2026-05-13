// GradientHoverPills.tsx
"use client"

import React from "react"
import {
  IoHomeOutline,
  IoVideocamOutline,
  IoCameraOutline,
  IoShareSocialOutline,
  IoHeartOutline,
} from "react-icons/io5"
import "./common/style.css"

type Item = {
  title: string
  Icon: React.ComponentType<{ className?: string }>
  start: string // gradient start
  end: string // gradient end
  href?: string // optional link
}

const ITEMS: Item[] = [
  { title: "Home", Icon: IoHomeOutline, start: "#a955ff", end: "#ea51ff", href: "/" },
  {
    title: "Video",
    Icon: IoVideocamOutline,
    start: "#56CCF2",
    end: "#2F80ED",
    href: "/video",
  },
  {
    title: "Photo",
    Icon: IoCameraOutline,
    start: "#FF9966",
    end: "#FF5E62",
    href: "/photo",
  },
  {
    title: "Share",
    Icon: IoShareSocialOutline,
    start: "#80FF72",
    end: "#7EE8FA",
    href: "/share",
  },
  {
    title: "Like",
    Icon: IoHeartOutline,
    start: "#ffa9c6",
    end: "#f434e2",
    href: "/like",
  },
]

export default function GradientHoverPills() {
  return (
    <div className="ghp-page">
      <ul className="ghp-list" aria-label="Quick actions">
        {ITEMS.map(({ title, Icon, start, end, href }) => (
          <li
            key={title}
            className="ghp-item"
            style={{ ["--i" as any]: start, ["--j" as any]: end }}
          >
            <a className="ghp-btn" href={href ?? "#"} aria-label={title}>
              <span className="ghp-icon">
                <Icon className="ghp-ico" />
              </span>
              <span className="ghp-title">{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
