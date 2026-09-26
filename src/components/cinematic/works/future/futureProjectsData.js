// FILE: src/components/cinematic/works/future/futureProjectsData.js
// Future Projects Loading Architecture: Real NASA Space Assets Manifest & Telemetry
// Primary source: Official NASA 3D Resources (science.nasa.gov/3d-resources)
// Public Domain US Gov works under 17 U.S.C. § 105. No NASA endorsement implied.

export const FUTURE_OBJECT_STATES = {
  UNDETECTED: 'UNDETECTED',
  DETECTED: 'DETECTED',
  INITIALIZING: 'INITIALIZING',
  STANDBY: 'STANDBY',
  HOLD: 'HOLD',
};

/**
 * Clean internal asset manifest for real NASA space objects.
 * Curated mixture:
 * 1. Hubble Space Telescope (Telescope)
 * 2. The Moon / LRO (Planetary Body with real NASA surface texture)
 * 3. Pioneer 10 (Deep Space Probe)
 * 4. Mars Global Surveyor (Orbital Spacecraft)
 * 5. Asteroid 1999 RQ36 Bennu (Near-Earth Asteroid Topology)
 */
export const FUTURE_PROJECT_SIGNALS = [
  {
    id: 'signal-01',
    objectName: 'Hubble Space Telescope',
    type: 'telescope',
    source: 'NASA / STScI',
    sourceUrl: 'https://science.nasa.gov/3d-resources/hubble-space-telescope/',
    assetPath: '/models/cinematic/future/hubble-space-telescope.glb',
    approxSize: '1.69 MB',
    attribution: 'NASA Goddard Space Flight Center / Space Telescope Science Institute',
    license: 'Public Domain (17 U.S.C. § 105)',
    status: 'unidentified',
    // Telemetry & Discovery
    callsign: 'SIGNAL ACQUIRED // 0x7F',
    label: 'DEEP FIELD OBSERVATORY',
    statusText: 'INITIALIZING',
    beaconColor: '#38bdf8', // Cyan
    // Spatial positioning in 3D universe
    position: {
      desktop: [1.8, 0.3, -2.4],
      mobile: [0.0, 0.9, -2.0],
    },
    scale: {
      desktop: 0.95,
      mobile: 0.72,
    },
    // Lifecycle progress thresholds (0.00 to 1.00 of FutureProjectField timeline)
    timing: {
      detect: 0.12,
      init: 0.18,
      standby: 0.28,
      hold: 0.85,
    },
    // Ambient physics parameters (decoupled from scroll)
    motion: {
      rotationSpeed: 0.08,
      pitchSway: 0.04,
      driftY: 0.06,
    },
    projectId: null,
    projectRoute: null,
    meta: null,
  },
  {
    id: 'signal-02',
    objectName: 'The Moon (Lunar Reconnaissance Orbiter)',
    type: 'planet',
    source: 'NASA / GSFC / SVS',
    sourceUrl: 'https://science.nasa.gov/3d-resources/moon/',
    assetPath: '/models/cinematic/future/nasa-moon-1024.jpg',
    approxSize: '238 KB',
    attribution: 'NASA Goddard Space Flight Center / Scientific Visualization Studio',
    license: 'Public Domain (17 U.S.C. § 105)',
    status: 'unidentified',
    callsign: 'OBJECT DETECTED // 0x8A',
    label: 'LUNAR PLANETARY BODY',
    statusText: 'SYNCING TELEMETRY',
    beaconColor: '#818cf8', // Indigo
    position: {
      desktop: [-2.2, -0.4, -4.2],
      mobile: [0.0, -0.3, -3.2],
    },
    scale: {
      desktop: 0.9,
      mobile: 0.65,
    },
    timing: {
      detect: 0.30,
      init: 0.36,
      standby: 0.46,
      hold: 0.85,
    },
    motion: {
      rotationSpeed: 0.05,
      pitchSway: 0.02,
      driftY: 0.08,
    },
    projectId: null,
    projectRoute: null,
    meta: null,
  },
  {
    id: 'signal-03',
    objectName: 'Pioneer 10 Deep Space Probe',
    type: 'probe',
    source: 'NASA / ARC / JPL',
    sourceUrl: 'https://science.nasa.gov/3d-resources/pioneer-10/',
    assetPath: '/models/cinematic/future/pioneer-10.glb',
    approxSize: '2.05 MB',
    attribution: 'NASA Ames Research Center / Jet Propulsion Laboratory',
    license: 'Public Domain (17 U.S.C. § 105)',
    status: 'unidentified',
    callsign: 'EMISSION DETECTED // 0x9C',
    label: 'INTERSTELLAR TRAJECTORY PROBE',
    statusText: 'ORBITAL LOCK',
    beaconColor: '#c084fc', // Purple
    position: {
      desktop: [2.6, -1.1, -6.0],
      mobile: [0.2, 0.8, -4.2],
    },
    scale: {
      desktop: 0.9,
      mobile: 0.68,
    },
    timing: {
      detect: 0.48,
      init: 0.54,
      standby: 0.62,
      hold: 0.85,
    },
    motion: {
      rotationSpeed: 0.07,
      pitchSway: 0.03,
      driftY: 0.05,
    },
    projectId: null,
    projectRoute: null,
    meta: null,
  },
  {
    id: 'signal-04',
    objectName: 'Mars Global Surveyor',
    type: 'spacecraft',
    source: 'NASA / JPL',
    sourceUrl: 'https://science.nasa.gov/3d-resources/mars-global-surveyor/',
    assetPath: '/models/cinematic/future/mars-global-surveyor.glb',
    approxSize: '1.92 MB',
    attribution: 'NASA Jet Propulsion Laboratory',
    license: 'Public Domain (17 U.S.C. § 105)',
    status: 'unidentified',
    callsign: 'COORDINATE ACQUIRED // 0xB4',
    label: 'SURVEYOR ORBITAL VEHICLE',
    statusText: 'CALIBRATING',
    beaconColor: '#34d399', // Emerald
    position: {
      desktop: [-1.6, 1.1, -5.2],
      mobile: [-0.2, -0.7, -4.0],
    },
    scale: {
      desktop: 0.85,
      mobile: 0.62,
    },
    timing: {
      detect: 0.62,
      init: 0.68,
      standby: 0.76,
      hold: 0.85,
    },
    motion: {
      rotationSpeed: 0.06,
      pitchSway: 0.04,
      driftY: 0.07,
    },
    projectId: null,
    projectRoute: null,
    meta: null,
  },
  {
    id: 'signal-05',
    objectName: 'Asteroid 1999 RQ36 (Bennu)',
    type: 'asteroid',
    source: 'NASA / GSFC / OSIRIS-REx',
    sourceUrl: 'https://science.nasa.gov/3d-resources/1999-rq36-bennu/',
    assetPath: '/models/cinematic/asteroid-bennu.glb',
    approxSize: '329 KB',
    attribution: 'NASA GSFC / OSIRIS-REx Science Team',
    license: 'Public Domain (17 U.S.C. § 105)',
    status: 'unidentified',
    callsign: 'DEEP SPACE OBJECT // 0xDF',
    label: 'NEAR-EARTH ASTEROID TOPOLOGY',
    statusText: 'STANDBY',
    beaconColor: '#fbbf24', // Amber
    position: {
      desktop: [0.5, -1.5, -7.5],
      mobile: [0.0, 0.3, -5.2],
    },
    scale: {
      desktop: 0.8,
      mobile: 0.58,
    },
    timing: {
      detect: 0.74,
      init: 0.80,
      standby: 0.86,
      hold: 0.85,
    },
    motion: {
      rotationSpeed: 0.09,
      pitchSway: 0.05,
      driftY: 0.04,
    },
    projectId: null,
    projectRoute: null,
    meta: null,
  },
];
