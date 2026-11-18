import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, AdaptiveDpr } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import Headphones from './Headphones'
import { scene } from '../lib/store'

export default function Scene({ colorway }) {
  useEffect(() => {
    const onMove = (e) => {
      scene.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      scene.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="canvas-wrap" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 6.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={60} castShadow />
          <pointLight position={[-5, -1, 3]} intensity={12} color={colorway.accent} />
          <Headphones colorway={colorway} />
          <ContactShadows position={[0, -1.55, 0]} opacity={0.45} scale={12} blur={2.6} far={3} />
          {/* Studio reflections built from light panels — no HDR download needed */}
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[10, 2, 1]} />
            <Lightformer form="rect" intensity={2} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 1.5, 1]} />
            <Lightformer form="rect" intensity={2} position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[8, 1.5, 1]} />
            <Lightformer form="ring" intensity={4} color={colorway.accent} position={[0, 0, 6]} scale={3} />
          </Environment>
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
