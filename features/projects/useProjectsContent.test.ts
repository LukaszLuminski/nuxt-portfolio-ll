import { describe, expect, it } from 'vitest'
import { createProjectsContent } from './useProjectsContent'

describe('useProjectsContent', () => {
  it('provides section copy and groups for CMS-managed projects', () => {
    const { eyebrow, groups, intro, title } = createProjectsContent()

    expect(eyebrow).toBe('Selected work')
    expect(title).toBe('Projects with real delivery context')
    expect(intro).toContain('existing portfolio projects')
    expect(groups).toEqual({
      client: 'Client work',
      technical: 'Technical projects',
      archive: 'Earlier experiments'
    })
  })
})
