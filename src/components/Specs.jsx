import { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { prefersReducedMotion } from '../lib/store'

const SPECS = [
  { value: 60, suffix: 'h', label: 'Battery with ANC on' },
  { value: 42, prefix: '−', suffix: 'dB', label: 'Noise reduction' },
  { value: 40, suffix: 'mm', label: 'Bio-cellulose drivers' },
  { value: 250, suffix: 'g', label: 'Total weight' },
]

function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      ref.current.textContent = `${prefix}${value}`
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}`
      },
    })
    return () => controls.stop()
  }, [inView, value, prefix])

  return (
    <span className="stat__value">
      <span ref={ref}>{prefix}0</span>
      <small>{suffix}</small>
    </span>
  )
}

export default function Specs() {
  return (
    <section id="specs" className="section specs" data-stage="specs">
      <div className="specs__inner">
        <p className="eyebrow">Specs</p>
        <h2 className="h2">The numbers.</h2>
        <div className="stats">
          {SPECS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Counter {...s} />
              <span className="stat__label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
