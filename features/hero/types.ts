export interface HeroMetric {
  value: string
  label: string
}

export interface HeroLink {
  label: string
  href: string
}

export interface HeroSocialLink extends HeroLink {
  type: 'github' | 'linkedin'
}

export interface HeroContent {
  brandLabel: string
  name: string
  accentedName: string
  introLabel: string
  nav: readonly HeroLink[]
  social: readonly HeroSocialLink[]
  headline: string
  subheadline: string
  positioning: string
  primaryCta: string
  secondaryCta: string
  resumeCta: string
  resumeHref: string
  metrics: readonly HeroMetric[]
  technologies: readonly string[]
}
