"use client"
import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"

export function AnimatedCamera({ cameraAnimRef, targetAnimRef }: any) {
  const cameraRef = useRef<any>(null)
  const { set } = useThree()

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current })
    }
  }, [set])

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(
        cameraAnimRef.current.x,
        cameraAnimRef.current.y,
        cameraAnimRef.current.z
      )
      cameraRef.current.lookAt(
        targetAnimRef.current.x,
        targetAnimRef.current.y,
        targetAnimRef.current.z
      )
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={45}
      near={1}
      far={1000}
      position={[0, 5, 10]}
    />
  )
}
