import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ScrollTrigger } from '../lib/smooth'
import { scene } from '../lib/store'

const PARTS = [
  { name: 'Aluminium shell', text: 'Single-piece anodised housing with a soft-touch clearcoat.' },
  { name: 'Halo light ring', text: 'Shows battery, pairing and ANC mode at a glance.' },
  { name: '40 mm bio-cellulose driver', text: 'Stiff, light cone for low distortion from 4 Hz to 40 kHz.' },
  { name: 'Memory-foam cushions', text: 'Protein leather over slow-rebound foam. Magnetic, swappable.' },
  { name: '1,200 mAh cell', text: 'Sixty hours with ANC on. Ten minutes of charge gives five hours.' },
]

export default function Inside() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress
        // Parts fly apart over the first 30% of the scroll, then hold while we tour them.
        const t = Math.min(1, p / 0.3)
        scene.explode = t * t * (3 - 2 * t)
        setProgress(p)
        setActive(Math.min(PARTS.length - 1, Math.floor(Math.max(0, p - 0.12) / 0.17)))
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section id="inside" ref={ref} className="inside" data-stage="explode">
      <div className="inside__sticky">
        <div className="inside__head">
          <p className="eyebrow">Inside Aero One</p>
          <h2 className="h2">Engineered layer by layer.</h2>
        </div>

        <ol className="parts">
          {PARTS.map((p, i) => (
            <li key={p.name} className={`part ${i === active ? 'part--active' : ''}`}>
              <span className="part__num">0{i + 1}</span>
              <div>
                <h3>{p.name}</h3>
                <motion.p
                  initial={false}
                  animate={{ height: i === active ? 'auto' : 0, opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p.text}
                </motion.p>
              </div>
            </li>
          ))}
        </ol>

        <div className="inside__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  )
}
