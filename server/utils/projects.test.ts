import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseProject, readProjects } from './projects'

const projectsDirectory = join(process.cwd(), 'content', 'projects')

const validProject = {
  title: 'Example project',
  slug: 'example-project',
  order: 10,
  group: 'technical',
  summary: 'An example project used to verify the content contract.',
  image: '/images/projects/example.jpg',
  imageAlt: 'Example project interface',
  stack: ['Vue'],
  highlights: ['Typed content'],
  details: ['A useful project detail.'],
  frontEnd: 'Vue',
  backEnd: null,
  database: null,
  caseStudy: null,
  links: [{ label: 'Code', href: 'https://example.com', type: 'code' }]
}

describe('project content', () => {
  it('validates and returns a project document', () => {
    expect(parseProject(validProject, 'example.yml')).toEqual(validProject)
  })

  it('reports the filename when project content is invalid', () => {
    expect(() =>
      parseProject({ ...validProject, group: 'unknown' }, 'broken.yml')
    ).toThrow('Invalid project content in broken.yml')
  })

  it.each([
    ['stack', ['Vue', 3]],
    [
      'links',
      [{ label: 'Code', href: 'https://example.com', type: 'download' }]
    ]
  ])('rejects malformed %s data', (field, value) => {
    expect(() =>
      parseProject({ ...validProject, [field]: value }, 'broken.yml')
    ).toThrow('Invalid project content in broken.yml')
  })

  it('loads the repository projects in display order with unique slugs', async () => {
    const filenames = await readdir(projectsDirectory)
    const projects = await readProjects(filenames, (filename) =>
      readFile(join(projectsDirectory, filename), 'utf8')
    )
    const orders = projects.map(({ order }) => order)
    const slugs = projects.map(({ slug }) => slug)
    const technicalSlugs = projects
      .filter(({ group }) => group === 'technical')
      .map(({ slug }) => slug)

    expect(orders).toEqual(orders.toSorted((previous, next) => previous - next))
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(technicalSlugs[0]).toBe('portfolio')
  })
})
