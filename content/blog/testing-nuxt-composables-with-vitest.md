---
title: Testing Nuxt composables without making tests noisy
description: A practical note on keeping composable tests focused, especially for UI behaviour that depends on browser APIs.
slug: testing-nuxt-composables-with-vitest
publishedAt: 2026-06-18
updatedAt:
draft: false
tags:
  - Vitest
  - Nuxt
  - Testing
readingTime: 4 min read
image:
  src: /images/projects/portfolio.webp
  alt: Portfolio project interface preview
---

## Test behaviour, not framework trivia

Composable tests are most useful when they describe the behaviour the UI depends on. If a composable stores scroll state, calculates a visual effect, or groups content for rendering, the test should make those expectations obvious.

The goal is not to recreate Nuxt in the test suite. The goal is to keep enough of the surrounding environment to verify the contract: given this input or browser state, the composable returns this output or performs this side effect.

## Keep setup boring

Good tests usually have plain setup. For browser-dependent composables, I prefer a small number of explicit mocks over a large shared helper that hides too much. If a test needs `window.scrollY`, `localStorage`, or a DOM element, the setup should be visible near the assertion.

That makes failures easier to read. It also helps future changes, because the next person can see which browser behaviour the composable actually relies on.

## Small utilities deserve tests too

Not every tested unit needs to be a component. Utilities like grouping content, preserving return position, or validating content shape can carry a surprising amount of user-facing behaviour. Testing them directly keeps component tests lighter and makes regressions easier to locate.

For a portfolio, that is enough. I do not need a huge test suite, but I do want focused coverage around the behaviour that keeps navigation, content, and interaction details reliable.
