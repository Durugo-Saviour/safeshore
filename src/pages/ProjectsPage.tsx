import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading, { FadeIn } from '../components/ui/SectionHeading'
import ClientsSection from '../components/sections/ClientsSection'
import CTASection from '../components/sections/CTASection'
import { projects, gallery } from '../data/content'

export default function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let animationFrameId: number
    const scroll = () => {
      if (scrollRef.current && !isHovered) {
        scrollRef.current.scrollLeft += 1.5
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0
        }
      }
      animationFrameId = requestAnimationFrame(scroll)
    }
    animationFrameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered])

  const manualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

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
          <div 
            className="relative w-full py-10 -mx-6 px-6 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button 
              onClick={() => manualScroll('left')}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-navy-950/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red backdrop-blur-sm shadow-xl cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => manualScroll('right')}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-navy-950/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red backdrop-blur-sm shadow-xl cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory"
            >
              {[...gallery, ...gallery].map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="w-[280px] md:w-[400px] h-[200px] md:h-[300px] shrink-0 rounded-2xl overflow-hidden snap-center"
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />
      <CTASection />
    </>
  )
}
