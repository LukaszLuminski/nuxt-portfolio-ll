import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      source: 'projects/*.yml',
      type: 'data',
      schema: z.object({
        title: z.string(),
        order: z.number(),
        group: z.enum(['client', 'technical', 'archive']),
        summary: z.string(),
        stack: z.array(z.string()),
        links: z.array(
          z.object({
            label: z.string(),
            href: z.string().url(),
            type: z.enum(['live', 'code'])
          })
        )
      })
    })
  }
})
