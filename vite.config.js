import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import seo from './vite-plugin-seo.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Your live site address, e.g. https://halo-aero.vercel.app/
  // Set SITE_URL here or as an environment variable on your host (Vercel / Netlify).
  // It drives the canonical link, og:url and sitemap.xml.
  const SITE_URL = env.SITE_URL || ''

  return {
    plugins: [react(), seo({ siteUrl: SITE_URL })],
  }
})
