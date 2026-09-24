// FILE: src/components/cinematic/works/WorksSpatialScene.jsx
// Unified 3D Spatial Continuum for Works pilot: TentDesk & CommandAtlas in ONE space.
// Real NASA GLB assets, decoupled scroll vs. continuous ambient motion, and strict scene visibility thresholds.
import React, { useRef, useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useThree, useFrame, invalidate } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useDeviceCapability from '../../../hooks/useDeviceCapability';
import usePageVisibility from '../../../hooks/usePageVisibility';
import BlackHoleSingularity from './BlackHoleSingularity';

// Local Draco decoder directory for compressed models (Station & Satellite)
const DRACO_DECODER_PATH = '/draco/gltf/';

/**
 * Normalizes a model: centers geometry at (0, 0, 0) and scales uniformly to targetSize.
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
 * TentDesk Hero Object: Modular Orbital Space Station
 * Metaphor: Active operational multi-tenant installation.
 * Uses real AnimationMixer to play mechanical solar tracking clips when active.
 */
function StationHero({ isActive, isPageVisible, prefersReducedMotion, ambientGroupRef }) {
  const { scene, animations } = useGLTF('/models/cinematic/orbital-station.glb', DRACO_DECODER_PATH);
  const mixerRef = useRef(null);

  const pivot = useMemo(() => {
    return createNormalizedPivot(scene, 2.4);
  }, [scene]);

  // Initialize AnimationMixer for built-in GLTF mechanical solar array tracks
  useEffect(() => {
    if (!animations || animations.length === 0) return;
    const mixer = new THREE.AnimationMixer(pivot);
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
    mixerRef.current = mixer;
    return () => {
      mixer.stopAllAction();
    };
  }, [pivot, animations]);

  // Decoupled continuous ambient motion: independent of scroll scrub
  useFrame((_, delta) => {
    if (!isActive || !isPageVisible || prefersReducedMotion) return;
    if (mixerRef.current) {
      mixerRef.current.update(delta * 0.3); // Slow, majestic mechanical tracking
    }
    if (ambientGroupRef.current) {
      ambientGroupRef.current.rotation.y += delta * 0.05; // Gentle orbital yaw
    }
  });

  return (
    <group>
      <primitive object={pivot} />
      {/* Subtle Cyan Operational Beacon */}
      <pointLight position={[0, 0.4, 0.8]} intensity={0.6} color="#38bdf8" distance={4} />
    </group>
  );
}

/**
 * CommandAtlas Hero Object: Deep-Space Observation Satellite
 * Metaphor: High-gain directional data telemetry probe operating deterministically.
 */
function SatelliteHero({ isActive, isPageVisible, prefersReducedMotion, ambientGroupRef }) {
  const { scene } = useGLTF('/models/cinematic/deep-space-satellite.glb', DRACO_DECODER_PATH);

  const pivot = useMemo(() => {
    return createNormalizedPivot(scene, 2.2);
  }, [scene]);

  // Decoupled continuous ambient motion: independent of scroll scrub
  useFrame((state, delta) => {
    if (!isActive || !isPageVisible || prefersReducedMotion) return;
    if (ambientGroupRef.current) {
      ambientGroupRef.current.rotation.y += delta * 0.07; // Slow attitude scan
      ambientGroupRef.current.rotation.x += delta * 0.02;
      ambientGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <group>
      <primitive object={pivot} />
      {/* Subtle Violet Telemetry Beacon */}
      <pointLight position={[0, 0.3, 0.7]} intensity={0.6} color="#a78bfa" distance={4} />
    </group>
  );
}

/**
 * Bank Transaction System Hero Object: Saturn V Launch Vehicle
 * Metaphor: High-integrity multi-stage propulsion, rigorous payload delivery, ACID guarantees.
 * Standard glTF loader, no Draco required.
 */
function RocketHero({ isActive, isPageVisible, prefersReducedMotion, ambientGroupRef }) {
  const { scene } = useGLTF('/models/cinematic/rocket-saturn-v.glb');

  const pivot = useMemo(() => {
    return createNormalizedPivot(scene, 2.5);
  }, [scene]);

  // Decoupled continuous ambient attitude drift: independent of scroll scrub
  useFrame((state, delta) => {
    if (!isActive || !isPageVisible || prefersReducedMotion) return;
    if (ambientGroupRef.current) {
      ambientGroupRef.current.rotation.y += delta * 0.04; // Slow attitude yaw
      ambientGroupRef.current.rotation.x = THREE.MathUtils.degToRad(-15) + Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
      ambientGroupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.25) * 0.02;
    }
  });

  return (
    <group>
      <primitive object={pivot} />
      {/* Warm Amber Propulsion / Double-Entry Ledger Glow */}
      <pointLight position={[0, -0.8, 0.5]} intensity={0.9} color="#f59e0b" distance={5} />
    </group>
  );
}

/**
 * Supporting Deep Space Object: Asteroid Bennu (1999 RQ36)
 * Visually subordinate background anchor providing spatial depth and cosmic scale.
 * Placed deep in background; muted lighting, no Draco required.
 */
function AsteroidSubordinate({ isActive, isPageVisible, prefersReducedMotion, ambientGroupRef }) {
  const { scene } = useGLTF('/models/cinematic/asteroid-bennu.glb');

  const pivot = useMemo(() => {
    return createNormalizedPivot(scene, 2.0);
  }, [scene]);

  useFrame((_, delta) => {
    if (!isActive || !isPageVisible || prefersReducedMotion) return;
    if (ambientGroupRef.current) {
      ambientGroupRef.current.rotation.y += delta * 0.025; // Slow tumbling drift
      ambientGroupRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <group>
      <primitive object={pivot} />
    </group>
  );
}

/**
 * Atmospheric Deep Space Cosmic Nodes
 */
function SpatialCosmosField() {
  const points = useRef();

  useEffect(() => {
    if (!points.current) return;
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = -4 - Math.random() * 12;
    }
    points.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry />
      <pointsMaterial size={0.05} color="#38bdf8" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

/**
 * Unified Spatial Coordinator
 * Enforces:
 * 1. Strict Scene Visibility Thresholds (Loaded != Visible)
 * 2. Separation of Scroll Transforms (Position, Scale, Dolly) vs. Ambient Motion (Rotation, Idle, Clips)
 * 3. Coexistence window and seamless handoffs
 */
function SpatialContinuumController({
  progressRef,
  isActive,
  isPageVisible,
  prefersReducedMotion,
}) {
  const { camera, size } = useThree();

  // Root Groups (Strict Visibility Gating)
  const stationRootRef = useRef();
  const satelliteRootRef = useRef();
  const blackHoleRootRef = useRef();
  const rocketRootRef = useRef();
  const asteroidRootRef = useRef();

  // Scroll Transform Groups (GSAP Spatial Position & Scale)
  const stationScrollGroupRef = useRef();
  const satelliteScrollGroupRef = useRef();
  const blackHoleScrollGroupRef = useRef();
  const rocketScrollGroupRef = useRef();
  const asteroidScrollGroupRef = useRef();

  // Ambient Motion Groups (Continuous useFrame Rotation & Attitude Drift)
  const stationAmbientGroupRef = useRef();
  const satelliteAmbientGroupRef = useRef();
  const rocketAmbientGroupRef = useRef();
  const asteroidAmbientGroupRef = useRef();

  const isMobile = size.width <= 768;

  // Direct transform updater invoked when scrub progress changes
  const applySpatialProgress = useCallback(
    (p) => {
      const clampedP = Math.max(0, Math.min(1, p));

      // ── 1. CAMERA CHOREOGRAPHY ──
      let camX = 0;
      let camY = isMobile ? 0.2 : 0;
      let camZ = 7.0;
      let lookX = 0;
      let lookY = 0;

      if (clampedP <= 0.10) {
        const t = clampedP / 0.10;
        camZ = 7.5 - 1.3 * t; // 7.5 -> 6.2
      } else if (clampedP <= 0.36) {
        // TentDesk focal plane
        const t = (clampedP - 0.10) / 0.26;
        const ease = t * t * (3 - 2 * t);
        camX = isMobile ? 0 : -0.3 * ease;
        camZ = 6.2 - 0.9 * ease; // 6.2 -> 5.3
        lookX = isMobile ? 0 : -0.4 * ease;
      } else if (clampedP <= 0.44) {
        // Continuum handoff bridge
        const t = (clampedP - 0.36) / 0.08;
        const ease = t * t * (3 - 2 * t);
        camX = isMobile ? 0 : -0.3 + 0.6 * ease; // -0.3 -> +0.3
        camZ = 5.3 + Math.sin(t * Math.PI) * 0.7; // slight pull-back during handoff
        lookX = isMobile ? 0 : -0.4 + 0.8 * ease; // -0.4 -> +0.4
      } else if (clampedP <= 0.73) {
        // CommandAtlas focal plane
        camX = isMobile ? 0 : 0.3;
        camZ = 5.3;
        lookX = isMobile ? 0 : 0.4;
      } else if (clampedP <= 0.84) {
        // Black Hole Singularity approach and pass-through
        if (clampedP <= 0.78) {
          const t = (clampedP - 0.73) / 0.05;
          const ease = t * t * (3 - 2 * t);
          camX = (isMobile ? 0 : 0.3) * (1 - ease);
          camZ = 5.3 - 0.9 * ease; // 5.3 -> 4.4
          lookX = (isMobile ? 0 : 0.4) * (1 - ease);
        } else {
          const t = (clampedP - 0.78) / 0.06;
          const ease = t * t * (3 - 2 * t);
          camX = (isMobile ? 0 : 0.3) * ease;
          camZ = 4.4 + 1.0 * ease; // 4.4 -> 5.4
          lookX = (isMobile ? 0 : 0.4) * ease;
        }
      } else {
        // Bank Transaction System focal plane
        camX = isMobile ? 0 : 0.3;
        camZ = 5.4;
        lookX = isMobile ? 0 : 0.4;
      }

      camera.position.set(camX, camY, camZ);
      camera.lookAt(lookX, lookY, 0);

      // ── 2. STRICT VISIBILITY THRESHOLDS (LOADED != VISIBLE) ──
      // TentDesk: visible only between [0.08, 0.46]
      const showStation = clampedP >= 0.08 && clampedP <= 0.46;
      if (stationRootRef.current) {
        stationRootRef.current.visible = showStation;
      }

      // CommandAtlas: visible only between [0.38, 0.74]
      const showSatellite = clampedP >= 0.38 && clampedP <= 0.74;
      if (satelliteRootRef.current) {
        satelliteRootRef.current.visible = showSatellite;
      }

      // Black Hole Transition: visible only between [0.72, 0.84]
      const showBlackHole = clampedP >= 0.72 && clampedP <= 0.84;
      if (blackHoleRootRef.current) {
        blackHoleRootRef.current.visible = showBlackHole;
      }

      // BankSys (Saturn V Rocket): visible only between [0.82, 1.00]
      const showRocket = clampedP >= 0.82 && clampedP <= 1.00;
      if (rocketRootRef.current) {
        rocketRootRef.current.visible = showRocket;
      }

      // Asteroid: subordinate background element [0.08, 0.95]
      const showAsteroid = clampedP >= 0.08 && clampedP <= 0.95;
      if (asteroidRootRef.current) {
        asteroidRootRef.current.visible = showAsteroid;
      }

      // ── 3. TENTDESK SPATIAL TRAJECTORY (SCROLL TRANSFORM ONLY) ──
      if (stationScrollGroupRef.current && showStation) {
        let tdX = isMobile ? 0 : 1.8;
        let tdY = isMobile ? 1.2 : 0;
        let tdZ = -8.5;
        let tdScale = 0.25;

        if (clampedP < 0.10) {
          tdZ = -8.5;
          tdScale = 0.25;
        } else if (clampedP <= 0.24) {
          // Arrival from depth into right focal plane
          const t = (clampedP - 0.10) / 0.14;
          const ease = t * t * (3 - 2 * t);
          tdZ = -8.5 + (isMobile ? 8.0 : 8.7) * ease; // -> -0.5 / +0.2
          tdScale = 0.25 + (isMobile ? 0.35 : 0.7) * ease; // -> 0.6 / 0.95
        } else if (clampedP <= 0.36) {
          // Stillness & architecture inspection
          tdZ = isMobile ? -0.5 : 0.2;
          tdScale = isMobile ? 0.6 : 0.95;
        } else if (clampedP <= 0.46) {
          // Recedes across to deep left during handoff (COEXISTENCE WINDOW)
          const t = (clampedP - 0.36) / 0.10;
          const ease = t * t * (3 - 2 * t);
          tdX = (isMobile ? 0 : 1.8) - (isMobile ? 2.5 : 7.2) * ease; // -> -5.4
          tdY = (isMobile ? 1.2 : 0) + 0.5 * ease;
          tdZ = (isMobile ? -0.5 : 0.2) - 6.5 * ease; // -> -6.3
          tdScale = (isMobile ? 0.6 : 0.95) - 0.65 * ease; // -> 0.3
        } else {
          // Distant presence
          tdX = isMobile ? -2.5 : -5.4;
          tdY = isMobile ? 1.7 : 0.5;
          tdZ = -6.8;
          tdScale = 0.3;
        }

        stationScrollGroupRef.current.position.set(tdX, tdY, tdZ);
        stationScrollGroupRef.current.scale.set(tdScale, tdScale, tdScale);
      }

      // ── 4. COMMANDATLAS SPATIAL TRAJECTORY (SCROLL TRANSFORM ONLY) ──
      if (satelliteScrollGroupRef.current && showSatellite) {
        let caX = isMobile ? 2.5 : 5.8;
        let caY = isMobile ? 1.2 : 0;
        let caZ = -8.0;
        let caScale = 0.25;

        if (clampedP < 0.40) {
          caX = isMobile ? 2.5 : 5.8;
          caZ = -8.0;
          caScale = 0.25;
        } else if (clampedP <= 0.52) {
          // Sweeps in from right & depth during handoff (COEXISTENCE WINDOW)
          const t = (clampedP - 0.40) / 0.12;
          const ease = t * t * (3 - 2 * t);
          caX = (isMobile ? 2.5 : 5.8) - (isMobile ? 2.5 : 4.0) * ease; // -> isMobile 0 : 1.8
          caZ = -8.0 + (isMobile ? 7.5 : 8.2) * ease; // -> -0.5 / +0.2
          caScale = 0.25 + (isMobile ? 0.35 : 0.7) * ease; // -> 0.6 / 0.95
        } else if (clampedP <= 0.70) {
          // Focal dominance & stillness
          caX = isMobile ? 0 : 1.8;
          caY = isMobile ? 1.2 : 0;
          caZ = isMobile ? -0.5 : 0.2;
          caScale = isMobile ? 0.6 : 0.95;
        } else {
          // Recedes left as Black Hole singularity takes over
          const t = (clampedP - 0.70) / 0.04;
          const ease = t * t * (3 - 2 * t);
          caX = (isMobile ? 0 : 1.8) - (isMobile ? 2.0 : 6.0) * ease;
          caZ = (isMobile ? -0.5 : 0.2) - 6.0 * ease;
          caScale = (isMobile ? 0.6 : 0.95) - 0.6 * ease;
        }

        satelliteScrollGroupRef.current.position.set(caX, caY, caZ);
        satelliteScrollGroupRef.current.scale.set(caScale, caScale, caScale);
      }

      // ── 5. BLACK HOLE SINGULARITY TRAJECTORY ──
      if (blackHoleScrollGroupRef.current && showBlackHole) {
        let bhZ = -5.0;
        let bhScale = 0.6;
        if (clampedP <= 0.78) {
          const t = (clampedP - 0.72) / 0.06;
          bhZ = -5.0 + 3.5 * t; // -5.0 -> -1.5
          bhScale = 0.6 + 0.4 * t; // 0.6 -> 1.0
        } else {
          const t = (clampedP - 0.78) / 0.06;
          bhZ = -1.5 + 2.0 * t; // -1.5 -> 0.5
          bhScale = 1.0 + 0.3 * t; // 1.0 -> 1.3
        }
        blackHoleScrollGroupRef.current.position.set(0, 0, bhZ);
        blackHoleScrollGroupRef.current.scale.set(bhScale, bhScale, bhScale);
      }

      // ── 6. BANK TRANSACTION SYSTEM (SATURN V ROCKET) TRAJECTORY ──
      if (rocketScrollGroupRef.current && showRocket) {
        let rkX = isMobile ? 2.5 : 5.8;
        let rkY = isMobile ? 1.2 : 0;
        let rkZ = -8.0;
        let rkScale = 0.25;

        if (clampedP <= 0.88) {
          // Enters from right & depth as black hole transition concludes
          const t = (clampedP - 0.82) / 0.06;
          const ease = t * t * (3 - 2 * t);
          rkX = (isMobile ? 2.5 : 5.8) - (isMobile ? 2.5 : 4.0) * ease; // -> isMobile 0 : 1.8
          rkZ = -8.0 + (isMobile ? 7.5 : 8.2) * ease; // -> -0.5 / +0.2
          rkScale = 0.25 + (isMobile ? 0.35 : 0.7) * ease; // -> 0.6 / 0.95
        } else {
          // Focal dominance & stillness throughout transaction narrative
          rkX = isMobile ? 0 : 1.8;
          rkY = isMobile ? 1.2 : 0;
          rkZ = isMobile ? -0.5 : 0.2;
          rkScale = isMobile ? 0.6 : 0.95;
        }

        rocketScrollGroupRef.current.position.set(rkX, rkY, rkZ);
        rocketScrollGroupRef.current.scale.set(rkScale, rkScale, rkScale);
      }

      // ── 7. ASTEROID TRAJECTORY (SUBORDINATE DEEP BACKGROUND) ──
      if (asteroidScrollGroupRef.current && showAsteroid) {
        const driftX = (clampedP - 0.5) * -3.0 - 2.0;
        asteroidScrollGroupRef.current.position.set(driftX, -1.8, -14.0);
        asteroidScrollGroupRef.current.scale.set(0.9, 0.9, 0.9);
      }
    },
    [camera, isMobile],
  );

  // Apply initially and attach to progress callback
  useEffect(() => {
    const currentP = progressRef?.current ?? 0;
    applySpatialProgress(currentP);
    invalidate();
  }, [applySpatialProgress, progressRef]);

  useEffect(() => {
    if (progressRef) {
      progressRef.onSpatialUpdate = (p) => {
        applySpatialProgress(p);
      };
    }
  }, [applySpatialProgress, progressRef]);

  return (
    <>
      <SpatialCosmosField />

      {/* ── TENTDESK NESTED ARCHITECTURE ── */}
      <group ref={stationRootRef} visible={false}>
        <group ref={stationScrollGroupRef}>
          <group ref={stationAmbientGroupRef}>
            <Suspense fallback={null}>
              <StationHero
                isActive={isActive}
                isPageVisible={isPageVisible}
                prefersReducedMotion={prefersReducedMotion}
                ambientGroupRef={stationAmbientGroupRef}
              />
            </Suspense>
          </group>
        </group>
      </group>

      {/* ── COMMANDATLAS NESTED ARCHITECTURE ── */}
      <group ref={satelliteRootRef} visible={false}>
        <group ref={satelliteScrollGroupRef}>
          <group ref={satelliteAmbientGroupRef}>
            <Suspense fallback={null}>
              <SatelliteHero
                isActive={isActive}
                isPageVisible={isPageVisible}
                prefersReducedMotion={prefersReducedMotion}
                ambientGroupRef={satelliteAmbientGroupRef}
              />
            </Suspense>
          </group>
        </group>
      </group>

      {/* ── BLACK HOLE SINGULARITY (TRANSITION CORRIDOR) ── */}
      <group ref={blackHoleRootRef} visible={false}>
        <group ref={blackHoleScrollGroupRef}>
          <Suspense fallback={null}>
            <BlackHoleSingularity
              isActive={isActive}
              isPageVisible={isPageVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </group>
      </group>

      {/* ── BANK TRANSACTION SYSTEM (SATURN V ROCKET) ── */}
      <group ref={rocketRootRef} visible={false}>
        <group ref={rocketScrollGroupRef}>
          <group ref={rocketAmbientGroupRef}>
            <Suspense fallback={null}>
              <RocketHero
                isActive={isActive}
                isPageVisible={isPageVisible}
                prefersReducedMotion={prefersReducedMotion}
                ambientGroupRef={rocketAmbientGroupRef}
              />
            </Suspense>
          </group>
        </group>
      </group>

      {/* ── ASTEROID BENNU (SUBORDINATE BACKGROUND) ── */}
      <group ref={asteroidRootRef} visible={false}>
        <group ref={asteroidScrollGroupRef}>
          <group ref={asteroidAmbientGroupRef}>
            <Suspense fallback={null}>
              <AsteroidSubordinate
                isActive={isActive}
                isPageVisible={isPageVisible}
                prefersReducedMotion={prefersReducedMotion}
                ambientGroupRef={asteroidAmbientGroupRef}
              />
            </Suspense>
          </group>
        </group>
      </group>
    </>
  );
}

/**
 * Main Spatial Canvas Component with Explicit Render Lifecycle
 */
export default function WorksSpatialScene({ progressRef, visibilityState = 'ACTIVE' }) {
  const { prefersReducedMotion } = useDeviceCapability();
  const isPageVisible = usePageVisibility();
  const [contextLost, setContextLost] = useState(false);

  const handleCreated = useCallback(({ gl }) => {
    const canvas = gl?.domElement;
    if (!canvas) return;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      setContextLost(true);
    });
  }, []);

  // EXPLICIT RENDER LIFECYCLE (Requirement 5):
  // ACTIVE + visible -> frameloop="always"
  // PREPARE -> frameloop="demand"
  // SUSPENDED / hidden tab -> frameloop="never"
  let frameloop = 'never';
  if (prefersReducedMotion) {
    frameloop = 'demand';
  } else if (visibilityState === 'ACTIVE' && isPageVisible) {
    frameloop = 'always';
  } else if (visibilityState === 'PREPARE' && isPageVisible) {
    frameloop = 'demand';
  } else {
    frameloop = 'never';
  }

  const isActive = visibilityState === 'ACTIVE';

  if (contextLost || prefersReducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 text-cosmos-muted" aria-hidden="true">
        <svg className="h-48 w-48 opacity-30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="42" strokeDasharray="4 4" />
          <polygon points="50,22 78,74 22,74" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="16" stroke="#a78bfa" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full pointer-events-none"
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.0], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
          stencil: false,
          depth: true,
        }}
        frameloop={frameloop}
        onCreated={handleCreated}
      >
        {/* Realistic Space Illumination: Hard Sun Directional Light + Subtle Earthshine & Nebula Fill */}
        <ambientLight intensity={0.4} color="#0f172a" />
        <directionalLight position={[10, 12, 8]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-8, -6, -4]} intensity={0.35} color="#38bdf8" />
        <directionalLight position={[4, -8, 6]} intensity={0.25} color="#a78bfa" />

        <SpatialContinuumController
          progressRef={progressRef}
          isActive={isActive}
          isPageVisible={isPageVisible}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
