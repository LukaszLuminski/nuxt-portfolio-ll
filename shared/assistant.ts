export const assistantConstraints = {
  message: { min: 2, max: 500 },
  history: { maxItems: 8, maxContentLength: 1200 }
} as const

export type AssistantRole = 'user' | 'assistant'

export interface AssistantHistoryItem {
  role: AssistantRole
  content: string
}

export interface AssistantRequest {
  message: string
  history?: AssistantHistoryItem[]
}

export interface AssistantSource {
  id: string
  label: string
  href: string
}

export interface AssistantResponse {
  answer: string
  sources: AssistantSource[]
}
