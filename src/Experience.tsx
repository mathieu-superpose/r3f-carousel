import { Canvas } from "@react-three/fiber"

import "./Experience.css"

import Environment from "./components/Environment"
import Carousel from "./components/Carousel"

function Experience() {
  return (
    <div className="experience">
      <div className="canvas-container">
        <Canvas>
          <Environment />

          <Carousel />
        </Canvas>
      </div>
    </div>
  )
}
export default Experience
