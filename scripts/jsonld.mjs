import { brand, writing, log, faq } from '../src/data/content.js'
import { SITE } from '../src/data/site.js'

/* The homepage's structured data used to be a second, hand-written copy of the
   FAQ, the repository list and the writing list. It drifted. This builds the
   same @graph from the content module and is injected into index.html by the
   Vite plugin in vite.config.js, so there is exactly one source for the copy
   that search engines read. */

export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE}/#profilepage`,
        url: `${SITE}/`,
        name: `${brand.name} · ${brand.person}, ${brand.role}`,
        inLanguage: 'en',
        mainEntity: { '@id': `${SITE}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#person`,
        name: brand.person,
        alternateName: brand.name,
        jobTitle: brand.role,
        url: `${SITE}/`,
        image: `${SITE}/assets/og.jpg`,
        address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
        sameAs: brand.socials.map((s) => s.href),
        knowsAbout: brand.knowsAbout,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: `${brand.name} · engineering log`,
        inLanguage: 'en',
        publisher: { '@id': `${SITE}/#person` },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE}/#writing`,
        name: 'Writing',
        itemListElement: writing.posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.blurb,
          inLanguage: 'en',
          datePublished: post.published,
          author: { '@id': `${SITE}/#person` },
          url: `${SITE}/writing/${post.slug}/`,
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE}/#projects`,
        name: 'Public repositories',
        itemListElement: log.entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: entry.label,
            description: entry.problem,
            codeRepository: entry.link.href,
            programmingLanguage: entry.stack[0],
            author: { '@id': `${SITE}/#person` },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE}/#faq`,
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }
}
