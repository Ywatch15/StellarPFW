// FILE: src/lib/assetLoader.js
// Lazy asset loading utilities for GLTF models, textures, and environment maps
// All heavy imports use dynamic import() for code-splitting

/**
 * Lazily loads the GLTFLoader + optional DRACOLoader.
 * @param {string} url - Path to the .glb/.gltf file
 * @param {object} [options]
 * @param {boolean} [options.useDraco=false] - Whether to use Draco compression
 * @param {string} [options.dracoPath='/draco/'] - Path to Draco decoder WASM
 * @returns {Promise<import('three').Group>}
 *
 * Usage in a component:
 *   const model = await loadGLTF('/models/planet.glb', { useDraco: true });
 *   scene.add(model.scene);
 *
 * To replace placeholder geometry with a real GLTF:
 * 1. Export your model from Blender (File > Export > glTF 2.0)
 * 2. Compress with Draco:
 *      npx gltf-transform draco input.glb output.glb
 * 3. (Optional) Convert textures to KTX2:
 *      npx gltf-transform ktx2 output.glb final.glb --slots "baseColor"
 * 4. Place in public/models/ and update the URL
 * 5. Keep each model < 100 KB (Draco-compressed)
 */
export async function loadGLTF(url, options = {}) {
  const { useDraco = false, dracoPath = '/draco/' } = options;
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const loader = new GLTFLoader();

  if (useDraco) {
    const { DRACOLoader } = await import('three/addons/loaders/DRACOLoader.js');
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(dracoPath);
    loader.setDRACOLoader(dracoLoader);
  }

  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

/**
 * Lazily loads a KTX2 texture.
 * @param {string} url - Path to .ktx2 file
 * @param {import('three').WebGLRenderer} renderer
 * @returns {Promise<import('three').CompressedTexture>}
 *
 * Usage:
 *   const texture = await loadKTX2('/textures/env.ktx2', gl);
 */
export async function loadKTX2(url, renderer) {
  const { KTX2Loader } = await import('three/addons/loaders/KTX2Loader.js');
  const loader = new KTX2Loader();
  loader.setTranscoderPath('/basis/');
  loader.detectSupport(renderer);

  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
}

/**
 * Creates a simple baked environment map from a color.
 * Use this when you don't have a real HDR/EXR environment map.
 *
 * To bake a real environment map:
 * 1. In Blender, set up your scene lighting
 * 2. Render to equirectangular HDR (World > Surface > Background)
 * 3. Convert to KTX2 for GPU compression:
 *      npx gltf-transform ktx2 env.hdr env.ktx2
 * 4. Or convert to smaller EXR with tonemapping
 *
 * @param {import('three').Color | string} color
 * @returns {{ texture: import('three').DataTexture, dispose: () => void }}
 */
export function createFallbackEnvMap(color = '#1a1a2e') {
  // We dynamically import three to keep this module tree-shakeable
  const THREE = require('three');
  const size = 16;
  const data = new Float32Array(size * size * 4);
  const c = new THREE.Color(color);

  for (let i = 0; i < size * size; i++) {
    data[i * 4] = c.r;
    data[i * 4 + 1] = c.g;
    data[i * 4 + 2] = c.b;
    data[i * 4 + 3] = 1;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;

  return {
    texture,
    dispose: () => texture.dispose(),
  };
}

/**
 * Preloads assets in the background after initial page load.
 * Call this after the shell is mounted to warm the cache.
 * @param {string[]} urls - Array of asset URLs to preload
 */
export function preloadAssets(urls) {
  if (typeof window === 'undefined') return;

  // Use requestIdleCallback for non-blocking preload
  const preload = () => {
    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload);
  } else {
    setTimeout(preload, 2000);
  }
}
