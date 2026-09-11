import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

const FloatingSafetyGear = lazy(() => import('./FloatingSafetyGear'))
const FloatingParticles = lazy(() => import('./FloatingParticles'))

interface SafetySceneProps {
  className?: string
  showParticles?: boolean
}

export default function SafetyScene({ className = '', showParticles = true }: SafetySceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <FloatingSafetyGear />
          {showParticles && <FloatingParticles count={100} color="#3b82f6" speed={0.02} spread={20} />}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
