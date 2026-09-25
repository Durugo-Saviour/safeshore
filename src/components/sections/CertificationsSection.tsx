import { motion } from 'framer-motion'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { certifications, regulatory } from '../../data/content'
import { Award, Leaf, ShieldCheck } from 'lucide-react'

export default function CertificationsSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Accreditations"
          title="Certified & Accredited"
          description="Fully certified to inspect, service, integrity test, hydro-test, maintain and recertify sensitive maritime safety equipment."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.code} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="glass rounded-2xl p-10 text-center hover:border-brand-gold/30 transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-navy-800 border-2 border-brand-gold/30 flex items-center justify-center">
                  {cert.icon === 'Award' && <Award className="w-10 h-10 text-brand-gold" />}
                  {cert.icon === 'Leaf' && <Leaf className="w-10 h-10 text-brand-gold" />}
                  {cert.icon === 'ShieldCheck' && <ShieldCheck className="w-10 h-10 text-brand-gold" />}
                  {!cert.icon && <span className="font-display text-lg font-bold text-brand-gold">{cert.code}</span>}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-sm text-slate-300">{cert.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {regulatory.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass p-2 flex items-center justify-center hover:border-brand-gold/30 transition-all">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-wider text-slate-400 uppercase">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
