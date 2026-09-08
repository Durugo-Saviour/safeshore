import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Ocean() {
  const mesh = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#0a1628') },
      uColor2: { value: new THREE.Color('#1a3a5c') },
    }),
    [],
  )

  useFrame((state) => {
    if (mesh.current) {
      uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        wireframe={false}
        transparent
        opacity={0.6}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave1 = sin(pos.x * 0.5 + uTime * 0.8) * 0.15;
            float wave2 = sin(pos.y * 0.3 + uTime * 0.6) * 0.1;
            pos.z += wave1 + wave2;
            vElevation = pos.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixStrength = (vElevation + 0.2) * 2.0;
            vec3 color = mix(uColor1, uColor2, mixStrength);
            gl_FragColor = vec4(color, 0.7);
          }
        `}
      />
    </mesh>
  )
}

function Platform() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08
    }
  })

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      {/* Main deck */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.15, 2.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Legs */}
      {[[-1.2, -1], [1.2, -1], [-1.2, 1], [1.2, 1]].map(([x, z], i) => (
        <mesh key={i} position={[x, -1.5, z]}>
          <cylinderGeometry args={[0.08, 0.12, 3, 8]} />
          <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Derrick */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.12, 3.5, 0.12]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Cross beams */}
      {[0.8, 1.6, 2.4].map((y, i) => (
        <mesh key={i} position={[0, y - 0.5, 0]}>
          <boxGeometry args={[1.5, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Helipad */}
      <mesh position={[1.5, 0.1, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Crane arm */}
      <group position={[-1, 1, 0.8]} rotation={[0, 0.3, -0.4]}>
        <mesh>
          <boxGeometry args={[1.8, 0.08, 0.08]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Safety beacon light */}
      <pointLight position={[0, 3.5, 0]} color="#dc2626" intensity={2} distance={5} />
      <mesh position={[0, 3.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function Particles({ count = 200 }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 10 - 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#f59e0b" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 8, 25]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff" />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#3b82f6" />

      <Stars radius={50} depth={50} count={3000} factor={3} saturation={0.2} fade speed={0.5} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <Platform />
      </Float>

      <Ocean />
      <Particles />

      {/* Grid helper for industrial feel */}
      <gridHelper args={[30, 30, '#1e293b', '#0f172a']} position={[0, -2.4, 0]} />
    </>
  )
}
