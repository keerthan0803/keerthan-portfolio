"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

function FloatingDust() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={150} scale={20} size={1.8} speed={0.2} opacity={0.3} color="#00f0ff" />
      <Sparkles count={100} scale={25} size={2.2} speed={0.15} opacity={0.25} color="#7000ff" />
      <Sparkles count={60} scale={15} size={1.5} speed={0.3} opacity={0.2} color="#ff007f" />
    </group>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Radial Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full glow-orb-cyan opacity-40 animate-pulse-glow" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full glow-orb-purple opacity-35 animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full glow-orb-pink opacity-30 animate-pulse-glow" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* 3D R3F Starfield Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ pointerEvents: "none" }}
      >
        <FloatingDust />
      </Canvas>
    </div>
  );
}
