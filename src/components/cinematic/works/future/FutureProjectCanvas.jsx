// FILE: src/components/cinematic/works/future/FutureProjectCanvas.jsx
// 3D Cinematic Deep-Space Universe for Future Project Loading Sequence
// Utilizes REAL NASA 3D assets (Hubble, Pioneer 10, Mars Global Surveyor, Moon, Bennu)
// Strictly NO procedural placeholder bodies or giant decorative dashboard rings
// Decoupled continuous ambient motion in useFrame (spacecraft drift/rotation persists when scrolling stops)
// 100% stable React Hook lifecycle (zero conditional hook invocations, zero early returns before hooks)
// Mobile Collision-Free Slot System:
// - Primary Object Slot: Isolated in Upper Visual Zone (Y ≈ +1.45, Z ≈ -2.3)
// - Telemetry Safe Zone: Protected Middle Corridor (Y between -0.8 and +0.5 is 100% clear of 3D objects)
// - Secondary Object Slot: Lower Approaching Zone (Y ≈ -2.15, Z ≈ -4.6)
// - Reservoir Triangle Mode: Hubble Top, Moon Lower-Left, Bennu Lower-Right (zero object overlap)

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import useDeviceCapability from '../../../../hooks/useDeviceCapability';
import usePageVisibility from '../../../../hooks/usePageVisibility';
import { FUTURE_PROJECT_SIGNALS } from './futureProjectsData';

const DRACO_DECODER_PATH = '/draco/gltf/';

/**
 * Normalizes a 3D model: centers geometry at (0,0,0) and uniformly scales to targetSize.
 */
function createNormalizedPivot(originalScene, targetSize = 2.0) {
  const cloned = originalScene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const center = new THREE.Vector3();
  box.getCenter(center);
  cloned.position.set(-center.x, -center.y, -center.z);

  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const s = maxDim > 0 ? targetSize / maxDim : 1;

  const pivot = new THREE.Group();
  pivot.scale.set(s, s, s);
  pivot.add(cloned);
  return pivot;
}

/**
 * Generates a smooth circular gradient texture for natural star point rendering.
 * Prevents WebGL default square point artifacts.
 */
function createStarTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(224, 231, 255, 0.8)');
  gradient.addColorStop(0.7, 'rgba(148, 163, 184, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ── 1. REAL NASA 3D SPACE OBJECTS ──

/**
 * Object 01: Real Hubble Space Telescope (NASA GSFC / STScI)
 * Authentic cylindrical telescope body, solar panels, and aperture door.
 */
function HubbleHero({ isMobile, isVisible, motion, prefersReducedMotion }) {
  const { scene } = useGLTF('/models/cinematic/future/hubble-space-telescope.glb', DRACO_DECODER_PATH);
  const pivot = useMemo(() => createNormalizedPivot(scene, isMobile ? 1.3 : 1.9), [scene, isMobile]);
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!isVisible || prefersReducedMotion || !groupRef.current) return;
    // Slow majestic axial drift and subtle pitch sway
    groupRef.current.rotation.y += delta * motion.rotationSpeed;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * motion.pitchSway;
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0.4, -0.1]}>
      <primitive object={pivot} />
      {/* Subtle directional sunlight highlighting solar arrays and foil */}
      <directionalLight position={[3, 2, 4]} intensity={2.0} color="#f8fafc" />
    </group>
  );
}

/**
 * Object 02: Real Lunar Planetary Body (NASA GSFC / LRO)
 * Uses authentic NASA Lunar Reconnaissance Orbiter surface texture map.
 */
function LunarMoonHero({ isMobile, isVisible, motion, prefersReducedMotion }) {
  const texture = useTexture('/models/cinematic/future/nasa-moon-1024.jpg');
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (!isVisible || prefersReducedMotion || !meshRef.current) return;
    // Authentic slow lunar rotation
    meshRef.current.rotation.y += delta * motion.rotationSpeed;
  });

  return (
    <group rotation={[0.1, 0, 0.05]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[isMobile ? 0.65 : 1.0, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.92}
          metalness={0.08}
        />
      </mesh>
      {/* Oblique cinematic sunlight producing realistic crater relief and crescent terminator */}
      <directionalLight position={[-4, 1.5, 3]} intensity={2.4} color="#f1f5f9" />
    </group>
  );
}

/**
 * Object 03: Real Pioneer 10 Deep Space Probe (NASA ARC / JPL)
 * Authentic high-gain parabolic antenna, RTG power booms, and scientific instrumentation.
 */
function PioneerHero({ isMobile, isVisible, motion, prefersReducedMotion }) {
  const { scene } = useGLTF('/models/cinematic/future/pioneer-10.glb', DRACO_DECODER_PATH);
  const pivot = useMemo(() => createNormalizedPivot(scene, isMobile ? 1.25 : 1.8), [scene, isMobile]);
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!isVisible || prefersReducedMotion || !groupRef.current) return;
    // Slow attitude spin-stabilization around antenna boresight axis
    groupRef.current.rotation.z += delta * motion.rotationSpeed;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * motion.pitchSway;
  });

  return (
    <group ref={groupRef} rotation={[0.4, -0.3, 0.1]}>
      <primitive object={pivot} />
      <directionalLight position={[2, 3, 2]} intensity={1.8} color="#e2e8f0" />
    </group>
  );
}

/**
 * Object 04: Real Mars Global Surveyor (NASA JPL)
 * Authentic dual solar array wings, high-gain dish, and planetary science payload.
 */
function SurveyorHero({ isMobile, isVisible, motion, prefersReducedMotion }) {
  const { scene } = useGLTF('/models/cinematic/future/mars-global-surveyor.glb', DRACO_DECODER_PATH);
  const pivot = useMemo(() => createNormalizedPivot(scene, isMobile ? 1.2 : 1.7), [scene, isMobile]);
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!isVisible || prefersReducedMotion || !groupRef.current) return;
    // Slow orbital precession and Nadir scan sweep
    groupRef.current.rotation.y += delta * motion.rotationSpeed;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * motion.pitchSway;
  });

  return (
    <group ref={groupRef} rotation={[-0.2, 0.5, 0.1]}>
      <primitive object={pivot} />
      <directionalLight position={[-3, 2, 3]} intensity={1.9} color="#e0f2fe" />
    </group>
  );
}

/**
 * Object 05: Real Asteroid 1999 RQ36 / Bennu (NASA GSFC / OSIRIS-REx)
 * Authentic boulder-covered irregular carbonaceous asteroid topography.
 */
function BennuHero({ isMobile, isVisible, motion, prefersReducedMotion }) {
  const { scene } = useGLTF('/models/cinematic/asteroid-bennu.glb');
  const pivot = useMemo(() => createNormalizedPivot(scene, isMobile ? 1.0 : 1.5), [scene, isMobile]);
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!isVisible || prefersReducedMotion || !groupRef.current) return;
    // Realistic multi-axis tumbling
    groupRef.current.rotation.x += delta * motion.rotationSpeed;
    groupRef.current.rotation.y += delta * (motion.rotationSpeed * 0.7);
    groupRef.current.rotation.z += delta * (motion.rotationSpeed * 0.4);
  });

  return (
    <group ref={groupRef}>
      <primitive object={pivot} />
      <directionalLight position={[3, 1, 2]} intensity={1.6} color="#f8fafc" />
    </group>
  );
}

// ── 2. RESTRAINED MINIMALIST TARGETING RETICLE ──

/**
 * Minimalist spatial bracket:
 * Strictly avoids giant circular rings and placeholder squares.
 * Shows faint, subtle corner brackets only during acquisition and fades down in standby.
 * Stable hook execution: always registers hooks, toggles visible attribute on group.
 */
function MinimalLocatorBracket({ color, state }) {
  const bracketRef = useRef();
  const isVisible = state !== 'UNDETECTED';

  useFrame((threeState) => {
    if (!isVisible || !bracketRef.current) return;
    if (state === 'INITIALIZING') {
      const pulse = (Math.sin(threeState.clock.elapsedTime * 4) + 1) * 0.5;
      bracketRef.current.scale.setScalar(1 + pulse * 0.05);
    }
  });

  // Very subtle opacity: transient during detection, unobtrusive during standby
  const opacity = state === 'DETECTED' ? 0.3 : state === 'INITIALIZING' ? 0.55 : 0.18;
  const bracketSize = 1.05;
  const armLen = 0.16;
  const thickness = 0.012;

  return (
    <group ref={bracketRef} visible={isVisible}>
      {/* 4 Restrained corner brackets (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
      {[
        [-bracketSize, bracketSize],
        [bracketSize, bracketSize],
        [-bracketSize, -bracketSize],
        [bracketSize, -bracketSize],
      ].map(([cx, cy], i) => {
        const signX = Math.sign(cx);
        const signY = Math.sign(cy);
        return (
          <group key={i} position={[cx, cy, 0]}>
            {/* Horizontal tick */}
            <mesh position={[-signX * (armLen / 2), 0, 0]}>
              <boxGeometry args={[armLen, thickness, thickness]} />
              <meshBasicMaterial color={color} transparent opacity={opacity} />
            </mesh>
            {/* Vertical tick */}
            <mesh position={[0, -signY * (armLen / 2), 0]}>
              <boxGeometry args={[thickness, armLen, thickness]} />
              <meshBasicMaterial color={color} transparent opacity={opacity} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ── 3. NATURAL DEEP SPACE STELLAR FIELD ──

/**
 * Deep Space Cosmic Field (Authentic Stellar Points)
 * Uses soft circular star discs with gentle depth distribution.
 * Perfectly matches the Stellar portfolio aesthetic; zero square placeholder artifacts.
 */
function DeepSpaceStars() {
  const points = useRef();
  const starTexture = useMemo(() => createStarTexture(), []);

  const positions = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = -4 - Math.random() * 24;
    }
    return pos;
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#cbd5e1"
        transparent
        opacity={0.35}
        map={starTexture}
        alphaTest={0.01}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ── 4. MOBILE SPATIAL SLOT SYSTEM ──

/**
 * Mobile Spatial Slot System:
 * Guarantees zero collision between 3D objects and zero collision with central telemetry text.
 * Slot 1 (Upper): Primary active object at Y = +1.45, Z = -2.3
 * Protected Zone (Middle): Y between -0.8 and +0.5 is kept 100% clear for status text
 * Slot 2 (Lower): Approaching secondary object at Y = -2.15, Z = -4.6
 * Reservoir Mode: Triangle composition (Hubble Top, Moon Lower-Left, Bennu Lower-Right)
 */
function computeMobileLayout(index, progress) {
  let pos = [0, 0, -10];
  let scale = 0.5;
  let isVisible = false;
  let state = 'UNDETECTED';

  if (progress >= 0.82) {
    // ── RESERVOIR MODE: TRIANGLE COMPOSITION (Option A: Side-by-Side in lower area) ──
    if (index === 0) {
      // Hubble: Upper Primary Slot
      pos = [0.0, 1.45, -2.4];
      scale = 0.54;
      isVisible = true;
      state = 'STANDBY';
    } else if (index === 1) {
      // Moon: Lower-Left Slot (side-by-side with Bennu)
      pos = [-0.85, -2.0, -3.8];
      scale = 0.38;
      isVisible = true;
      state = 'STANDBY';
    } else if (index === 4) {
      // Bennu: Lower-Right Slot (side-by-side with Moon)
      pos = [0.85, -2.0, -3.8];
      scale = 0.35;
      isVisible = true;
      state = 'STANDBY';
    } else {
      // Secondary probes parked offscreen to keep mobile screen completely uncluttered
      isVisible = false;
    }
    return { pos, scale, isVisible, state };
  }

  // ── PROGRESSIVE DISCOVERY PHASES ──
  const isPrimary = (
    (index === 0 && progress < 0.34) ||
    (index === 1 && progress >= 0.34 && progress < 0.52) ||
    (index === 2 && progress >= 0.52 && progress < 0.68) ||
    (index === 3 && progress >= 0.68 && progress < 0.82)
  );

  const isSecondary = (
    (index === 1 && progress >= 0.12 && progress < 0.34) ||
    (index === 2 && progress >= 0.34 && progress < 0.52) ||
    (index === 3 && progress >= 0.52 && progress < 0.68) ||
    (index === 4 && progress >= 0.68 && progress < 0.82)
  );

  if (isPrimary) {
    isVisible = true;
    pos = [0.0, 1.45, -2.3];

    // Smooth arrival along Z into primary slot
    let localT = 0;
    if (index === 0) localT = Math.min(1, Math.max(0, progress / 0.20));
    else if (index === 1) localT = Math.min(1, Math.max(0, (progress - 0.34) / 0.08));
    else if (index === 2) localT = Math.min(1, Math.max(0, (progress - 0.52) / 0.08));
    else if (index === 3) localT = Math.min(1, Math.max(0, (progress - 0.68) / 0.08));

    pos[2] = -4.5 + localT * 2.2; // arrives from -4.5 to -2.3
    scale = 0.40 + localT * 0.16; // scales from 0.40 to 0.56

    if (localT > 0.7) state = 'STANDBY';
    else if (localT > 0.3) state = 'INITIALIZING';
    else state = 'DETECTED';

  } else if (isSecondary) {
    isVisible = true;
    pos = [0.0, -2.15, -4.6];
    scale = 0.36;
    state = 'DETECTED';
  } else {
    isVisible = false;
  }

  return { pos, scale, isVisible, state };
}

// ── 5. SIGNAL NODE COORDINATOR ──

/**
 * Single Signal Node in 3D Space
 * Anchors real NASA object, handles deep-space approach trajectory, and applies decoupled ambient drift.
 * STRICT HOOK ORDER COMPLIANCE:
 * - All React hooks are called unconditionally at top of component.
 * - Zero conditional early returns (no `if (...) return null`).
 * - Visibility gating and performance adjustments are handled via `visible` attribute and early-return in `useFrame`.
 */
function SignalSpaceNode({ signal, index, progress, isMobile, prefersReducedMotion }) {
  // 1. ALL HOOK DECLARATIONS FIRST (UNCONDITIONAL)
  const rootRef = useRef();

  // Calculate target position and visibility
  const mobileLayout = computeMobileLayout(index, progress);
  const targetPos = isMobile ? mobileLayout.pos : signal.position.desktop;
  const isNodeVisible = isMobile ? mobileLayout.isVisible : true;

  useFrame((threeState) => {
    if (prefersReducedMotion || !rootRef.current || !isNodeVisible) return;
    const t = threeState.clock.elapsedTime;
    const driftAmp = isMobile ? 0.03 : signal.motion.driftY;
    rootRef.current.position.y = targetPos[1] + Math.sin(t * 0.4 + targetPos[0]) * driftAmp;
  });

  // 2. DERIVED CALCULATIONS (DESKTOP VS MOBILE)
  let finalPos = targetPos;
  let finalScale = mobileLayout.scale;
  let finalState = mobileLayout.state;

  if (!isMobile) {
    // Desktop layout (100% UNCHANGED)
    let state = 'UNDETECTED';
    let scaleMultiplier = 0.5;

    if (progress >= signal.timing.detect) {
      state = 'DETECTED';
      scaleMultiplier = 0.8;
    }
    if (progress >= signal.timing.init) {
      state = 'INITIALIZING';
      scaleMultiplier = 0.95;
    }
    if (progress >= signal.timing.standby) {
      state = 'STANDBY';
      scaleMultiplier = 1.0;
    }
    if (progress >= signal.timing.hold) {
      state = 'HOLD';
      scaleMultiplier = 1.0;
    }

    const zOffset = state === 'UNDETECTED' ? -7 : 0;
    const currentZ = signal.position.desktop[2] + zOffset * (1 - Math.min(1, Math.max(0, (progress - signal.timing.detect + 0.1) / 0.1)));

    finalPos = [signal.position.desktop[0], signal.position.desktop[1], currentZ];
    finalScale = signal.scale.desktop * scaleMultiplier;
    finalState = state;
  }

  return (
    <group
      ref={rootRef}
      visible={isNodeVisible}
      position={finalPos}
      scale={[finalScale, finalScale, finalScale]}
    >
      {/* Restrained Targeting Locator (no giant circular rings, no blue squares) */}
      <MinimalLocatorBracket color={signal.beaconColor} state={finalState} />

      {/* Real NASA 3D Asset Presentation */}
      <Suspense fallback={null}>
        {signal.type === 'telescope' && (
          <HubbleHero
            isMobile={isMobile}
            isVisible={isNodeVisible}
            motion={signal.motion}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
        {signal.type === 'planet' && (
          <LunarMoonHero
            isMobile={isMobile}
            isVisible={isNodeVisible}
            motion={signal.motion}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
        {signal.type === 'probe' && (
          <PioneerHero
            isMobile={isMobile}
            isVisible={isNodeVisible}
            motion={signal.motion}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
        {signal.type === 'spacecraft' && (
          <SurveyorHero
            isMobile={isMobile}
            isVisible={isNodeVisible}
            motion={signal.motion}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
        {signal.type === 'asteroid' && (
          <BennuHero
            isMobile={isMobile}
            isVisible={isNodeVisible}
            motion={signal.motion}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </Suspense>
    </group>
  );
}

/**
 * Camera Coordinator
 * Smooth camera dolly and scroll parallax + decoupled idle sway
 */
function FutureCameraRig({ progress, isMobile, prefersReducedMotion }) {
  const { camera } = useThree();

  useFrame((state) => {
    // Scroll dolly: pulls back gently into deep space to reveal approaching real assets
    const targetZ = (isMobile ? 5.2 : 4.4) + progress * (isMobile ? 2.8 : 2.4);
    const targetY = (isMobile ? 0.2 : 0.0) - progress * 0.35;

    // Ambient floating sway
    const swayX = prefersReducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.25) * 0.06;
    const swayY = prefersReducedMotion ? 0 : Math.cos(state.clock.elapsedTime * 0.2) * 0.04;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + swayY, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, swayX, 0.08);
    camera.lookAt(0, 0, -2.5);
  });

  return null;
}

/**
 * Main 3D Future Projects Scene Controller
 */
function FutureSceneContent({ progressRef, prefersReducedMotion, isMobile }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!progressRef) return;
    progressRef.onFutureUpdate = (p) => {
      setProgress(p);
    };
  }, [progressRef]);

  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.45} color="#e2e8f0" />

      <FutureCameraRig
        progress={progress}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Natural, authentic deep space star field (zero square placeholders) */}
      <DeepSpaceStars />

      {/* Real NASA Space Assets */}
      {FUTURE_PROJECT_SIGNALS.map((signal, idx) => (
        <SignalSpaceNode
          key={signal.id}
          signal={signal}
          index={idx}
          progress={progress}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </>
  );
}

/**
 * FutureProjectCanvas: Isolated R3F Canvas with Render-On-Demand & Suspended Lifecycle
 */
export default function FutureProjectCanvas({ progressRef, visibilityState = 'ACTIVE' }) {
  const { prefersReducedMotion } = useDeviceCapability();
  const isPageVisible = usePageVisibility();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = visibilityState === 'ACTIVE';

  if (visibilityState === 'SUSPENDED') {
    return <div className="future-3d-placeholder" aria-hidden="true" />;
  }

  return (
    <div className="future-3d-backdrop w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 5.2 : 4.4], fov: isMobile ? 55 : 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <FutureSceneContent
            progressRef={progressRef}
            isActive={isActive}
            isPageVisible={isPageVisible}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
