"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Droplet({ pos, delay }: { pos: [number, number, number]; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.5 + delay;
    ref.current.position.y = pos[1] + Math.sin(t * 0.8) * 0.15;
    ref.current.scale.setScalar(0.8 + Math.sin(t * 1.2) * 0.15);
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshPhysicalMaterial
        color="#7B61FF"
        metalness={0.9}
        roughness={0.05}
        envMapIntensity={2}
        clearcoat={0.8}
      />
    </mesh>
  );
}

function Ripple() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    ref.current.scale.setScalar(scale);
    const mat = ref.current.material as THREE.MeshPhysicalMaterial;
    mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.6, 1.0, 64]} />
      <meshPhysicalMaterial
        color="#4F7CFF"
        transparent
        opacity={0.15}
        metalness={0.3}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const wobbleVertShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  float noise = sin(pos.x * 2.0 + uTime * 0.5) * 0.02 +
                sin(pos.y * 3.0 + uTime * 0.4) * 0.02 +
                sin(pos.z * 2.5 + uTime * 0.6) * 0.02;
  pos += normal * noise;
  vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const wobbleFragShader = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vec3 light = normalize(vec3(1.0, 2.0, 1.0));
  float diff = max(dot(vNormal, light), 0.0);
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
  vec3 col = mix(vec3(0.3, 0.5, 1.0), vec3(0.7, 0.4, 1.0), fresnel);
  col += vec3(0.1, 0.15, 0.3) * diff;
  col += vec3(0.2, 0.15, 0.4) * fresnel * 0.5;
  gl_FragColor = vec4(col, 0.85);
}
`;

function WobbleSphere() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
    const px = (pointer.x * 0.2);
    const py = (pointer.y * 0.12);
    ref.current.position.x = px;
    ref.current.position.z = py * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 0.1, 0]}>
      <sphereGeometry args={[0.55, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={wobbleVertShader}
        fragmentShader={wobbleFragShader}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

const dropletPositions: [number, number, number][] = [
  [0.6, 0.5, 0.3],
  [-0.5, 0.6, -0.2],
  [0.4, -0.5, 0.4],
  [-0.4, -0.4, -0.3],
  [0.7, 0.1, -0.4],
  [-0.6, 0.2, 0.5],
  [0.0, 0.7, 0.2],
  [-0.2, -0.6, -0.1],
];

export default function LiquidOrb() {
  return (
    <>
      <Environment preset="studio" />
      <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.15}>
        <WobbleSphere />
        {dropletPositions.map((pos, i) => (
          <Droplet key={i} pos={pos} delay={i * 0.3} />
        ))}
      </Float>
      <Ripple />
    </>
  );
}
