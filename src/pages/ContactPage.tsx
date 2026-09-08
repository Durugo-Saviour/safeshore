import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { FadeIn } from '../components/ui/SectionHeading'
import { company } from '../data/content'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
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
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-gradient mt-4 mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Ready to discuss your safety requirements? Our team responds promptly.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Let's Discuss Your Safety Needs
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10">
                Whether you need liferaft recertification, fire fighting equipment servicing, or a comprehensive safety audit — our team is ready to help.
              </p>

              {[
                { icon: MapPin, title: 'Head Office', content: [company.address, company.addressAlt] },
                { icon: Phone, title: 'Phone', content: company.phones, links: company.phones.map(p => `tel:${p.replace(/\s/g, '')}`) },
                { icon: Mail, title: 'Email', content: company.emails, links: company.emails.map(e => `mailto:${e}`) },
                { icon: Clock, title: 'Business Hours', content: [company.hours, 'Saturday – Sunday: Closed'] },
              ].map((item) => (
                <div key={item.title} className="flex gap-5 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-brand-red" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    {item.content.map((line, i) => (
                      item.links ? (
                        <a key={line} href={item.links[i]} className="block text-sm text-slate-500 hover:text-brand-gold transition-colors">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-slate-500">{line}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold text-white mb-6">Send Us a Message</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">First Name *</label>
                    <input required type="text" className="w-full px-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-white text-sm focus:border-brand-red focus:outline-none transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Last Name *</label>
                    <input required type="text" className="w-full px-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-white text-sm focus:border-brand-red focus:outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Email *</label>
                    <input required type="email" className="w-full px-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-white text-sm focus:border-brand-red focus:outline-none transition-colors" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-white text-sm focus:border-brand-red focus:outline-none transition-colors" placeholder="+234 xxx xxx xxxx" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Service of Interest</label>
                  <select className="w-full px-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-white text-sm focus:border-brand-red focus:outline-none transition-colors">
                    <option value="">Select a service...</option>
                    <option value="lsa">Life-Saving Appliances (LSA)</option>
                    <option value="ffe">Fire Fighting Equipment (FFE)</option>
                    <option value="marine">Marine, NDT & Industrial</option>
                    <option value="platform">Platform Revamp</option>
                    <option value="om">Operations & Maintenance</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Message *</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-white text-sm focus:border-brand-red focus:outline-none transition-colors resize-none" placeholder="Tell us about your project..." />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitted}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'bg-brand-red text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20'
                  }`}
                >
                  {submitted ? 'Message Sent ✓' : (<>Send Message <Send size={16} /></>)}
                </motion.button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden h-[400px] glass">
              <iframe
                src="https://maps.google.com/maps?q=Trans-Amadi+Port+Harcourt+Rivers+State+Nigeria&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Shoresafe Location"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
