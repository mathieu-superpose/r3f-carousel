// import { useRef } from "react"
// import * as THREE from "three"
// import { useFrame } from "@react-three/fiber"

import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"

function Carousel({ modelUrl }: { modelUrl: string }) {
  const { scene, animations } = useGLTF(modelUrl)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    // automatically play the first animation
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]]
      firstAction?.play()
    }
  }, [actions])

  return <primitive object={scene} />
}

export default Carousel
