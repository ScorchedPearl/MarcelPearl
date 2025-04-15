"use client"

import { Canvas } from "@react-three/fiber"
import { PearlRabbit } from "./PearlRabbit"
import { useRef } from "react"
import * as THREE from "three"
export default function Bot() {
 const Target = useRef<THREE.Object3D | null>(null)
 return (
  <>
  <div className="fixed z-50 right-0 bottom-0 w-[6rem] h-[8rem]">
   <Canvas className="h-full w-full" shadows camera={{ position: [0, 5, 15], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <spotLight
     position={[10, 10, 10]}
     angle={0.6}
     penumbra={1}
     intensity={5}
     distance={100}
     decay={0.1}
     color="white"
     castShadow
     target={Target.current || undefined}
    />
    <PearlRabbit ref={Target} scale={0.2} position={[0,-3,0]} idle={true} />
   </Canvas>
   </div>
  </>
 )
}