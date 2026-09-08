import { motion } from 'framer-motion'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { certifications, regulatory } from '../../data/content'

export default function CertificationsSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Accreditations"
          title="Certified & Accredited"
          description="Fully certified to inspect, service, integrity test, hydro-test, maintain and recertify sensitive maritime safety equipment."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.code} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="glass rounded-2xl p-10 text-center hover:border-brand-gold/30 transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-navy-800 border-2 border-brand-gold/30 flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-brand-gold">{cert.code}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-sm text-slate-500">{cert.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            {regulatory.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-2.5 glass rounded-full text-xs font-bold tracking-wider text-slate-300 uppercase"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
