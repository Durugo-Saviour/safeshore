import { motion } from 'framer-motion'
import SectionHeading, { FadeIn } from '../components/ui/SectionHeading'
import ClientsSection from '../components/sections/ClientsSection'
import CTASection from '../components/sections/CTASection'
import { projects, gallery } from '../data/content'

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-navy-900 to-navy-950" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-brand-red"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-gradient mt-4 mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Successfully delivered complex maintenance and safety refitting projects across Nigeria's oil & gas sector.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group glass rounded-2xl overflow-hidden h-full"
                >
                  <div className="relative h-60 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      {project.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{project.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Gallery"
            title="Operations in Action"
            description="Field operations, equipment servicing, and safety compliance work across Nigeria."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <FadeIn key={src} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className={`w-full object-cover ${i === 0 ? 'h-full min-h-[300px]' : 'h-48'}`}
                  />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ClientsSection />
      <CTASection />
    </>
  )
}
