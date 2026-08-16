#!/usr/bin/env node

const CANONICAL_ORIGIN = 'https://www.omorros.com'
const EXPECTED_PATHS = [
  '/',
  '/projects',
  '/work',
  '/open-source',
  '/journal',
  '/projects/offbabel',
  '/projects/supconnect',
  '/projects/truevoice',
  '/projects/basket',
  '/projects/wildscan',
  '/projects/darkfleet',
  '/projects/gaslit',
  '/projects/atlas',
  '/projects/snapshelf',
  '/projects/bk-shoot',
  '/projects/deep-learning-cnn-comparison',
  '/projects/wikipedia-scraper',
  '/projects/university-library-system',
  '/journal/social-media',
  '/journal/basketball',
]

const CRAWLERS = {
  Googlebot:
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  Bingbot:
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  GPTBot: 'Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)',
  'ChatGPT-User':
    'Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)',
  ClaudeBot: 'ClaudeBot/1.0; +https://www.anthropic.com/',
  'Claude-User': 'Claude-User/1.0; +https://www.anthropic.com/',
  PerplexityBot:
    'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
}

const failures = []
let checks = 0

function expect(condition, message) {
  checks += 1
  if (!condition) failures.push(message)
  return condition
}

function parseAuditBase() {
  const value = process.env.SITE_AUDIT_BASE_URL || 'http://localhost:3000'
  let url
  try {
    url = new URL(value)
  } catch {
    throw new Error(`Invalid SITE_AUDIT_BASE_URL: ${value}`)
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash) {
    throw new Error('SITE_AUDIT_BASE_URL must be an http(s) URL without a query or hash')
  }
  url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  return url
}

const auditBase = parseAuditBase()

// Sitemap and metadata URLs always identify production. Requests are remapped
// to this origin so the same audit works on localhost and Vercel previews.
function auditUrl(pathWithQuery) {
  const requested = new URL(pathWithQuery, 'https://placeholder.invalid')
  const target = new URL(auditBase)
  const prefix = target.pathname === '/' ? '' : target.pathname
  target.pathname = `${prefix}${requested.pathname}` || '/'
  target.search = requested.search
  target.hash = ''
  return target.toString()
}

function canonicalUrl(path) {
  return new URL(path, `${CANONICAL_ORIGIN}/`).toString()
}

function mappedCanonicalUrl(value) {
  const url = new URL(value)
  return auditUrl(`${url.pathname}${url.search}`)
}

function headers(extra = {}) {
  const result = { ...extra }
  if (process.env.SITE_AUDIT_BYPASS_TOKEN) {
    result['x-vercel-protection-bypass'] = process.env.SITE_AUDIT_BYPASS_TOKEN
    result['x-vercel-set-bypass-cookie'] = 'true'
  }
  return result
}

async function get(url, label, extraHeaders = {}, expectedStatus = 200) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30_000)
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: headers(extraHeaders),
      signal: controller.signal,
    })
    expect(
      response.status === expectedStatus,
      `${label}: expected ${expectedStatus}, received ${response.status}`,
    )
    expect(!response.headers.has('location'), `${label}: must not redirect`)
    return response
  } catch (error) {
    expect(false, `${label}: request failed (${error instanceof Error ? error.message : error})`)
    return null
  } finally {
    clearTimeout(timer)
  }
}

function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|quot);/gi, (_, code) => {
    const key = code.toLowerCase()
    const named = { amp: '&', apos: "'", gt: '>', lt: '<', quot: '"' }
    if (named[key]) return named[key]
    return String.fromCodePoint(
      Number.parseInt(key.slice(key[1] === 'x' ? 2 : 1), key[1] === 'x' ? 16 : 10),
    )
  })
}

function tagAttributes(tag) {
  const result = {}
  const pattern = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g
  let match
  while ((match = pattern.exec(tag))) {
    result[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? '')
  }
  return result
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) =>
    tagAttributes(match[0]),
  )
}

function metadataValues(items, attribute, key) {
  return items
    .filter((item) => item[attribute]?.toLowerCase() === key.toLowerCase())
    .map((item) => item.content ?? '')
}

function linksByRel(items, rel) {
  return items.filter((item) =>
    (item.rel || '').toLowerCase().split(/\s+/).includes(rel.toLowerCase()),
  )
}

function one(values, label) {
  expect(values.length === 1, `${label}: expected exactly one, found ${values.length}`)
  const value = values[0]
  if (value !== undefined) expect(value.trim() !== '', `${label}: value is empty`)
  return value
}

function productionUrl(value, label, expectedPath) {
  let url
  try {
    url = new URL(value)
  } catch {
    expect(false, `${label}: must be an absolute URL (${value})`)
    return null
  }
  expect(url.protocol === 'https:', `${label}: must use https`)
  expect(url.host === 'www.omorros.com', `${label}: must use www.omorros.com`)
  expect(!url.hash, `${label}: must not contain a hash`)
  if (expectedPath !== undefined) {
    expect(url.toString() === canonicalUrl(expectedPath), `${label}: wrong canonical path`)
  }
  return url
}

function xmlValues(xml, name) {
  const pattern = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}\\s*>`, 'gi')
  return [...xml.matchAll(pattern)].map((match) => decodeHtml(match[1].trim()))
}

function validLastModified(value) {
  const day = value.match(/^(\d{4}-\d{2}-\d{2})(?:$|T)/)?.[1]
  if (!day || !Number.isFinite(Date.parse(value))) return false
  return new Date(`${day}T00:00:00.000Z`).toISOString().slice(0, 10) === day
}

async function auditSitemap() {
  const response = await get(auditUrl('/sitemap.xml'), 'sitemap.xml', {
    accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8',
  })
  if (!response) return
  expect((response.headers.get('content-type') || '').includes('xml'), 'sitemap.xml: not XML')

  const xml = await response.text()
  expect(!/<priority(?:\s|>)/i.test(xml), 'sitemap.xml: contains ignored <priority>')
  expect(!/<changefreq(?:\s|>)/i.test(xml), 'sitemap.xml: contains ignored <changefreq>')

  const blocks = xml.match(/<url(?:\s[^>]*)?>[\s\S]*?<\/url\s*>/gi) || []
  expect(
    blocks.length === EXPECTED_PATHS.length,
    `sitemap.xml: expected ${EXPECTED_PATHS.length} routes, found ${blocks.length}`,
  )
  const foundPaths = []

  blocks.forEach((block, index) => {
    const label = `sitemap.xml entry ${index + 1}`
    const location = one(xmlValues(block, 'loc'), `${label} loc`)
    const lastModified = one(xmlValues(block, 'lastmod'), `${label} lastmod`)
    if (lastModified) expect(validLastModified(lastModified), `${label}: invalid lastmod`)
    if (!location) return
    const url = productionUrl(location, `${label} loc`)
    if (url) {
      expect(!url.search, `${label}: loc must not contain a query`)
      foundPaths.push(url.pathname)
    }
  })

  const found = new Set(foundPaths)
  expect(found.size === foundPaths.length, 'sitemap.xml: contains duplicate routes')
  for (const path of EXPECTED_PATHS) {
    expect(found.has(path), `sitemap.xml: missing ${canonicalUrl(path)}`)
  }
  for (const path of found) {
    expect(EXPECTED_PATHS.includes(path), `sitemap.xml: unexpected ${canonicalUrl(path)}`)
  }
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter((match) => tagAttributes(`<script${match[1]}>`).type === 'application/ld+json')
    .map((match) => match[2].trim())
}

function jsonLdNodes(documents) {
  return documents.flatMap((document) => {
    const roots = Array.isArray(document) ? document : [document]
    return roots.flatMap((root) =>
      root && typeof root === 'object' && Array.isArray(root['@graph'])
        ? root['@graph']
        : [root],
    )
  })
}

function hasType(node, type) {
  if (!node || typeof node !== 'object') return false
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']]
  return types.includes(type)
}

function nodesOfType(nodes, type) {
  return nodes.filter((node) => hasType(node, type))
}

function auditJsonLd(path, documents) {
  const label = `${path} JSON-LD`
  const nodes = jsonLdNodes(documents)
  const pageUrl = canonicalUrl(path)
  const websiteId = `${canonicalUrl('/')}#website`
  const personId = `${canonicalUrl('/')}#person`
  const websites = nodesOfType(nodes, 'WebSite')
  const people = nodesOfType(nodes, 'Person')

  expect(websites.length === 1, `${label}: expected exactly one WebSite`)
  expect(people.length === 1, `${label}: expected exactly one Person`)

  if (websites[0]) {
    expect(websites[0]['@id'] === websiteId, `${label}: unstable WebSite @id`)
    expect(websites[0].url === canonicalUrl('/'), `${label}: wrong WebSite URL`)
  }
  if (people[0]) {
    expect(people[0]['@id'] === personId, `${label}: unstable Person @id`)
    expect(people[0].url === canonicalUrl('/'), `${label}: wrong Person URL`)
    expect(people[0].jobTitle === 'Software Engineer', `${label}: stale job title`)
    expect(people[0].worksFor?.name === 'Eli by Techbible', `${label}: stale employer`)
    expect(!Object.hasOwn(people[0], 'award'), `${label}: Person duplicates awards`)
  }

  const pageNodes = nodes.filter(
    (node) =>
      hasType(node, 'WebPage') ||
      hasType(node, 'ProfilePage') ||
      hasType(node, 'CollectionPage'),
  )
  expect(pageNodes.length === 1, `${label}: expected exactly one page node`)
  if (pageNodes[0]) {
    expect(pageNodes[0].url === pageUrl, `${label}: wrong page URL`)
    expect(pageNodes[0]['@id'] === `${pageUrl}#webpage`, `${label}: unstable page @id`)
  }

  if (path === '/') {
    expect(nodesOfType(nodes, 'ProfilePage').length === 1, `${label}: missing ProfilePage`)
    expect(
      pageNodes[0]?.mainEntity?.['@id'] === personId,
      `${label}: ProfilePage mainEntity must reference Person`,
    )
    return
  }

  if (path === '/projects' || path === '/journal') {
    const expectedCount = path === '/projects' ? 13 : 2
    const lists = nodesOfType(nodes, 'ItemList')
    expect(nodesOfType(nodes, 'CollectionPage').length === 1, `${label}: missing CollectionPage`)
    expect(lists.length === 1, `${label}: expected exactly one ItemList`)
    if (lists[0]) {
      expect(lists[0].numberOfItems === expectedCount, `${label}: wrong ItemList count`)
      expect(
        Array.isArray(lists[0].itemListElement) &&
          lists[0].itemListElement.length === expectedCount,
        `${label}: ItemList does not match the visible collection`,
      )
      if (Array.isArray(lists[0].itemListElement)) {
        expect(
          lists[0].itemListElement.every((item, index) => item.position === index + 1),
          `${label}: ItemList positions are not contiguous`,
        )
      }
    }
    return
  }

  if (path.startsWith('/projects/')) {
    const software = nodesOfType(nodes, 'SoftwareSourceCode')
    expect(software.length === 1, `${label}: expected one SoftwareSourceCode`)
    if (software[0]) {
      expect(software[0].url === pageUrl, `${label}: wrong software URL`)
      expect(software[0].author?.['@id'] === personId, `${label}: wrong software author`)
      expect(
        typeof software[0].codeRepository === 'string' &&
          software[0].codeRepository.startsWith('https://github.com/'),
        `${label}: missing code repository`,
      )
    }
    return
  }

  if (/^\/journal\/(social-media|basketball)$/.test(path)) {
    const posts = nodesOfType(nodes, 'BlogPosting')
    expect(posts.length === 1, `${label}: expected one BlogPosting`)
    if (posts[0]) {
      expect(posts[0].url === pageUrl, `${label}: wrong BlogPosting URL`)
      expect(posts[0].author?.['@id'] === personId, `${label}: wrong BlogPosting author`)
    }
    return
  }

  expect(nodesOfType(nodes, 'WebPage').length === 1, `${label}: expected one WebPage`)
}

function expectedOgType(path) {
  if (path === '/') return 'profile'
  return /^\/journal\/(social-media|basketball)$/.test(path) ? 'article' : 'website'
}

async function auditPage(path) {
  const response = await get(auditUrl(path), path, {
    accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
  })
  if (!response) return null
  expect((response.headers.get('content-type') || '').includes('text/html'), `${path}: not HTML`)
  const html = await response.text()
  const metas = tags(html, 'meta')
  const links = tags(html, 'link')
  const htmlElements = tags(html, 'html')
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)].map((match) =>
    decodeHtml(match[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(),
  )

  const title = one(titles, `${path} title`)
  const language = one(
    htmlElements.map((element) => element.lang || ''),
    `${path} html language`,
  )
  const description = one(metadataValues(metas, 'name', 'description'), `${path} description`)
  const robots = one(metadataValues(metas, 'name', 'robots'), `${path} robots`)
  const googlebot = one(metadataValues(metas, 'name', 'googlebot'), `${path} googlebot`)
  const canonical = one(
    linksByRel(links, 'canonical').map((link) => link.href || ''),
    `${path} canonical`,
  )
  const describedBy = one(
    linksByRel(links, 'describedby').map((link) => link.href || ''),
    `${path} describedby`,
  )

  const og = Object.fromEntries(
    ['title', 'description', 'url', 'type', 'site_name', 'locale', 'image', 'image:alt', 'image:type', 'image:width', 'image:height'].map(
      (key) => [key, one(metadataValues(metas, 'property', `og:${key}`), `${path} og:${key}`)],
    ),
  )
  const twitter = Object.fromEntries(
    ['card', 'title', 'description', 'image', 'image:alt', 'image:type'].map((key) => [
      key,
      one(metadataValues(metas, 'name', `twitter:${key}`), `${path} twitter:${key}`),
    ]),
  )

  if (title) {
    const suffix = ' | Oriol Morros Vilaseca'
    expect(
      path === '/'
        ? title === 'Oriol Morros Vilaseca | Software Engineer'
        : title.endsWith(suffix) && title.length > suffix.length,
      `${path}: unexpected title format (${title})`,
    )
  }
  if (language) expect(language === 'en-GB', `${path}: html language must be en-GB`)
  if (description) expect(description.length >= 30, `${path}: description is too short`)
  if (robots) {
    expect(/\bindex\b/.test(robots) && /\bfollow\b/.test(robots), `${path}: not indexable`)
    expect(!/\bnoindex\b/.test(robots), `${path}: contains noindex`)
  }
  if (googlebot) {
    expect(/\bindex\b/.test(googlebot) && /\bfollow\b/.test(googlebot), `${path}: Googlebot is blocked`)
  }
  if (canonical) productionUrl(canonical, `${path} canonical`, path)
  if (describedBy) {
    expect(describedBy === canonicalUrl('/llms.txt'), `${path}: describedby must use canonical llms.txt`)
  }

  if (title && og.title) expect(title === og.title, `${path}: title and og:title differ`)
  if (title && twitter.title) expect(title === twitter.title, `${path}: title and twitter:title differ`)
  if (description && og.description) {
    expect(description === og.description, `${path}: description and og:description differ`)
  }
  if (description && twitter.description) {
    expect(description === twitter.description, `${path}: description and twitter:description differ`)
  }
  if (canonical && og.url) expect(canonical === og.url, `${path}: canonical and og:url differ`)
  if (og.url) productionUrl(og.url, `${path} og:url`, path)
  if (og.type) expect(og.type === expectedOgType(path), `${path}: wrong og:type (${og.type})`)
  if (og.site_name) expect(og.site_name === 'Oriol Morros Vilaseca', `${path}: wrong og:site_name`)
  if (og.locale) expect(og.locale === 'en_GB', `${path}: wrong og:locale`)
  if (twitter.card) expect(twitter.card === 'summary_large_image', `${path}: wrong Twitter card`)

  if (og.image) productionUrl(og.image, `${path} og:image`)
  if (twitter.image) productionUrl(twitter.image, `${path} twitter:image`)
  if (og.image && twitter.image) expect(og.image === twitter.image, `${path}: social images differ`)
  if (og['image:alt'] && twitter['image:alt']) {
    expect(og['image:alt'] === twitter['image:alt'], `${path}: social image alts differ`)
  }
  if (og['image:type']) expect(og['image:type'] === 'image/png', `${path}: OG image is not PNG`)
  if (twitter['image:type']) {
    expect(twitter['image:type'] === 'image/png', `${path}: Twitter image is not PNG`)
  }
  if (og['image:width']) expect(og['image:width'] === '1200', `${path}: OG width is not 1200`)
  if (og['image:height']) expect(og['image:height'] === '630', `${path}: OG height is not 630`)

  if (path.startsWith('/projects/') && og.image) {
    expect(new URL(og.image).pathname === `${path}/opengraph-image`, `${path}: wrong project OG image`)
    const projectTitle = title?.split(' | ')[0]
    if (projectTitle && og['image:alt']) {
      expect(og['image:alt'].includes(projectTitle), `${path}: image alt omits project title`)
    }
  }

  const jsonLd = jsonLdBlocks(html)
  expect(jsonLd.length > 0, `${path}: missing JSON-LD`)
  const parsedJsonLd = []
  jsonLd.forEach((source, index) => {
    try {
      const value = JSON.parse(source)
      expect(value && typeof value === 'object', `${path}: JSON-LD ${index + 1} is not an object`)
      parsedJsonLd.push(value)
    } catch (error) {
      expect(false, `${path}: JSON-LD ${index + 1} is invalid (${error.message})`)
    }
  })
  expect(!/https:\/\/omorros\.com(?:[\/#"']|$)/i.test(jsonLd.join('\n')), `${path}: JSON-LD uses apex host`)
  auditJsonLd(path, parsedJsonLd)

  return { path, title, description, image: og.image }
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length)
  let next = 0
  async function run() {
    while (next < items.length) {
      const index = next++
      results[index] = await worker(items[index])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run))
  return results
}

function auditUniqueMetadata(pages) {
  for (const field of ['title', 'description']) {
    const seen = new Map()
    for (const page of pages.filter(Boolean)) {
      if (!page[field]) continue
      const paths = seen.get(page[field]) || []
      paths.push(page.path)
      seen.set(page[field], paths)
    }
    for (const paths of seen.values()) {
      expect(paths.length === 1, `duplicate ${field} across ${paths.join(', ')}`)
    }
  }
}

async function auditImages(pages) {
  const images = [...new Set(pages.map((page) => page?.image).filter(Boolean))]
  await mapLimit(images, 4, async (image) => {
    const response = await get(mappedCanonicalUrl(image), `social image ${image}`, {
      accept: 'image/png,image/*;q=0.9,*/*;q=0.8',
    })
    if (!response) return
    expect((response.headers.get('content-type') || '').startsWith('image/png'), `${image}: not PNG`)
    const bytes = new Uint8Array(await response.arrayBuffer())
    const isPng =
      bytes.length >= 24 &&
      [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)
    expect(isPng, `${image}: invalid PNG response`)
    if (isPng) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
      expect(view.getUint32(16) === 1200, `${image}: PNG width is not 1200`)
      expect(view.getUint32(20) === 630, `${image}: PNG height is not 630`)
    }
  })
  return images.length
}

function siteUrls(text) {
  return [...text.matchAll(/https?:\/\/[^\s)<>'"]+/gi)]
    .map((match) => match[0].replace(/[.,;:!?]+$/, ''))
    .filter((value) => ['omorros.com', 'www.omorros.com'].includes(new URL(value).hostname))
}

async function auditRobotsAndLlms() {
  const [robotsResponse, llmsResponse] = await Promise.all([
    get(auditUrl('/robots.txt'), 'robots.txt', { accept: 'text/plain,*/*;q=0.8' }),
    get(auditUrl('/llms.txt'), 'llms.txt', { accept: 'text/plain,*/*;q=0.8' }),
  ])

  if (robotsResponse) {
    expect((robotsResponse.headers.get('content-type') || '').startsWith('text/plain'), 'robots.txt: not text/plain')
    const text = await robotsResponse.text()
    const sitemaps = [...text.matchAll(/^\s*sitemap\s*:\s*(\S+)\s*$/gim)].map((match) => match[1])
    const sitemap = one(sitemaps, 'robots.txt Sitemap')
    if (sitemap) expect(sitemap === canonicalUrl('/sitemap.xml'), 'robots.txt: wrong Sitemap URL')
    expect(/^\s*user-agent\s*:\s*\*\s*$/im.test(text), 'robots.txt: missing wildcard user-agent')
    expect(/^\s*allow\s*:\s*\/\s*$/im.test(text), 'robots.txt: missing Allow: /')
    const hosts = [...text.matchAll(/^\s*host\s*:\s*(\S+)\s*$/gim)].map((match) => match[1])
    const host = one(hosts, 'robots.txt Host')
    if (host) expect(host === CANONICAL_ORIGIN, 'robots.txt: wrong Host URL')
    siteUrls(text).forEach((url) => productionUrl(url, 'robots.txt internal URL'))
  }

  if (llmsResponse) {
    expect((llmsResponse.headers.get('content-type') || '').startsWith('text/plain'), 'llms.txt: not text/plain')
    const text = await llmsResponse.text()
    expect(text.trim() !== '', 'llms.txt: empty')
    const urls = siteUrls(text)
    expect(urls.length > 0, 'llms.txt: no site URLs')
    urls.forEach((url) => productionUrl(url, 'llms.txt internal URL'))
    expect(!/https:\/\/omorros\.com(?:[\/#"']|$)/i.test(text), 'llms.txt: uses apex host')

    const lines = text.split(/\r?\n/)
    expect(lines.find((line) => line.trim())?.startsWith('# '), 'llms.txt: missing H1')
    expect(lines.some((line) => line.startsWith('> ')), 'llms.txt: missing summary blockquote')
    const headings = lines
      .map((line, index) => ({ line, index }))
      .filter(({ line }) => line.startsWith('## '))
    expect(headings.length > 0, 'llms.txt: missing H2 link sections')
    headings.forEach(({ line, index }, headingIndex) => {
      const end = headings[headingIndex + 1]?.index ?? lines.length
      const entries = lines.slice(index + 1, end).filter((entry) => entry.trim())
      expect(entries.length > 0, `llms.txt: ${line} is empty`)
      expect(
        entries.every((entry) => /^- \[[^\]]+\]\([^)]+\)(?:: .+)?$/.test(entry)),
        `llms.txt: ${line} must contain only Markdown link entries`,
      )
    })
  }
}

async function auditCrawlers() {
  await mapLimit(Object.entries(CRAWLERS), 4, async ([name, userAgent]) => {
    const response = await get(auditUrl('/'), `crawler ${name}`, {
      accept: 'text/html,*/*;q=0.8',
      'user-agent': userAgent,
    })
    if (!response) return
    expect((response.headers.get('content-type') || '').includes('text/html'), `crawler ${name}: not HTML`)
    const html = await response.text()
    const crawlerCanonical = linksByRel(tags(html, 'link'), 'canonical')[0]?.href
    expect(
      crawlerCanonical && new URL(crawlerCanonical).toString() === canonicalUrl('/'),
      `crawler ${name}: canonical metadata is missing`,
    )
    expect(html.includes('Eli by Techbible'), `crawler ${name}: current role is missing`)
  })
}

async function auditNotFoundRoutes() {
  await mapLimit(
    ['/metadata-audit-missing', '/projects/metadata-audit-missing'],
    2,
    async (path) => {
      const response = await get(
        auditUrl(path),
        `${path} not found`,
        { accept: 'text/html,*/*;q=0.8' },
        404,
      )
      if (!response) return
      const html = await response.text()
      const metas = tags(html, 'meta')
      const links = tags(html, 'link')
      const robots = one(
        metadataValues(metas, 'name', 'robots'),
        `${path} not-found robots`,
      )
      if (robots) expect(/\bnoindex\b/.test(robots), `${path}: 404 must be noindex`)
      expect(
        linksByRel(links, 'canonical').length === 0,
        `${path}: 404 must not emit a canonical`,
      )
    },
  )
}

async function auditHiddenRoutes() {
  const path = '/journal/travel'
  const response = await get(auditUrl(path), `${path} hidden page`, {
    accept: 'text/html,*/*;q=0.8',
  })
  if (!response) return

  const html = await response.text()
  const metas = tags(html, 'meta')
  const links = tags(html, 'link')
  const robots = one(
    metadataValues(metas, 'name', 'robots'),
    `${path} hidden-page robots`,
  )

  if (robots) {
    expect(/\bnoindex\b/.test(robots), `${path}: hidden page must be noindex`)
    expect(/\bnofollow\b/.test(robots), `${path}: hidden page must be nofollow`)
  }
  expect(
    linksByRel(links, 'canonical').length === 0,
    `${path}: hidden page must not emit a canonical`,
  )
  expect(
    !jsonLdBlocks(html).join('\n').includes(`${canonicalUrl(path)}#webpage`),
    `${path}: hidden page must not publish page-level JSON-LD`,
  )
}

async function main() {
  console.log(`Metadata audit target: ${auditBase}`)
  console.log(`Canonical origin: ${CANONICAL_ORIGIN}`)

  await auditSitemap()
  const pages = await mapLimit(EXPECTED_PATHS, 4, auditPage)
  auditUniqueMetadata(pages)
  const imageCount = await auditImages(pages)
  await Promise.all([
    auditRobotsAndLlms(),
    auditCrawlers(),
    auditNotFoundRoutes(),
    auditHiddenRoutes(),
  ])

  if (failures.length) {
    console.error(`\nMetadata audit failed with ${failures.length} issue(s):`)
    failures.forEach((failure) => console.error(`- ${failure}`))
    console.error(`\n${checks} checks completed.`)
    process.exitCode = 1
  } else {
    console.log(
      `Metadata audit passed: ${EXPECTED_PATHS.length} public pages, 1 hidden page, ${imageCount} social images, ${checks} checks.`,
    )
  }
}

main().catch((error) => {
  console.error(`Metadata audit crashed:\n${error.stack || error}`)
  process.exitCode = 1
})
