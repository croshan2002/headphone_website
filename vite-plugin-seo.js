// SEO + AEO (answer engine optimisation) for a client-rendered page.
//
// - Injects title, description, Open Graph / Twitter tags and canonical URL.
// - Injects JSON-LD: Organization, WebSite, Product (with offers) and FAQPage.
// - Puts a plain-HTML copy of the key facts and FAQ inside #root, so crawlers
//   that do not run JavaScript (most AI crawlers) still read the content.
//   React replaces it on mount.
// - Emits robots.txt, sitemap.xml and llms.txt (also served in dev).
//
// Everything comes from src/lib/content.js, so the page and the metadata never drift.

import { SITE, PLANS, KEY_FACTS, FAQS, formatPrice } from './src/lib/content.js'
import { COLORWAYS } from './src/lib/store.js'

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// JSON inside <script> must not contain "</script>".
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

const COLOURS = COLORWAYS.map((c) => c.name)

function jsonLd(url) {
  const withUrl = (obj, u) => (url ? { ...obj, url: u } : obj)
  const org = withUrl({ '@type': 'Organization', '@id': `${url}#org`, name: SITE.brand }, url)

  const product = {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: SITE.name,
    description: SITE.description,
    brand: { '@type': 'Brand', name: SITE.brand },
    category: 'Wireless noise cancelling headphones',
    color: COLOURS.join(', '),
    weight: { '@type': 'QuantitativeValue', value: 250, unitCode: 'GRM' },
    additionalProperty: KEY_FACTS.filter(([k]) => k !== 'Weight').map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
    offers: PLANS.map((p) =>
      withUrl(
        {
          '@type': 'Offer',
          name: p.name,
          price: String(p.price),
          priceCurrency: SITE.currency,
          availability: 'https://schema.org/PreOrder',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': `${url}#org` },
        },
        `${url}#buy`
      )
    ),
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const website = withUrl({ '@type': 'WebSite', name: SITE.name, publisher: { '@id': `${url}#org` } }, url)

  return { '@context': 'https://schema.org', '@graph': [org, website, product, faq] }
}

function headTags(url) {
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  const tags = [
    { tag: 'title', children: SITE.title, injectTo: 'head' },
    meta({ name: 'description', content: SITE.description }),
    meta({ name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' }),
    meta({ property: 'og:type', content: 'product' }),
    meta({ property: 'og:site_name', content: SITE.brand }),
    meta({ property: 'og:title', content: SITE.title }),
    meta({ property: 'og:description', content: SITE.description }),
    meta({ property: 'og:locale', content: SITE.locale }),
    meta({ property: 'product:price:amount', content: String(PLANS[0].price) }),
    meta({ property: 'product:price:currency', content: SITE.currency }),
    meta({ name: 'twitter:card', content: 'summary' }),
    meta({ name: 'twitter:title', content: SITE.title }),
    meta({ name: 'twitter:description', content: SITE.description }),
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonForScript(jsonLd(url)), injectTo: 'head' },
  ]
  if (url) {
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
      meta({ property: 'og:url', content: url })
    )
  }
  return tags
}

function fallbackHtml() {
  return `
      <article class="prerender">
        <h1>${esc(SITE.name)}: wireless noise cancelling headphones by ${esc(SITE.brand)}</h1>
        <p>${esc(SITE.description)}</p>
        <h2>Key specs</h2>
        <ul>${KEY_FACTS.map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join('')}</ul>
        <h2>Price</h2>
        <ul>${PLANS.map((p) => `<li>${esc(p.name)}: ${esc(formatPrice(p.price))} (${esc(p.perks.join(', '))})</li>`).join('')}</ul>
        <h2>Colours</h2>
        <p>${esc(COLOURS.join(', '))}</p>
        <h2>Frequently asked questions</h2>
        ${FAQS.map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n        ')}
      </article>
    `
}

function robotsTxt(url) {
  return `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}sitemap.xml\n` : ''}`
}

function sitemapXml(url) {
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${esc(url)}</loc><lastmod>${today}</lastmod></url>
</urlset>
`
}

// https://llmstxt.org: a plain-markdown summary for AI assistants.
function llmsTxt(url) {
  return `# ${SITE.name}

> ${SITE.description}

${SITE.name} is a pair of over-ear wireless headphones from ${SITE.brand}.${url ? ` Product page: ${url}` : ''}

## Key specs

${KEY_FACTS.map(([k, v]) => `- ${k}: ${v}`).join('\n')}
- Colours: ${COLOURS.join(', ')}

## Price (India, INR)

${PLANS.map((p) => `- ${p.name}: ${formatPrice(p.price)}, includes ${p.perks.join(', ')}`).join('\n')}

Availability: pre-order, ships in December.

## FAQ

${FAQS.map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n')}
`
}

export default function seo({ siteUrl } = {}) {
  const url = siteUrl ? siteUrl.replace(/\/*$/, '/') : ''
  const files = () => {
    const out = { 'robots.txt': robotsTxt(url), 'llms.txt': llmsTxt(url) }
    if (url) out['sitemap.xml'] = sitemapXml(url)
    return out
  }

  return {
    name: 'halo-seo',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return {
          html: html.replace('<div id="root"></div>', `<div id="root">${fallbackHtml()}</div>`),
          tags: headTags(url),
        }
      },
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const body = files()[req.url?.slice(1)]
        if (!body) return next()
        const type = req.url.endsWith('.xml') ? 'application/xml' : 'text/plain'
        res.setHeader('Content-Type', `${type}; charset=utf-8`)
        res.end(body)
      })
    },

    buildStart() {
      if (!url && this.meta.watchMode === false) {
        this.warn('SITE_URL is not set: canonical URL, og:url and sitemap.xml are skipped. See vite.config.js.')
      }
    },

    generateBundle() {
      for (const [fileName, source] of Object.entries(files())) {
        this.emitFile({ type: 'asset', fileName, source })
      }
    },
  }
}
