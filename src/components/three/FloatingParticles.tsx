import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingParticlesProps {
  count?: number
  color?: string
  speed?: number
  spread?: number
}

export default function FloatingParticles({
  count = 150,
  color = '#f59e0b',
  speed = 0.03,
  spread = 15,
}: FloatingParticlesProps) {
  const ref = useRef<THREE.Points>(null)

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = Math.random() * spread * 0.6 - 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      sz[i] = Math.random() * 0.06 + 0.02
    }
    return { positions: pos, sizes: sz }
  }, [count, spread])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
