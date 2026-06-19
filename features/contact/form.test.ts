import { describe, expect, it } from 'vitest'
import { createContactSubmission, createInitialContactForm } from './form'

describe('contact form helpers', () => {
  it('creates a fresh empty form with its start time', () => {
    expect(createInitialContactForm(1000)).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
      startedAt: 1000
    })
  })

  it('builds the API payload without leaking internal form state', () => {
    const form = {
      ...createInitialContactForm(1000),
      name: 'Lukasz',
      email: 'lukasz@example.com',
      subject: 'Project enquiry',
      message: 'I would like to discuss a frontend project.'
    }

    expect(createContactSubmission(form, 2750)).toEqual({
      name: 'Lukasz',
      email: 'lukasz@example.com',
      subject: 'Project enquiry',
      message: 'I would like to discuss a frontend project.',
      company: '',
      elapsedMs: 1750
    })
  })
})
