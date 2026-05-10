"use client"
import { useEffect } from "react"
import { useThree } from "@react-three/fiber"

import { AnimatedCamera } from "./animated-camera"
import * as THREE from "three"
import { CyberpunkBuilding } from "./cyberpunk-building"

export function Scene({ cameraAnimRef, targetAnimRef }: any) {
  const { scene } = useThree()

  useEffect(() => {
    if (scene) {
      const fogColor = new THREE.Color("#0a0a0a")
      scene.fog = new THREE.Fog(fogColor, 12, 28)
      scene.background = new THREE.Color("#0a0a0a")
    }
  }, [scene])

  return (
    <>
      <AnimatedCamera cameraAnimRef={cameraAnimRef} targetAnimRef={targetAnimRef} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.6} />
      <pointLight position={[0, 50, 20]} intensity={0.8} color="#00ffff" />

      <CyberpunkBuilding />
    </>
  )
}
