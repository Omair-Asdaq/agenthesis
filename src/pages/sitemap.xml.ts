import type { APIRoute } from 'astro';
import { papers } from '../data/papers';

const base = 'https://agenthesis.tech';
const fixedPages = ['/', '/about', '/topics'];
const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
       .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const GET: APIRoute = () => {
  const staticUrls = fixedPages.map(path => ({ loc: base + path }));
  const articleUrls = papers.map(paper => ({
    loc: base + '/research/' + encodeURIComponent(paper.slug),
    lastmod: paper.publishedOn,
  }));
  const entries = [...staticUrls, ...articleUrls].map(entry =>
    '  <url>\n' +
    '    <loc>' + escapeXml(entry.loc) + '</loc>\n' +
    ('lastmod' in entry && entry.lastmod
      ? '    <lastmod>' + entry.lastmod + '</lastmod>\n'
      : '') +
    '  </url>'
  ).join('\n');
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries + '\n</urlset>\n';
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
