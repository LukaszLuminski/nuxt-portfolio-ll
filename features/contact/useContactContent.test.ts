import { describe, expect, it } from 'vitest'
import { createContactContent } from './useContactContent'

describe('useContactContent', () => {
  it('provides the homepage contact section copy and links', () => {
    const contact = createContactContent()

    expect(contact.eyebrow).toBe('Contact')
    expect(contact.title).toBe("Let's talk")
    expect(contact.formLabel).toBe('Send a message')
    expect(contact.linksLabel).toBe('Elsewhere')
    expect(contact.submitLabel).toBe('Send message')
    expect(contact.links).toEqual([
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
    ])
  })
})
