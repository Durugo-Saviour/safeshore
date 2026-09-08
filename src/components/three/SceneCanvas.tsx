import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

const HeroScene = lazy(() => import('./HeroScene'))

interface SceneCanvasProps {
  className?: string
}

export default function SceneCanvas({ className = '' }: SceneCanvasProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [6, 4, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <HeroScene />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
