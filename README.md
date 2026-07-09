# Lukasz Luminski Portfolio

A personal portfolio built with Nuxt, Vue, TypeScript, Tailwind CSS, and Nuxt Content. The site presents selected frontend projects, a skills-focused homepage, project case-study pages, an optional blog, a contact form, and an OpenAI-powered portfolio assistant.

## Highlights

- Responsive Nuxt portfolio with a dark, polished interface.
- Content-driven project data stored as YAML in `content/projects`.
- Optional blog powered by Nuxt Content markdown files in `content/blog`.
- Project detail pages with stack, highlights, links, and case-study sections.
- Contact form with validation, spam handling, and Resend email delivery.
- Portfolio assistant API that can answer questions using bundled project context.
- SEO basics including canonical host middleware, robots headers, favicon set, sitemap, and `robots.txt`.
- Unit tests for composables, utilities, server helpers, content, and UI behavior.

## Tech Stack

- [Nuxt](https://nuxt.com/) 4
- [Vue](https://vuejs.org/) 3
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nuxt Content](https://content.nuxt.com/)
- [Vitest](https://vitest.dev/)
- [Lucide Vue](https://lucide.dev/)
- [Zod](https://zod.dev/)
- [Resend](https://resend.com/) for contact email delivery

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
pnpm dev
```

The app runs at `http://127.0.0.1:3000` by default.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values you need.

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Public production URL used for canonical URLs and sitemap output. |
| `NUXT_PUBLIC_ALLOW_INDEXING` | Controls `robots` headers. Set to `false` for preview or staging environments. |
| `NUXT_PUBLIC_BLOG_ENABLED` | Enables the blog index, blog detail pages, and blog URLs in the sitemap. |
| `VERCEL_ENV` | Used as a fallback signal for production indexing behavior. |
| `OPENAI_API_KEY` | Enables the portfolio assistant API. Without it, assistant requests return a configuration error. |
| `OPENAI_MODEL` | Model used by the portfolio assistant. |
| `RESEND_API_KEY` | Enables contact form email delivery through Resend. |
| `CONTACT_TO_EMAIL` | Recipient address for contact form submissions. |
| `CONTACT_FROM_EMAIL` | Sender address used for contact form submissions. |

## Project Structure

```text
app/                 Nuxt app-level configuration
assets/              Global styles, fonts, and other build assets
components/          Shared Vue components
composables/         Reusable Vue composables
content/             Nuxt Content data for projects and blog posts
docs/                Project planning and information architecture notes
features/            Feature-oriented sections and UI modules
layouts/             Nuxt layouts
pages/               Route pages
public/              Static assets served from the site root
server/              API routes, middleware, and server utilities
shared/              Shared types and validation constraints
tests/               Test setup
utils/               Framework-agnostic helpers
```

## Content Editing

Project entries live in `content/projects/*.yml`. Their schema is defined in `content.config.ts` and includes:

- title, slug, order, and group
- summary, image, image alt text, stack, highlights, and details
- optional frontend, backend, database, and case-study fields
- live or code links

Blog posts live in `content/blog/*.md`. The blog is hidden unless `NUXT_PUBLIC_BLOG_ENABLED=true`, which also adds blog URLs to the sitemap.

Homepage section copy is organized by feature in `features/*/content.ts`, keeping content close to the section that renders it.

## Available Scripts

```bash
pnpm dev           # Start local development server
pnpm build         # Build for production
pnpm generate      # Generate a static version
pnpm preview       # Preview the production build
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix lint issues where possible
pnpm format        # Format files with Prettier
pnpm format:check  # Check formatting
pnpm test          # Run Vitest in watch mode
pnpm test:unit     # Run unit tests once
pnpm typecheck     # Run Nuxt type checking
```

## Quality Checks

Before shipping changes, run:

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
```

For formatting-only checks:

```bash
pnpm format:check
```

## Deployment Notes

The app is configured for production at `https://lukaszluminski.dev`. Update `NUXT_PUBLIC_SITE_URL` if deploying elsewhere.

Indexing is enabled by default in production and can be explicitly controlled with `NUXT_PUBLIC_ALLOW_INDEXING`. The blog is opt-in through `NUXT_PUBLIC_BLOG_ENABLED`, so unpublished blog work can remain hidden while project pages and the homepage stay public.

Static assets in `public/images/**` are served with long-lived immutable cache headers.
