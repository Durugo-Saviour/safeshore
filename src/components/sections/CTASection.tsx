import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-brand-red to-red-900" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 border border-white/10 rounded-full"
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-5"
        >
          Ready to Secure Your Operations?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/80 mb-8"
        >
          Contact us today for expert marine safety solutions that guarantee regulatory compliance and operational continuity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red font-bold rounded-xl hover:bg-slate-100 transition-all hover:shadow-xl"
          >
            Get In Touch <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
