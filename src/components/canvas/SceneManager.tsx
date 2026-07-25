"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping, SMAA } from "@react-three/postprocessing";
import GlassRings from "./GlassRings";
import ChromeRibbon from "./ChromeRibbon";
import LiquidOrb from "./LiquidOrb";
import * as THREE from "three";

const objects = [GlassRings, ChromeRibbon, LiquidOrb];

function SceneContent({ activeSection }: { activeSection: number }) {
  const ActiveObject = objects[activeSection];
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} color="#4F7CFF" />
      <directionalLight position={[-3, 1, -2]} intensity={0.8} color="#7B61FF" />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#FF8A3D" />

      <Suspense fallback={null}>
        <ActiveObject key={activeSection} />
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
        <ToneMapping adaptive />
        <SMAA />
      </EffectComposer>
    </>
  );
}

export default function SceneManager() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-scene-section]");
    sectionsRef.current = Array.from(els) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-scene-index"));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        }
      },
      { threshold: 0.4 }
    );

    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <SceneContent activeSection={activeSection} />
      </Canvas>
    </div>
  );
}
