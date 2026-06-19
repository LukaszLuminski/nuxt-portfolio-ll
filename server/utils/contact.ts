export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  company?: string
  elapsedMs?: number
}

export interface ContactValidationResult {
  data: ContactPayload | null
  errors: string[]
  isSpam: boolean
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const minimumSubmitTimeMs = 1200

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function getElapsedMs(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

export function validateContactPayload(input: unknown): ContactValidationResult {
  const source = typeof input === 'object' && input !== null
    ? input as Record<string, unknown>
    : {}
  const data: ContactPayload = {
    name: normalize(source.name),
    email: normalize(source.email),
    subject: normalize(source.subject),
    message: normalize(source.message),
    company: normalize(source.company),
    elapsedMs: getElapsedMs(source.elapsedMs)
  }
  const errors: string[] = []
  const isSpam = Boolean(data.company) ||
    (typeof data.elapsedMs === 'number' && data.elapsedMs < minimumSubmitTimeMs)

  if (data.name.length < 2 || data.name.length > 80) {
    errors.push('Name must be between 2 and 80 characters.')
  }

  if (!emailPattern.test(data.email) || data.email.length > 120) {
    errors.push('Email must be a valid email address.')
  }

  if (data.subject.length < 3 || data.subject.length > 120) {
    errors.push('Subject must be between 3 and 120 characters.')
  }

  if (data.message.length < 20 || data.message.length > 4000) {
    errors.push('Message must be between 20 and 4000 characters.')
  }

  return {
    data: errors.length || isSpam ? null : data,
    errors,
    isSpam
  }
}

export async function deliverContactMessage(payload: ContactPayload) {
  const config = useRuntimeConfig()
  const resendApiKey = String(config.resendApiKey || '')
  const contactToEmail = String(config.contactToEmail || '')
  const contactFromEmail = String(config.contactFromEmail || '')

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return {
      delivered: false,
      reason: 'Contact email delivery is not configured.'
    }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: payload.email,
      subject: `Portfolio contact: ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        '',
        payload.message
      ].join('\n')
    })
  })

  if (response.ok) {
    return {
      delivered: true,
      reason: null
    }
  }

  return {
    delivered: false,
    reason: 'Contact email delivery failed.'
  }
}
