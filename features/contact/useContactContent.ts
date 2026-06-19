import type { ContactContent } from './types'

const contactContent: ContactContent = {
  eyebrow: 'Contact',
  title: "Let's talk",
  intro:
    "Tell me a little about the project or role, and I'll get back to you as soon as I can.",
  formLabel: 'Send a message',
  linksLabel: 'Elsewhere',
  submitLabel: 'Send message',
  successMessage: 'Thanks, your message has been sent.',
  errorMessage: 'Something went wrong. Please try again or use one of the links below.',
  links: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/lukasz-luminski',
      value: 'linkedin.com/in/lukasz-luminski',
      type: 'linkedin'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/LukaszLuminski',
      value: 'github.com/LukaszLuminski',
      type: 'github'
    }
  ]
}

export function createContactContent(): ContactContent {
  return contactContent
}

export function useContactContent(): ContactContent {
  return createContactContent()
}
