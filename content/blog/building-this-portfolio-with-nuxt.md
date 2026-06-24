---
title: Building a portfolio that behaves like a small product
description: How I think about portfolio architecture, content modelling, and interaction polish in a Nuxt site.
slug: building-this-portfolio-with-nuxt
publishedAt: 2026-06-24
updatedAt:
draft: false
tags:
  - Nuxt
  - Architecture
  - Portfolio
readingTime: 5 min read
image:
  src: /images/legacy-hero-bg.jpg
  alt: Abstract dark portfolio hero background
---

## The portfolio is part of the work

A portfolio can be more than a gallery of finished screens. I like treating it as a small product: it has routing, content contracts, loading states, SEO, accessibility concerns, and enough interaction detail to show how the whole system behaves.

That changes the technical decisions. Instead of hardcoding every project card directly into a page, project data belongs in content files with a validation layer. It keeps the visual components focused on rendering, while the content model becomes easier to extend when a new case study or blog post appears.

## Content should have a contract

Project entries need predictable fields: title, slug, summary, stack, highlights, links, images, and the notes that appear on detail pages. A schema gives those fields a real shape. It also makes mistakes visible early, before a missing image alt or malformed link becomes a production issue.

For a portfolio, that matters because the content is part of the interface. A broken content item is not just a copy problem; it can break navigation, metadata, sitemap generation, and the impression the site gives to someone reviewing the work.

## Keep the first release focused

It is tempting to add everything at once: localization, a CMS, a blog, advanced filtering, search, and a tagging system. I prefer a smaller first release:

- structured project content
- a blog listing
- article pages
- clean metadata
- sitemap coverage
- a draft path that stays out of the public repo

That gives the site a stronger foundation without turning the portfolio into a maintenance project.

## Polish is cumulative

The details add up: stable card dimensions, visible focus states, useful alt text, canonical URLs, route-aware navigation, and pages that still make sense when JavaScript is slow. None of those things are dramatic on their own, but together they make the site feel considered.

That is the signal I want this portfolio to send: not just that I can build a good-looking interface, but that I can keep the underlying system understandable as it grows.
