// FILE: src/components/cinematic/works/BlackHoleSingularity.jsx
// Physically-inspired WebGL Black Hole for the cinematic Works continuum.
// Features: Schwarzschild event horizon, photon ring, relativistic Doppler-beamed accretion disk,
// and strict resource release (stops animation loop and hides meshes when outside transition window).
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Center coordinates (-1.0 to 1.0)
    vec2 p = vUv * 2.0 - 1.0;
    float dist = length(p);

    // Event Horizon (Singularity core)
    float horizonRadius = 0.38;
    if (dist < horizonRadius) {
      // Pure black event horizon
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    // Photon Ring (Extremely bright, thin gravitational boundary)
    float photonRing = smoothstep(0.03, 0.0, abs(dist - 0.40)) * 2.5;

    // Relativistic Accretion Disk (0.40 to 0.95)
    float disk = smoothstep(0.40, 0.44, dist) * smoothstep(0.95, 0.50, dist);

    // Relativistic Doppler Beaming (Asymmetric brightness: left side rotating toward observer is brighter)
    float angle = atan(p.y, p.x) + uTime * 0.4;
    float doppler = 0.5 + 0.5 * sin(angle);
    float beaming = mix(0.4, 1.6, doppler);

    // Accretion swirl striations
    float swirl = sin(dist * 35.0 - uTime * 1.5 + angle * 2.0) * 0.15 + 0.85;

    // Spectral Temperature Gradient:
    // Inner boundary = bright white/cyan, mid = amber/gold, outer = deep indigo/violet
    vec3 innerColor = vec3(0.85, 0.95, 1.0);
    vec3 midColor = vec3(0.96, 0.62, 0.15); // Golden accretion plasma
    vec3 outerColor = vec3(0.42, 0.22, 0.75); // Outer cooling distortion

    float t = smoothstep(0.40, 0.85, dist);
    vec3 plasmaColor = mix(innerColor, midColor, smoothstep(0.0, 0.5, t));
    plasmaColor = mix(plasmaColor, outerColor, smoothstep(0.5, 1.0, t));

    vec3 finalColor = plasmaColor * disk * beaming * swirl + vec3(1.0, 0.98, 0.9) * photonRing;
    float alpha = clamp(disk * beaming * swirl * 0.9 + photonRing, 0.0, 1.0) * uIntensity;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function BlackHoleSingularity({ isActive, transitionProgress = 0, isPageVisible }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
    }),
    [],
  );

  // Decoupled continuous ambient animation: strictly active ONLY when isActive && isPageVisible
  useFrame((_, delta) => {
    if (!isActive || !isPageVisible || !materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta * 0.8;
    materialRef.current.uniforms.uIntensity.value = Math.min(1.0, transitionProgress * 1.5);
  });

  return (
    <group visible={isActive}>
      {/* Gravitational Accretion Disk (Slanted to reveal 3D accretion topology) */}
      <mesh ref={meshRef} rotation={[-Math.PI / 3.2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[7.0, 7.0, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Central Black Hole Event Horizon Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Subtle Lensing Glow Light */}
      <pointLight position={[0, 0, 0.5]} intensity={1.2} color="#f59e0b" distance={8} />
    </group>
  );
}
