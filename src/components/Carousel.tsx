import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const ROTATION_SPEED = 4

function Carousel() {
  const modelRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (!modelRef.current) {
      return null
    }

    const model = modelRef.current

    model.rotation.y += delta * 0.35 * ROTATION_SPEED
    model.rotation.x += delta * 0.22 * ROTATION_SPEED
    model.rotation.z += delta * 0.14 * ROTATION_SPEED
  })

  return (
    <>
      <mesh ref={modelRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  )
}

export default Carousel
