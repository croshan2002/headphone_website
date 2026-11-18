import { motion, AnimatePresence } from 'motion/react'
import { COLORWAYS } from '../lib/store'

export default function Colors({ colorway, onChange }) {
  return (
    <section id="colors" className="section colors" data-stage="colors">
      <div className="colors__col">
        <p className="eyebrow">Colours</p>
        <h2 className="h2">Four finishes. Pick yours.</h2>

        <div className="colors__name" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={colorway.id}
              initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -24, opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {colorway.name}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="swatches" role="radiogroup" aria-label="Colour">
          {COLORWAYS.map((c) => {
            const on = c.id === colorway.id
            return (
              <button
                key={c.id}
                role="radio"
                aria-checked={on}
                aria-label={c.name}
                className="swatch"
                onClick={() => onChange(c)}
              >
                {on && (
                  <motion.span
                    layoutId="swatch-ring"
                    className="swatch__ring"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="swatch__fill" style={{ background: `linear-gradient(135deg, ${c.shell} 50%, ${c.accent} 50%)` }} />
              </button>
            )
          })}
        </div>
        <p className="muted">Every colourway includes a matching travel case and halo light.</p>
      </div>
    </section>
  )
}
