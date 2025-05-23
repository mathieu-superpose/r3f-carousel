import { Canvas } from "@react-three/fiber"

import "./Experience.css"

import Environment from "./components/Environment"
import Carousel from "./components/Carousel"


import { COUNT } from "./stores/scene"

function Experience() {
  return (
    <div className="experience">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 14, 30], fov: 50 }}>
          <Environment />

          <Carousel modelUrl={"running-man.glb"} modelCount={COUNT} />
        </Canvas>
      </div>
    </div>
  )
}
export default Experience
