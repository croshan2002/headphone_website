// Single source of truth for product facts.
// Used by the React page AND by vite-plugin-seo.js (meta tags, JSON-LD, llms.txt,
// no-JS fallback), so search engines and AI answer engines always see the same
// facts as visitors. Keep this file free of JSX so Node can import it.

export const SITE = {
  name: 'HALO Aero One',
  brand: 'HALO Audio',
  title: 'HALO Aero One: Wireless Noise Cancelling Headphones, 60h Battery',
  description:
    'HALO Aero One wireless headphones with adaptive ANC (up to 42 dB), 60-hour battery, spatial audio and LDAC. Pre-order from ₹29,990, ships in December.',
  locale: 'en_IN',
  currency: 'INR',
}

export const PLANS = [
  {
    id: 'one',
    name: 'Aero One',
    price: 29990,
    perks: ['Adaptive ANC + spatial audio', '60 h battery', 'Soft travel pouch', '1-year warranty'],
  },
  {
    id: 'studio',
    name: 'Aero One Studio',
    price: 36990,
    featured: true,
    perks: ['Everything in Aero One', 'Hard-shell case + 3.5 mm cable', 'Spare cushion set', '2-year warranty'],
  },
]

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
export const formatPrice = (n) => inr.format(n)

// Short, quotable facts. Answer engines lift sentences like these verbatim.
export const KEY_FACTS = [
  ['Noise cancelling', 'Adaptive ANC up to 42 dB, tuned in real time by eight microphones'],
  ['Battery', '60 hours with ANC on; 10 minutes of USB-C charging gives 5 hours'],
  ['Drivers', '40 mm bio-cellulose, 4 Hz to 40 kHz'],
  ['Audio', 'Head-tracked spatial audio and LDAC Hi-Res wireless'],
  ['Connectivity', 'Multipoint: connected to a phone and a laptop at the same time'],
  ['Weight', '250 g'],
  ['Build', 'Single-piece anodised aluminium shell, magnetic memory-foam cushions'],
  ['Halo light', 'Ring light that shows battery, pairing and ANC mode'],
]

export const FAQS = [
  {
    q: 'How long does the HALO Aero One battery last?',
    a: 'Up to 60 hours of playback with adaptive noise cancelling switched on. A 10-minute USB-C charge gives about 5 hours of listening.',
  },
  {
    q: 'How much noise does the HALO Aero One cancel?',
    a: 'Adaptive noise cancelling reduces noise by up to 42 dB. Eight microphones read your surroundings and retune cancellation in real time, so it adapts to trains, cafés and flights.',
  },
  {
    q: 'How much does the HALO Aero One cost in India?',
    a: `Aero One costs ${formatPrice(29990)} and Aero One Studio costs ${formatPrice(36990)}. Both are available to pre-order now.`,
  },
  {
    q: 'What is the difference between Aero One and Aero One Studio?',
    a: 'Both have the same headphones. Aero One comes with a soft travel pouch and a 1-year warranty. Aero One Studio adds a hard-shell case, a 3.5 mm cable, a spare cushion set and a 2-year warranty.',
  },
  {
    q: 'When does the HALO Aero One ship?',
    a: 'Pre-orders ship in December.',
  },
  {
    q: 'Can the HALO Aero One connect to two devices at once?',
    a: 'Yes. Multipoint keeps it connected to a phone and a laptop at the same time. When a call comes in, music pauses and you can answer straight away.',
  },
  {
    q: 'Does the HALO Aero One support Hi-Res audio?',
    a: 'Yes. It supports LDAC Hi-Res wireless audio, and its 40 mm bio-cellulose drivers cover 4 Hz to 40 kHz.',
  },
  {
    q: 'How heavy is the HALO Aero One?',
    a: 'It weighs 250 grams, with a pressure-balanced headband and memory-foam cushions designed for all-day wear.',
  },
  {
    q: 'What colours does the HALO Aero One come in?',
    a: 'Four finishes: Midnight, Sand, Glacier and Ember. Every colour includes a matching travel case and halo light.',
  },
]
