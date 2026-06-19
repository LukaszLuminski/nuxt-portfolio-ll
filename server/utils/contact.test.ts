import { describe, expect, it } from 'vitest'
import { validateContactPayload } from './contact'

const validPayload = {
  name: 'Lukasz',
  email: 'lukasz@example.com',
  subject: 'Nuxt project',
  message: 'I would like to talk about a new Nuxt frontend project.',
  company: '',
  elapsedMs: 2000
}

describe('validateContactPayload', () => {
  it('accepts a valid contact payload', () => {
    const result = validateContactPayload(validPayload)

    expect(result.errors).toEqual([])
    expect(result.isSpam).toBe(false)
    expect(result.data).toEqual(validPayload)
  })

  it('rejects invalid required fields', () => {
    const result = validateContactPayload({
      name: 'L',
      email: 'not-an-email',
      subject: '',
      message: 'Too short',
      elapsedMs: 2000
    })

    expect(result.data).toBeNull()
    expect(result.errors).toEqual([
      'Name must be between 2 and 80 characters.',
      'Email must be a valid email address.',
      'Subject must be between 3 and 120 characters.',
      'Message must be between 20 and 4000 characters.'
    ])
  })

  it('flags honeypot and too-fast submissions as spam', () => {
    expect(
      validateContactPayload({ ...validPayload, company: 'bot' }).isSpam
    ).toBe(true)
    expect(
      validateContactPayload({ ...validPayload, elapsedMs: 300 }).isSpam
    ).toBe(true)
  })
})
