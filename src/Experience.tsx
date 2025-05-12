import { Canvas } from "@react-three/fiber"

import "./Experience.css"

import Environment from "./components/Environment"
import Carousel from "./components/Carousel"

const DIST = 2

function Experience() {
  return (
    <div className="experience">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 7 * DIST, 15 * DIST], fov: 50 }}>
          <Environment />

          <Carousel modelUrl={"running.glb"} modelCount={10} />
        </Canvas>
      </div>
    </div>
  )
}
export default Experience
