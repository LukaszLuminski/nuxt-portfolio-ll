import type { ContactPayload } from '~/shared/contact'

export interface ContactFormState extends Required<
  Omit<ContactPayload, 'elapsedMs'>
> {
  startedAt: number
}

export function createInitialContactForm(
  startedAt = Date.now()
): ContactFormState {
  return {
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    startedAt
  }
}

export function createContactSubmission(
  form: ContactFormState,
  submittedAt = Date.now()
): ContactPayload {
  const { startedAt, ...payload } = form

  return {
    ...payload,
    elapsedMs: submittedAt - startedAt
  }
}
