import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Shield({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3 + state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Shield body */}
        <mesh>
          <cylinderGeometry args={[0.7, 0.5, 0.15, 6]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Shield border */}
        <mesh position={[0, 0, 0.08]}>
          <cylinderGeometry args={[0.65, 0.45, 0.05, 6]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Cross emblem */}
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[0.08, 0.4, 0.02]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[0.4, 0.08, 0.02]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function LifeRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={ref} position={position}>
        <mesh>
          <torusGeometry args={[0.6, 0.15, 16, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.6} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.6, 0.08, 8, 32]} />
          <meshStandardMaterial color="#dc2626" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Rope detail */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.6, Math.sin(angle) * 0.6, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Compass({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Base */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Rim */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.5, 0.04, 8, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Needle */}
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.04, 0.02, 0.4]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.5} />
        </mesh>
        {/* Center dot */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Cardinal points */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.35, 0.1, Math.sin(angle) * 0.35]}>
            <boxGeometry args={[0.06, 0.02, 0.02]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function HardHat({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Dome */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Brim */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.04, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Front lamp */}
        <mesh position={[0, 0.2, 0.38]}>
          <boxGeometry args={[0.1, 0.07, 0.04]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

function Particles({ count = 150 }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = Math.random() * 6 - 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#dc2626" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function AboutScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#3b82f6" />
      <pointLight position={[0, 3, 0]} color="#dc2626" intensity={1} distance={8} />

      <Shield position={[-2.5, 0.5, -1]} />
      <LifeRing position={[2.5, -0.5, -2]} />
      <Compass position={[0, 1.5, -3]} />
      <HardHat position={[-1, -1.2, -2.5]} />

      <Particles />
    </>
  )
}
