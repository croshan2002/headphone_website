import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { scrollToId } from '../lib/smooth'

const LINKS = [
  ['inside', 'Inside'],
  ['features', 'Features'],
  ['colors', 'Colours'],
  ['specs', 'Specs'],
  ['faq', 'FAQ'],
]

export default function Nav({ cart }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--solid' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <button className="logo" onClick={() => scrollToId('top')} aria-label="Back to top">
        <span className="logo__ring" /> HALO
      </button>
      <nav className="nav__links">
        {LINKS.map(([id, label]) => (
          // Real links so crawlers can follow them; smooth scroll still handles the click.
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(id)
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <button className="btn btn--small" onClick={() => scrollToId('buy')}>
        Buy
        <AnimatePresence mode="popLayout" initial={false}>
          {cart > 0 && (
            <motion.span
              key={cart}
              className="badge"
              initial={{ scale: 0.4, opacity: 0, y: -6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, y: 6 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
            >
              {cart}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.header>
  )
}
