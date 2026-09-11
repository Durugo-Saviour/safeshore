import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Only enable on desktop
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const computed = window.getComputedStyle(target)
      setIsPointer(
        computed.cursor === 'pointer' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      )
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-red/60 pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.8 : 1,
          borderColor: isPointer ? 'rgba(245, 158, 11, 0.8)' : 'rgba(220, 38, 38, 0.6)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-gold pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isPointer ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 2000,
          damping: 50,
          mass: 0.1,
        }}
      />
    </>
  )
}
