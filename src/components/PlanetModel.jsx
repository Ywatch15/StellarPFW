// FILE: src/components/PlanetModel.jsx
// 3D planet with procedural geometry — placeholder for GLTF models
// Lazy-loaded via React.lazy + Suspense pattern
//
// TODO: Replace procedural geometry with a real GLTF model:
// 1. Place your .glb file in public/models/planet.glb
// 2. Compress: npx gltf-transform draco planet.glb planet-draco.glb
// 3. Use <GLTFModel url="/models/planet-draco.glb" /> instead
// 4. Ensure file size < 100 KB after Draco compression

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * @param {{ color: string, size: number, distort: number, speed: number }} props
 */
export default function PlanetModel({
  color = '#6c63ff',
  size = 1,
  distort = 0.3,
  speed = 0.8,
  roughness = 0.7,
  metalness = 0.3,
}) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Core planet body */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[size, 4]} />
          <MeshDistortMaterial
            color={color}
            distort={distort}
            speed={speed}
            roughness={roughness}
            metalness={metalness}
            flatShading
          />
        </mesh>

        {/* Atmosphere glow */}
        <mesh scale={1.15}>
          <icosahedronGeometry args={[size, 4]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.06}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Optional ring */}
        <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
          <torusGeometry args={[size * 1.6, 0.03, 8, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}
