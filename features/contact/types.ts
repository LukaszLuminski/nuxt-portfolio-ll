export interface ContactLink {
  label: string
  href: string
  value: string
  type: 'github' | 'linkedin'
}

export interface ContactContent {
  eyebrow: string
  title: string
  intro: string
  formLabel: string
  linksLabel: string
  submitLabel: string
  successMessage: string
  errorMessage: string
  links: ContactLink[]
}
