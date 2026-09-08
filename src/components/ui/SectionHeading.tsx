import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  light?: boolean
}

export default function SectionHeading({ label, title, description, light }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-red mb-4">
        {label}
      </span>
      <h2 className={`font-display text-3xl md:text-5xl font-bold mb-5 ${light ? 'text-white' : 'text-gradient'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${light ? 'text-slate-400' : 'text-slate-500'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

export function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}