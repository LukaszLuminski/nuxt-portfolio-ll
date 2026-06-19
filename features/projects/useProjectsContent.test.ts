import { describe, expect, it } from 'vitest'
import { createProjectsContent } from './useProjectsContent'

describe('useProjectsContent', () => {
  it('provides section copy and groups for CMS-managed projects', () => {
    const { eyebrow, groups, intro, title } = createProjectsContent()

    expect(eyebrow).toBe('Portfolio')
    expect(title).toBe('Selected work')
    expect(intro).toContain('frontend skills')
    expect(groups).toEqual({
      client: 'Client work',
      technical: 'Technical projects',
      archive: 'Earlier experiments'
    })
  })
})
