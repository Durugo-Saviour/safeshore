import { Link } from 'react-router-dom'
import { company, navLinks } from '../../data/content'

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 border-t border-white/5 pt-20 pb-8">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt={company.name} className="w-10 h-10" />
              <div>
                <div className="font-display font-bold text-white text-sm">SHORESAFE</div>
                <div className="text-[10px] text-brand-gold tracking-widest uppercase">{company.tagline}</div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Premier Nigerian marine and offshore safety, firefighting & asset integrity solutions. CAC Reg: {company.cac}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/services#lsa" className="hover:text-brand-gold transition-colors">Life-Saving Appliances</Link></li>
              <li><Link to="/services#ffe" className="hover:text-brand-gold transition-colors">Fire Fighting Equipment</Link></li>
              <li><Link to="/services#marine" className="hover:text-brand-gold transition-colors">Marine & NDT</Link></li>
              <li><Link to="/services#platform" className="hover:text-brand-gold transition-colors">Platform Revamp</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {company.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-brand-gold transition-colors">{phone}</a>
                </li>
              ))}
              {company.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="hover:text-brand-gold transition-colors">{email}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <span>&copy; 2026 {company.name}. All rights reserved.</span>
          <span className="tracking-widest uppercase">Safety · Reliability · Excellence</span>
        </div>
      </div>
    </footer>
  )
}
