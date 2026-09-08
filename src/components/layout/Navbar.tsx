import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { company, navLinks } from '../../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            whileHover={{ rotate: 15 }}
            src="/logo.svg"
            alt={company.name}
            className="w-11 h-11"
          />
          <div>
            <div className="font-display font-bold text-white text-sm tracking-wide group-hover:text-brand-gold transition-colors">
              SHORESAFE
            </div>
            <div className="text-[10px] text-brand-gold tracking-[0.2em] uppercase">
              {company.tagline}
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-red rounded-full"
                />
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-3 flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-500/25"
          >
            <Phone size={14} />
            Get Quote
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    location.pathname === link.path
                      ? 'bg-brand-red/10 text-white'
                      : 'text-slate-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
