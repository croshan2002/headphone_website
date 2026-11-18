import { motion } from 'motion/react'

const FEATURES = [
  {
    title: 'Adaptive ANC',
    text: 'Eight mics read the room and tune cancellation in real time — trains, cafés, flights.',
    icon: (
      <path d="M4 12h2m3-5v10m3-13v16m3-11v6m3-9v12m2-6h1" strokeLinecap="round" />
    ),
  },
  {
    title: 'Spatial audio',
    text: 'Head-tracked sound that stays put when you turn, so films feel like a room.',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'All-day comfort',
    text: '250 grams, a pressure-balanced band and cushions that never get hot.',
    icon: <path d="M4 15a8 8 0 0 1 16 0M4 15v3h3v-5H4m16 2v3h-3v-5h3" strokeLinejoin="round" />,
  },
  {
    title: 'Multipoint',
    text: 'Laptop and phone at once. A call comes in, music pauses, you answer.',
    icon: (
      <>
        <rect x="3" y="5" width="12" height="9" rx="1.5" />
        <rect x="16" y="8" width="5" height="11" rx="1.2" />
        <path d="M6 18h6" strokeLinecap="round" />
      </>
    ),
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Features() {
  return (
    <section id="features" className="section features" data-stage="features">
      <div className="features__col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Features</p>
          <h2 className="h2">Built for the hours you forget you're wearing them.</h2>
        </motion.div>

        <motion.ul
          className="cards"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {FEATURES.map((f) => (
            <motion.li key={f.title} className="card" variants={item} whileHover={{ y: -4 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="card__icon">
                {f.icon}
              </svg>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
