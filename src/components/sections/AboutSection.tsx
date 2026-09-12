import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Shield, Zap, Wrench, Globe } from 'lucide-react'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { company } from '../../data/content'

const features = [
  { icon: Shield, title: 'Regulatory Compliance', desc: 'NUPRC, NIMASA, NMDPRA & SOLAS' },
  { icon: Zap, title: 'Rapid Turnaround', desc: 'Minimizing operational downtime' },
  { icon: Wrench, title: 'Certified Expertise', desc: 'OEM-trained technicians' },
  { icon: Globe, title: 'One-Stop Shop', desc: 'All-inclusive vessel safety' },
]

export default function AboutSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden glow-red"
              >
                <img
                  src="/images/employee.jpg"
                  alt="Shoresafe Services team on site in full safety gear"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-6 glow-red"
              >
                <div className="font-display text-4xl font-bold text-brand-gold">{company.established}</div>
                <div className="text-sm text-slate-400">Established</div>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <SectionHeading
              label="About Shoresafe"
              title="Your Trusted Partner in Offshore Safety"
            />
            <p className="text-slate-400 leading-relaxed mb-6 -mt-8">
              {company.name} is a premier Nigerian marine and safety asset integrity specialist, situated in the heart of Port Harcourt — Nigeria's main hub for oil and gas activities.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              We deliver end-to-end inspection, maintenance, testing, and statutory recertification for Life-Saving Appliances and Fire Fighting Equipment, eliminating operational downtime and guaranteeing regulatory compliance.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-colors group"
                >
                  <f.icon size={20} className="text-brand-red mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-brand-gold font-semibold hover:gap-3 transition-all"
            >
              Learn More <ArrowUpRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
