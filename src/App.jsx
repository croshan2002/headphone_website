import { useEffect, useState } from 'react'
import Scene from './three/Scene'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Inside from './components/Inside'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Colors from './components/Colors'
import Specs from './components/Specs'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { COLORWAYS, scene } from './lib/store'
import { initSmoothScroll, ScrollTrigger } from './lib/smooth'

export default function App() {
  const [colorway, setColorway] = useState(COLORWAYS[0])
  const [cart, setCart] = useState(0)

  useEffect(() => {
    const stop = initSmoothScroll()

    // Each section tells the 3D scene which pose to take while it is in the middle of the screen.
    const triggers = [...document.querySelectorAll('[data-stage]')].map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) scene.stage = el.dataset.stage
        },
      })
    )
    const spin = ScrollTrigger.create({
      trigger: '#specs',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => (scene.spin = self.progress * Math.PI * 1.5),
      onLeave: () => (scene.spin = 0),
      onLeaveBack: () => (scene.spin = 0),
    })
    return () => {
      triggers.forEach((t) => t.kill())
      spin.kill()
      stop()
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', colorway.accent)
    root.style.setProperty('--bg', colorway.bg)
  }, [colorway])

  return (
    <>
      <Scene colorway={colorway} />
      <div className="glow" aria-hidden="true" />
      <Nav cart={cart} />
      <main>
        <Hero />
        <Inside />
        <Marquee />
        <Features />
        <Colors colorway={colorway} onChange={setColorway} />
        <Specs />
        <Pricing colorway={colorway} onAdd={() => setCart((c) => c + 1)} />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
