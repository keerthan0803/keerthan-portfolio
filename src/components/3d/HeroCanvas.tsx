"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Interactive3DObject() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 2) * 0.3;
      meshRef.current.rotation.y = time * 0.4;
      
      // Smooth mouse follow tilt
      const mouseX = state.pointer.x * 0.5;
      const mouseY = state.pointer.y * 0.5;
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        mouseX - mouseY,
        0.05
      );
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      {/* Outer Glowing Wireframe */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />
        <MeshDistortMaterial
          color={hovered ? "#ff007f" : "#00f0ff"}
          emissive={hovered ? "#7000ff" : "#003b5c"}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={3}
          wireframe={false}
        />
      </mesh>

      {/* Inner Metallic Core */}
      <mesh scale={0.7}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#7000ff"
          roughness={0.2}
          metalness={1.0}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <div className="relative w-full h-[450px] lg:h-[550px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#7000ff" />
        <spotLight position={[0, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#ff007f" />

        <Sparkles count={80} scale={6} size={2.5} speed={0.4} color="#00f0ff" />
        <Sparkles count={40} scale={4} size={3.5} speed={0.6} color="#ff007f" />
        
        <Interactive3DObject />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-xs text-cyan-400/60 font-mono flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        Interactive 3D Mesh • Drag to rotate
      </div>
    </div>
  );
}
