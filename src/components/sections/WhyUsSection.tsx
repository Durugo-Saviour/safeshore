import { Shield, Award, Users, Target } from 'lucide-react'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { whyUs } from '../../data/content'

const iconMap: Record<string, typeof Shield> = {
  Shield, Award, Users, Target,
}

export default function WhyUsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-navy-950 via-navy-900/50 to-navy-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeading
          label="Why Shoresafe"
          title="Why Industry Leaders Choose Us"
          description="We bridge the gap between safety compliance and absolute peace of mind."
          light
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Shield
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 text-center h-full hover:bg-white/10 hover:border-brand-red/20 transition-all duration-500 group">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-red/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-red/20 transition-all">
                    <Icon size={28} className="text-brand-red" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
