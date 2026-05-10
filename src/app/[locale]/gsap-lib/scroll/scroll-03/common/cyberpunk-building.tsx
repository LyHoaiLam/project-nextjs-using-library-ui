"use client"
import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

export function CyberpunkBuilding() {
  const { scene } = useGLTF("/3ds/cyberpunk_skyscraper.glb")

  useEffect(() => {
    if (scene) {
      scene.scale.set(3, 3, 3)
      scene.position.set(0, 0, 0)
    }
  }, [scene])

  return <primitive object={scene} />
}
