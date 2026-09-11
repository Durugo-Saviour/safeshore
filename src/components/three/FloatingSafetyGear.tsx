import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/** A torus ring representing a lifebuoy */
function Lifebuoy({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={ref} position={position}>
        {/* Main ring */}
        <mesh>
          <torusGeometry args={[0.8, 0.25, 16, 32]} />
          <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* White stripes on the lifebuoy */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, angle]} position={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0]}>
            <boxGeometry args={[0.3, 0.12, 0.5]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#ffffff' : '#dc2626'} />
          </mesh>
        ))}
        {/* Center rope detail */}
        <mesh>
          <torusGeometry args={[0.8, 0.03, 8, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

/** A cylinder representing a fire extinguisher */
function FireExtinguisher({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 1.2, 16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Top cap */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.12, 0.25, 0.2, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.06, 0.06]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Nozzle */}
        <mesh position={[0.15, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Label band */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.3, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Bottom */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.27, 0.22, 0.1, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

/** A simple helmet shape */
function SafetyHelmet({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.5 + state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
      <group ref={ref} position={position}>
        {/* Dome */}
        <mesh>
          <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Brim */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.05, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Front light */}
        <mesh position={[0, 0.25, 0.4]}>
          <boxGeometry args={[0.12, 0.08, 0.05]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

/** An anchor shape */
function Anchor({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Shank (vertical bar) */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Ring at top */}
        <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.04, 8, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Cross bar (stock) */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Left fluke */}
        <mesh position={[-0.25, -0.65, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.5, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Right fluke */}
        <mesh position={[0.25, -0.65, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.5, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

export default function FloatingSafetyGear() {
  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#3b82f6" />

      <Lifebuoy position={[-3, 1, -1]} />
      <FireExtinguisher position={[3, 0, -2]} />
      <SafetyHelmet position={[0, 2, -3]} />
      <Anchor position={[-1.5, -1, -4]} />

      <pointLight position={[0, 3, 0]} color="#dc2626" intensity={1} distance={8} />
    </group>
  )
}
