"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function createRibbonGeometry(segments = 120, width = 1.2) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 4;
    const x = (t - 0.5) * 6;
    const y = Math.sin(angle * 1.2) * 1.0 + Math.sin(t * 8) * 0.3;
    const z = Math.cos(angle * 0.8) * 0.8 + Math.sin(t * 6) * 0.2;

    const halfW = width * 0.3;
    const nx = Math.cos(angle) * halfW;
    const nz = Math.sin(angle) * halfW;

    positions.push(x + nx, y, z + nz);
    positions.push(x - nx, y, z - nz);

    const len = Math.sqrt(nx * nx + nz * nz) || 1;
    normals.push(nx / len, 0, nz / len);
    normals.push(-nx / len, 0, -nz / len);

    uvs.push(t, 0);
    uvs.push(t, 1);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = (i + 1) * 2;
    const d = (i + 1) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export default function ChromeRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const geometry = useMemo(() => createRibbonGeometry(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
    const px = (pointer.x * 0.25);
    const py = (pointer.y * 0.15);
    meshRef.current.position.x = px;
    meshRef.current.position.z = py * 0.3;
    const pos = meshRef.current.geometry.attributes.position;
    const array = pos.array as Float32Array;
    for (let i = 0; i < array.length; i += 3) {
      const t = (i / 3) / (pos.count / 2);
      const wave = Math.sin(state.clock.elapsedTime * 0.6 + t * 4) * 0.08;
      array[i + 1] += wave * 0.01;
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <>
      <Environment preset="dawn" />
      <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.2}>
        <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} scale={0.9}>
          <meshPhysicalMaterial
            color="#B8C5D6"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
          />
        </mesh>
      </Float>
    </>
  );
}
