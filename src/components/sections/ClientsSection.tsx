import { motion } from 'framer-motion'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { clients } from '../../data/content'

export default function ClientsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeading label="Trusted By" title="Our Clients" light />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <FadeIn key={client} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.03, borderColor: 'rgba(220,38,38,0.3)' }}
                className="glass rounded-xl p-6 text-center h-full flex items-center justify-center min-h-[80px]"
              >
                <span className="text-sm font-medium text-slate-400">{client}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
