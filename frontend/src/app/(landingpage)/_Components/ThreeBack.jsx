"use client"
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D } from '@react-three/drei';
import * as THREE from 'three';

const CodeParticle = ({ position, color, symbol }) => {
  const meshRef = useRef();
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const speed = useMemo(() => Math.random() * 0.2 + 0.2, []);
  const rotationAxis = useMemo(() => new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const amplitude = 0.5;
    const frequency = 0.05;

    meshRef.current.position.x = initialPosition.x + Math.sin(t * frequency + position[0]) * amplitude;
    meshRef.current.position.y = initialPosition.y + Math.sin(t * frequency + position[1]) * amplitude;
    meshRef.current.position.z = initialPosition.z + Math.sin(t * frequency + position[2]) * amplitude;

    meshRef.current.quaternion.setFromAxisAngle(
      rotationAxis,
      t * speed * Math.PI
    );

    const scale = 1 + Math.sin(t * speed * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={meshRef}>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        size={0.4} // Reduced size for better performance
        height={0.03}
        curveSegments={4} // Reduced segments for optimization
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelSegments={3}
      >
        {symbol}
        <meshPhysicalMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Text3D>
    </group>
  );
};

const FloatingParticles = () => {
  const particles = useMemo(() => {
    const symbols = ['<div>', '</>', '{...}', '=>'];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    
    return Array.from({ length: 6 }, (_, i) => ({
      symbol: symbols[i % symbols.length],
      color: colors[i % colors.length],
      position: [
        (Math.random() - 0.5) * 10, // Reduced range for x
        (Math.random() - 0.5) * 3, // Reduced range for y
        (Math.random() - 0.5) * 10  // Reduced range for z
      ]
    }));
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <CodeParticle key={i} {...particle} />
      ))}
    </>
  );
};

const AnimatedStars = () => {
  const starsRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.03;
      starsRef.current.rotation.z = t * 0.015;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars
        radius={40}
        depth={40}
        count={500} // Reduced star count
        factor={2} // Reduced factor for optimization
        saturation={0.8}
        fade
        speed={1}
      />
    </group>
  );
};

const ThreeJsBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050816']} />
        <fog attach="fog" args={['#050816', 15, 25]} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />

        <FloatingParticles />
        <AnimatedStars />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.1} // Slower rotation for smoother performance
        />
      </Canvas>
    </div>
  );
};

export default ThreeJsBackground;
