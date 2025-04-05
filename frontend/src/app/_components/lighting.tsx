import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";

export default function Lighting() {
 const redLight = useRef<THREE.SpotLight>(null);
 const greenLight = useRef<THREE.SpotLight>(null);
 const blueLight = useRef<THREE.SpotLight>(null);

 const Target = useRef<THREE.Object3D>(null);



 return (
  <>
   <ambientLight intensity={0.1} />

   {/* Red spotlight - front left */}
   <spotLight
    ref={redLight}
    position={[-10, 10, 10]}
    angle={0.6}

    intensity={5}
    distance={100}
    decay={0.1}
    color="cyan"
    castShadow
    target={Target.current || undefined}
   />

   {/* Green spotlight - front right */}
   <spotLight
    ref={greenLight}
    position={[10, 10, 10]}
    angle={0.6}

    intensity={5}
    distance={100}
    decay={0.1}
    color="teal"
    castShadow
    target={Target.current || undefined}
   />

   {/* Blue spotlight - back center */}
   <spotLight
    ref={blueLight}
    position={[0, 10, -10]}
    angle={0.6}

    intensity={5}
    distance={100}
    decay={0.1}
    color="blue"
    castShadow
    target={Target.current || undefined}
   />

   {/* Stage platform */}
   <mesh receiveShadow rotation={[0, 0, 0]} position={[0, -2.5, 0]} ref={Target}>
    <boxGeometry args={[20, 0.5, 20]} />
    <meshStandardMaterial color="black" />
   </mesh>
   {/* Stage border */}
   <mesh receiveShadow rotation={[0, 0, 0]} position={[0, -2.5, 0]}>  
    <boxGeometry args={[20, 0.5, 20]} />
    <meshStandardMaterial color="black" />
   </mesh>
  </>
 );
}
