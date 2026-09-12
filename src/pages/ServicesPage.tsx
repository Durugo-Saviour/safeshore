import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading, { FadeIn } from '../components/ui/SectionHeading'
import CTASection from '../components/sections/CTASection'
import { services } from '../data/content'

const SafetyScene = lazy(() => import('../components/three/SafetyScene'))

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 bg-linear-to-b from-navy-900 to-navy-950" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <Suspense fallback={null}>
          <SafetyScene className="opacity-40 md:opacity-30" />
        </Suspense>
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-brand-red"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-gradient mt-4 mb-6"
          >
            Specialized Safety Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            End-to-end inspection, maintenance, testing, and statutory recertification for critical safety infrastructure.
          </motion.p>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${index % 2 === 1 ? 'bg-navy-900/50' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
              <FadeIn className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden glow-red"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-brand-red text-white font-bold rounded-xl">
                    {service.number}
                  </div>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-red">
                  Service {service.number}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-5">
                  {service.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">{service.description}</p>
                <ul className="space-y-3">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <Check size={16} className="text-brand-red mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Equipment"
            title="Safety Equipment We Service"
          />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { img: '/images/liferafts.jpg', label: 'Life Rafts' },
              { img: '/images/lifeboat.jpg', label: 'Life Boats' },
              { img: '/images/service-rescueboat.jpeg', label: 'Rescue Boats' },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} className="glass rounded-xl overflow-hidden">
                  <img src={item.img} alt={item.label} className="w-full h-40 object-cover" />
                  <div className="p-4 text-center">
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
