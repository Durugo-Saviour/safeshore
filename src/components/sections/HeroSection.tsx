import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import SceneCanvas from '../three/SceneCanvas'
import { company, stats } from '../../data/content'
import { AnimatedCounter } from '../ui/AnimatedCounter'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <SceneCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-navy-950/50 z-10" />
      <div className="absolute inset-0 grid-bg opacity-20 z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-[300px] sm:pb-48 md:pt-32 md:pb-40 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold tracking-wider uppercase text-brand-gold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            ISO Certified · NCDMB Registered
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
          >
            <span className="text-gradient">Marine & Offshore</span>
            <br />
            <span className="text-gradient-gold">Safety Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
          >
            {company.subtitle}. Delivering critical inspection, maintenance, testing, and statutory recertification across Nigeria's Oil & Gas and Maritime sectors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all hover:shadow-xl hover:shadow-red-500/20"
            >
              Explore Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-0 left-0 right-0 glass-strong border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-4 md:py-8 text-center ${i < stats.length - 1 ? 'md:border-r border-white/5' : ''} ${i % 2 === 0 ? 'border-r border-white/5' : ''} ${i < 2 ? 'border-b border-white/5 md:border-b-0' : ''}`}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-slate-500" size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
