# NOPE Documentation

Comprehensive API documentation site for [NOPE](https://nope.net) - a safety layer for chat platforms and LLMs that detects mental health and safeguarding risks in real-time.

**Production URL:** https://docs.nope.net

## About NOPE

NOPE provides LLM-based risk classification for text conversations, detecting:
- Self-harm and suicide risk
- Violence and threats to others
- Child/vulnerable person abuse
- Victimization and domestic violence

Using a two-stage architecture (fast filter + comprehensive assessment), NOPE achieves 99%+ accuracy at production-ready cost (<$0.01/message) and latency (<2s).

## About This Site

This SvelteKit-based documentation site provides comprehensive reference material for developers integrating with the NOPE API. It covers REST API endpoints, SDK usage, the complete risk taxonomy, and clinical framework mappings.

## Features

- **Getting Started** guides (Introduction, Quick Start, Authentication)
- **Complete API Reference** (evaluate, safe, webhooks, errors)
- **SDK documentation** (Python, Node.js)
- **Full taxonomy reference** (domains, severity, features, protective factors, legal flags, clinical frameworks)

## Tech Stack

- **SvelteKit 5** with Svelte 5 runes syntax
- **Tailwind CSS 4** with `@import 'tailwindcss'`
- **Netlify** adapter for deployment
- **Static site** - no database or authentication required

## Environment Variables

No environment variables required. This is a fully static documentation site with no external dependencies.

## Development

```sh
pnpm install
pnpm dev    # http://localhost:5176
```

## Building

```sh
pnpm build
pnpm preview
```

## Routes

### Getting Started
- `/` - Introduction
- `/quickstart` - Quick Start guide
- `/authentication` - API key setup

### API Reference
- `/api` - Overview
- `/api/evaluate` - Evaluate endpoint
- `/api/safe` - Safe endpoint
- `/api/webhooks` - Webhooks
- `/api/errors` - Error handling & rate limits

### SDKs
- `/sdk/python` - Python SDK
- `/sdk/node` - Node.js SDK

### Taxonomy
- `/taxonomy` - Overview
- `/taxonomy/domains` - Risk domains
- `/taxonomy/severity` - Severity & imminence
- `/taxonomy/features` - Risk features
- `/taxonomy/protective` - Protective factors
- `/taxonomy/legal` - Legal & safeguarding flags
- `/taxonomy/frameworks` - Clinical frameworks

## Deployment

Built for Netlify with the `@sveltejs/adapter-netlify` adapter.

**Deploy to Netlify:**
1. Connect GitHub repo to Netlify
2. Build command: `pnpm build`
3. Publish directory: `build`
4. Set custom domain: `docs.nope.net`

## Related Services

Part of the NOPE ecosystem:

| Service | URL | Purpose |
|---------|-----|---------|
| API | https://api.nope.net | Core classification API |
| Dashboard | https://dashboard.nope.net | User authentication & API key management |
| Website | https://nope.net | Marketing site with interactive demos |
| **Docs** | **https://docs.nope.net** | **Comprehensive API documentation (this site)** |
| Suites | https://suites.nope.net | Test transparency dashboard |
| Status | https://status.nope.net | Health check page |

**GitHub Organization:** https://github.com/nope-net

## Content Management

All documentation content is in Svelte components located in `src/routes/`. To update documentation:

1. Edit the relevant `+page.svelte` file
2. Use prose styling with `<div class="prose">` wrapper
3. Test locally with `pnpm dev`
4. Commit and push - Netlify will automatically deploy

**Content Structure:**
- **Getting Started:** `/src/routes/+page.svelte`, `/quickstart/`, `/authentication/`
- **API Reference:** `/src/routes/api/` directory
- **SDK Docs:** `/src/routes/sdk/` directory
- **Taxonomy:** `/src/routes/taxonomy/` directory

## License

Part of the NOPE project. See main repository for license details.
