import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X } from 'lucide-react'
import { company, navLinks } from '../../data/content'

function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[2px] w-full bg-white origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block h-[2px] w-full bg-white"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[2px] w-full bg-white origin-center"
        />
      </div>
    </button>
  )
}

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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
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

          <HamburgerButton isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
        </div>
      </motion.header>

      {/* Mobile menu — rendered outside header for full viewport coverage */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
              exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[56] bg-navy-950/98 flex flex-col justify-center items-center"
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-[57]"
                aria-label="Close menu"
              >
                <X size={22} />
              </motion.button>

              <nav className="flex flex-col items-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`block text-4xl sm:text-5xl font-display font-bold transition-colors ${
                        location.pathname === link.path
                          ? 'text-brand-red'
                          : 'text-white hover:text-brand-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-brand-red text-white text-lg font-semibold rounded-xl hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-500/25"
                  >
                    <Phone size={18} />
                    Get Quote
                  </Link>
                </motion.div>
              </nav>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
