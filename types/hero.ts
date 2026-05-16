export interface HeroMetric {
  value: string
  label: string
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
  metrics: HeroMetric[]
  technologies: string[]
}
