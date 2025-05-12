import { useEffect, useMemo, useRef } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { SkeletonUtils } from "three/examples/jsm/Addons.js"

function Model({
  index,
  count,
  angle,
  url,
}: {
  index: number
  count: number
  angle: number
  url: string
}) {
  const group = useRef(null)
  const { scene, animations } = useGLTF(url)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, group)

  const rotationAngle = useMemo(() => {
    return Math.atan2(Math.cos(angle), Math.sin(angle)) + Math.PI / 2
  }, [angle])

  useEffect(() => {
    console.log(index, angle)

    const firstAction = Object.values(actions)[0]

    if (!firstAction) {
      console.error("No action found for the model")
      return
    }

    const firstActionStartTime = (firstAction?.time * index) / count

    firstAction.play()
    // firstAction.time = firstActionStartTime

    firstAction.timeScale = 0.1
  }, [actions, index, count])

  return (
    <primitive
      ref={group}
      object={clone}
      position={[
        (Math.cos(angle) * count * 2) / 3,
        0,
        (Math.sin(angle) * count * 2) / 3,
      ]}
      rotation={[0, rotationAngle, 0]}
    />
  )
}

function Carousel({
  modelUrl,
  modelCount,
}: {
  modelUrl: string
  modelCount: number
}) {
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
        />
      )
      models.push(model)
    }

    return models
  }, [modelCount])

  return <group dispose={null}>{models}</group>
}

export default Carousel
