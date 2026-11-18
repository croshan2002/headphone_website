import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'
import { scene, prefersReducedMotion } from '../lib/store'

const CUP_X = 1.22
const CUP_Y = -0.28

// Pose of the whole headphone for each page section.
// x is in world units; on narrow screens x is ignored and everything is centered.
const POSES = {
  hero: { x: 1.55, y: -0.05, ry: -0.55, rx: 0.18, s: 1 },
  explode: { x: 0, y: 0.05, ry: -0.3, rx: 0.12, s: 0.82 },
  features: { x: -1.75, y: -0.05, ry: 0.75, rx: 0.1, s: 0.9 },
  colors: { x: 1.6, y: -0.1, ry: -0.95, rx: 0.08, s: 1.02 },
  specs: { x: 0, y: 0.15, ry: 0, rx: 0.2, s: 0.7 },
  pricing: { x: 0, y: 3.6, ry: 0.4, rx: 0.4, s: 0.6 },
}
const MOBILE_Y = { hero: 0.7, explode: 0.25, features: 1.0, colors: 0.85, specs: 1.05, pricing: 4 }

function Cup({ side, mats, explodeRef }) {
  const shell = useRef()
  const ring = useRef()
  const grille = useRef()
  const driver = useRef()
  const cushion = useRef()
  const battery = useRef()

  useFrame(() => {
    const e = explodeRef.current
    const s = side
    shell.current.position.x = s * (0.06 + e * 0.95)
    ring.current.position.x = s * (0.24 + e * 1.25)
    grille.current.position.x = s * (0.23 + e * 1.22)
    driver.current.position.x = -s * (0.06 + e * 0.32)
    cushion.current.position.x = -s * (0.2 + e * 0.78)
    if (battery.current) {
      battery.current.position.x = s * (0.04 + e * 0.35)
      battery.current.position.y = e * 1.05
      battery.current.rotation.z = e * 0.6
    }
  })

  return (
    <group position={[side * CUP_X, CUP_Y, 0]}>
      {/* Outer shell */}
      <mesh ref={shell} rotation={[0, 0, Math.PI / 2]} castShadow material={mats.shell}>
        <cylinderGeometry args={[0.62, 0.66, 0.34, 72]} />
      </mesh>
      {/* Glowing accent ring on the outside face */}
      <mesh ref={ring} rotation={[0, Math.PI / 2, 0]} material={mats.accent}>
        <torusGeometry args={[0.5, 0.025, 16, 96]} />
      </mesh>
      {/* Metal grille cap */}
      <mesh ref={grille} rotation={[0, 0, Math.PI / 2]} material={mats.metal}>
        <cylinderGeometry args={[0.44, 0.44, 0.03, 64]} />
      </mesh>
      {/* 40mm driver: frame + cone */}
      <group ref={driver}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={mats.driver}>
          <cylinderGeometry args={[0.46, 0.46, 0.06, 64]} />
        </mesh>
        <mesh rotation={[0, 0, (side * -Math.PI) / 2]} position={[side * -0.06, 0, 0]} material={mats.cone}>
          <coneGeometry args={[0.36, 0.14, 64, 1, true]} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} material={mats.accent}>
          <torusGeometry args={[0.46, 0.012, 12, 96]} />
        </mesh>
      </group>
      {/* Memory foam cushion */}
      <mesh ref={cushion} rotation={[0, Math.PI / 2, 0]} castShadow material={mats.cushion}>
        <torusGeometry args={[0.46, 0.17, 32, 72]} />
      </mesh>
      {/* Battery cell, only in the left cup */}
      {side === -1 && (
        <mesh ref={battery} material={mats.battery}>
          <boxGeometry args={[0.16, 0.5, 0.34]} />
        </mesh>
      )}
    </group>
  )
}

export default function Headphones({ colorway }) {
  const root = useRef()
  const band = useRef()
  const explodeRef = useRef(0)
  const { viewport, size } = useThree()
  const mobile = size.width < 820

  const mats = useMemo(
    () => ({
      shell: new THREE.MeshPhysicalMaterial({ roughness: 0.32, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.25 }),
      band: new THREE.MeshPhysicalMaterial({ roughness: 0.45, metalness: 0.2, clearcoat: 0.6 }),
      cushion: new THREE.MeshStandardMaterial({ color: '#141418', roughness: 0.95 }),
      metal: new THREE.MeshStandardMaterial({ color: '#b9bec8', roughness: 0.25, metalness: 1 }),
      driver: new THREE.MeshStandardMaterial({ color: '#0e0f13', roughness: 0.5, metalness: 0.6 }),
      cone: new THREE.MeshStandardMaterial({ color: '#2a2c33', roughness: 0.7, side: THREE.DoubleSide }),
      accent: new THREE.MeshStandardMaterial({ toneMapped: false }),
      battery: new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.5 }),
    }),
    []
  )

  const target = useMemo(
    () => ({ shell: new THREE.Color(), band: new THREE.Color(), accent: new THREE.Color() }),
    []
  )

  // Headband geometry: half torus arching over the top.
  const bandGeo = useMemo(() => new THREE.TorusGeometry(CUP_X, 0.085, 24, 120, Math.PI), [])
  const padGeo = useMemo(() => new THREE.TorusGeometry(CUP_X - 0.1, 0.07, 20, 90, Math.PI * 0.55), [])

  useFrame((state, dt) => {
    // Colour transitions
    target.shell.set(colorway.shell)
    target.band.set(colorway.band)
    target.accent.set(colorway.accent)
    easing.dampC(mats.shell.color, target.shell, 0.35, dt)
    easing.dampC(mats.band.color, target.band, 0.35, dt)
    easing.dampC(mats.accent.color, target.accent, 0.35, dt)
    easing.dampC(mats.battery.color, target.accent, 0.35, dt)

    // Explode amount
    const want = scene.stage === 'explode' ? scene.explode : 0
    explodeRef.current = THREE.MathUtils.damp(explodeRef.current, want, 6, dt)
    band.current.position.y = 0.28 + explodeRef.current * 0.75

    // Pose for current section
    const p = POSES[scene.stage] ?? POSES.hero
    const fit = Math.min(1, viewport.width / 9)
    const mobileFit = Math.min(0.62, viewport.width / 3.4) * (scene.stage === 'explode' ? 0.72 : 1)
    const scale = p.s * (mobile ? mobileFit : Math.max(0.75, fit))
    const x = mobile ? 0 : p.x * Math.min(1, viewport.width / 8.5)
    const y = mobile ? MOBILE_Y[scene.stage] : p.y
    const t = state.clock.elapsedTime
    const idle = prefersReducedMotion ? 0 : Math.sin(t * 0.6) * 0.05
    const ry = p.ry + scene.pointer.x * 0.25 + scene.spin + (scene.stage === 'explode' ? explodeRef.current * -0.25 : 0)
    const rx = p.rx - scene.pointer.y * 0.12

    easing.damp3(root.current.position, [x, y + idle, 0], 0.55, dt)
    easing.damp3(root.current.scale, [scale, scale, scale], 0.5, dt)
    easing.dampE(root.current.rotation, [rx, ry, 0], 0.6, dt)
  })

  return (
    <group ref={root}>
      <group ref={band}>
        <mesh geometry={bandGeo} material={mats.band} castShadow />
        <mesh geometry={padGeo} rotation={[0, 0, Math.PI * 0.225]} material={mats.cushion} position={[0, -0.02, 0]} />
        {/* Sliders connecting the band to the cups */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * CUP_X, -0.2, 0]} material={mats.metal}>
            <cylinderGeometry args={[0.035, 0.035, 0.42, 16]} />
          </mesh>
        ))}
      </group>
      <Cup side={-1} mats={mats} explodeRef={explodeRef} />
      <Cup side={1} mats={mats} explodeRef={explodeRef} />
    </group>
  )
}
