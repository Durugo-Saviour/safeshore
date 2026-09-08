import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { services } from '../../data/content'

export default function ServicesSection() {
  return (
    <section className="py-32 relative bg-navy-900/50">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeading
          label="What We Do"
          title="Specialized Safety Services"
          description="Comprehensive technical solutions to safeguard offshore facilities, marine platforms, vessels, and onshore installations."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group glass rounded-2xl overflow-hidden h-full hover:border-brand-red/30 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950 to-transparent" />
                  <span className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-brand-red text-white font-bold text-sm rounded-lg">
                    {service.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{service.description}</p>
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-1 text-brand-red text-sm font-semibold group-hover:gap-2 transition-all"
                  >
                    View Details <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            View All Services <ArrowUpRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
