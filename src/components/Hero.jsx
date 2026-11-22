import { motion } from 'motion/react'
import { scrollToId } from '../lib/smooth'
import { PLANS, formatPrice } from '../lib/content'

const ease = [0.22, 1, 0.36, 1]
const LINES = [['Silence,'], ['sculpted.']]

export default function Hero() {
  return (
    <section id="top" className="section hero" data-stage="hero">
      <div className="hero__copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <span className="dot" /> New · HALO Aero One
        </motion.p>

        <h1 className="display">
          {/* Product name in the H1 for search; the visible slogan stays as designed. */}
          <span className="sr-only">HALO Aero One wireless noise cancelling headphones: </span>
          {LINES.map((words, i) => (
            <span className="line" key={i}>
              <motion.span
                className="line__inner"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease, delay: 0.45 + i * 0.12 }}
              >
                {words.join(' ')}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
        >
          Adaptive noise cancelling that listens 48,000 times a second. Sixty hours of battery. One
          shape, machined to disappear on your head.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.95 }}
        >
          <motion.button
            className="btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToId('buy')}
          >
            Pre-order · {formatPrice(PLANS[0].price)}
          </motion.button>
          <button className="btn btn--ghost" onClick={() => scrollToId('inside')}>
            Look inside →
          </button>
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span>Scroll</span>
        <span className="scroll-hint__bar" />
      </motion.div>
    </section>
  )
}
