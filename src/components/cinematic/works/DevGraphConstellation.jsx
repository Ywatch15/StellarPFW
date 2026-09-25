// FILE: src/components/cinematic/works/DevGraphConstellation.jsx
// Living Constellation / Knowledge Star Cluster for DevGraph
// Semantic Mapping:
// - Star = developer note
// - Brighter / Larger Star = important or highly connected note
// - Thin Connection = shared tag / similarity relationship
// - Small Cluster = knowledge category (7 categories: bug-fix, snippet, architecture, command, config, learning, other)
// - Full Constellation = developer knowledge graph
// Ambient Motion: continuous subtle star pulsing, tiny drift, and connection modulation when scrolling stops.

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 7 Semantic Knowledge Categories & Color Mapping
const CATEGORIES = [
  { id: 'architecture', name: 'Architecture', color: '#38bdf8', center: [0.0, 0.2, 0.1], weight: 1.4 },
  { id: 'bug-fix', name: 'Bug-Fix', color: '#f43f5e', center: [-1.2, 0.8, -0.3], weight: 1.1 },
  { id: 'snippet', name: 'Snippet', color: '#10b981', center: [1.1, 0.9, -0.2], weight: 1.0 },
  { id: 'command', name: 'Command', color: '#a78bfa', center: [-1.3, -0.7, 0.2], weight: 1.1 },
  { id: 'config', name: 'Config', color: '#0ea5e9', center: [1.2, -0.6, -0.1], weight: 1.0 },
  { id: 'learning', name: 'Learning', color: '#818cf8', center: [0.2, 1.4, -0.4], weight: 1.2 },
  { id: 'other', name: 'Other', color: '#94a3b8', center: [0.0, -1.2, 0.3], weight: 0.9 },
];

/**
 * Builds the constellation topology: 35 nodes across 7 category clusters,
 * with intra-cluster and inter-cluster connection links.
 */
function buildConstellationTopology() {
  const nodes = [];
  const linePositions = [];
  const lineColors = [];

  // Generate nodes per cluster
  CATEGORIES.forEach((cat, catIdx) => {
    const [cx, cy, cz] = cat.center;

    // 1 Hub / Landmark Star (Brighter & Larger)
    const hubIndex = nodes.length;
    nodes.push({
      position: new THREE.Vector3(cx, cy, cz),
      basePosition: new THREE.Vector3(cx, cy, cz),
      color: new THREE.Color(cat.color),
      size: 0.22 * cat.weight,
      isHub: true,
      category: cat.id,
      phase: catIdx * 0.9,
      pulseSpeed: 1.5 + (catIdx % 3) * 0.4,
    });

    // 4 Satellite Notes per cluster
    const offsets = [
      [0.35, 0.22, 0.15],
      [-0.30, 0.25, -0.18],
      [0.22, -0.28, -0.12],
      [-0.25, -0.22, 0.20],
    ];

    offsets.forEach((off, offIdx) => {
      const satelliteIdx = nodes.length;
      const pos = new THREE.Vector3(
        cx + off[0] * cat.weight,
        cy + off[1] * cat.weight,
        cz + off[2] * cat.weight,
      );
      const isImportant = offIdx === 0;
      nodes.push({
        position: pos.clone(),
        basePosition: pos.clone(),
        color: new THREE.Color(cat.color).lerp(new THREE.Color('#ffffff'), 0.15),
        size: isImportant ? 0.14 : 0.09,
        isHub: false,
        category: cat.id,
        phase: (catIdx + offIdx) * 1.3,
        pulseSpeed: 2.0 + (offIdx % 3) * 0.5,
      });

      // Intra-cluster connection line: Hub -> Satellite note
      linePositions.push(cx, cy, cz);
      linePositions.push(pos.x, pos.y, pos.z);
      const c = new THREE.Color(cat.color);
      lineColors.push(c.r, c.g, c.b);
      lineColors.push(c.r, c.g, c.b);
    });
  });

  // Cross-cluster connections (Shared tag & architectural relationships)
  const interConnections = [
    ['architecture', 'bug-fix'],
    ['architecture', 'snippet'],
    ['architecture', 'command'],
    ['architecture', 'config'],
    ['architecture', 'learning'],
    ['bug-fix', 'snippet'],
    ['command', 'config'],
    ['learning', 'other'],
    ['other', 'architecture'],
  ];

  interConnections.forEach(([idA, idB]) => {
    const nodeA = nodes.find((n) => n.isHub && n.category === idA);
    const nodeB = nodes.find((n) => n.isHub && n.category === idB);
    if (nodeA && nodeB) {
      linePositions.push(nodeA.basePosition.x, nodeA.basePosition.y, nodeA.basePosition.z);
      linePositions.push(nodeB.basePosition.x, nodeB.basePosition.y, nodeB.basePosition.z);
      lineColors.push(nodeA.color.r, nodeA.color.g, nodeA.color.b);
      lineColors.push(nodeB.color.r, nodeB.color.g, nodeB.color.b);
    }
  });

  return { nodes, linePositions, lineColors };
}

/**
 * Procedural circular star sprite shader
 */
const StarShaderMaterial = {
  vertexShader: `
    uniform float uTime;
    attribute float aSize;
    attribute vec3 aColor;
    attribute float aPhase;
    attribute float aPulseSpeed;
    varying vec3 vColor;
    varying float vPulse;

    void main() {
      vColor = aColor;
      float pulse = 0.85 + 0.30 * sin(uTime * aPulseSpeed + aPhase);
      vPulse = pulse;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * pulse * (420.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vPulse;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float core = 1.0 - smoothstep(0.0, 0.18, dist);
      float halo = 1.0 - smoothstep(0.18, 0.50, dist);
      vec3 finalColor = mix(vColor, vec3(1.0), core * 0.75);
      float alpha = (core + halo * 0.55) * vPulse;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

export default function DevGraphConstellation({
  isActive = true,
  isPageVisible = true,
  prefersReducedMotion = false,
  ambientGroupRef,
}) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const shaderMatRef = useRef();

  const topology = useMemo(() => {
    return buildConstellationTopology();
  }, []);

  // Set up Point Buffer Attributes
  const pointAttributes = useMemo(() => {
    const count = topology.nodes.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    topology.nodes.forEach((node, i) => {
      positions[i * 3] = node.basePosition.x;
      positions[i * 3 + 1] = node.basePosition.y;
      positions[i * 3 + 2] = node.basePosition.z;

      colors[i * 3] = node.color.r;
      colors[i * 3 + 1] = node.color.g;
      colors[i * 3 + 2] = node.color.b;

      sizes[i] = node.size;
      phases[i] = node.phase;
      speeds[i] = node.pulseSpeed;
    });

    return { positions, colors, sizes, phases, speeds };
  }, [topology]);

  // Set up Line Buffer Attributes
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(topology.linePositions, 3),
    );
    geom.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(topology.lineColors, 3),
    );
    return geom;
  }, [topology]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  // Decoupled continuous ambient motion: star pulsing, subtle yaw & breathing links
  useFrame((state, delta) => {
    if (!isActive || !isPageVisible) return;

    if (!prefersReducedMotion) {
      if (shaderMatRef.current) {
        shaderMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      }

      if (ambientGroupRef?.current) {
        const t = state.clock.elapsedTime;
        // Subtle, continuous yaw and gentle harmonic inclination
        ambientGroupRef.current.rotation.y += delta * 0.05;
        ambientGroupRef.current.rotation.x = Math.sin(t * 0.3) * 0.035;
        ambientGroupRef.current.rotation.z = Math.cos(t * 0.25) * 0.025;
      }

      if (linesRef.current?.material) {
        // Subtle connection breathing
        const t = state.clock.elapsedTime;
        linesRef.current.material.opacity = 0.28 + Math.sin(t * 1.2) * 0.08;
      }
    }
  });

  return (
    <group>
      {/* ── 1. STAR NODES (POINTS) ── */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointAttributes.positions.length / 3}
            array={pointAttributes.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={pointAttributes.colors.length / 3}
            array={pointAttributes.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={pointAttributes.sizes.length}
            array={pointAttributes.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            count={pointAttributes.phases.length}
            array={pointAttributes.phases}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aPulseSpeed"
            count={pointAttributes.speeds.length}
            array={pointAttributes.speeds}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={shaderMatRef}
          vertexShader={StarShaderMaterial.vertexShader}
          fragmentShader={StarShaderMaterial.fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── 2. CONSTELLATION CONNECTION LINKS (LINE SEGMENTS) ── */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* ── 3. ASTRONOMICAL ILLUMINATION ACCENTS ── */}
      {/* Central Architecture Stellar Glow */}
      <pointLight position={[0, 0.2, 0.2]} intensity={1.5} color="#38bdf8" distance={5} />
      {/* Knowledge Bridge Ambient Accent */}
      <pointLight position={[-1.2, 0.8, 0]} intensity={0.8} color="#f43f5e" distance={4} />
      <pointLight position={[1.1, 0.9, 0]} intensity={0.8} color="#10b981" distance={4} />
    </group>
  );
}
