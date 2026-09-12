import { motion } from 'framer-motion'
import { Shield, Eye, Gem, CheckCircle, Leaf, GraduationCap } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { Suspense, lazy } from 'react'
import SectionHeading, { FadeIn } from '../components/ui/SectionHeading'
import CTASection from '../components/sections/CTASection'
import { company } from '../data/content'

const FloatingParticles = lazy(() => import('../components/three/FloatingParticles'))
const AboutScene = lazy(() => import('../components/three/AboutScene'))

const pillars = [
  { icon: Shield, label: 'Safety' },
  { icon: CheckCircle, label: 'Quality' },
  { icon: Leaf, label: 'Environment' },
  { icon: GraduationCap, label: 'Health & Safety' },
  { icon: Gem, label: 'Technical Competence' },
]

const hseItems = [
  { icon: Shield, title: 'Zero Harm Objective', desc: 'Eliminating workplace injuries and environmental incidents across all project sites.' },
  { icon: CheckCircle, title: 'Regulatory Compliance', desc: 'Strict adherence to IMS, SOLAS, NIMASA, NUPRC/NMDPRA, and NCDMB guidelines.' },
  { icon: GraduationCap, title: 'Competency & Accountability', desc: 'Rigorous, continuous safety trainings with hazard-awareness and operational discipline.' },
  { icon: Leaf, title: 'Environmental Stewardship', desc: 'Eco-friendly maintenance procedures and stringent waste management protocols.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 bg-linear-to-b from-navy-900 to-navy-950" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        {/* 3D Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <FloatingParticles count={250} color="#dc2626" speed={0.03} spread={25} />
            </Suspense>
          </Canvas>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-brand-red"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-gradient mt-4 mb-6"
          >
            About Shoresafe Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Premier Nigerian marine and safety asset integrity specialist. CAC Reg: {company.cac}
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden glow-red bg-navy-950/50 border border-white/5 h-[300px] sm:h-[400px] lg:h-[500px]">
                <Canvas
                  camera={{ position: [0, 1, window.innerWidth < 640 ? 12 : 8], fov: 50 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true }}
                  style={{ background: 'transparent' }}
                >
                  <Suspense fallback={null}>
                    <AboutScene />
                  </Suspense>
                </Canvas>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-display text-3xl font-bold text-white mb-6">Executive Profile</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Shoresafe Services Ltd delivers critical, end-to-end inspection, maintenance, testing, and statutory recertification services for Life-Saving Appliances and Fire Fighting Equipment across the Oil & Gas and Maritime sectors.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                Established in {company.established} and proudly Nigerian-owned, Shoresafe was conceived to bridge the noticeable safety gaps in Marine and Oil & Gas sectors. Our mission is to eliminate operational downtime, guarantee regulatory compliance, and safeguard offshore personnel and high-value energy infrastructure.
              </p>
              <p className="text-slate-500 leading-relaxed">
                In high-risk maritime environments, operational continuity relies on uncompromising safety equipment ready to be deployed at any given time.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label="Our Purpose" title="Mission, Vision & Values" light />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: 'Vision', desc: 'To become the foremost Marine Safety Servicing Company with the widest coverage in the Atlantic waters and around Africa.' },
              { icon: Shield, title: 'Mission', desc: 'Providing quality maintenance services to clients in offshore marine facilities and the oil and gas industry.' },
              { icon: Gem, title: 'Core Values', desc: 'Integrity, Innovation, Consistency, Teamwork, and Responsiveness.' },
              { icon: CheckCircle, title: 'We Believe In', desc: 'Zero injuries, zero equipment damage, zero environmental impact, and zero non-compliance.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 h-full hover:bg-white/10 transition-all">
                  <item.icon size={28} className="text-brand-red mb-4" />
                  <h3 className="font-display text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label="Foundation" title="Five Operational Pillars" />
          <div className="flex flex-wrap justify-center gap-4">
            {pillars.map((p, i) => (
              <FadeIn key={p.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl px-8 py-6 text-center min-w-[160px]"
                >
                  <p.icon size={32} className="text-brand-gold mx-auto mb-3" />
                  <span className="text-sm font-semibold text-white">{p.label}</span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="HSE Policy"
            title="Health, Safety & Environment"
            description="HSE excellence is not merely a policy — it is the foundational culture of our organization."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {hseItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 flex gap-5 hover:border-brand-red/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
