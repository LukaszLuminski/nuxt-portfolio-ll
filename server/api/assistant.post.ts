import type { H3Event } from 'h3'

const requestWindowMs = 5 * 60 * 1000
const requestLimit = 10
const requestLog = new Map<string, number[]>()

function enforceRateLimit(event: H3Event) {
  const now = Date.now()
  const address = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const recentRequests = (requestLog.get(address) ?? []).filter(
    (timestamp) => now - timestamp < requestWindowMs
  )

  if (recentRequests.length >= requestLimit) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many assistant requests. Please try again shortly.'
    })
  }

  recentRequests.push(now)
  requestLog.set(address, recentRequests)
}

export default defineEventHandler(async (event) => {
  enforceRateLimit(event)

  const body = await readBody(event)
  const { data, errors } = validateAssistantRequest(body)

  if (!data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid assistant request.',
      data: { errors }
    })
  }

  const { openaiApiKey, openaiModel } = useRuntimeConfig(event)

  if (!openaiApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'The portfolio assistant is not configured.'
    })
  }

  const projects = await readBundledProjects()

  try {
    const answer = await requestAssistantAnswer(
      data,
      projects,
      openaiApiKey,
      openaiModel
    )

    return {
      answer,
      sources: selectAssistantSources(data.message, projects)
    }
  } catch (error) {
    console.error('Portfolio assistant request failed.', error)

    throw createError({
      statusCode: 502,
      statusMessage: 'The portfolio assistant could not answer right now.'
    })
  }
})
