import { motion } from 'motion/react'
import { FAQS } from '../lib/content'

// Visible FAQ. The same questions feed the FAQPage JSON-LD (vite-plugin-seo.js),
// and structured data has to match what visitors can see on the page.
// <details> keeps every answer in the DOM, so crawlers read them even when closed.
export default function Faq() {
  return (
    <section id="faq" className="section faq" data-stage="pricing" aria-labelledby="faq-title">
      <div className="faq__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h2">Questions, answered.</h2>
        </motion.div>

        <div className="faq__list">
          {FAQS.map(({ q, a }, i) => (
            <details key={q} className="faq__item" open={i === 0}>
              <summary>
                <h3>{q}</h3>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
