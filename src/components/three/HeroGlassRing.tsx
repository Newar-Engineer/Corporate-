"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles, ContactShadows, MeshTransmissionMaterial, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function GlassRing() {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.002;
    mesh.current.position.y = Math.sin(clock.elapsedTime) * 0.15;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.05;

    target.current.x += (pointer.x * 0.3 - target.current.x) * 0.05;
    target.current.y += (pointer.y * 0.3 - target.current.y) * 0.05;
    mesh.current.rotation.x += target.current.y * 0.002;
    mesh.current.rotation.z += target.current.x * 0.002;
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.4, 0.4, 64, 128]} />
      <MeshTransmissionMaterial
        thickness={1.8}
        roughness={0.08}
        transmission={1}
        chromaticAberration={0.02}
        backside
        samples={10}
        color="#4F7CFF"
        ior={1.5}
        envMapIntensity={1.5}
        clearcoat={0.3}
      />
    </mesh>
  );
}

export default function HeroGlassRing() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={2} color="#4F7CFF" />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#7B61FF" />
      <Environment preset="city" />
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <GlassRing />
      </Float>
      <Sparkles count={30} scale={4} size={0.8} speed={0.2} color="#4F7CFF" opacity={0.4} />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={4} blur={2.5} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
