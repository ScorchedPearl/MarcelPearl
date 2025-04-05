"use client"
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
export function PearlRabbit(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/animations_rabbid.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
   const action = actions[`${props.animation}`];
   if (action) {
     action.play();
     action.setLoop(THREE.LoopRepeat, props.loop || Infinity);
     action.setEffectiveWeight(props.weight || 1);
     action.setEffectiveTimeScale(props.timescale || 1);
     action.setDuration(props.duration || 1);
   }
 }, [actions, props.animation, props.loop, props.weight, props.timescale, props.duration]);

  return (
   <group ref={group} {...props} dispose={null}>
   <group name="Sketchfab_Scene">
    <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
    <group
     name="f408d79c11cf4ae98fda9ac770f98744fbx"
     rotation={[Math.PI / 2, 0, 0]}
     scale={0.01}>
     <group name="Object_2">
     <group name="RootNode">
      <group name="rabbidqc_skeleton" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
      <group name="Object_5">
       <primitive object={nodes._rootJoint} />
       <skinnedMesh
       name="Object_53"
       geometry={nodes.Object_53.geometry}
       material={materials.Rabbid_D}
       skeleton={nodes.Object_53.skeleton}
       morphTargetDictionary={nodes.Object_53.morphTargetDictionary}
       morphTargetInfluences={nodes.Object_53.morphTargetInfluences}
       material-color="#B0D7DB"
       />
       <skinnedMesh
       name="Object_54"
       geometry={nodes.Object_54.geometry}
       material={materials.EyeR}
       skeleton={nodes.Object_54.skeleton}
       morphTargetDictionary={nodes.Object_54.morphTargetDictionary}
       morphTargetInfluences={nodes.Object_54.morphTargetInfluences}
 
       />
       <skinnedMesh
       name="Object_55"
       geometry={nodes.Object_55.geometry}
       material={materials.EyeL}
       skeleton={nodes.Object_55.skeleton}
       morphTargetDictionary={nodes.Object_55.morphTargetDictionary}
       morphTargetInfluences={nodes.Object_55.morphTargetInfluences}
       />
       <skinnedMesh
       name="Object_57"
       geometry={nodes.Object_57.geometry}
       material={materials.material}
       skeleton={nodes.Object_57.skeleton}
       material-color="cyan"
       />
       <group name="Object_52" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
       <group name="Object_56" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      </group>
      </group>
      <group name="reference_ref" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <group name="rabbid_physics" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
     </group>
     </group>
    </group>
    </group>
   </group>
   </group>
  )
 }

 useGLTF.preload('/animations_rabbid.glb')