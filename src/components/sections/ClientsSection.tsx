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
            <FadeIn key={client.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.03, borderColor: 'rgba(220,38,38,0.3)' }}
                className="glass rounded-xl p-6 text-center h-full flex flex-col items-center justify-center gap-4 min-h-[140px]"
              >
                <div className="w-full h-16 flex items-center justify-center overflow-hidden">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-slate-300 leading-tight">{client.name}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
