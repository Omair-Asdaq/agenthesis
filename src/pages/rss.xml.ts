import type { APIRoute } from 'astro';
import {latestPapers} from '../data/papers';
const xmlEscape = (s:string) => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
export const GET:APIRoute = () => {
  const items=latestPapers.map(p=>[
    '<item>',
    '<title>'+xmlEscape(p.title)+'</title>',
    '<link>https://agenthesis.tech/research/'+encodeURIComponent(p.slug)+'</link>',
    '<guid isPermaLink="true">https://agenthesis.tech/research/'+encodeURIComponent(p.slug)+'</guid>',
    '<pubDate>'+new Date(p.publishedOn+'T12:00:00Z').toUTCString()+'</pubDate>',
    '<description>'+xmlEscape(p.subtitle)+'</description>',
    '<category>'+xmlEscape(p.category)+'</category>',
    '</item>'
  ].join('')).join('');
  const xml='<?xml version="1.0" encoding="UTF-8"?>'+
  '<rss version="2.0"><channel><title>AGENTHESIS — Agentic AI Research</title><link>https://agenthesis.tech</link><description>Research into intelligence that acts.</description><language>en</language>'+items+'</channel></rss>';
  return new Response(xml,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
