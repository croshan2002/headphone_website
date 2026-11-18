// Shared mutable state read every frame by the 3D scene.
// Plain object (not React state) so scroll updates never trigger re-renders.
export const scene = {
  stage: 'hero', // hero | explode | features | colors | specs | pricing
  explode: 0, // 0..1, driven by the pinned "inside" section
  spin: 0, // extra rotation driven by scroll in the specs section
  pointer: { x: 0, y: 0 },
}

export const COLORWAYS = [
  { id: 'midnight', name: 'Midnight', shell: '#1d1f26', band: '#2a2d36', accent: '#7c5cff', bg: '#0b0c10' },
  { id: 'sand', name: 'Sand', shell: '#d9ccb6', band: '#bfae93', accent: '#e07a3a', bg: '#100d0a' },
  { id: 'ice', name: 'Glacier', shell: '#e3e9f0', band: '#c4ced9', accent: '#2f9bff', bg: '#080c12' },
  { id: 'ember', name: 'Ember', shell: '#6e1d22', band: '#4a1418', accent: '#ff5a36', bg: '#100809' },
]

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
