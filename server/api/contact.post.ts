export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data, errors, isSpam } = validateContactPayload(body)

  if (isSpam) {
    return { ok: true }
  }

  if (!data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid contact form submission.',
      data: { errors }
    })
  }

  const delivery = await deliverContactMessage(data)

  if (!delivery.delivered) {
    throw createError({
      statusCode: 503,
      statusMessage: delivery.reason ?? 'Contact email delivery failed.'
    })
  }

  return { ok: true }
})
