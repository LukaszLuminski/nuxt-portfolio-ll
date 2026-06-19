import { contactFieldConstraints, type ContactPayload } from '~/shared/contact'

export type { ContactPayload } from '~/shared/contact'

export interface ContactValidationResult {
  data: ContactPayload | null
  errors: string[]
  isSpam: boolean
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const minimumSubmitTimeMs = 1200

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function getElapsedMs(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

export function validateContactPayload(
  input: unknown
): ContactValidationResult {
  const source = isRecord(input) ? input : {}
  const { company, elapsedMs, email, message, name, subject } = source
  const data: ContactPayload = {
    name: normalize(name),
    email: normalize(email),
    subject: normalize(subject),
    message: normalize(message),
    company: normalize(company),
    elapsedMs: getElapsedMs(elapsedMs)
  }
  const errors: string[] = []
  const isSpam =
    Boolean(data.company) ||
    (typeof data.elapsedMs === 'number' && data.elapsedMs < minimumSubmitTimeMs)

  const {
    name: nameLimits,
    email: emailLimits,
    subject: subjectLimits,
    message: messageLimits
  } = contactFieldConstraints

  if (data.name.length < nameLimits.min || data.name.length > nameLimits.max) {
    errors.push(
      `Name must be between ${nameLimits.min} and ${nameLimits.max} characters.`
    )
  }

  if (!emailPattern.test(data.email) || data.email.length > emailLimits.max) {
    errors.push('Email must be a valid email address.')
  }

  if (
    data.subject.length < subjectLimits.min ||
    data.subject.length > subjectLimits.max
  ) {
    errors.push(
      `Subject must be between ${subjectLimits.min} and ${subjectLimits.max} characters.`
    )
  }

  if (
    data.message.length < messageLimits.min ||
    data.message.length > messageLimits.max
  ) {
    errors.push(
      `Message must be between ${messageLimits.min} and ${messageLimits.max} characters.`
    )
  }

  return {
    data: errors.length > 0 || isSpam ? null : data,
    errors,
    isSpam
  }
}

export async function deliverContactMessage(payload: ContactPayload) {
  const { contactFromEmail, contactToEmail, resendApiKey } = useRuntimeConfig()

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return {
      delivered: false,
      reason: 'Contact email delivery is not configured.'
    }
  }

  const { email, message, name, subject } = payload

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: email,
      subject: `Portfolio contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        message
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
