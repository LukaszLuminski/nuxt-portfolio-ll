import { parse } from 'yaml'
import type {
  Project,
  ProjectCaseStudy,
  ProjectGroup,
  ProjectLink
} from '~/features/projects/types'

type UnknownRecord = Record<string, unknown>

const projectGroups = [
  'client',
  'technical'
] as const satisfies readonly ProjectGroup[]
const projectLinkTypes = [
  'live',
  'code'
] as const satisfies readonly ProjectLink['type'][]

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isProjectGroup(value: string): value is ProjectGroup {
  return projectGroups.some((group) => group === value)
}

function isProjectLinkType(value: string): value is ProjectLink['type'] {
  return projectLinkTypes.some((type) => type === value)
}

function invalidProject(filename: string, message: string): never {
  throw new Error(`Invalid project content in ${filename}: ${message}`)
}

function requireRecord(
  value: unknown,
  filename: string,
  field = 'document'
): UnknownRecord {
  if (isRecord(value)) {
    return value
  }

  return invalidProject(filename, `${field} must be an object.`)
}

function requireString(source: UnknownRecord, field: string, filename: string) {
  const value = source[field]

  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  return invalidProject(filename, `${field} must be a non-empty string.`)
}

function requireNumber(source: UnknownRecord, field: string, filename: string) {
  const value = source[field]

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  return invalidProject(filename, `${field} must be a finite number.`)
}

function requireStringArray(
  source: UnknownRecord,
  field: string,
  filename: string
) {
  const value = source[field]

  if (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string' && item.trim())
  ) {
    return value.map((item) => item.trim())
  }

  return invalidProject(
    filename,
    `${field} must contain only non-empty strings.`
  )
}

function optionalString(
  source: UnknownRecord,
  field: string,
  filename: string
) {
  const value = source[field]

  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string') {
    return value.trim() || null
  }

  return invalidProject(filename, `${field} must be a string or null.`)
}

function requireNonEmptyStringArray(
  source: UnknownRecord,
  field: string,
  filename: string
) {
  const value = requireStringArray(source, field, filename)

  if (value.length > 0) {
    return value
  }

  return invalidProject(filename, `${field} must contain at least one item.`)
}

function optionalCaseStudy(
  source: UnknownRecord,
  filename: string
): ProjectCaseStudy | null {
  if (source.caseStudy === null || source.caseStudy === undefined) {
    return null
  }

  const caseStudy = requireRecord(source.caseStudy, filename, 'caseStudy')

  return {
    timeline: requireString(caseStudy, 'timeline', filename),
    status: requireString(caseStudy, 'status', filename),
    challenge: requireNonEmptyStringArray(caseStudy, 'challenge', filename),
    approach: requireNonEmptyStringArray(caseStudy, 'approach', filename),
    outcomes: requireNonEmptyStringArray(caseStudy, 'outcomes', filename),
    lessons: requireNonEmptyStringArray(caseStudy, 'lessons', filename)
  }
}

function requireGroup(source: UnknownRecord, filename: string): ProjectGroup {
  const group = requireString(source, 'group', filename)

  if (isProjectGroup(group)) {
    return group
  }

  return invalidProject(
    filename,
    `group must be one of: ${projectGroups.join(', ')}.`
  )
}

function requireLinks(source: UnknownRecord, filename: string): ProjectLink[] {
  const value = source.links

  if (!Array.isArray(value)) {
    return invalidProject(filename, 'links must be an array.')
  }

  return value.map((item, index) => {
    const link = requireRecord(item, filename, `links[${index}]`)
    const type = requireString(link, 'type', filename)

    if (!isProjectLinkType(type)) {
      return invalidProject(
        filename,
        `links[${index}].type must be live or code.`
      )
    }

    return {
      label: requireString(link, 'label', filename),
      href: requireString(link, 'href', filename),
      type
    }
  })
}

export function parseProject(
  input: unknown,
  filename = 'unknown project'
): Project {
  const source = requireRecord(input, filename)

  return {
    title: requireString(source, 'title', filename),
    slug: requireString(source, 'slug', filename),
    order: requireNumber(source, 'order', filename),
    group: requireGroup(source, filename),
    summary: requireString(source, 'summary', filename),
    image: requireString(source, 'image', filename),
    imageAlt: requireString(source, 'imageAlt', filename),
    stack: requireStringArray(source, 'stack', filename),
    highlights: requireStringArray(source, 'highlights', filename),
    details: requireStringArray(source, 'details', filename),
    frontEnd: optionalString(source, 'frontEnd', filename),
    backEnd: optionalString(source, 'backEnd', filename),
    database: optionalString(source, 'database', filename),
    caseStudy: optionalCaseStudy(source, filename),
    links: requireLinks(source, filename)
  }
}

function ensureUniqueSlugs(projects: readonly Project[]) {
  const slugs = new Set<string>()

  for (const { slug } of projects) {
    if (slugs.has(slug)) {
      throw new Error(`Duplicate project slug: ${slug}`)
    }

    slugs.add(slug)
  }
}

export async function readProjects(
  filenames: readonly string[],
  readSource: (filename: string) => Promise<string>
) {
  const projects = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.yml'))
      .map(async (filename) => {
        const source = await readSource(filename)

        return parseProject(parse(source), filename)
      })
  )

  ensureUniqueSlugs(projects)

  return projects.toSorted(
    ({ order: previousOrder }, { order: nextOrder }) =>
      previousOrder - nextOrder
  )
}
