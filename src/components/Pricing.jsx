import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PLANS, formatPrice } from '../lib/content'

export default function Pricing({ colorway, onAdd }) {
  const [added, setAdded] = useState(null)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const add = (plan) => {
    onAdd()
    setAdded(plan)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(null), 2400)
  }

  return (
    <section id="buy" className="section pricing" data-stage="pricing">
      <div className="pricing__inner">
        <p className="eyebrow">Pre-order</p>
        <h2 className="h2">Ships in December.</h2>
        <div className="plans">
          {PLANS.map((p, i) => (
            <motion.article
              key={p.id}
              className={`plan ${p.featured ? 'plan--featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {p.featured && <span className="plan__tag">Most picked</span>}
              <h3>{p.name}</h3>
              <p className="plan__price">{formatPrice(p.price)}</p>
              <ul>
                {p.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <motion.button
                className={`btn ${p.featured ? '' : 'btn--ghost'} btn--block`}
                whileTap={{ scale: 0.97 }}
                onClick={() => add(p)}
              >
                Add to bag · {colorway.name}
              </motion.button>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {added && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <span className="toast__dot" /> {added.name} in {colorway.name} added to bag
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
