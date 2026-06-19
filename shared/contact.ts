export const contactFieldConstraints = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 4000 }
} as const

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  company?: string
  elapsedMs?: number
}
