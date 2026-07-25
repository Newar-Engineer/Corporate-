"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function GlassRings() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const rings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      const radius = 1.2 + i * 0.5;
      const tube = 0.04 + i * 0.01;
      const color = i % 2 === 0 ? "#4F7CFF" : "#7B61FF";
      arr.push({
        radius,
        tube,
        color,
        rotX: Math.PI / 2 + (i * 0.15),
        rotY: i * 0.4,
        speed: 0.2 + i * 0.05,
        offset: i * 0.8,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.05;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    const px = (pointer.x * 0.3);
    const py = (pointer.y * 0.2);
    group.current.position.x = px;
    group.current.position.z = py * 0.5;
  });

  return (
    <>
      <Environment preset="studio" />
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={group}>
          {rings.map((ring, i) => (
            <mesh key={i} position={[0, 0, 0]}>
              <torusGeometry args={[ring.radius, ring.tube, 64, 128]} />
              <MeshTransmissionMaterial
                backside
                thickness={0.3}
                chromaticAberration={0.04 * (i + 1)}
                anisotropicBlur={0.1}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
                envMapIntensity={1.5}
                metalness={0.2}
                roughness={0.3}
                ior={1.5}
                color={ring.color}
                transmission={0.95}
                opacity={0.85}
              />
            </mesh>
          ))}
        </group>
      </Float>
      <Sparkles count={60} scale={6} size={0.6} speed={0.3} color="#4F7CFF" opacity={0.3} />
    </>
  );
}
