import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { projects } from '../../data/content'

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Our Work"
          title="Featured Projects"
          description="Complex maintenance and safety refitting projects for major E&P support contractors."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 to-transparent" />
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

        <FadeIn className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-500/20"
          >
            View All Projects <ArrowUpRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
