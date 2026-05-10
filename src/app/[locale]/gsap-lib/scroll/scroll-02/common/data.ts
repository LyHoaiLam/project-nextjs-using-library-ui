import type { Perspective } from "./types"

export const images = [
  "/images/img1.webp",
  "/images/img2.webp",
  "/images/img3.webp",
  "/images/img4.webp",
  "/images/img5.webp",
  "/images/img6.webp",
  "/images/img7.webp",
  "/images/img8.webp",
  "/images/img9.webp",
  "/images/img10.webp",
  "/images/img11.webp",
  "/images/img12.webp",
]

export const perspectives: Perspective[] = [
  {
    title: "Immersive experiences",
    description: "Where creativity comes to life",
    position: "top",
  },
  {
    title: "Infinite Perspective",
    description: "Explore new dimensions",
    position: "center",
  },
  {
    title: "Inside the Universe",
    description: "Immerse yourself in the extraordinary",
    position: "center",
  },
  {
    title: "Cinematic GSAP Scroll Experiences",
    position: "bottom",
  },
]

// Avoid accessing `window` at module import time (SSR).
// Use desktop defaults here; the page component computes responsive
// adjustments at runtime via `getResponsiveDimensions()`.
export const cylinderConfig = {
  radius: 2.5,
  height: 2,
  radialSegments: 64,
  heightSegments: 1,
}

export const particleConfig = {
  numParticles: 12,
  particleRadius: 3.3, // cylinderRadius + 0.8
  segments: 20,
  angleSpan: 0.3,
}

export const imageConfig = {
  width: 1024,
  height: 1024,
}
