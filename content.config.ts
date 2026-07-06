import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const projectGroup = z.enum(['client', 'technical'])
const projectLinkType = z.enum(['live', 'code'])

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1)
})

const projectCaseStudySchema = z.object({
  timeline: z.string().min(1),
  status: z.string().min(1),
  challenge: z.array(z.string().min(1)).min(1),
  approach: z.array(z.string().min(1)).min(1),
  outcomes: z.array(z.string().min(1)).min(1),
  lessons: z.array(z.string().min(1)).min(1)
})

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        order: z.number(),
        group: projectGroup,
        summary: z.string().min(1),
        image: z.string().min(1),
        imageAlt: z.string().min(1),
        stack: z.array(z.string().min(1)),
        highlights: z.array(z.string().min(1)),
        details: z.array(z.string().min(1)),
        frontEnd: z.string().nullable().optional(),
        backEnd: z.string().nullable().optional(),
        database: z.string().nullable().optional(),
        caseStudy: projectCaseStudySchema.nullable().optional(),
        links: z.array(
          z.object({
            label: z.string().min(1),
            href: z.string().min(1),
            type: projectLinkType
          })
        )
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        slug: z.string().min(1),
        publishedAt: z.string().min(1),
        updatedAt: z.string().nullable().optional(),
        draft: z.boolean().default(false),
        tags: z.array(z.string().min(1)).default([]),
        readingTime: z.string().min(1),
        image: imageSchema
      })
    })
  }
})
