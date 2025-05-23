import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useAnimations, useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three/examples/jsm/Addons.js"

import { TIME_SCALE, PLATFORM_SPEED } from "../stores/scene"

function Model({
  index,
  count,
  angle,
  url,
  setDuration,
}: {
  index: number
  count: number
  angle: number
  url: string
  setDuration: (duration: number) => void
}) {
  const meshRef = useRef(null)
  const { scene, animations } = useGLTF(url)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, clone)

  const rotationAngle = useMemo(() => {
    return Math.atan2(Math.cos(angle), Math.sin(angle)) + Math.PI / 2
  }, [angle])

  const frameSkip = useRef(0) // Counter to skip frames

  useEffect(() => {
    // ACTION
    const firstAction = Object.values(actions)[0]

    if (!firstAction) {
      console.error("No action found for the model")
      return
    }

    const clip = firstAction.getClip()
    const duration = clip.duration

    setDuration(duration)

    const firstActionStartTime = (duration * index) / count
    firstAction.time = firstActionStartTime
    firstAction.timeScale = 0 // Disable automatic time progression

    // skip every 2nd frame

    firstAction.play()
  }, [])

  useFrame((state) => {
    const clock = state.clock.getElapsedTime()
    if (frameSkip.current % 7 === 0) {
      // Update animation only every 2nd frame
      const firstAction = Object.values(actions)[0]

      if (firstAction) {
        const clip = firstAction.getClip()
        const duration = clip.duration
        firstAction.time = clock * TIME_SCALE
        firstAction.time %= duration // Increment time manually
      }
    }

    frameSkip.current++
  })

  return (
    <group
      position={[
        (Math.cos(angle) * count * 2) / 3,
        0,
        (Math.sin(angle) * count * 2) / 3,
      ]}
      rotation={[0, rotationAngle, 0]}
    >
      <primitive ref={meshRef} object={clone} />
    </group>
  )
}

function Platform({ count, duration }: { count: number; duration: number }) {
  const platformRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!platformRef.current) {
      return
    }

    const time = state.clock.getElapsedTime()

    if (duration === 0) {
      console.error("Duration is 0, cannot calculate offset")
      return
    }

    const offset = (PLATFORM_SPEED * 2 * Math.PI * time) / duration
    platformRef.current.rotation.y = offset
  })

  return (
    <group ref={platformRef}>
      <mesh position={[count, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[0, (-count * 0.1) / 2, 0]}>
        <cylinderGeometry
          args={[(count * 10) / 11, (count * 10) / 11, count * 0.1, count]}
        />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

function Carousel({
  modelUrl,
  modelCount,
}: {
  modelUrl: string
  modelCount: number
}) {
  const [duration, setDuration] = useState(0)

  const models = useMemo(() => {
    const models = []

    const angle = (2 * Math.PI) / modelCount

    for (let i = 0; i < modelCount; i++) {
      const model = (
        <Model
          key={i}
          index={i}
          count={modelCount}
          angle={angle * i}
          url={modelUrl}
          setDuration={setDuration}
        />
      )
      models.push(model)
    }

    return models
  }, [modelCount])

  return (
    <group dispose={null}>
      {models}
      {duration ? <Platform count={modelCount} duration={duration} /> : null}
    </group>
  )
}

export default Carousel
