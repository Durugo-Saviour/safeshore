import { motion } from 'framer-motion'
import SectionHeading, { FadeIn } from '../ui/SectionHeading'
import { clients } from '../../data/content'

export default function ClientsSection() {
  const getLogo = (name: string) => {
    if (name.includes('Bourbon')) return 'https://logo.clearbit.com/bourbonoffshore.com'
    if (name.includes('Oando')) return 'https://logo.clearbit.com/oandoplc.com'
    if (name.includes('TOTAL')) return 'https://logo.clearbit.com/totalenergies.com'
    if (name.includes('ABC MARITIME')) return 'https://logo.clearbit.com/abcmaritime.ch'
    
    // Fallback for others
    const encodedName = encodeURIComponent(name.replace('Ltd.', '').replace('LTD', '').trim())
    return `https://ui-avatars.com/api/?name=${encodedName}&background=0f1f3d&color=fff&size=128&bold=true`
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeading label="Trusted By" title="Our Clients" light />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, i) => (
            <FadeIn key={client} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.03, borderColor: 'rgba(220,38,38,0.3)' }}
                className="glass rounded-xl p-6 text-center h-full flex flex-col items-center justify-center gap-4 min-h-[120px]"
              >
                <div className="w-16 h-16 rounded-lg bg-white/5 p-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={getLogo(client)} 
                    alt={`${client} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback if clearbit fails
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('ui-avatars')) {
                        const encodedName = encodeURIComponent(client.replace('Ltd.', '').replace('LTD', '').trim());
                        target.src = `https://ui-avatars.com/api/?name=${encodedName}&background=0f1f3d&color=fff&size=128&bold=true`;
                      }
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-400 leading-tight">{client}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
