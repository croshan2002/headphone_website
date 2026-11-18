# HALO Aero One — 3D Headphone Product Site (Day 1)

Scroll-driven 3D product page for a concept pair of wireless headphones.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).
Build for production with `npm run build`; the result goes to `dist/`.

## Stack

- **Vite + React 19**
- **React Three Fiber + drei**: the headphone is modelled in code (no GLB download)
- **Motion**: hero text reveal, staggered cards, colour-name swap, counters, cart badge, toast
- **GSAP ScrollTrigger + Lenis**: smooth scroll and the scroll-driven 3D choreography

## What happens on scroll

| Section | 3D behaviour |
| --- | --- |
| Hero | Headphone floats on the right and follows the mouse |
| Inside | Sticky section: parts fly apart (exploded view) while the part list highlights each layer |
| Features | Model slides left, feature cards stagger in |
| Colours | Swatches recolour the shell, band, halo ring and page glow |
| Specs | Model spins with scroll, numbers count up |
| Pre-order | Model leaves, pricing cards + add-to-bag toast |

## Files

- `src/three/Headphones.jsx`: the model, explode logic and per-section poses (`POSES`)
- `src/three/Scene.jsx`: canvas, lights, studio reflections
- `src/lib/store.js`: colourways and shared scroll state
- `src/components/*`: page sections

Respects `prefers-reduced-motion` (no smooth scroll, no idle float, no marquee).
