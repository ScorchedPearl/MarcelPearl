"use client";
import { Canvas } from "@react-three/fiber";
import { PearlRabbit } from "./_components/PearlRabbit";
import { OrbitControls,  useHelper } from "@react-three/drei";
import Lighting from "./_components/lighting";

export default function Home() {


  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 45 }} className="w-full h-full">
       
        <Lighting></Lighting>
       

        <PearlRabbit scale={0.2} position={[0, -2, 0]} animation="rabbid.qc_skeleton|Dance1" duration={2}/>
        

        <OrbitControls />
      </Canvas>
    </div>
  );
}
