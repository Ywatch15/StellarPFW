// FILE: src/components/HeroScene.jsx
// 3D hero scene with low-poly planet — lazy loaded via React.lazy
// Adapts quality based on device capability; falls back on WebGL context loss
import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import useDeviceCapability from '../hooks/useDeviceCapability';
import FallbackHero from './FallbackHero';

/** Low-poly icosahedron planet with atmosphere glow */
function Planet() {
  const meshRef = useRef();

  // Slowly rotate the planet
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Core planet */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial
            color="#6c63ff"
            flatShading
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        {/* Atmosphere glow */}
        <mesh scale={1.2}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Ring */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.6, 0.06, 8, 48]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

/** Tiny orbiting moon */
function Moon() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4;
    ref.current.position.set(Math.cos(t) * 4, Math.sin(t) * 0.5, Math.sin(t) * 4);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#facc15" flatShading />
    </mesh>
  );
}

/** Orbiting particles for high-end devices */
function OrbitalParticles({ count = 80 }) {
  const ref = useRef();
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 3.5 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#6c63ff" size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Quick WebGL support test that doesn't leave a lingering context
function isWebGLAvailable() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    // Clean up immediately
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const { tier, prefersReducedMotion } = useDeviceCapability();
  const [contextLost, setContextLost] = useState(!isWebGLAvailable());
  const lossCountRef = useRef(0);

  const starCount = tier === 'high' ? 800 : tier === 'medium' ? 400 : 200;
  const showParticles = tier === 'high' && !prefersReducedMotion;

  const handleCreated = useCallback(({ gl }) => {
    // Limit pixel ratio to reduce GPU memory pressure
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      lossCountRef.current += 1;
      // After 1 loss, permanently fall back — don't keep retrying
      setContextLost(true);
    });
  }, []);

  // If context is lost or WebGL was never available, show CSS fallback
  if (contextLost) {
    return <FallbackHero />;
  }

  return (
    <div
      className="absolute inset-0 -z-10"
      aria-hidden="true"
      role="img"
      aria-label="3D space scene with a rotating planet"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: true,
          stencil: false,
          depth: true,
        }}
        frameloop={prefersReducedMotion ? 'demand' : 'always'}
        onCreated={handleCreated}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Stars radius={80} depth={60} count={starCount} factor={3} fade speed={prefersReducedMotion ? 0 : 0.8} />
        <Planet />
        <Moon />
        {showParticles && <OrbitalParticles count={80} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
