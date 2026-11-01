# AGENTHESIS

An open-source, editorial research journal for **agentic AI**, at [agenthesis.tech](https://agenthesis.tech).

## Principles

- Explain ideas and mechanisms, not just abstracts.
- Cite primary research and label publication dates.
- Be skeptical about baseline quality, cost matching, and reproducibility.
- Admit uncertainty. Never fabricate novelty or inflate results.
- Publish daily **when something merits publication**, not to meet a quota.
- Explore adjacent AI and computer science only when the result is exceptional.

## Development

Node 20+ is required.

```bash
npm ci
npm run dev
npm run build
```

Edit `src/data/papers.ts` to add and revise research articles. Each article automatically appears on the homepage, the topics index, and its dedicated analysis page. Publication dates describe this journal's releases; `paperDate` describes the paper's publication.

## Website deployment

The website is statically built with Astro and deployed to GitHub Pages through `.github/workflows/deploy.yml`. GitHub repository Settings → Pages must use **GitHub Actions** as the deployment source. The custom domain is `agenthesis.tech`.

Configure registrar DNS:
- Four apex A records at `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Optional `www` CNAME to `omair-asdaq.github.io`
- No wildcard records.
- Verify domain ownership in GitHub Pages settings and enable HTTPS when offered.

The public project does not include API keys, scraping jobs, or unreviewed automatic publishing. Contributor PRs can suggest papers and corrections.

## Attribution

Individual research articles link directly to their authors' papers. Summaries reflect the journal's interpretation of reported findings; they are not independent replications. Issue drafts were derived from publicly linked research reviews, not proprietary material.

## License

MIT for the website code. Editorial content is licensed under CC BY 4.0 unless otherwise stated; links and citations remain with the original authors.
